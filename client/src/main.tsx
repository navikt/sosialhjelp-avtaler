import '@navikt/ds-css';
import { Modal } from '@navikt/ds-react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig, SWRConfiguration } from 'swr';
import { App } from './App';
import { GlobalStyle } from './styles/GlobalStyle';
import { baseUrl, http } from './api/http';
import './locales/i18n';
import { initMSW } from './mocks/initMSW';

const swrConfig: SWRConfiguration = {
  async fetcher(url: string) {
    return http.get(url);
  },
};

initMSW().then(() => {
  //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const container = document.getElementById('maincontent')!;
  if (Modal.setAppElement) {
    Modal.setAppElement(container);
  }
  createRoot(container).render(
    <React.StrictMode>
      <GlobalStyle />
      <SWRConfig value={swrConfig}>
        <BrowserRouter basename={baseUrl()}>
          <App />
        </BrowserRouter>
      </SWRConfig>
    </React.StrictMode>
  );
});
