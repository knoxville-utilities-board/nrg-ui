/* eslint-disable @typescript-eslint/no-explicit-any */

import { assert } from '@ember/debug';
import { get } from '@ember/object';
import { camelize } from '@ember/string';
import { typeOf as emberTypeOf } from '@ember/utils';
import { Response } from 'miragejs';

export interface MirageModel {
  id: string;
  [key: string]: any;
}

export interface MirageSchema<T extends MirageModel = MirageModel> {
  [key: string]: {
    find: (ids: string | string[]) => T | null;
    all: () => { models: T[]; modelName: string };
    first: () => T | null;
  };
}

export interface MirageRequest {
  params: {
    [key: string]: unknown;
  };
  queryParams: {
    [key: string]: string | string[];
  };
}

export type MirageResponse<T extends MirageModel = MirageModel> =
  | {
      meta: {
        start: number;
        count: number;
        total: number;
      };
      [dataKey: string]: { start: number; count: number; total: number } | T[];
    }
  | T;

export interface WebContent {
  id: number;
  name: string;
  store: 'customer' | 'employee';
  tags: string[];
  data: object;
}

export type FilterValue = string | number | boolean | Date | null;

export interface Filter {
  key: string;
  operator?: string;
  criteria: FilterValue;
}

export interface Sort {
  value: string;
  ascending?: boolean;
}

interface FilterChecks {
  hasOrFilters: boolean;
  orFiltersPass: boolean;
  andFiltersPass: boolean;
}

const PARSABLE_NUMBER_REGEX = /^\s*[+-]?\d+\s*$/;

export function findAll<T extends MirageModel = MirageModel>(
  schema: MirageSchema<T>,
  request: MirageRequest,
  dataType: string,
  context: any,
): MirageResponse<T> {
  assert(`Unknown data type: ${dataType}`, !!schema[dataType]);

  const ids = request.queryParams['ids'];
  if (ids) {
    // Resolves coalesced find requests
    return schema[dataType]!.find(ids)!;
  }
  const filters = {} as Record<string, Filter[]>;
  const page = {
    start: 0,
    count: 25,
  };
  const results = schema[dataType].all();
  let sort = null;

  if (!results.models?.length) {
    return {
      meta: {
        start: page.start,
        count: page.count,
        total: 0,
      },
      [results.modelName]: [],
    };
  }
  for (const key in request.queryParams) {
    let values: string | string[] = request.queryParams[key] ?? [];
    if (!Array.isArray(values)) {
      values = [values];
    }
    for (let value of values) {
      if (key === 'sort') {
        let ascending = true;
        if (value.startsWith('-')) {
          ascending = false;
          value = value.slice(1);
        }
        sort = {
          value,
          ascending,
        };
      } else if (key === 'start') {
        page.start = Number.parseInt(value);
      } else if (key === 'count') {
        page.count = Number.parseInt(value);
      } else {
        const splitValue = value.split(':');
        let criteria: FilterValue = splitValue[0]!;
        let operator: string | undefined = 'equals';

        // Allow for colon in criteria
        if (splitValue.length > 1) {
          criteria = splitValue.slice(0, -1).join(':');
          operator = splitValue.at(-1);
        }
        if (!filters[key]) {
          filters[key] = [];
        }

        const keyIsDate = schema[dataType].first()![key] instanceof Date;
        if (keyIsDate) {
          const parsedCriteria = Number.parseInt(criteria!);
          assert('Date filter must be milliseconds', parsedCriteria);
          criteria = (parsedCriteria && new Date(parsedCriteria)) || criteria;
        }
        filters[key].push({
          key,
          operator,
          criteria,
        });
      }
    }
  }

  const filteredResults = results.models.filter((result) =>
    shouldIncludeItem(result, filters),
  );
  let sortedResults = filteredResults;
  if (sort) {
    sortedResults = sortedResults.sort((a, b) => sortItems(sort, a, b));
  }

  let serializedResults = sortedResults;
  if (context) {
    serializedResults = sortedResults.map((item) => {
      return context.serialize(item)[camelize(results.modelName)];
    });
  }

  const total = serializedResults.length;

  const pagedResults = serializedResults.slice(
    page.start,
    page.start + page.count,
  );

  const response: MirageResponse<T> = {
    meta: {
      start: page.start,
      count: page.count,
      total,
    },
    [results.modelName]: pagedResults,
  };

  return response;
}

