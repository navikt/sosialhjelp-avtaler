import { RequestHandler, rest, setupWorker } from 'msw';
import { apiUrl, baseUrl } from '../api/http';
import { AvtaleResponse, StartSigneringRequest, KommuneResponse } from '../types';

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
    },
    {
      uuid: '3d4e3d11-0365-4f8d-91b6-a281ccdb314d',
      navn: 'Ny databehandleravtale',
      navnInnsender: 'mr. cool',
      avtaleversjon: '1.0',
      opprettet: new Date().toISOString(),
      erSignert: true,
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
    },
    {
      uuid: '8638709e-18f3-4dbc-95f7-4fe219560942',
      navn: 'Ny databehandleravtale',
      navnInnsender: 'mr. cool',
      avtaleversjon: '1.0',
      opprettet: new Date().toISOString(),
      erSignert: false,
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
  rest.get<Record<string, unknown>, { uuid: string }, AvtaleResponse>(apiUrl('/avtale/:uuid'), (req, res, ctx) => {
    const etterspurtAvtale = Object.values(avtaler)
      .flat()
      .find((avtale) => avtale.uuid === req.params.uuid);
    if (!etterspurtAvtale) {
      return res(ctx.delay(DELAY_MS), ctx.status(404));
    }
    return res(ctx.delay(DELAY_MS), ctx.status(200), ctx.json(etterspurtAvtale));
  }),
  rest.get<Record<string, unknown>, Record<string, never>, Array<KommuneResponse>>(
    apiUrl('/avtale'),
    (req, res, ctx) => {
      return res(ctx.delay(DELAY_MS), ctx.status(200), ctx.json(Object.values(kommuner)));
    },
  ),
  rest.post<StartSigneringRequest, Record<string, never>, string>(apiUrl('/avtale/signer'), async (req, res, ctx) => {
    const requestBody: StartSigneringRequest = await req.json();
    return res(
      ctx.delay(DELAY_MS),
      ctx.status(200),
      ctx.json(baseUrl() + '/opprett-avtale/suksess/' + requestBody.uuid + '?status_query_token=1234'),
    );
  }),
  // rest.post<SigneringsstatusRequest, { status_query_token: '1234' }, OpprettAvtaleResponse>(
  //   apiUrl('/avtale/signeringsstatus'),
  //   async (req, res, ctx) => {
  //     const requestBody: SigneringsstatusRequest = await req.json();
  //     return res(ctx.delay(DELAY_MS), ctx.status(201), ctx.json(kommuneMedAvtale[requestBody.orgnr]));
  //   }
  // ),
  rest.get<Record<string, unknown>, { orgnr: string }, Blob>(
    apiUrl('/avtale/signert-avtale/:orgnr'),
    (req, res, ctx) => {
      return res(ctx.delay(900), ctx.status(200), ctx.body(new Blob([''], { type: 'application/pdf' })));
    },
  ),
  rest.post<string, never, string>(apiUrl('/masse-signer'), async (req, res, ctx) => {
    return res(ctx.delay(500), ctx.status(201));
  }),
];

export const worker = setupWorker(...handlers);
