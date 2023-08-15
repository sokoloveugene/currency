import React, { useMemo } from 'react';
import { Table } from 'antd';
import { Currencies } from 'types';
import { Price } from './price';
import { observer } from 'mobx-react-lite';
import { useService } from 'services/di/provider';

interface RowData {
  id: string;
  key: string;
  name: string;
  symbol: string;
  price?: Currencies;
}

interface Props {
  onClick?: (coinID: string) => void;
}

export const CoinTable: React.FC<Props> = observer(({ onClick }) => {
  const store = useService('RootStore');

  const columns = [
    {
      title: 'Coin',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, row: RowData) => {
        return (
          <div style={{ cursor: 'pointer' }} onClick={() => onClick(row.id)}>
            {name}
          </div>
        );
      }
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: Currencies) => {
        return <Price data={price} />;
      }
    }
  ];

  const dataSource = useMemo(() => {
    const whiteList = new Set(store.session.selectedCoins);
    const prices = store.price.prices;
    return store.referenceData.coins
      .filter((coin) => whiteList.has(coin.id))
      .map((coin) => ({
        id: coin.id,
        key: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        price: prices[coin.id]
      }));
  }, [store.session.selectedCoins, store.referenceData.coins, store.price.prices]);

  return <Table dataSource={dataSource} columns={columns} />;
});

CoinTable.displayName = 'CoinTable';
