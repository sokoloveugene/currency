import React from 'react';
import { DIContainer } from './services/di/index';
import { DIProvider } from './services/di/provider';
import { Application } from './components/Application';
import { createRoot } from 'react-dom/client';
import { DynamicInfo, ModalProvider, ModalTypeDefinition } from 'services/modal-manager';
import './reset.css';

const di = new DIContainer();

createRoot(document.getElementById('app')).render(
  <DIProvider di={di}>
    <ModalProvider>
      <Application />
      <ModalTypeDefinition id="modal" component={DynamicInfo} />
    </ModalProvider>
  </DIProvider>
);
