import amplitude from 'amplitude-js';

export enum skjemanavn {
  SKJEMANAVN_OPPRETT_AVTALE = 'Opprett avtale',
}

//https://github.com/navikt/analytics-taxonomy/tree/main/events/
export enum amplitude_taxonomy {
  SKJEMA_START = 'skjema startet',
  SKJEMA_ÅPEN = 'skjema åpnet',
  SKJEMASTEG_FULLFØRT = 'skjemasteg fullført',
  SKJEMAVALIDERING_FEILET = 'skjemavalidering feilet',
  SKJEMAINNSENDING_FEILET = 'skjemainnsending feilet',
  SKJEMA_FULLFØRT = 'skjema fullført',
  NAVIGERE = 'navigere',
  LAST_NED = 'last ned',
}
export const initAmplitude = () => {
  if (amplitude) {
    amplitude.getInstance().init('default', '', {
      apiEndpoint: 'amplitude.nav.no/collect-auto',
      saveEvents: false,
      includeUtm: true,
      includeReferrer: true,
      platform: window.location.toString(),
    });
  }
};

export function logAmplitudeEvent(eventName: string, data?: any) {
  setTimeout(() => {
    data = {
      app: 'sosialhjelp-avtaler',
      team: 'teamdigisos',
      ...data,
    };
    try {
      if (amplitude) {
        amplitude.getInstance().logEvent(eventName, data);
      }
    } catch (error) {
      console.error(error);
    }
  });
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
  logAmplitudeEvent(amplitude_taxonomy.SKJEMA_FULLFØRT, {
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

export function logLastNed(type: string, tema: string, tittel: string) {
  logAmplitudeEvent(amplitude_taxonomy.NAVIGERE, {
    type: type,
    tema: tema,
    tittel: tittel,
  });
}
