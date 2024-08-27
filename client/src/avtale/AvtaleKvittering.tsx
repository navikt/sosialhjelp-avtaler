import { Alert, BodyLong, Heading, ReadMore } from '@navikt/ds-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Avstand } from '../components/Avstand';
import { AvtaleResponse, OpprettAvtaleResponse } from '../types';
import { AvtalePanel } from '../kommune/AvtalePanel';
import styled from 'styled-components/macro';
import useBreadcrumbs from '../components/hooks/useBreadcrumbs';
import { usePageTitle } from '../components/hooks/usePageTitle';
import { useGet } from '../api/useGet';
import { AppLink } from '../components/AppLink';

export function AvtaleKvittering() {
  const { t } = useTranslation();
  const { state: kommuneFraState } = useLocation() as { state: OpprettAvtaleResponse };
  const [searchParams] = useSearchParams();
  const { data: kommuneFraFetch } = useGet<AvtaleResponse>(
    kommuneFraState ? null : `/avtale/${searchParams.get('uuid')}`,
  );
  const kommune = kommuneFraState ?? kommuneFraFetch;
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
      {kommune.erSignert && (
        <BodyLong spacing>
          Last ned avtalen{' '}
          {
            <AppLink target="_blank" href={`/api/avtale/${kommune.uuid}/signert-avtale`}>
              her
            </AppLink>
          }
        </BodyLong>
      )}
      {kommune.kvitteringstekst && <BodyLong spacing>{kommune.kvitteringstekst}</BodyLong>}
      <StyledReadMore header={t('personopplysninger.overskrift')}>{t('personopplysninger.detaljer')}</StyledReadMore>
      <AvtalePanel avtale={kommune} />
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
