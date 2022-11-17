import { RequestHandler, rest, setupWorker } from 'msw';
import { apiUrl } from '../api/http';
import {
  Kommune,
  HentKommunerResponse,
  OpprettAvtaleResponse,
  StartSigneringRequest,
  SigneringsstatusRequest,
} from '../types';

// Delay for nettverkskall. Når undefines, bruker MSW en random realistisk delay
const DELAY_MS = undefined;
const kommuner: Record<string, Kommune> = {
  '123456789': {
    orgnr: '12345678',
    navn: 'Norges Beste Kommune',
    avtaleversjon: '1.0',
    opprettet: '2022-09-12T12:07:08.487356',
  },
  '987654321': {
    orgnr: '987654321',
    navn: 'Norges Tregeste kommune',
    avtaleversjon: undefined,
    opprettet: undefined,
  },
};

const kommuneMedAvtale: Record<string, OpprettAvtaleResponse> = {
  '987654321': {
    orgnr: '987654321',
    navn: 'Norges Tregeste kommune',
    avtaleversjon: '1.0',
    opprettet: '4. januar',
  },
};

const handlers: RequestHandler[] = [
  rest.get<{}, { orgnr: string }, Kommune>(apiUrl('/avtale/:orgnr'), (req, res, ctx) => {
    return res(ctx.delay(DELAY_MS), ctx.status(200), ctx.json(kommuner[req.params.orgnr]));
  }),
  rest.get<{}, {}, HentKommunerResponse>(apiUrl('/kommuner'), (req, res, ctx) => {
    return res(ctx.delay(DELAY_MS), ctx.status(200), ctx.json(Object.values(kommuner)));
  }),
  rest.post<StartSigneringRequest, {}, string>(apiUrl('/avtale/signer'), async (req, res, ctx) => {
    const requestBody: StartSigneringRequest = await req.json();
    return res(
      ctx.delay(DELAY_MS),
      ctx.status(200),
      ctx.json('/sosialhjelp/avtaler/opprett-avtale/suksess/' + requestBody.orgnr + '?status_query_token=1234')
    );
  }),
  rest.post<SigneringsstatusRequest, { status_query_token: '1234' }, OpprettAvtaleResponse>(
    apiUrl('/avtale/signeringsstatus'),
    async (req, res, ctx) => {
      const requestBody: SigneringsstatusRequest = await req.json();
      return res(ctx.delay(DELAY_MS), ctx.status(201), ctx.json(kommuneMedAvtale[requestBody.orgnr]));
    }
  ),
];

export const worker = setupWorker(...handlers);
