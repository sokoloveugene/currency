import React, { useMemo } from 'react';
import { Select } from 'antd';
import { observer } from 'mobx-react-lite';
import { useService } from 'services/di/provider';

interface Props {
  onChange: (coinID: string) => void;
}

export const CoinSearch: React.FC<Props> = observer(({ onChange }) => {
  const store = useService('RootStore');

  const options = useMemo(() => {
    return store.referenceData.coins.map((coin) => ({
      label: `${coin.name} (${coin.symbol})`,
      value: coin.id
    }));
  }, [store.referenceData.coins]);

  return (
    <Select
      style={{ minWidth: 300 }}
      showSearch
      placeholder="Search"
      optionFilterProp="children"
      onChange={(id) => onChange(id)}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={options}
    />
  );
});
