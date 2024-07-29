import type { HttpError } from './error';

export type Nullable<T> = T | null;

export interface Resultat<T> {
  data?: T;
  error?: HttpError;
  loading?: boolean;
}

export interface KommuneResponse {
  orgnr: string;
  navn: string;
  avtaler: AvtaleResponse[];
}

export interface AvtaleResponse {
  uuid: string;
  orgnr: string;
  navn: string;
  navnInnsender: string;
  avtaleversjon?: string;
  erSignert: boolean;
  opprettet: string;
  avtaleUrl: string;
}

export interface SigneringsstatusRequest {
  uuid: string;
  token: string;
}

export interface OpprettAvtaleResponse {
  uuid: string;
  orgnr: string;
  navn: string;
  navnInnsender: string;
  avtaleversjon: string;
  opprettet: string;
  erSignert: boolean;
  avtaleUrl: string;
}
