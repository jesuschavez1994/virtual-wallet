
import { useState } from "react";
import WalletHeader from "../components/WalletHeader";
import RegisterForm from "../components/RegisterForm";
import RechargeForm from "../components/RechargeForm";
import PaymentForm from "../components/PaymentForm";
import ConfirmationForm from "../components/ConfirmationForm";
import BalanceForm from "../components/BalanceForm";

const Index = () => {
  const [activeTab, setActiveTab] = useState("register");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <WalletHeader activeTab={activeTab} setActiveTab={setActiveTab} />
       <div className="mt-6">
        {activeTab === "register" && <RegisterForm />}
        {activeTab === "recharge" && <RechargeForm />}
        {activeTab === "payment" && <PaymentForm  />}
        {activeTab === "confirm" && <ConfirmationForm  />}
        {activeTab === "balance" && <BalanceForm  />}
        </div>
      </div>
    </div>
  );
};

export default Index;