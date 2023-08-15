import { Api } from 'services/api';
import { ReferenceData, IReferenceData } from './reference-data';
import { ISession, Session } from './session';
import { Price, IPrice } from './price';
import { IStorage } from 'services/storage';
import { IScheduler } from 'services/sheduler';

export interface IRootStore {
  referenceData: IReferenceData;
  session: ISession;
  price: IPrice;
}

export class RootStore implements IRootStore {
  referenceData: IReferenceData;
  session: ISession;
  price: IPrice;

  constructor(apiService: Api, storageService: IStorage, schedulerService: IScheduler) {
    this.referenceData = new ReferenceData(this, apiService);
    this.session = new Session(this, storageService);
    this.price = new Price(this, apiService, schedulerService);
  }
}
