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
  navn: string;
  avtaleversjon?: string;
  erSignert: boolean;
  opprettet: string;
}

export interface StartSigneringRequest {
  uuid: string;
}

export interface SigneringsstatusRequest {
  uuid: string;
  token: string;
}

export interface OpprettAvtaleResponse {
  uuid: string;
  navn: string;
  avtaleversjon: string;
  opprettet: string;
  erSignert: boolean;
}
