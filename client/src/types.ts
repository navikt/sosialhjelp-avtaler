import type { HttpError } from './error';

export type Nullable<T> = T | null;
export type Maybe<T> = T | undefined;

export interface Resultat<T> {
  data?: T;
  error?: HttpError;
  loading?: boolean;
}

export interface Kommune {
  orgnr: string;
  navn: string;
  avtaleversjon?: string;
  opprettet?: string;
}

export interface StartSigneringRequest {
  orgnr: string;
}

export interface SigneringsstatusRequest {
  orgnr: string;
  status: 'SUKSESS' | 'FEIL';
  token: string;
}

export interface OpprettAvtaleResponse {
  orgnr: string;
  navn: string;
  avtaleversjon: string;
  opprettet: string;
  dokumentStatus: DokumentStatus | undefined;
}

enum DokumentStatus {
  SUKSESS = 'SUKSESS',
  ERROR = 'ERROR',
}
