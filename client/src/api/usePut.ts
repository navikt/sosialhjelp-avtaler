import { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { http } from './http';
import { Resultat } from '../types';

export function usePut<B, T>(url: string): { put(body: B): Promise<void> } & Resultat<T> {
  const [resultat, setResultat] = useState<Resultat<T>>({});
  const [loading, setLoading] = useState(false);
  useErrorHandler(resultat.error);
  return {
    async put(body) {
      setLoading(true);
      const res = await http.request<B, T>(url, 'put', body);
      setLoading(false);
      setResultat(res);
    },
    ...resultat,
    loading,
  };
}
