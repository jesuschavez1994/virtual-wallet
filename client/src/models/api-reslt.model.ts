export interface ResultApi{
  code: string
  message: string
  success: boolean;
}

// Variante que incluye `balance`
export interface ResultApiWithBalance extends ResultApi {
  balance: number;
}

// Variante que incluye `sessionId`
export interface ResultApiWithSession extends ResultApi {
  sessionId?: string;
}