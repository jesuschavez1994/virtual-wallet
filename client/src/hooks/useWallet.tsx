
import { useState } from "react";
import toast from "react-hot-toast";

// Simulated wallet data types
interface Client {
  document: string;
  name: string;
  email: string;
  phone: string;
}

interface Session {
  id: string;
  amount: number;
  document: string;
  token: string;
}

export const useWallet = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [balances, setBalances] = useState<Record<string, number>>({});
  const [sessions, setSessions] = useState<Session[]>([]);

  // Register a new client
  const registerClient = (client: Client) => {
    // Check if client already exists
    const exists = clients.some(c => c.document === client.document);
    if (exists) {
      toast.error("El cliente ya está registrado");
      return false;
    }

    // Add the client
    setClients([...clients, client]);
    setBalances({ ...balances, [client.document]: 0 });
    toast.success("Cliente registrado exitosamente");
    return true;
  };

  // Recharge wallet
  const rechargeWallet = (document: string, phone: string, amount: number) => {
    // Verify client exists
    const client = clients.find(c => c.document === document && c.phone === phone);
    if (!client) {
      toast.error("Cliente no encontrado");
      return false;
    }

    // Add balance
    setBalances({
      ...balances,
      [document]: (balances[document] || 0) + amount
    });
    
    toast.success(`Recarga exitosa: $${amount}`);
    return true;
  };

  // Initiate a payment
  const initiatePayment = (document: string, phone: string, amount: number) => {
    // Verify client exists
    const client = clients.find(c => c.document === document && c.phone === phone);
    if (!client) {
      toast.error("Cliente no encontrado");
      return null;
    }

    // Check if balance is sufficient
    if ((balances[document] || 0) < amount) {
      toast.error("Saldo insuficiente");
      return null;
    }

    // Generate session ID and token
    const sessionId = Math.random().toString(36).substring(2, 10);
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store session
    const session = {
      id: sessionId,
      amount,
      document,
      token
    };
    
    setSessions([...sessions, session]);
    
    // Simulate sending token to email
    toast.success("Código enviado al correo electrónico registrado");
    
    return { 
      sessionId,
      token // In a real app, this would only be sent to the user's email
    };
  };

  // Confirm payment
  const confirmPayment = (sessionId: string, token: string) => {
    // Find session
    const session = sessions.find(s => s.id === sessionId);
    if (!session) {
      toast.error("Sesión no encontrada");
      return false;
    }

    // Validate token
    if (session.token !== token) {
      toast.error("Código de confirmación inválido");
      return false;
    }

    // Update balance
    setBalances({
      ...balances,
      [session.document]: (balances[session.document] || 0) - session.amount
    });

    // Remove session
    setSessions(sessions.filter(s => s.id !== sessionId));
    
    toast.success("Pago confirmado exitosamente");
    return true;
  };

  // Check balance
  const checkBalance = (document: string, phone: string) => {
    // Verify client exists
    const client = clients.find(c => c.document === document && c.phone === phone);
    if (!client) {
      toast.error("Cliente no encontrado");
      return null;
    }

    return balances[document] || 0;
  };

  return {
    registerClient,
    rechargeWallet,
    initiatePayment,
    confirmPayment,
    checkBalance
  };
};