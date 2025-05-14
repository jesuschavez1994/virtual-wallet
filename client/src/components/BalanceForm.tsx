import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../components/ui/card";
import { validators, getValidationMessage } from "../lib/validators";
import { useFetch } from "hooks/useFetch";
import { ResultApiWithBalance } from "models/api-reslt.model";
import { useForm } from "hooks/useForm";
import toast from "react-hot-toast";
import Spinner from "./spinner";


const BalanceForm = () => {

  const { loading, fetchData } = useFetch<ResultApiWithBalance>();
  
  const {InputChange, resetForm, setFieldValue, documento, phone, queried} = useForm({
    documento: '',
    phone: '',
    queried: false
  });

  const [monto, setMonto] = useState<number | null>(null);
  
  const [errors, setErrors] = useState({
    document: "",
    phone: ""
  });

  const validate = () => {
    const newErrors = {
      document: !validators.required(documento) ? getValidationMessage("required") : 
               !validators.document(documento) ? getValidationMessage("document") : "",
      phone: !validators.required(phone) ? getValidationMessage("required") : 
            !validators.phone(phone) ? getValidationMessage("phone") : ""
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const result = await fetchData(
        "http://localhost:8080/api/wallets/balance", 
        {documento: documento, celular: phone}, 
        'GET'
      );


      if (!result?.success) {
         toast.error(result?.message ?? 'Ocurrió un error inesperado');
      } else if (result?.success && "balance" in result) {
         toast.success(result.message);
          setMonto(result.balance); 
          setFieldValue('queried', true);
      }
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto bg-wallet-light-purple p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
          <Search className="h-6 w-6 text-wallet-dark-purple" />
        </div>
        <CardTitle>Consultar Saldo</CardTitle>
        <CardDescription>Verifica el saldo disponible en tu billetera</CardDescription>
      </CardHeader>
      <CardContent>
        {
          loading ? ( // Mostrar el spinner mientras `loading` es true
            <div className="flex justify-center items-center h-40">
              <Spinner />
            </div>
          ) : (
        
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="document">Documento *</Label>
              <Input
                id="document"
                name="documento"
                type="text"
                placeholder="Ingresa tu número de documento"
                value={documento}
                onChange={InputChange}
                className={errors.document ? "border-red-500" : ""}
                disabled={queried}
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
                disabled={queried}
              />
              {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
            </div>
            
            {!queried ? (
              <Button 
                className="w-full bg-wallet-purple hover:bg-wallet-dark-purple"
              >
                Consultar
              </Button>
            ) : (
              <div className="space-y-4 animate-fade-in">
                {monto !== null ? (
                  <div className="text-center py-4">
                    <p className="text-gray-600 mb-2">Tu saldo es:</p>
                    <p className="text-3xl font-bold text-wallet-dark-purple">
                      {formatCurrency(monto)}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-4 text-red-500">
                    No se encontró información para los datos ingresados.
                  </div>
                )}
                
                <Button 
                  onClick={resetForm}
                  variant="outline" 
                  className="w-full"
                >
                  Nueva consulta
                </Button>
              </div>
            )}
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default BalanceForm;