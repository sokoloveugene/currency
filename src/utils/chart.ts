import { CoinPriceHistory } from 'types';
import { date } from './date';

const parseHistory = (history: CoinPriceHistory['prices']) => {
  const labels = [];
  const data = [];

  for (const entry of history) {
    labels.push(date.format(entry[0]));
    data.push(entry[1]);
  }

  return { labels, data };
};

export const chart = {
  parseHistory
};
