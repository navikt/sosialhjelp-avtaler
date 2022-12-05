import { Heading } from '@navikt/ds-react';
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Trans, useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { AvtaleKvittering } from './avtale/AvtaleKvittering';
import { OpprettAvtale } from './avtale/OpprettAvtale';
import { Banner } from './components/Banner';
import { isHttpError } from './error';
import { Feilside } from './Feilside';
import { baseUrl } from './api/http';
import { Kommuner } from './kommune/Kommuner';
import SigneringFeil from './avtale/SigneringFeil';
import SigneringSuksess from './avtale/SigneringSuksess';

export function App() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    setBreadcrumbs([{ url: baseUrl('/'), title: t('brødsmuler.forside') }]);
  }, []);

  return (
    <>
      <header>
        <Banner>
          <Heading level="1" size="large">
            {t('avtale.overskrift')}
          </Heading>
        </Banner>
      </header>
      <main tabIndex={-1} lang={i18n.language}>
        <ErrorBoundary
          fallbackRender={({ error }) => {
            if (isHttpError(error)) {
              return <Feilside status={error.status} error={error} />;
            } else {
              return <Feilside status={500} error={error} />;
            }
          }}
        >
          <Routes>
            <Route path="/" element={<Kommuner />} />
            <Route path="/opprett-avtale/kvittering" element={<AvtaleKvittering />} />
            <Route path="/opprett-avtale/feil/:orgnr" element={<SigneringFeil />} />
            <Route path="/opprett-avtale/suksess/:orgnr" element={<SigneringSuksess />} />
            <Route path="/opprett-avtale/:orgnr" element={<OpprettAvtale />} />
            <Route path="*" element={<Feilside status={404} />} />
          </Routes>
          <Kontakt>
            <Trans t={t} i18nKey="problemer">
              <></>
              <a href="mailto:digisos@nav.no" />
            </Trans>
          </Kontakt>
        </ErrorBoundary>
      </main>
    </>
  );
}

const Kontakt = styled.div`
  margin-top: 40px;
`;
