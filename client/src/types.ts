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

export interface HentKommunerResponse extends Array<Kommune> {}

export interface HentKommuneResponse extends Kommune {}

export interface OpprettAvtaleRequest {
  orgnr: string;
}

export interface OpprettAvtaleResponse extends Kommune {}