export const shouldIncludeItem = <T extends MirageModel = MirageModel>(
  item: T,
  filters: Record<string, Filter[]>,
) => {
  let pass = true;
  for (const key in filters) {
    let orFiltersPass = false;
    let andFiltersPass = true;
    let hasOrFilters = false;

    for (const filter of filters[key]!) {
      ({ hasOrFilters, orFiltersPass, andFiltersPass } = itemMeetsFilter(
        item,
        filter,
        {
          hasOrFilters,
          orFiltersPass,
          andFiltersPass,
        },
      ));
    }
    if (!hasOrFilters) {
      orFiltersPass = true;
    }
    pass = pass && orFiltersPass && andFiltersPass;
  }
  return pass;
};

export function itemMeetsFilter<T extends MirageModel = MirageModel>(
  item: T,
  filter: Filter,
  { hasOrFilters = false, orFiltersPass = false, andFiltersPass = true } = {},
) {
  const { key, criteria } = filter;
  if (key === 'search') {
    andFiltersPass &&= handleSearch(item, criteria);

    return {
      hasOrFilters,
      orFiltersPass,
      andFiltersPass,
    };
  } else if (key === 'tag') {
    return handleTag(item, filter, {
      hasOrFilters,
      orFiltersPass,
      andFiltersPass,
    });
  }
  return handleStandardFilter(item, filter, {
    hasOrFilters,
    orFiltersPass,
    andFiltersPass,
  });
}

export function handleSearch<T extends MirageModel = MirageModel>(
  item: T,
  criteria: FilterValue,
) {
  // Full Text Search
  let matchesSearch = false;
  for (const itemKey in item['attrs']) {
    const value = item['attrs'][itemKey];
    if (emberTypeOf(value) !== 'string') {
      continue;
    }
    matchesSearch ||=
      value.toLowerCase().indexOf((criteria as string).toLowerCase()) !== -1;
  }
  return matchesSearch;
}

export function handleTag<T extends MirageModel = MirageModel>(
  item: T,
  { operator, criteria }: Filter,
  { hasOrFilters, orFiltersPass, andFiltersPass }: FilterChecks,
) {
  if (operator === 'equals') {
    hasOrFilters = true;
    // Multiple equals filters are combined with OR
    orFiltersPass ||=
      item['tags'].indexOf(Number.parseInt(criteria as string)) !== -1;
  } else if (operator === 'notEquals') {
    andFiltersPass &&=
      item['tags'].indexOf(Number.parseInt(criteria as string)) === -1;
  }

  return {
    hasOrFilters,
    orFiltersPass,
    andFiltersPass,
  };
}

export function handleStandardFilter<T extends MirageModel = MirageModel>(
  item: T,
  filter: Filter,
  { hasOrFilters, orFiltersPass, andFiltersPass }: FilterChecks,
) {
  const { key } = filter;
  const keyContainsArray = key.includes('[]');
  let value = get(item, key);
  if (keyContainsArray) {
    const [pathToArray, currentPathInArray] = key.split('[]') as [
      string,
      string,
    ];
    let pathInArray = currentPathInArray;
    const arrayOfObjects = get(item, pathToArray);
    value = arrayOfObjects;

    if (pathInArray) {
      if (pathInArray.startsWith('.')) {
        pathInArray = pathInArray.slice(1);
      }
      value = arrayOfObjects.map((obj: any) => get(obj, pathInArray));
    }
  }

  // Mirage.js will serialize models to `model:<modelName>(<id>)`,
  // so let's use its id instead
  if (value?.constructor?.name === 'Child') {
    value = value.id;
  }
  if (!((value as any) instanceof Date)) {
    // @ts-expect-error - Coerce any value to string
    value += '';
  }

  return checkValidity([value], filter, {
    hasOrFilters,
    orFiltersPass,
    andFiltersPass,
  });
}

