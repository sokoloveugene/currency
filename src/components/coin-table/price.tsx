import React, { Fragment } from 'react';
import { Currencies } from 'types';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Typography } from 'antd';

interface Props {
  data?: Currencies;
}

export const Price: React.FC<Props> = ({ data }) => {
  if (!data)
    return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />;

  return (
    <>
      {Object.entries(data).map(([currency, price]) => (
        <Fragment key={`${currency}-${price}`}>
          <Typography.Text key={currency}>
            {currency}: {price}
          </Typography.Text>
          <br />
        </Fragment>
      ))}
    </>
  );
};
