import { assert } from '@ember/debug';
import Service from '@ember/service';
import { TrackedMap } from 'tracked-built-ins';

import type { DropdownSignature } from '../components/dropdown.gts';

export type Dropdown = DropdownSignature['Blocks']['menu'][0];

export interface Menu {
  id: string;
  top: HTMLDivElement;
  bottom: HTMLDivElement;
  dropdown: Dropdown;
}

export default class ContextMenu extends Service {
  menus = new TrackedMap<string, Menu>();

  menu(id: string) {
    return this.menus.get(id);
  }

  async register(
    id: string,
    {
      top,
      bottom,
      dropdown,
    }: { top: HTMLDivElement; bottom: HTMLDivElement; dropdown: Dropdown },
  ) {
    // This must be disconnected from reactivity to avoid triggering
    // errors from reading and updating the same property in the same cycle.
    await Promise.resolve();

    assert('Context menu must have an id.', id);
    assert(
      `Context menu with id "${id}" already exists. Use a different id or unregister the existing menu.`,
      !this.menus.has(id),
    );
    assert(
      `Context menu with id "${id}" must have a top and bottom element.`,
      top && bottom,
    );
    assert(`Context menu with id "${id}" must have a dropdown.`, dropdown);

    this.menus.set(id, { id, top, bottom, dropdown });
  }

  unregister(id: string) {
    this.menus.delete(id);
  }
}

declare module '@ember/service' {
  interface Registry {
    'context-menu': ContextMenu;
  }
}
