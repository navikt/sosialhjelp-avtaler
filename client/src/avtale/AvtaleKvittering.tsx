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
import { useGet } from '../api/useGet';
import { useEffect, useState } from 'react';

export function AvtaleKvittering() {
  const { t } = useTranslation();
  const { state: kommune } = useLocation() as { state: Kommune };
  const [pdfDownloadUrl, setPdfDownloaddUrl] = useState<string | undefined>();

  usePageTitle(t('brødsmuler.kvittering'));
  useBreadcrumbs([{ tittel: t('brødsmuler.kvittering'), path: '/' }]);

  //todo: finn type
  const { data: signertAvtaleResponse, error: signertAvtaleError } = useGet<any>(
    kommune ? `/avtale/signert-avtale/${kommune.orgnr}` : null
  );

  console.log('avtaleresponse', signertAvtaleResponse);
  if (!kommune) {
    return null;
  }
  console.log({ pdfDownloadUrl });
  useEffect(() => {
    if (signertAvtaleResponse) {
      const blob = signertAvtaleResponse.blob();
      setPdfDownloaddUrl(window.URL.createObjectURL(blob));

      const file = new Blob([signertAvtaleResponse?.avtale], {
        type: 'application/pdf',
      });
      const fileURL = URL.createObjectURL(file);
      console.log('createfile', file, fileURL);

      window.open(fileURL);
    }
  }, [signertAvtaleResponse]);

  return (
    <>
      <Heading level="2" size="medium" spacing>
        {t('avtale.kvittering_for', { navn: kommune.navn })}
      </Heading>
      <Alert variant="success">{t('avtale.suksess')}</Alert>
      <Avstand marginBottom={5} />
      <BodyLong spacing>
        {signertAvtaleResponse ? (
          <AppLink
            href={signertAvtaleResponse.avtale}
            target="_blank"
            onClick={() => logLastNedAvtale(window.location.href)}
          >
            {t('avtale.lenke_last_ned_avtalen')}
          </AppLink>
        ) : (
          <AppLink href="/Avtale.pdf" target="_blank" onClick={() => logLastNedAvtale(window.location.href)}>
            {t('avtale.lenke_last_ned_avtalen')}
          </AppLink>
        )}
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
      <Link to="/" className={'navds-link'}>
        {t('avtale.lenke_tilbake_til_forsiden')}
      </Link>
    </>
  );
}

const StyledReadMore = styled(ReadMore)`
  margin-bottom: var(--a-spacing-7);
`;
