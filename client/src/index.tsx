import React from 'react';
import ReactDOM from 'react-dom';
import Index from 'pages/Index';
import { Toaster } from "react-hot-toast";
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <Toaster position="top-right" reverseOrder={false} />
        <Index />
    </React.StrictMode>,
    document.getElementById('root')
);