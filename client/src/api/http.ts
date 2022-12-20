import { HttpError } from '../error';
import type { Resultat } from '../types';

export function baseUrl(url = '') {
  if (process.env.NODE_ENV === 'production') {
    return `/sosialhjelp/avtaler${url}`;
  } else {
    return url;
  }
}

export function apiUrl(url: string) {
  return baseUrl(`/api${url}`);
}

export const http = {
  async get<T>(path: string): Promise<T> {
    try {
      const url = apiUrl(path);
      const response = await fetch(url, {
        method: 'get',
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
        },
      });
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(HttpError.kallFeilet(url, response));
    } catch (err: unknown) {
      return Promise.reject(HttpError.wrap(err));
    }
  },
  async getDocument(path: string): Promise<Blob> {
    try {
      const url = apiUrl(path);
      console.log('getDocument', url);
      const response = await fetch(url, {
        method: 'get',
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
        },
      });
      if (response.ok) {
        console.log('response ok');
        return response.blob();
      }
      return Promise.reject(HttpError.kallFeilet(url, response));
    } catch (err: unknown) {
      return Promise.reject(HttpError.wrap(err));
    }
  },
  async request<B, T>(path: string, body: B, method: string): Promise<Resultat<T>> {
    try {
      const url = apiUrl(path);
      const response = await fetch(url, {
        method,
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const data = await response.json();
        return { data };
      }
      return {
        error: HttpError.kallFeilet(url, response),
      };
    } catch (err: unknown) {
      return {
        error: HttpError.wrap(err),
      };
    }
  },
};
