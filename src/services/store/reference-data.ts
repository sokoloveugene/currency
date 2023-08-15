import { action, makeObservable, observable, runInAction } from 'mobx';
import { IRootStore } from './index';
import { Coin } from 'types';
import { Api } from 'services/api';

export interface IReferenceData {
  currencies: string[];
  coins: Coin[];
  loadCurrencies(): void;
  loadCoins(): void;
}

export class ReferenceData implements IReferenceData {
  currencies: string[] = [];
  coins: Coin[] = [];

  constructor(private root: IRootStore, private apiService: Api) {
    makeObservable(this, {
      currencies: observable,
      coins: observable,
      loadCurrencies: action.bound
    });
  }

  async loadCurrencies() {
    try {
      const currencyOptions = await this.apiService.getCurrencies();
      runInAction(() => {
        this.currencies = currencyOptions;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async loadCoins() {
    try {
      const coinsOptions = await this.apiService.getCoins();
      runInAction(() => {
        this.coins = coinsOptions;
      });
    } catch (error) {
      console.log(error);
    }
  }
}
