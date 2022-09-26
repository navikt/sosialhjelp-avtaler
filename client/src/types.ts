import type { HttpError } from './error';

export type Nullable<T> = T | null;
export type Maybe<T> = T | undefined;

export interface Resultat<T> {
  data?: T;
  error?: HttpError;
  loading?: boolean;
}

export interface Virksomhet {
  orgnr: string;
  navn: string;
  aktiv: boolean;
  epost?: string;
  avtaleversjon?: string;
  opprettet?: string;
  oppdatert?: string;
}

export interface Avtale {
  tittel: string;
}

export interface HentVirksomheterResponse extends Array<Virksomhet> {}

export interface HentVirksomhetResponse extends Virksomhet {}

export interface OpprettAvtaleRequest {
  orgnr: string;
  epost: string;
}

export interface OpprettAvtaleResponse extends Virksomhet {}

export interface OppdaterAvtaleRequest {
  epost: string;
}

export interface OppdaterAvtaleResponse extends Virksomhet {}
