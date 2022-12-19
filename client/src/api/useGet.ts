import { useErrorHandler } from 'react-error-boundary';
import useSWR, { BareFetcher, Fetcher, SWRResponse } from 'swr';
import type { HttpError } from '../error';
import { http } from './http';

export function useGet<T>(url: string | null): SWRResponse<T, HttpError> {
  const result = useSWR<T, HttpError>(url);
  useErrorHandler(result.error);
  return result;
}

export function useGetDocument(url: string | null): SWRResponse<Blob, HttpError> {
  const result = useSWR<Blob, HttpError>(url, http.getDocument);
  useErrorHandler(result.error);
  return result;
}
