import { Api } from 'services/api';
import { IRootStore } from '../store/index';
import { IStorage } from 'services/storage';
import { TModalManager } from 'services/modal-manager';
import { IScheduler } from 'services/sheduler';

export type DiToken = 'RootStore' | 'Api' | 'Storage' | 'ModalManager' | 'Scheduler';

export type DIServiceType<T extends DiToken> = {
  RootStore: IRootStore;
  Api: Api;
  Storage: IStorage;
  ModalManager: TModalManager;
  Scheduler: IScheduler;
}[T];

export type ServiceConstructor<T extends DiToken> =
  | (new (...any: any[]) => DIServiceType<T>)
  | ((...any: any[]) => DIServiceType<T>);
