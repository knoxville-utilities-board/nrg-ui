import Model, { attr } from '@ember-data/model';

export default class FiberOrderModel extends Model {
  @attr internet: string | undefined;
  @attr managedWifi: boolean | undefined;
  @attr tv: string | undefined;
  @attr premiumChannels: number[] | undefined;
  @attr numberOfPhoneLines: number | undefined;
  @attr numberOfFiresticks: number | undefined;
  @attr numberOfBatteryBackups: number | undefined;
}
