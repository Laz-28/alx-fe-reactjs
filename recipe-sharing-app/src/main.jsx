import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. Remove the BrowserRouter import
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Remove the <BrowserRouter> wrapper from here */}
    <App />
  </React.StrictMode>
);