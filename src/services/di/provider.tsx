import React from 'react';
import { DIContainer } from '.';
import { DiToken } from './types';

const DIContext = React.createContext<DIContainer | null>(null);

function useDI() {
  const ctx = React.useContext(DIContext);
  if (!ctx) throw new Error('DI available in provider');
  return ctx;
}

export function useService<T extends DiToken>(token: T) {
  const di = useDI();
  return di.inject(token);
}

interface Props {
  children: React.ReactNode;
  di: DIContainer;
}

export function DIProvider({ children, di }: Props) {
  return <DIContext.Provider value={di}>{children}</DIContext.Provider>;
}
