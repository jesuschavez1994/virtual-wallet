import { useState } from "react";
import { CreditCard } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { validators, getValidationMessage } from "../lib/validators";
import { useFetch } from "hooks/useFetch";
import { ResultApiWithSession } from "models/api-reslt.model";
import toast from "react-hot-toast";

interface PaymentFormProps {
  onInitiatePayment: (documento: string, phone: string, amount: number) => { sessionId: string; token: string } | null;
}

const PaymentForm = ({ onInitiatePayment }: PaymentFormProps) => {

   const { error, loading, fetchData } = useFetch<ResultApiWithSession>();
   

  const [documento, setdocumento] = useState("");
  const [phone, setPhone] = useState("");
  const [monto, setAmount] = useState("");
  const [paymentInfo, setPaymentInfo] = useState<{ sessionId: string | undefined} | null>(null);
  
  const [errors, setErrors] = useState({
    documento: "",
    phone: "",
    amount: ""
  });

  const validate = () => {
    const newErrors = {
      documento: !validators.required(documento) ? getValidationMessage("required") : 
               !validators.document(documento) ? getValidationMessage("documento") : "",
      phone: !validators.required(phone) ? getValidationMessage("required") : 
            !validators.phone(phone) ? getValidationMessage("phone") : "",
      amount: !validators.required(monto) ? getValidationMessage("required") : 
             !validators.amount(parseFloat(monto)) ? getValidationMessage("amount") : ""
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // const result = onInitiatePayment(documento, phone, parseFloat(amount));
      // if (result) {
      //   setPaymentInfo(result);
      //   setAmount("");
      // }
      const result = await fetchData("http://localhost:8080/api/wallets/pay", {
        documento: documento,
        monto: monto,
        celular: phone,
      });

      if (!result?.success) {
        toast.error(result?.message ?? 'Ocurrió un error inesperado');
      } else if (result?.success) {
         toast.success(result.message);
        setPaymentInfo({ sessionId: result.sessionId });
      }
    }
  };

  const resetPayment = () => {
    setPaymentInfo(null);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto bg-wallet-light-purple p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
          <CreditCard className="h-6 w-6 text-wallet-dark-purple" />
        </div>
        <CardTitle>Realizar Pago</CardTitle>
        <CardDescription>Paga con tu billetera virtual</CardDescription>
      </CardHeader>
      <CardContent>
        {!paymentInfo ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="documento">documentoo *</Label>
              <Input
                id="documento"
                type="text"
                placeholder="Ingresa tu número de documentoo"
                value={documento}
                onChange={(e) => setdocumento(e.target.value)}
                className={errors.documento ? "border-red-500" : ""}
              />
              {errors.documento && <p className="text-xs text-red-500">{errors.documento}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Número de celular *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="3XXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Monto a pagar *</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={monto}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`pl-7 ${errors.amount ? "border-red-500" : ""}`}
                  min="0"
                />
              </div>
              {errors.amount && <p className="text-xs text-red-500">{errors.amount}</p>}
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-wallet-purple hover:bg-wallet-dark-purple"
            >
              Iniciar Pago
            </Button>
          </form>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <Alert className="bg-green-50 text-green-800 border-green-300">
              <AlertDescription>
                Se ha enviado un código de confirmación a tu correo electrónico.
              </AlertDescription>
            </Alert>
            
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
              <div className="mb-2">
                <span className="text-sm text-gray-500">ID de sesión:</span>
              </div>
              <p className="font-mono text-lg font-medium break-all">{paymentInfo.sessionId}</p>
              <p className="text-xs mt-2 text-gray-500">
                Guarda este ID de sesión para confirmar tu pago
              </p>
            </div>
            
            {/* In a real application, we would NOT show the token here */}
            {/* This is only for demonstration purposes */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
              <div className="mb-2">
                <span className="text-sm text-gray-500">Código (Demo):</span>
              </div>
              {/* <p className="font-mono text-lg font-medium">{paymentInfo.token}</p> */}
              {/* <p className="text-xs mt-2 text-gray-500">
                En una aplicación real, este código se enviaría por email
              </p> */}
            </div>
            
            <Button 
              onClick={resetPayment}
              variant="outline" 
              className="w-full"
            >
              Iniciar otro pago
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentForm;