import { useState } from "react";

interface UseFetchResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  fetchData: (url: string, body?: any, method?: string) => Promise<T | undefined>;
}

export const useFetch = <T>(): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (url: string, body?: any, method: string = "POST") => {
    setLoading(true);
    setError(null);

    try {
     
      // Si el método es GET, agrega los parámetros a la URL
      const finalUrl = method === "GET" && body 
          ? `${url}?${new URLSearchParams(body).toString()}` 
          : url;

      const response = await fetch(finalUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: method !== "GET" && method !== "HEAD" ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result: T  = await response.json();
      setData(result);
      return result; // Devuelve el resultado directamente
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData };
};