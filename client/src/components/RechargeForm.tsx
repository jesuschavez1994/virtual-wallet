import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { validators, getValidationMessage } from "../lib/validators";
import { useFetch } from "hooks/useFetch";
import { ResultApi } from "models/api-reslt.model";
import { useForm } from "hooks/useForm";
import toast from "react-hot-toast";

interface RechargeFormProps {
  onRecharge: (document: string, phone: string, amount: number) => void;
}

const RechargeForm = ({ onRecharge }: RechargeFormProps) => {

  const { error, loading, fetchData } = useFetch<ResultApi>();
  
  const {InputChange, resetForm, document, phone, amount} = useForm({
    document: '',
    phone: '',
    amount: ''
  });
  
  const [errors, setErrors] = useState({
    document: "",
    phone: "",
    amount: ""
  });

  const validate = () => {
    const newErrors = {
      document: !validators.required(document) ? getValidationMessage("required") : 
               !validators.document(document) ? getValidationMessage("document") : "",
      phone: !validators.required(phone) ? getValidationMessage("required") : 
            !validators.phone(phone) ? getValidationMessage("phone") : "",
      amount: !validators.required(amount) ? getValidationMessage("required") : 
             !validators.amount(parseFloat(amount)) ? getValidationMessage("amount") : ""
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {

      const result = await fetchData("http://localhost:8080/api/wallets/load-money", {
        documento: document,
        celular: phone,
        monto: parseFloat(amount),
      });

      if (error) {
        toast.error(error);
      } else if (result?.success) {
         toast.success(result.message);
      }
      
      // Clear form on successful submission
      resetForm();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto bg-wallet-light-purple p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
          <Plus className="h-6 w-6 text-wallet-dark-purple" />
        </div>
        <CardTitle>Recargar Billetera</CardTitle>
        <CardDescription>Agrega fondos a tu billetera virtual</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="document">Documento *</Label>
            <Input
              id="document"
              name="document"
              type="text"
              placeholder="Ingresa tu número de documento"
              value={document}
              onChange={InputChange}
              className={errors.document ? "border-red-500" : ""}
            />
            {errors.document && <p className="text-xs text-red-500">{errors.document}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Número de celular *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="3XXXXXXXXX"
              value={phone}
              onChange={InputChange}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Monto a recargar *</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">$</span>
              <Input
                id="amount"
                name="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={InputChange}
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
            Recargar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RechargeForm;