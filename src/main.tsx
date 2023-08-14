import React from 'react';
import { createRoot } from 'react-dom/client';
import Application from './components/Application';

// Say something
console.log('[ERWT] : Renderer execution started');

const app = <Application />;

createRoot(document.getElementById('app')).render(app);
