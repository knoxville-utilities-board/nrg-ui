import { numeric } from '@kub/mirage/identity-managers';
import { createAuthToken } from '@kub/mirage/utils/auth';
import { findContent } from '@kub/mirage/utils/filters';
import { pluralize, singularize } from 'ember-inflector';
import MSWInterceptor from 'mirage-msw';
import { Response } from 'miragejs';

import factories from './factories.js';
import fixtures from './fixtures.js';
import models from './models.js';
import scenarios from './scenarios.js';
import serializers from './serializers.js';

export default function (config) {
  return {
    ...config,
    factories: {
      ...factories,
      ...config?.factories,
    },
    fixtures: {
      ...fixtures,
      ...config?.fixtures,
    },
    inflector: {
      pluralize,
      singularize,
    },
    identityManagers: {
      application: numeric(),
      // Add other identity managers as needed,
      // based on model name
      // entity: guid(),
    },
    interceptor: new MSWInterceptor(),
    models: {
      ...models,
      ...config?.models,
    },
    seeds: scenarios[config?.scenario ?? 'default'],
    serializers: {
      ...serializers,
      ...config?.serializers,
    },
    routes,
  };
}

function routes() {
  // Pass through all maps requests
  this.passthrough(
    'https://cdn.arcgis.com/**',
    'https://services.arcgisonline.com/**',
    'https://services9.arcgis.com/**',
    `https://www.arcgis.com/**`,
    'http://basemaps.arcgis.com/**',
    'http://js.arcgis.com/**',
    'http://static.arcgis.com/**',
  );

  const server = this;

  server.namespace = '/api';

  this.get(
    '/auth/v1/application-settings/:appName',
    function (schema, request) {
      const { appName } = request.params;
      return {
        'application-settings': [
          {
            node: 'mirage',
            appName,
            localEnvironment: 'dev',
            googleAnalyticsKey: 'UA-80419078-1',
            featureFlags: {
              // Add feature flags as needed
            },
          },
        ],
      };
    },
  );

  this.post('/auth/v1/oauth2/v2.0/token/:userType', function (schema, request) {
    const { userType } = request.params;
    if (!userType) {
      return new Response(400, {}, { errors: ['User type is required'] });
    }

    if (!['customer', 'employee', 'agency'].includes(userType)) {
      return new Response(400, {}, { errors: ['Invalid user type'] });
    }

    const userToken = server.create(
      'auth-token',
      `${userType}Token`,
      // Include any traits here, if needed
      // 'someTrait', // Example trait
      // Followed by any hardcoded or precomputed attributes, if needed
      // {
      //   someAttribute: 'value',
      // },
    );
    const idToken = createAuthToken(userToken);

    document.cookie = `has_access_token=true;Domain=localhost;Path=/;`;
    document.cookie = `id_token=${idToken};Domain=localhost;Path=/;`;

    return new Response(
      200,
      {},
      {
        id_token: idToken,
        access_token: 'mock_access_token',
        token_type: null,
        expires_in: userToken.exp - userToken.iat,
        expires_at: userToken.exp,
        refresh_token: 'mock_refresh_token',
      },
    );
  });

  this.get('/content/v1/content', function (schema, request) {
    return findContent(schema.db.content, request);
  });
  this.get('/content/v1/content/:id', function (schema, request) {
    return findContent(schema.db.content, request);
  });
}
