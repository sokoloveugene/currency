import { ComponentProps } from 'react';
import { children } from './children';

export type ModalType = 'modal' | 'confirmation';
export type ModalComponent = keyof typeof children;
export type ModalComponentProps<T extends ModalComponent> = ComponentProps<
  (typeof children)[T]
>;
export interface ModalPaylod<C extends ModalComponent> {
  type: ModalType;
  component: C;
  props: ModalComponentProps<C>;
  meta?: {
    description?: string;
    hasFooter?: boolean;
  };
  style?: {
    width?: number;
  };
}
