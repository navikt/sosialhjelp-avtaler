import type { Request, RequestHandler } from 'express';
import { config } from './config';
import { logger } from './logger';
import { getToken, requestTokenxOboToken, validateToken } from '@navikt/oasis';

export interface ExchangeToken {
  (req: Request, targetAudience: string): Promise<string>;
}

export interface Auth {
  verifyIDPortenToken: RequestHandler;
  exchangeIDPortenToken: ExchangeToken;
}

export async function createAuth(): Promise<Auth> {
  if (config.miljo === 'mock') {
    logger.warn('Bruker auth-stub!');
    return createAuthStub();
  }
  return {
    async verifyIDPortenToken(req, res, next) {
      if (req.path.startsWith('/internal/')) {
        next();
        return;
      }
      try {
        const idPortenToken = getToken(req);

        if (!idPortenToken) {
          logger.warn('Bearer token mangler');
          res.sendStatus(401);
          return;
        }
        const validation = await validateToken(idPortenToken);
        if (!validation.ok) {
          logger.warn('Token validering feilet');
          res.sendStatus(401);
          return;
        }

        next();
      } catch (err: unknown) {
        logger.error(`Verifisering av token feilet: ${err}`);
        res.sendStatus(401);
      }
    },
    async exchangeIDPortenToken(req, targetAudience) {
      const idPortenToken = getToken(req);
      if (!idPortenToken) {
        throw new Error('Bearer token mangler');
      }
      const validation = await validateToken(idPortenToken);
      if (!validation.ok) {
        throw new Error('Token-validering feilet');
      }
      const obo = await requestTokenxOboToken(idPortenToken, targetAudience);
      if (!obo.ok) {
        throw new Error('Token exchange feilet');
      }
      return obo.token;
    },
  };
}

export function createAuthStub(expectedToken?: string): Auth {
  return {
    verifyIDPortenToken(req, res, next) {
      if (expectedToken == null || expectedToken === getToken(req)) {
        next();
      } else {
        res.sendStatus(401);
      }
    },
    exchangeIDPortenToken(req) {
      return Promise.resolve(getToken(req)!);
    },
  };
}
