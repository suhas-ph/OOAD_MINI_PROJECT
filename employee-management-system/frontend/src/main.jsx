import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'; // ✅ You missed this!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <App />
      <ToastContainer position="top-right" autoClose={2000} /> {/* ✅ Add this */}
    </>
  </React.StrictMode>
);
