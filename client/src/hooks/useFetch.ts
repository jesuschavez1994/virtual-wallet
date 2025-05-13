import { useState } from "react";

interface UseFetchResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  fetchData: (url: string, body?: any, method?: string) => Promise<void>;
}

export const useFetch = <T>(): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (url: string, body?: any, method: string = "POST") => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData };
};