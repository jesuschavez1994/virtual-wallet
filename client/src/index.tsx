// filepath: c:\Users\ASRock\Documents\GitHub\Node\Epayco\virtual-wallet\client\src\index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import VirtualWallet from 'components/WalletForm';

ReactDOM.render(
    <React.StrictMode>
        <VirtualWallet />
    </React.StrictMode>,
    document.getElementById('root')
);