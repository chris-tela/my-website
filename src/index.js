import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ProPage from './ProPage';

// /portfolio is the plain, professional version of the site.
const isPro = /^\/portfolio\/?$/.test(window.location.pathname);
if (isPro) {
  document.body.classList.add('pro-body');
  document.title = 'Christopher Tela | Portfolio';
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {isPro ? <ProPage /> : <App />}
  </React.StrictMode>
);
