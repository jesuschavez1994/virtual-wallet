"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { toast } from "./ui/use-toast"
import { Wallet, CreditCard, UserPlus, ShoppingCart, CheckCircle, DollarSign } from "lucide-react"
import { useFetch } from "hooks/useFetch"

interface ResultApi{
  code: string
  message: string
  success: boolean
}

// Define types for our forms
type Client = {
  document: string
  name: string
  email: string
  phone: string
}

type RechargeData = {
  document: string
  phone: string
  amount: string
}

type PaymentData = {
  document: string
  phone: string
  amount: string
}

type ConfirmPaymentData = {
  sessionId: string
  token: string
}

type BalanceData = {
  document: string
  phone: string
}

export default function VirtualWallet() {
  const { data, error, loading, fetchData } = useFetch<ResultApi>();
  // State for each form
  const [client, setClient] = useState<Client>({ document: "", name: "", email: "", phone: "" })
  const [rechargeData, setRechargeData] = useState<RechargeData>({ document: "", phone: "", amount: "" })
  const [paymentData, setPaymentData] = useState<PaymentData>({ document: "", phone: "", amount: "" })
  const [confirmPaymentData, setConfirmPaymentData] = useState<ConfirmPaymentData>({ sessionId: "", token: "" })
  const [balanceData, setBalanceData] = useState<BalanceData>({ document: "", phone: "" })

  // State for responses
  const [response, setResponse] = useState<string>("")
  const [sessionId, setSessionId] = useState<string>("")
  const [balance, setBalance] = useState<string>("")

  // Handle client registration
  const handleRegisterClient = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que todos los campos estén llenos
    if (!client.document || !client.name || !client.email || !client.phone) {
      toast({
        title: "Error",
        description: "Todos los campos son requeridos",
        variant: "destructive",
      });
      return;
    }

    // Llamar a la API usando el hook
    await fetchData("http://localhost:8080/api/users/register", {
      documento: client.document,
      nombres: client.name,
      email: client.email,
      celular: client.phone,
    });

    console.log('DATA', data);

    // Manejar la respuesta
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    } else if (data?.success) {
      setResponse("Cliente registrado exitosamente");
      toast({
        title: "Éxito",
        description: "Cliente registrado exitosamente",
        variant: "default",

      });
    }
  };

  // Handle wallet recharge
  const handleRechargeWallet = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields are filled
    if (!rechargeData.document || !rechargeData.phone || !rechargeData.amount) {
      toast({
        title: "Error",
        description: "Todos los campos son requeridos",
        variant: "destructive",
      })
      return
    }

    // Here you would make the API call to recharge the wallet
    // For now, we'll simulate a successful response
    setResponse(`Recarga exitosa de $${rechargeData.amount}`)
    toast({
      title: "Éxito",
      description: `Recarga exitosa de $${rechargeData.amount}`,
    })
  }

  // Handle payment
  const handleMakePayment = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields are filled
    if (!paymentData.document || !paymentData.phone || !paymentData.amount) {
      toast({
        title: "Error",
        description: "Todos los campos son requeridos",
        variant: "destructive",
      })
      return
    }

    // Here you would make the API call to initiate payment
    // For now, we'll simulate a successful response with a session ID
    const mockSessionId = "SESS" + Math.floor(Math.random() * 1000000)
    setSessionId(mockSessionId)
    setResponse(`Se ha enviado un token de confirmación a su correo. ID de sesión: ${mockSessionId}`)
    toast({
      title: "Información",
      description: "Se ha enviado un token de confirmación a su correo",
    })
  }

  // Handle payment confirmation
  const handleConfirmPayment = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields are filled
    if (!confirmPaymentData.sessionId || !confirmPaymentData.token) {
      toast({
        title: "Error",
        description: "Todos los campos son requeridos",
        variant: "destructive",
      })
      return
    }

    // Here you would make the API call to confirm payment
    // For now, we'll simulate a successful response
    setResponse("Pago confirmado exitosamente")
    toast({
      title: "Éxito",
      description: "Pago confirmado exitosamente",
    })
  }

  // Handle balance check
  const handleCheckBalance = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields are filled
    if (!balanceData.document || !balanceData.phone) {
      toast({
        title: "Error",
        description: "Todos los campos son requeridos",
        variant: "destructive",
      })
      return
    }

    // Here you would make the API call to check balance
    // For now, we'll simulate a successful response
    const mockBalance = Math.floor(Math.random() * 1000000)
    setBalance(`$${mockBalance}`)
    setResponse(`Su saldo actual es: $${mockBalance}`)
    toast({
      title: "Información",
      description: `Su saldo actual es: $${mockBalance}`,
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 flex items-center justify-center">
        <Wallet className="mr-2" /> Billetera Virtual
      </h1>

      <Tabs defaultValue="register" className="max-w-3xl mx-auto">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="register" className="flex items-center">
            <UserPlus className="mr-2 h-4 w-4" /> Registro
          </TabsTrigger>
          <TabsTrigger value="recharge" className="flex items-center">
            <CreditCard className="mr-2 h-4 w-4" /> Recargar
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center">
            <ShoppingCart className="mr-2 h-4 w-4" /> Pagar
          </TabsTrigger>
          <TabsTrigger value="confirm" className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4" /> Confirmar
          </TabsTrigger>
          <TabsTrigger value="balance" className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4" /> Saldo
          </TabsTrigger>
        </TabsList>

        {/* Register Client Form */}
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Registro de Cliente</CardTitle>
              <CardDescription>Ingrese sus datos para registrarse en el sistema</CardDescription>
            </CardHeader>
            <form onSubmit={handleRegisterClient}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="document">Documento</Label>
                  <Input
                    id="document"
                    placeholder="Ingrese su documento"
                    value={client.document}
                    onChange={(e) => setClient({ ...client, document: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Nombres</Label>
                  <Input
                    id="name"
                    placeholder="Ingrese su nombre completo"
                    value={client.name}
                    onChange={(e) => setClient({ ...client, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Ingrese su correo electrónico"
                    value={client.email}
                    onChange={(e) => setClient({ ...client, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Celular</Label>
                  <Input
                    id="phone"
                    placeholder="Ingrese su número de celular"
                    value={client.phone}
                    onChange={(e) => setClient({ ...client, phone: e.target.value })}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Registrar Cliente
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Recharge Wallet Form */}
        <TabsContent value="recharge">
          <Card>
            <CardHeader>
              <CardTitle>Recargar Billetera</CardTitle>
              <CardDescription>Ingrese los datos para recargar su billetera</CardDescription>
            </CardHeader>
            <form onSubmit={handleRechargeWallet}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recharge-document">Documento</Label>
                  <Input
                    id="recharge-document"
                    placeholder="Ingrese su documento"
                    value={rechargeData.document}
                    onChange={(e) => setRechargeData({ ...rechargeData, document: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recharge-phone">Celular</Label>
                  <Input
                    id="recharge-phone"
                    placeholder="Ingrese su número de celular"
                    value={rechargeData.phone}
                    onChange={(e) => setRechargeData({ ...rechargeData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recharge-amount">Valor a Recargar</Label>
                  <Input
                    id="recharge-amount"
                    type="number"
                    placeholder="Ingrese el monto a recargar"
                    value={rechargeData.amount}
                    onChange={(e) => setRechargeData({ ...rechargeData, amount: e.target.value })}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Recargar Billetera
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Make Payment Form */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Realizar Pago</CardTitle>
              <CardDescription>Ingrese los datos para realizar un pago</CardDescription>
            </CardHeader>
            <form onSubmit={handleMakePayment}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-document">Documento</Label>
                  <Input
                    id="payment-document"
                    placeholder="Ingrese su documento"
                    value={paymentData.document}
                    onChange={(e) => setPaymentData({ ...paymentData, document: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-phone">Celular</Label>
                  <Input
                    id="payment-phone"
                    placeholder="Ingrese su número de celular"
                    value={paymentData.phone}
                    onChange={(e) => setPaymentData({ ...paymentData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-amount">Valor a Pagar</Label>
                  <Input
                    id="payment-amount"
                    type="number"
                    placeholder="Ingrese el monto a pagar"
                    value={paymentData.amount}
                    onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                  />
                </div>
                {sessionId && (
                  <div className="p-4 bg-muted rounded-md">
                    <p className="font-medium">ID de Sesión: {sessionId}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Se ha enviado un token de 6 dígitos a su correo electrónico. Use este ID de sesión y el token para
                      confirmar su pago.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Iniciar Pago
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Confirm Payment Form */}
        <TabsContent value="confirm">
          <Card>
            <CardHeader>
              <CardTitle>Confirmar Pago</CardTitle>
              <CardDescription>Ingrese el ID de sesión y el token recibido por correo</CardDescription>
            </CardHeader>
            <form onSubmit={handleConfirmPayment}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="session-id">ID de Sesión</Label>
                  <Input
                    id="session-id"
                    placeholder="Ingrese el ID de sesión"
                    value={confirmPaymentData.sessionId}
                    onChange={(e) => setConfirmPaymentData({ ...confirmPaymentData, sessionId: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="token">Token</Label>
                  <Input
                    id="token"
                    placeholder="Ingrese el token de 6 dígitos"
                    value={confirmPaymentData.token}
                    onChange={(e) => setConfirmPaymentData({ ...confirmPaymentData, token: e.target.value })}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Confirmar Pago
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Check Balance Form */}
        <TabsContent value="balance">
          <Card>
            <CardHeader>
              <CardTitle>Consultar Saldo</CardTitle>
              <CardDescription>Ingrese sus datos para consultar el saldo de su billetera</CardDescription>
            </CardHeader>
            <form onSubmit={handleCheckBalance}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="balance-document">Documento</Label>
                  <Input
                    id="balance-document"
                    placeholder="Ingrese su documento"
                    value={balanceData.document}
                    onChange={(e) => setBalanceData({ ...balanceData, document: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="balance-phone">Celular</Label>
                  <Input
                    id="balance-phone"
                    placeholder="Ingrese su número de celular"
                    value={balanceData.phone}
                    onChange={(e) => setBalanceData({ ...balanceData, phone: e.target.value })}
                  />
                </div>
                {balance && (
                  <div className="p-4 bg-muted rounded-md text-center">
                    <p className="text-sm text-muted-foreground">Su saldo actual es:</p>
                    <p className="text-2xl font-bold">{balance}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Consultar Saldo
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Response Display */}
      {response && (
        <div className="max-w-3xl mx-auto mt-8 p-4 bg-muted rounded-md">
          <h3 className="font-medium mb-2">Respuesta del Sistema:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  )
}