function checkValidity(
  value: FilterValue[],
  { criteria, operator }: Filter,
  { hasOrFilters, orFiltersPass, andFiltersPass }: FilterChecks,
) {
  if (operator === 'equals') {
    hasOrFilters = true;
    // Multiple equals filters are combined with OR
    orFiltersPass ||= value.some((v) => v === criteria);
  }
  const operatorFunctions = {
    notEquals: (v: any) => v !== criteria,
    greaterThan: (v: any) => v > criteria!,
    lessThan: (v: any) => v < criteria!,
    greaterThanOrEquals: (v: any) => v >= criteria!,
    lessThanOrEquals: (v: any) => v <= criteria!,
    like: (v: any) => {
      const escapedRegex = escapeRegExp(criteria as string).replace(
        /\\\*/g,
        '.*',
      );
      const testRegex = new RegExp(`^${escapedRegex}$`, 'i');
      return testRegex.test(v);
    },
  };

  const checker =
    operatorFunctions[operator as keyof typeof operatorFunctions] ??
    (() => true);
  andFiltersPass &&= value.some(checker);

  return {
    hasOrFilters,
    orFiltersPass,
    andFiltersPass,
  };
}

export function sortItems(
  sort: Sort,
  a: Record<string, string>,
  b: Record<string, string>,
) {
  let aVal: string | number = get(a, sort.value);
  let bVal: string | number = get(b, sort.value);
  const aIsNumber = PARSABLE_NUMBER_REGEX.test(aVal);
  const bIsNumber = PARSABLE_NUMBER_REGEX.test(bVal);
  if (aIsNumber && bIsNumber) {
    // If a and b are numbers, compare as numbers
    aVal = Number.parseInt(aVal);
    bVal = Number.parseInt(bVal);
  }
  if (aVal < bVal) {
    if (sort.ascending) {
      return -1;
    } else {
      return 1;
    }
  } else if (bVal < aVal) {
    if (sort.ascending) {
      return 1;
    } else {
      return -1;
    }
  } else {
    return 0;
  }
}

export function findContent(records: WebContent[], request: MirageRequest) {
  if (!request.queryParams['store']) {
    throw new Error(
      `Invalid 'store' filter value: ${request.queryParams['store']}`,
    );
  }

  records = records.filter(
    (record) => record.store === request.queryParams['store'],
  );

  if ('id' in request.params) {
    const record = records.find((record) => record.id === request.params['id']);

    if (!record) {
      return new Response(404);
    }

    return {
      content: record,
    };
  }

  const allRecords = records;

  if ('name' in request.queryParams) {
    const name = request.queryParams['name'] as string;
    const record = records.find((record) => record.name === name);

    if (!record) {
      return new Response(404);
    }

    return { content: record };
  }

  if ('tag' in request.queryParams) {
    const tags = request.queryParams['tag'] as string[];

    const matchingRecords = new Set();

    for (const tag of tags) {
      records
        .filter((record) => record.tags.includes(tag))
        .forEach((record) => matchingRecords.add(record));
    }

    return {
      content: [...matchingRecords],
      meta: {
        start: 0,
        count: matchingRecords.size,
        total: allRecords.length,
      },
    };
  }

  return {
    content: records,
    meta: {
      start: 0,
      count: records.length,
      total: allRecords.length,
    },
  };
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&');
}

export default {
  checkValidity,
  escapeRegExp,
  findAll,
  findContent,
  handleSearch,
  handleStandardFilter,
  handleTag,
  itemMeetsFilter,
  shouldIncludeItem,
  sortItems,
};
