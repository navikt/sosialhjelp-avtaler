import { Heading, Link } from '@navikt/ds-react';
import { ErrorBoundary } from 'react-error-boundary';
import { Trans, useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { AvtaleKvittering } from './avtale/AvtaleKvittering';
import { OpprettAvtale } from './avtale/OpprettAvtale';
import { Banner } from './components/Banner';
import { isHttpError } from './error';
import { Feilside } from './Feilside';
import { Kommuner } from './kommune/Kommuner';
import SigneringFeil from './avtale/SigneringFeil';
import SigneringSuksess from './avtale/SigneringSuksess';
import { enhet } from './styles/enhet';

export function App() {
  const { t, i18n } = useTranslation();
  return (
    <>
      <header>
        <Banner>
          <Heading level="1" size="large">
            {t('avtale.overskrift')}
          </Heading>
        </Banner>
      </header>
      {/* role=main and id="maincontet" needed for skiplink to work */}
      <main tabIndex={-1} lang={i18n.language} id="maincontent" role="main">
        <StyledContent>
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
                {/* eslint-disable-next-line jsx-a11y/anchor-has-content*/}
                <Link href="mailto:digisos@nav.no">
                  <></>
                </Link>
              </Trans>
            </Kontakt>
          </ErrorBoundary>
        </StyledContent>
      </main>
    </>
  );
}

const StyledContent = styled.div`
  max-width: 42rem;
  width: 100%;
  margin: 0 auto;
  padding: 40px;

  @media ${enhet.mobil} {
    padding: 18px;
  }
`;
const Kontakt = styled.div`
  margin-top: 40px;
`;
