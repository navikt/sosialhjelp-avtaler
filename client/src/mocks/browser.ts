import { RequestHandler, rest, setupWorker } from 'msw';
import { apiUrl } from '../api/http';
import {
  HentVirksomheterResponse,
  HentVirksomhetResponse,
  OpprettAvtaleRequest,
  OpprettAvtaleResponse,
  OppdaterAvtaleRequest,
  OppdaterAvtaleResponse,
  Virksomhet,
  Avtale,
} from '../types';

const avtale: Avtale = {
  tittel: 'du kan signere',
};
const virksomheter: Record<string, Virksomhet> = {
  '123456789': {
    orgnr: '123456789',
    navn: 'Nabokommunen',
    aktiv: true,
    epost: 'test@test',
    opprettet: '2022-07-12T12:07:08.487356',
  },
  '987654321': {
    orgnr: '987654321',
    navn: 'Norges Største kommune',
    aktiv: true,
    epost: 'test@test',
    opprettet: '2022-07-12T12:07:08.487356',
  },
  '544332211': {
    orgnr: '544332211',
    navn: 'Norges Minste Kommune',
    aktiv: false,
  },
};

const handlers: RequestHandler[] = [
  rest.get<{}, {}, Avtale>(apiUrl('/avtale'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(avtale));
  }),
  rest.get<{}, {}, HentVirksomheterResponse>(apiUrl('/avtale/virksomheter'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(Object.values(virksomheter)));
  }),
  rest.get<{}, { orgnr: string }, HentVirksomhetResponse>(apiUrl('/avtale/virksomheter/:orgnr'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(virksomheter[req.params.orgnr]));
  }),
  rest.post<OpprettAvtaleRequest, {}, OpprettAvtaleResponse>(apiUrl('/avtale/virksomheter'), (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(virksomheter['123456789']));
  }),
  rest.put<OppdaterAvtaleRequest, { orgnr: string }, OppdaterAvtaleResponse>(
    apiUrl('/avtale/virksomheter/:orgnr'),
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(virksomheter[req.params.orgnr]));
    }
  ),
];

export const worker = setupWorker(...handlers);
