import React, { useCallback, useEffect } from 'react';
import { Col, Layout, Row, theme, Grid } from 'antd';
import { useService } from 'services/di/provider';
import { CoinTable } from './coin-table';
import { CoinsSelector } from './coins-selector';
import { CurrencySelector } from './currency-selector';
import { Header } from './header';
import { Footer } from './footer';

export const Application: React.FC = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const screens = Grid.useBreakpoint();
  const store = useService('RootStore');
  const modalManager = useService('ModalManager');

  useEffect(() => {
    store.referenceData.loadCurrencies();
    store.referenceData.loadCoins();
  }, []);

  const displayChart = useCallback((coinID: string) => {
    modalManager.show({
      type: 'modal',
      component: 'CoinChart',
      props: {
        coinID
      }
    });
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header onSearch={displayChart} />
      <Layout style={{ padding: '24px 20px', background: colorBgContainer }}>
        <Row gutter={[8, 8]}>
          <Col span={screens.sm ? 14 : 24}>
            <CoinsSelector />
            <CoinTable onClick={displayChart} />
          </Col>
          <Col span={screens.sm ? 10 : 24}>
            <CurrencySelector />
          </Col>
        </Row>
      </Layout>
      <Footer />
    </Layout>
  );
};
