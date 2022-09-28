import { RequestHandler, rest, setupWorker } from 'msw';
import { apiUrl } from '../api/http';
import { Kommune, HentKommunerResponse, OpprettAvtaleResponse, OpprettAvtaleRequest } from '../types';

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

const kommuneMedAvtale: Record<string, Kommune> = {
  '987654321': {
    orgnr: '987654321',
    navn: 'Norges Tregeste kommune',
    avtaleversjon: '1.0',
    opprettet: undefined,
  },
};

const handlers: RequestHandler[] = [
  rest.get<{}, { orgnr: string }, Kommune>(apiUrl('/avtale/:orgnr'), (req, res, ctx) => {
    return res(ctx.delay(DELAY_MS), ctx.status(200), ctx.json(kommuner[req.params.orgnr]));
  }),
  rest.get<{}, {}, HentKommunerResponse>(apiUrl('/kommuner'), (req, res, ctx) => {
    return res(ctx.delay(DELAY_MS), ctx.status(200), ctx.json(Object.values(kommuner)));
  }),
  rest.post<OpprettAvtaleRequest, {}, OpprettAvtaleResponse>(apiUrl('/avtale'), async (req, res, ctx) => {
    const requestBody: OpprettAvtaleRequest = await req.json();
    return res(ctx.delay(DELAY_MS), ctx.status(201), ctx.json(kommuneMedAvtale[requestBody.orgnr]));
  }),
];

export const worker = setupWorker(...handlers);
