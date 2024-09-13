import Controller from '@ember/controller';
import { service } from '@ember/service';

import type ApplicationService from '../services/application';

export default class ApplicationController extends Controller {
  @service
  declare application: ApplicationService;
}
