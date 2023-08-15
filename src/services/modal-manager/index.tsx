import React, { Fragment } from 'react';
import {
  create,
  useModal,
  Provider,
  ModalDef,
  show,
  hide,
  remove
} from '@ebay/nice-modal-react';
import { Modal } from 'antd';
import { children } from './children';
import { ModalComponent, ModalPaylod, ModalType } from './types';

export type TModalManager = {
  show<T, C extends ModalComponent>(payload: ModalPaylod<C>): Promise<T>;
  hide<T>(type: ModalType): Promise<T>;
  remove(type: ModalType): void;
};

export class ModalManager implements TModalManager {
  show<T, C extends ModalComponent>(payload: ModalPaylod<C>): Promise<T> {
    return show(payload.type, payload);
  }

  hide<T = unknown>(type: ModalType): Promise<T> {
    return hide(type);
  }

  remove(type: ModalType) {
    return remove(type);
  }
}

export const ModalProvider = Provider;
export const ModalTypeDefinition = ModalDef;

export const DynamicInfo = create(() => {
  const modal = useModal();
  const args = modal.args as unknown as ModalPaylod<ModalComponent>;
  const Content = args?.component ? children[args.component] : Fragment;

  return (
    <Modal
      title={args?.meta?.description}
      visible={modal.visible}
      onOk={modal.hide}
      onCancel={modal.hide}
      afterClose={modal.remove}
      width={args?.style?.width ?? 1000}
      footer={args?.meta?.hasFooter ? undefined : null}
    >
      {/* @ts-ignore */}
      <Content {...args.props} />
    </Modal>
  );
});
