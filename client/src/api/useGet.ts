import { useErrorBoundary } from 'react-error-boundary';
import useSWR, { SWRResponse } from 'swr';
import type { HttpError } from '../error';

export function useGet<T>(url: string | null): SWRResponse<T, HttpError> {
  const result = useSWR<T, HttpError>(url, {});
  const { showBoundary } = useErrorBoundary();
  if (result.error) {
    showBoundary(result.error);
  }
  return result;
}
