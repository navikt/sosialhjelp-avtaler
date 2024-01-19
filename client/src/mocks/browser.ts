import { RequestHandler, rest, setupWorker } from 'msw';
import { apiUrl, baseUrl } from '../api/http';
import { Kommune, OpprettAvtaleResponse, StartSigneringRequest, SigneringsstatusRequest } from '../types';

// Delay for nettverkskall. Når undefines, bruker MSW en random realistisk delay
const DELAY_MS = undefined;
const kommuner: Record<string, Kommune> = {
  '123456789': {
    orgnr: '123456789',
    navn: 'Fiktiv Kommune',
    avtaleversjon: '1.0',
    opprettet: '2022-09-12T12:07:08.487356',
  },
  '987654321': {
    orgnr: '987654321',
    navn: 'Mock kommune',
    avtaleversjon: undefined,
    opprettet: undefined,
  },
};

const kommuneMedAvtale: Record<string, OpprettAvtaleResponse> = {
  '987654321': {
    orgnr: kommuner[987654321].orgnr,
    navn: kommuner[987654321].navn,
    avtaleversjon: '1.0',
    opprettet: new Date().toISOString(),
  },
};

const handlers: RequestHandler[] = [
  rest.get<Record<string, unknown>, { orgnr: string }, Kommune>(apiUrl('/avtale/:orgnr'), (req, res, ctx) => {
    return res(ctx.delay(DELAY_MS), ctx.status(200), ctx.json(kommuner[req.params.orgnr]));
  }),
  rest.get<Record<string, unknown>, Record<string, never>, Array<Kommune>>(apiUrl('/kommuner'), (req, res, ctx) => {
    return res(ctx.delay(DELAY_MS), ctx.status(200), ctx.json(Object.values(kommuner)));
  }),
  rest.post<StartSigneringRequest, Record<string, never>, string>(apiUrl('/avtale/signer'), async (req, res, ctx) => {
    const requestBody: StartSigneringRequest = await req.json();
    return res(
      ctx.delay(DELAY_MS),
      ctx.status(200),
      ctx.json(baseUrl() + '/opprett-avtale/suksess/' + requestBody.orgnr + '?status_query_token=1234'),
    );
  }),
  rest.post<SigneringsstatusRequest, { status_query_token: '1234' }, OpprettAvtaleResponse>(
    apiUrl('/avtale/signeringsstatus'),
    async (req, res, ctx) => {
      const requestBody: SigneringsstatusRequest = await req.json();
      return res(ctx.delay(DELAY_MS), ctx.status(201), ctx.json(kommuneMedAvtale[requestBody.orgnr]));
    },
  ),
  rest.get<Record<string, unknown>, { orgnr: string }, Blob>(
    apiUrl('/avtale/signert-avtale/:orgnr'),
    (req, res, ctx) => {
      return res(ctx.delay(900), ctx.status(200), ctx.body(new Blob([''], { type: 'application/pdf' })));
    },
  ),
];

export const worker = setupWorker(...handlers);
