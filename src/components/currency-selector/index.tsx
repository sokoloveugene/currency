import React from 'react';
import { Button, Card, Col, Row } from 'antd';
import { observer } from 'mobx-react-lite';
import { useService } from 'services/di/provider';

export const CurrencySelector = observer(() => {
  const store = useService('RootStore');
  const list = store.referenceData.currencies;
  const selected = store.session.selectedCurrencies;
  const onChange = store.session.changeCurrencies;

  const handleAdd = (currency: string) => {
    onChange([...selected, currency]);
  };

  const handleRemove = (currency: string) => {
    onChange(selected.filter((c) => c !== currency));
  };

  return (
    <Card size="small" title="Select currency">
      <Row gutter={[8, 8]}>
        {list.map((currency) => {
          const active = selected.includes(currency);
          const handleClick = active ? handleRemove : handleAdd;
          return (
            <Col span={6} key={currency}>
              <Button
                type={active ? 'primary' : 'text'}
                onClick={() => handleClick(currency)}
              >
                {currency}
              </Button>
            </Col>
          );
        })}
      </Row>
    </Card>
  );
});

CurrencySelector.displayName = 'CurrencySelector';
