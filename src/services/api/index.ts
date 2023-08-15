// eslint-disable-next-line import/named
import axios, { AxiosInstance } from 'axios';
import { Coin, CoinPriceHistory, CoinsPrices } from 'types';
/**
 * MOCKS are user as fallback when API call limit reached
 */
import COINS_MOCK from './coins.json';
import CURRENCY_MOCK from './currency.json';

export class Api {
  http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: 'https://api.coingecko.com/api/v3'
    });
  }

  getCurrencies() {
    return this.http
      .get<string[]>('/simple/supported_vs_currencies')
      .then((response) => response.data)
      .catch(() => CURRENCY_MOCK);
  }

  getCoins() {
    return this.http
      .get<Coin[]>('/coins/list')
      .then((response) => response.data)
      .catch(() => COINS_MOCK);
  }

  getPrices(coins: string[], currencies: string[]) {
    return this.http
      .get<CoinsPrices>(`simple/price?ids=${coins}&vs_currencies=${currencies}`)
      .then((response) => response.data);
  }

  getHistory(coinID: string, currency: string, days: number) {
    return this.http
      .get<CoinPriceHistory>(
        `/coins/${coinID}/market_chart?vs_currency=${currency}&days=${days}&interval=daily&precision=2`
      )
      .then((response) => response.data);
  }
}
