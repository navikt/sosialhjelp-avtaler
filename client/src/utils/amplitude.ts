import { logAnalyticsEvent as logDekoratoren } from '@navikt/nav-dekoratoren-moduler';
import type { EventName } from '@navikt/nav-dekoratoren-moduler';

export enum skjemanavn {
  SKJEMANAVN_OPPRETT_AVTALE = 'Opprett avtale',
}

//https://github.com/navikt/analytics-taxonomy/tree/main/events/
export enum amplitude_taxonomy {
  SKJEMA_START = 'skjema startet',
  SKJEMA_ÅPEN = 'skjema åpnet',
  SKJEMASTEG_FULLFØRT = 'skjema steg fullført',
  SKJEMAVALIDERING_FEILET = 'skjema validering feilet',
  SKJEMAINNSENDING_FEILET = 'skjema innsending feilet',
  SKJEMA_FULLFØRT = 'skjema fullført',
  NAVIGERE = 'navigere',
  LAST_NED = 'last ned',
}

export function logAmplitudeEvent(eventName: EventName, data?: Record<string, unknown>) {
  try {
    logDekoratoren({
      origin: 'sosialhjelpAvtaler',
      eventName,
      // eventData merges caller data with skjemaId; cast needed as PropertiesFor<TName> is per-event strict
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      eventData: { ...data, skjemaId: 'sosialhjelpAvtaler' } as any,
    });
  } catch (error) {
    console.log(`Kunne ikke logge til amplitude: ${error}`);
  }
}

export function logSkjemaStartet(id: string) {
  logAmplitudeEvent(amplitude_taxonomy.SKJEMA_START, {
    skjemanavn: skjemanavn.SKJEMANAVN_OPPRETT_AVTALE,
    skjemaId: id,
  });
}

export function logSkjemaFullført(id: string) {
  logAmplitudeEvent(amplitude_taxonomy.SKJEMA_FULLFØRT, {
    skjemanavn: skjemanavn.SKJEMANAVN_OPPRETT_AVTALE,
    skjemaId: id,
  });
}
export function logSkjemaStegFullført(id: string, steg: number) {
  logAmplitudeEvent(amplitude_taxonomy.SKJEMASTEG_FULLFØRT, {
    skjemanavn: skjemanavn.SKJEMANAVN_OPPRETT_AVTALE,
    skjemaId: id,
    steg: steg,
  });
}

export function logSkjemaInnsendingFeilet(id: string, skjemanavn: skjemanavn) {
  logAmplitudeEvent(amplitude_taxonomy.SKJEMAINNSENDING_FEILET, {
    skjemanavn: skjemanavn,
    skjemaId: id,
  });
}

export function logNavigering(destinasjon: string, lenketekst: string) {
  logAmplitudeEvent(amplitude_taxonomy.NAVIGERE, {
    destinasjon: destinasjon,
    lenketekst: lenketekst,
  });
}

export function logLastNedAvtale(urlLastetNedFra: string) {
  logAmplitudeEvent(amplitude_taxonomy.LAST_NED, {
    type: 'avtaledokument',
    tema: 'Avtale mellom kommune og Arbeids- og velferdsdirektoratet',
    tittel: 'Avtale om innsynsflate NKS',
    urlLastetNedFra: urlLastetNedFra,
  });
}
