import Bottle from 'bottlejs';
import { DIServiceType, DiToken, ServiceConstructor } from './types';
import { RootStore } from '../store/index';
import { Api } from 'services/api';
import { Storage } from 'services/storage';
import { ModalManager } from 'services/modal-manager';
import { Scheduler } from 'services/sheduler';

export class DIContainer extends Bottle {
  constructor() {
    super();
    this.service('Api', Api);
    this.service('Storage', Storage);
    this.service('ModalManager', ModalManager);
    this.service('Scheduler', Scheduler);
    this.service('RootStore', RootStore, 'Api', 'Storage', 'Scheduler');
  }

  service<T extends DiToken>(
    token: T,
    Constructor: ServiceConstructor<T>,
    ...dependency: DiToken[]
  ): this {
    if (Constructor.length > dependency.length) {
      throw new Error(`Missing dependency for: ${token}`);
    }
    // @ts-ignore
    return super.service(token, Constructor, ...dependency);
  }

  inject<T extends DiToken>(token: T): DIServiceType<T> {
    return this.container[token];
  }
}
