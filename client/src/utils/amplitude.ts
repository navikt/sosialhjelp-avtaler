import amplitude from 'amplitude-js'

export enum skjemanavn {
  SKJEMANAVN_ENDRE = 'Endre avtale',
  SKJEMANAVN_OPPRETT = 'Opprett avtale',
}

export enum amplitude_taxonomy {
  SKJEMA_START = 'skjema startet',
  SKJEMA_ÅPEN = 'skjema åpnet',
  SKJEMASTEG_FULLFØRT = 'skjemasteg fullført',
  SKJEMAVALIDERING_FEILET = 'skjemavalidering feilet',
  SKJEMAINNSENDING_FEILET = 'skjemainnsending feilet',
  SKJEMA_FULLFØRT = 'skjema fullført',
  NAVIGERE = 'navigere',
}
export const initAmplitude = () => {
  if (amplitude) {
    amplitude.getInstance().init('default', '', {
      apiEndpoint: 'amplitude.nav.no/collect-auto',
      saveEvents: false,
      includeUtm: true,
      includeReferrer: true,
      platform: window.location.toString(),
    })
  }
}

export function logAmplitudeEvent(eventName: string, data?: any) {
  setTimeout(() => {
    data = {
      app: 'sosialhjelp-avtaler',
      team: 'teamdigisos',
      ...data,
    }
    try {
      if (amplitude) {
        amplitude.getInstance().logEvent(eventName, data)
      }
    } catch (error) {
      console.error(error)
    }
  })
}

export function logSkjemaStartet(id: string, skjemanavn: skjemanavn) {
  logAmplitudeEvent(amplitude_taxonomy.SKJEMA_START, {
    skjemanavn: skjemanavn,
    skjemaId: id,
  })
}

export function logSkjemaFullført(id: string, skjemanavn: skjemanavn) {
  logAmplitudeEvent(amplitude_taxonomy.SKJEMA_FULLFØRT, {
    skjemanavn: skjemanavn,
    skjemaId: id,
  })
}

export function logNavigering(destinasjon: string, lenketekst: string) {
  logAmplitudeEvent(amplitude_taxonomy.SKJEMAVALIDERING_FEILET, {
    destinasjon: destinasjon,
    lenketekst: lenketekst,
  })
}

//Events som ikke er i NAV sin taxonomi
export enum digihot_customevents {}
