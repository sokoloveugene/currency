import { Option } from 'types';

const toOption = <T>(value: T): Option<T> => {
  return { label: String(value), value };
};

export const object = {
  toOption
};
