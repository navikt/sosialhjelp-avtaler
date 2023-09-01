import { fetchDecoratorHtml, DecoratorLocale } from '@navikt/nav-dekoratoren-moduler/ssr';
import cookieParser from 'cookie-parser';
import express, { RequestHandler, Router } from 'express';
import type { ExchangeToken } from './auth';
import { config } from './config';
import { logger } from './logger';
import { createMetrics } from './metrics';
import { proxyHandlers } from './proxy';

export const routes = {
  internal(): Router {
    const metrics = createMetrics();
    return Router()
      .get('/isalive', (_, res) => res.send('alive'))
      .get('/isready', (_, res) => res.send('ready'))
      .get('/metrics', async (req, res) => {
        res.set('Content-Type', metrics.contentType);
        res.end(await metrics.metrics());
      });
  },
  api(exchangeIDPortenToken: ExchangeToken): Router {
    return Router()
      .use(proxyHandlers.api(exchangeIDPortenToken))
      .get('/avtale/signert-avtale/:orgnr', async (req, res) => {
        try {
          const response = await fetch(`/avtale/signert-avtale/${req.params.orgnr}`, {
            method: 'get',
            headers: {
              Authorization: `Bearer ${exchangeIDPortenToken}`,
            },
          });
          const buffer = await response.arrayBuffer();
          res.contentType('application/pdf');
          res.status(response.status).send(buffer);
        } catch (error) {
          console.log(`Error while calling api: ${error}`);
          res.sendStatus(500);
        }
      });
  },
  public(): Router {
    return Router()
      .use(cookieParser())
      .get('/settings.js', settingsHandler)
      .get('*', express.static(config.build_path, { index: false }))
      .get('*', spaHandler);
  },
};

const spaHandler: RequestHandler = async (req, res) => {
  try {
    let language = req.cookies['decorator-language'];
    if (language === undefined || !['nb', 'nn'].includes(language)) {
      language = 'nb';
    }

    const decorator = await fetchDecoratorHtml({
      env: config.miljo === 'prod-gcp' ? 'prod' : 'dev',
      params: {
        context: 'samarbeidspartner',
        chatbot: false,
        language: language as DecoratorLocale,
        availableLanguages: [
          {
            locale: 'nb',
            handleInApp: true,
          },
          {
            locale: 'nn',
            handleInApp: true,
          },
        ],
      },
    });
    res.render('index.html', decorator);
  } catch (err: unknown) {
    const error = `Feil under henting av dekoratør: ${err}`;
    logger.error(error);
    res.status(500).send(error);
  }
};

const settingsHandler: RequestHandler = (req, res) => {
  const appSettings = {
    MILJO: config.miljo,
    USE_MSW: config.use_msw,
  };
  res.type('.js');
  res.send(`window.appSettings = ${JSON.stringify(appSettings)}`);
};
