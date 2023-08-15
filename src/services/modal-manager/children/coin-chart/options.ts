import { Option } from 'types';

export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart'
    }
  }
};

export const timeOptions: Option[] = [
  {
    label: '1d',
    value: 1
  },
  {
    label: '5d',
    value: 5
  },
  {
    label: '1m',
    value: 31
  },
  {
    label: '6m',
    value: 31 * 6
  },
  {
    label: '1y',
    value: 335
  }
];
