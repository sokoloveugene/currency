import { action, autorun, makeObservable, observable, runInAction } from 'mobx';
import { IRootStore } from '.';
import { Api } from 'services/api';
import { CoinPriceHistory, CoinsPrices } from 'types';
import { IScheduler } from 'services/sheduler';

export interface IPrice {
  prices: CoinsPrices;
  history: CoinPriceHistory['prices'];
  loadPrices: () => void;
  loadHistory: (coinID: string, currency: string, days: number) => void;
}

export class Price implements IPrice {
  prices: CoinsPrices = {};
  history: CoinPriceHistory['prices'] = [];

  constructor(
    private root: IRootStore,
    private apiService: Api,
    private schedulerService: IScheduler
  ) {
    makeObservable(this, {
      prices: observable,
      history: observable,
      loadPrices: action.bound,
      loadHistory: action.bound
    });

    autorun(() => {
      this.root.session.selectedCoins;
      this.root.session.selectedCurrencies;
      this.loadPrices();
    });

    const EVERY_MINUTE = 60 * 1000;
    schedulerService.register('autoUpdatePrice', () => this.loadPrices(), EVERY_MINUTE);
  }

  async loadPrices() {
    try {
      const selectedCoins = this.root.session.selectedCoins;
      const selectedCurrencies = this.root.session.selectedCurrencies;
      const prices = await this.apiService.getPrices(selectedCoins, selectedCurrencies);
      runInAction(() => {
        this.prices = prices;
      });
    } catch (error) {
      // TODO
    }
  }

  async loadHistory(coinID: string, currency: string, days: number) {
    try {
      const history = await this.apiService.getHistory(coinID, currency, days);
      runInAction(() => {
        this.history = history.prices;
      });
    } catch (error) {
      // TODO
    }
  }
}
