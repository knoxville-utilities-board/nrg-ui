import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

declare type Theme = 'light' | 'dark' | 'marketing';

export default class ApplicationService extends Service {
  @tracked
  theme: Theme = 'light';
}

// Don't remove this declaration: this is what enables TypeScript to resolve
// this service using `Owner.lookup('service:application')`, as well
// as to check when you pass the service name as an argument to the decorator,
// like `@service('application') declare altName: ApplicationService;`.
declare module '@ember/service' {
  interface Registry {
    application: ApplicationService;
  }
}
