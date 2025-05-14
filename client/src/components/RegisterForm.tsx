import { useState } from "react";
import { User } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { validators, getValidationMessage } from "../lib/validators";
import { useFetch } from "hooks/useFetch";
import { ResultApi } from "models/api-reslt.model";
import Spinner from "./spinner";

const RegisterForm = () => {

  const { data, error, loading, fetchData } = useFetch<ResultApi>();

  const [document, setDocument] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  const [errors, setErrors] = useState({
    document: "",
    name: "",
    email: "",
    phone: ""
  });

  const validate = () => {
    const newErrors = {
      document: !validators.required(document) ? getValidationMessage("required") : 
               !validators.document(document) ? getValidationMessage("document") : "",
      name: !validators.required(name) ? getValidationMessage("required") : 
           !validators.name(name) ? getValidationMessage("name") : "",
      email: !validators.required(email) ? getValidationMessage("required") : 
            !validators.email(email) ? getValidationMessage("email") : "",
      phone: !validators.required(phone) ? getValidationMessage("required") : 
            !validators.phone(phone) ? getValidationMessage("phone") : ""
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      //onRegister(document, name, email, phone);
      // Llamar a la API usando el hook
      const result = await fetchData("http://localhost:8080/api/users/register", {
        documento: document,
        nombres: name,
        email: email,
        celular: phone,
      });

       // Manejar la respuesta
      if (!result?.success) {
        toast.error(result?.message ?? 'Ocurrió un error inesperado');
      } else if (result?.success) {
        toast.success("Cliente registrado exitosamente");
        setDocument("");
        setName("");
        setEmail("");
        setPhone("");
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto bg-wallet-light-purple p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
          <User className="h-6 w-6 text-wallet-dark-purple" />
        </div>
        <CardTitle>Registro de Cliente</CardTitle>
        <CardDescription>Ingresa tus datos personales para registrarte</CardDescription>
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
                type="text"
                placeholder="Ingresa tu número de documento"
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                className={errors.document ? "border-red-500" : ""}
              />
              {errors.document && <p className="text-xs text-red-500">{errors.document}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Nombres completos *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Ingresa tu nombre y apellido"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico *</Label>
              <Input
                id="email"
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
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
            
            <Button 
              type="submit" 
              className="w-full bg-wallet-purple hover:bg-wallet-dark-purple"
            >
              Registrarse
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default RegisterForm;