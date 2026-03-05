import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Log Web Vitals (CLS, FID, FCP, LCP, TTFB) to console in development
reportWebVitals(process.env.NODE_ENV === 'development' ? console.log : undefined);
