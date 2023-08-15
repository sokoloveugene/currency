import { action, autorun, makeObservable, observable } from 'mobx';
import { IRootStore } from '.';
import { IStorage } from 'services/storage';

export interface ISession {
  selectedCurrencies: string[];
  selectedCoins: string[];
  changeCurrencies: (currencies: string[]) => void;
  changeCoins: (coins: string[]) => void;
}

export class Session implements ISession {
  selectedCurrencies: string[] = [];
  selectedCoins: string[] = [];

  constructor(private root: IRootStore, private storageService: IStorage) {
    makeObservable(this, {
      selectedCurrencies: observable,
      selectedCoins: observable,
      changeCurrencies: action.bound,
      changeCoins: action.bound
    });

    const PREDEFINED_COINS = ['bitcoin', 'dogyrace', 'salt', 'soldoge', 'aave-link'];
    const PREDEFINED_CURRENCY = ['usd'];

    this.selectedCurrencies =
      this.storageService.get('selectedCurrencies') ?? PREDEFINED_CURRENCY;
    this.selectedCoins = this.storageService.get('selectedCoins') ?? PREDEFINED_COINS;

    autorun(() => {
      this.storageService.set('selectedCurrencies', this.selectedCurrencies);
      this.storageService.set('selectedCoins', this.selectedCoins);
    });
  }

  changeCurrencies(currencies: string[]) {
    this.selectedCurrencies = currencies;
  }

  changeCoins(coins: string[]) {
    this.selectedCoins = coins;
  }
}
