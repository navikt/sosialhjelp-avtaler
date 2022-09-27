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

export function App() {
  const { t } = useTranslation();
  useEffect(() => {
    setBreadcrumbs([{ url: baseUrl('/'), title: t('brødsmuler.1') }]);
  }, []);

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        if (isHttpError(error)) {
          return <Feilside status={error.status} error={error} />;
        } else {
          return <Feilside status={500} error={error} />;
        }
      }}
    >
      <header>
        <Banner>
          <Heading level="1" size="large">
            {t('banner')}
          </Heading>
        </Banner>
      </header>
      <Routes>
        <Route path="/" element={<Kommuner />} />
        <Route path="/opprett-avtale/kvittering" element={<AvtaleKvittering />} />
        <Route path="/opprett-avtale/:orgnr" element={<OpprettAvtale />} />
        <Route path="*" element={<Feilside status={404} />} />
      </Routes>
      <Kontakt className="main">
        <Trans t={t} i18nKey="problemer">
          <></>
          <a href="mailto:digisos@nav.no" />
        </Trans>
      </Kontakt>
    </ErrorBoundary>
  );
}

const Kontakt = styled.div`
  max-width: 42rem;
  margin: 0 auto;
  padding: 0 40px 40px 40px;
`;
