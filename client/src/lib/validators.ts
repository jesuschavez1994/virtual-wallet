export const validators = {
  // Validate required field
  required: (value: string) => value.trim() !== "",

  // Validate document number (assuming numeric with at least 8 digits)
  document: (value: string) => /^\d{8,}$/.test(value),

  // Validate name (at least two words)
  name: (value: string) => {
    const words = value.trim().split(" ").filter(word => word.length > 0);
    return words.length >= 2;
  },

  // Validate email format
  email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),

  // Validate phone number (assuming Colombian format)
  phone: (value: string) => /^3\d{9}$/.test(value),

  // Validate amount (positive number)
  amount: (value: number) => !isNaN(value) && value > 0,
  
  // Validate session ID (alphanumeric)
  sessionId: (value: string) => /^[a-z0-9]+$/i.test(value),
  
  // Validate token (6 digits)
  token: (value: string) => /^\d{6}$/.test(value),
};

export const getValidationMessage = (type: string) => {
  const messages: Record<string, string> = {
    required: "Este campo es obligatorio",
    document: "Ingresa un documento válido (mínimo 8 dígitos)",
    name: "Ingresa nombre y apellido",
    email: "Ingresa un correo electrónico válido",
    phone: "Ingresa un número de celular válido (10 dígitos comenzando con 3)",
    amount: "Ingresa un monto válido",
    sessionId: "Ingresa un ID de sesión válido",
    token: "Ingresa un código de 6 dígitos"
  };
  
  return messages[type] || "Campo inválido";
};