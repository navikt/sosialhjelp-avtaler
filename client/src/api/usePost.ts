import { useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { http } from './http';
import { Resultat } from '../types';

export function usePost<B, T>(url: string): { post(body?: B): Promise<void> } & Resultat<T> {
  const [resultat, setResultat] = useState<Resultat<T>>({});
  const [loading, setLoading] = useState(false);
  const { showBoundary } = useErrorBoundary();
  if (resultat.error) {
    showBoundary(resultat.error);
  }
  return {
    async post(body) {
      setLoading(true);
      const res = await http.request<B, T>(url, 'post', body);
      setLoading(false);
      setResultat(res);
    },
    ...resultat,
    loading,
  };
}
