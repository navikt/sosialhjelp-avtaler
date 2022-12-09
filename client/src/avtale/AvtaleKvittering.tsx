import { Alert, BodyLong, Heading, ReadMore } from '@navikt/ds-react';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { AppLink } from '../components/AppLink';
import { Avstand } from '../components/Avstand';
import { DsLink } from '../components/DsLink';
import { Kommune } from '../types';
import { AvtalePanel } from '../kommune/AvtalePanel';
import { logLastNedAvtale } from '../utils/amplitude';
import styled from 'styled-components/macro';
import useBreadcrumbs from '../components/hooks/useBreadcrumbs';
import { usePageTitle } from '../components/hooks/usePageTitle';

export function AvtaleKvittering() {
  const { t } = useTranslation();
  const { state: kommune } = useLocation() as { state: Kommune };
  usePageTitle(t('brødsmuler.kvittering'));
  useBreadcrumbs([{ tittel: t('brødsmuler.kvittering'), path: '/' }]);

  if (!kommune) {
    return null;
  }

  return (
    <>
      <Heading level="2" size="medium" spacing>
        {t('avtale.kvittering_for', { navn: kommune.navn })}
      </Heading>
      <Alert variant="success">{t('avtale.suksess')}</Alert>
      <Avstand marginBottom={5} />
      <BodyLong spacing>
        <AppLink href="/Avtale.pdf" target="_blank" onClick={() => logLastNedAvtale(window.location.href)}>
          {t('avtale.lenke_last_ned_avtalen')}
        </AppLink>
      </BodyLong>
      <BodyLong spacing>
        <Trans t={t} i18nKey="avtale.mer_informasjon">
          <></>
          <DsLink
            href="https://www.nav.no/no/nav-og-samfunn/samarbeid/for-kommunen/digisos/nyheter-fra-digisos/innsyn-i-opplysninger-om-saker-for-okonomisk-sosialhjelp-for-nav-kontaktsenter-er-i-pilot"
            target="_blank"
          >
            <></>
          </DsLink>
        </Trans>
      </BodyLong>{' '}
      <BodyLong spacing>
        <Trans t={t} i18nKey="avtale.lenke_til_fiks">
          <></>
          <DsLink href="https://forvaltning.fiks.ks.no/" target="_blank">
            <></>
          </DsLink>
        </Trans>
      </BodyLong>
      <StyledReadMore header={t('personopplysninger.overskrift')}>{t('personopplysninger.detaljer')}</StyledReadMore>
      <AvtalePanel kommune={kommune} />
      <Avstand marginBottom={5} />
      <Link to="/">{t('avtale.lenke_tilbake_til_forsiden')}</Link>
    </>
  );
}

const StyledReadMore = styled(ReadMore)`
  margin-bottom: var(--a-spacing-7);
`;
