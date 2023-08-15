import React, { useEffect, useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { observer } from 'mobx-react-lite';
import { useService } from 'services/di/provider';
import utils from 'utils/index';
import { chartOptions, timeOptions } from './options';
import { Radio, Select } from 'antd';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  coinID: string;
}

const CoinChart: React.FC<Props> = observer(({ coinID }) => {
  const store = useService('RootStore');
  const [days, setDays] = useState<number>(() => {
    return timeOptions.find((option) => option.label === '6m').value;
  });
  const [currency, setCurrency] = useState(() => {
    return store.session.selectedCurrencies[0] ?? 'usd';
  });

  useEffect(() => {
    store.price.loadHistory(coinID, currency, days);
  }, [coinID, currency, days]);

  const data = useMemo(() => {
    const { labels, data } = utils.chart.parseHistory(store.price.history);
    return {
      labels,
      datasets: [
        {
          label: coinID,
          data,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }
      ]
    };
  }, [store.price.history, coinID]);

  const currencyOptions = useMemo(() => {
    return store.referenceData.currencies.map(utils.object.toOption);
  }, [store.referenceData.currencies]);

  if (!store.price.history.length) return null;

  return (
    <>
      <Radio.Group value={days} size="large">
        {timeOptions.map((option) => (
          <Radio.Button
            onChange={(e) => setDays(e.target.value)}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </Radio.Button>
        ))}
      </Radio.Group>
      <br />
      <Select
        value={currency}
        style={{ width: 5 * 50, marginTop: 20 }}
        onChange={(selected) => setCurrency(selected)}
        options={currencyOptions}
      />
      <Line options={chartOptions} data={data} />
    </>
  );
});

export default CoinChart;
