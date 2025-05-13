import { Wallet } from "lucide-react";

interface WalletHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const WalletHeader = ({ activeTab, setActiveTab }: WalletHeaderProps) => {
  const tabs = [
    { id: "register", label: "Registro" },
    { id: "recharge", label: "Recarga" },
    { id: "payment", label: "Pagar" },
    { id: "confirm", label: "Confirmar" },
    { id: "balance", label: "Saldo" }
  ];

  return (
    <div className="mb-8 text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Wallet className="h-8 w-8 text-wallet-purple" />
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-wallet-gradient">
          ePayco Billetera Virtual
        </h1>
      </div>
      
      <div className="flex flex-wrap justify-center gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? "bg-wallet-purple text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WalletHeader;