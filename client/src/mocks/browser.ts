import { http, HttpResponse, delay, RequestHandler } from 'msw';
import { setupWorker } from 'msw/browser';
import { apiUrl, baseUrl } from '../api/http';
import { AvtaleResponse, KommuneResponse } from '../types';

// Delay for nettverkskall. Når undefines, bruker MSW en random realistisk delay
const DELAY_MS = undefined;

const avtaler: Record<string, AvtaleResponse[]> = {
  '123456789': [
    {
      uuid: '25deec70-1904-4c3e-9a6f-2d69d1d91bce',
      navn: 'NKS-avtale',
      navnInnsender: 'mr. cool',
      avtaleversjon: '1.0',
      opprettet: new Date().toISOString(),
      erSignert: true,
      avtaleUrl: '',
      orgnr: '123456789',
    },
    {
      uuid: '3d4e3d11-0365-4f8d-91b6-a281ccdb314d',
      navn: 'Ny databehandleravtale',
      navnInnsender: 'mr. cool',
      avtaleversjon: '1.0',
      opprettet: new Date().toISOString(),
      erSignert: true,
      avtaleUrl: '',
      orgnr: '123456789',
    },
  ],
  '987654321': [
    {
      uuid: 'f39a8512-c5df-459f-b6e2-504785f0e123',
      navn: 'NKS-avtale',
      navnInnsender: 'mr. cool',
      avtaleversjon: '1.0',
      opprettet: new Date().toISOString(),
      erSignert: true,
      avtaleUrl: '',
      orgnr: '987654321',
    },
    {
      uuid: '8638709e-18f3-4dbc-95f7-4fe219560942',
      navn: 'Ny databehandleravtale',
      navnInnsender: 'mr. cool',
      avtaleversjon: '1.0',
      opprettet: new Date().toISOString(),
      erSignert: false,
      avtaleUrl: '',
      orgnr: '987654321',
    },
  ],
};

const kommuner: Record<string, KommuneResponse> = {
  '123456789': {
    orgnr: '123456789',
    navn: 'Oslo kommune',
    avtaler: avtaler['123456789'],
  },
  '987654321': {
    orgnr: '987654321',
    navn: 'Lørenskog kommune',
    avtaler: avtaler['987654321'],
  },
};

const handlers: RequestHandler[] = [
  http.get<{ uuid: string }>(apiUrl('/avtale/:uuid'), async (req) => {
    const etterspurtAvtale = Object.values(avtaler)
      .flat()
      .find((avtale) => avtale.uuid === req.params.uuid);
    await delay(DELAY_MS);
    if (!etterspurtAvtale) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(etterspurtAvtale);
  }),
  http.get(apiUrl('/avtale'), async () => {
    await delay(DELAY_MS);
    return HttpResponse.json(Object.values(kommuner));
  }),
  http.post(apiUrl('/avtale/:uuid/signer'), async (req) => {
    const uuid = req.params.uuid;
    await delay(DELAY_MS);
    return HttpResponse.json(baseUrl() + '/opprett-avtale/suksess/' + uuid + '?status_query_token=1234');
  }),
  http.post(apiUrl('/avtale/signeringsstatus'), async () => {
    await delay(DELAY_MS);
    return HttpResponse.json(avtaler['123456789'][0], { status: 201 });
  }),
  http.get(apiUrl('/avtale/signert-avtale/:orgnr'), async () => {
    await delay(900);
    return new HttpResponse(new Blob([''], { type: 'application/pdf' }));
  }),
  http.get<{ orgnr: string }>(apiUrl('/kommuner/:orgnr'), async (req) => {
    const kommune = kommuner[req.params.orgnr];
    await delay(900);
    return HttpResponse.json({ kommunenavn: kommune.navn });
  }),
];

// @ts-expect-error Noe rart med typene her, men det funker.
export const worker = setupWorker(...handlers);
