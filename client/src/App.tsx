// filepath: c:\Users\ASRock\Documents\GitHub\Node\Epayco\virtual-wallet\client\src\App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WalletForm from './components/WalletForm';
import Index from 'pages/Index';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <h1>Virtual Wallet</h1>
                <Routes>
                    <Route path="/" element={<Index />} />
                    {/* Additional routes can be added here */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;