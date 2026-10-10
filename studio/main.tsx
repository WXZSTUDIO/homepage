import React from 'react';
import { createRoot } from 'react-dom/client';
import { Studio } from 'sanity';
import config from './sanity.config';

const root = document.getElementById('root');

if (!root) {
  throw new Error('未找到 #root 挂载节点');
}

createRoot(root).render(
  <React.StrictMode>
    <Studio config={config} />
  </React.StrictMode>
);
