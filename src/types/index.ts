export interface Option<T = any> {
  label: string;
  value: T;
}

export interface Coin {
  id?: string;
  symbol?: string;
  name?: string;
}

export type Currencies = Record<string, number>;

export type CoinsPrices = Record<string, Currencies>;

export interface CoinPriceHistory {
  prices: Array<number[]>;
  market_caps: Array<number[]>;
  total_volumes: Array<number[]>;
}

export type Callback = (...args: any[]) => any;
