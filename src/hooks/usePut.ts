// hooks/usePut.ts
import { useState } from 'react';

const usePut = (url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (data: any, options?: {
    onSuccess?: (response: any) => void;
    onError?: (error: Error) => void;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      options?.onSuccess?.(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      options?.onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
};

export default usePut;