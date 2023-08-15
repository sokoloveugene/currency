import React from 'react';
import { Header as AntHeader } from 'antd/es/layout/layout';
import { CoinSearch } from '../coin-search/index';
import coingecko from './coingecko.svg';

interface Props {
  onSearch: (coinID: string) => void;
}

export const Header: React.FC<Props> = ({ onSearch }) => {
  return (
    <AntHeader
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <CoinSearch onChange={onSearch} />
      <img className="logo" src={coingecko} />
    </AntHeader>
  );
};
