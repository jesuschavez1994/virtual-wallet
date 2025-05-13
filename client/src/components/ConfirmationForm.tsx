import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { validators, getValidationMessage } from "../lib/validators";

interface ConfirmationFormProps {
  onConfirmPayment: (sessionId: string, token: string) => boolean;
}

const ConfirmationForm = ({ onConfirmPayment }: ConfirmationFormProps) => {
  const [sessionId, setSessionId] = useState("");
  const [token, setToken] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  
  const [errors, setErrors] = useState({
    sessionId: "",
    token: ""
  });

  const validate = () => {
    const newErrors = {
      sessionId: !validators.required(sessionId) ? getValidationMessage("required") : 
                !validators.sessionId(sessionId) ? getValidationMessage("sessionId") : "",
      token: !validators.required(token) ? getValidationMessage("required") : 
            !validators.token(token) ? getValidationMessage("token") : ""
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const success = onConfirmPayment(sessionId, token);
      if (success) {
        setConfirmed(true);
        setSessionId("");
        setToken("");
        
        // Reset the confirmed state after a delay
        setTimeout(() => {
          setConfirmed(false);
        }, 3000);
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto bg-wallet-light-purple p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
          <CheckCircle className="h-6 w-6 text-wallet-dark-purple" />
        </div>
        <CardTitle>Confirmar Pago</CardTitle>
        <CardDescription>Ingresa el ID de sesión y el código recibido</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sessionId">ID de Sesión *</Label>
            <Input
              id="sessionId"
              type="text"
              placeholder="Ingresa el ID de sesión recibido"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
              className={errors.sessionId ? "border-red-500" : ""}
            />
            {errors.sessionId && <p className="text-xs text-red-500">{errors.sessionId}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="token">Código de confirmación *</Label>
            <Input
              id="token"
              type="text"
              placeholder="Código de 6 dígitos"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              maxLength={6}
              className={errors.token ? "border-red-500" : ""}
            />
            {errors.token && <p className="text-xs text-red-500">{errors.token}</p>}
          </div>
          
          <Button 
            type="submit" 
            className={`w-full transition-all duration-300 ${
              confirmed 
              ? "bg-green-500 hover:bg-green-600" 
              : "bg-wallet-purple hover:bg-wallet-dark-purple"
            }`}
            disabled={confirmed}
          >
            {confirmed ? "¡Pago Confirmado!" : "Confirmar Pago"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ConfirmationForm;