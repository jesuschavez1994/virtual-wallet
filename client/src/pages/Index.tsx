
import { useState } from "react";
import toast from "react-hot-toast";
import { useWallet } from "../hooks/useWallet";
import WalletHeader from "../components/WalletHeader";
import RegisterForm from "../components/RegisterForm";
import RechargeForm from "../components/RechargeForm";
import PaymentForm from "../components/PaymentForm";
import ConfirmationForm from "../components/ConfirmationForm";
import BalanceForm from "../components/BalanceForm";

const Index = () => {
  const [activeTab, setActiveTab] = useState("register");
  const { 
    registerClient, 
    rechargeWallet, 
    initiatePayment, 
    confirmPayment, 
    checkBalance 
  } = useWallet();

  const handleRegister = (document: string, name: string, email: string, phone: string) => {
    registerClient({ document, name, email, phone });
  };

  const handleRecharge = (document: string, phone: string, amount: number) => {
    rechargeWallet(document, phone, amount);
  };

  const handleInitiatePayment = (document: string, phone: string, amount: number) => {
    return initiatePayment(document, phone, amount);
  };

  const handleConfirmPayment = (sessionId: string, token: string) => {
    return confirmPayment(sessionId, token);
  };

  const handleCheckBalance = (document: string, phone: string) => {
    return checkBalance(document, phone);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <WalletHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="mt-6">
          {activeTab === "register" && <RegisterForm onRegister={handleRegister} />}
          {activeTab === "recharge" && <RechargeForm onRecharge={handleRecharge} />}
          {activeTab === "payment" && <PaymentForm onInitiatePayment={handleInitiatePayment} />}
          {activeTab === "confirm" && <ConfirmationForm onConfirmPayment={handleConfirmPayment} />}
          {activeTab === "balance" && <BalanceForm onCheckBalance={handleCheckBalance} />}
        </div>
      </div>
    </div>
  );
};

export default Index;