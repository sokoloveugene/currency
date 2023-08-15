import React, { useMemo } from 'react';
import { Card, Select } from 'antd';
import { useService } from 'services/di/provider';
import { observer } from 'mobx-react-lite';

export const CoinsSelector = observer(() => {
  const store = useService('RootStore');
  const coins = store.referenceData.coins;
  const preselected = store.session.selectedCoins;

  const options = useMemo(() => {
    return coins.map((coin) => ({ label: coin.name, value: coin.id }));
  }, [coins]);

  return (
    <Card size="small" title="Select coins" style={{ marginBottom: 20 }}>
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Please select"
        defaultValue={preselected}
        onChange={(v) => store.session.changeCoins(v)}
        options={options}
      />
    </Card>
  );
});

CoinsSelector.displayName = 'CoinsSelector';
