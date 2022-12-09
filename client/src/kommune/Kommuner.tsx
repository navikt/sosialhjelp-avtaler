import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { AvtalePanel } from './AvtalePanel';
import { Avstand } from '../components/Avstand';
import { Kommune } from '../types';
import { useGet } from '../api/useGet';
import { OpprettAvtaleLinkPanel } from './OpprettAvtaleLinkPanel';
import Spinner from '../components/Spinner';
import useBreadcrumbs from '../components/hooks/useBreadcrumbs';

export function Kommuner() {
  const { t } = useTranslation();
  useBreadcrumbs();

  const { data: kommuner, error } = useGet<Array<Kommune>>('/kommuner');

  if (!kommuner && !error) {
    return <Spinner />;
  }
  if (!kommuner) {
    return null;
  }

  const kommunerUtenAvtale = kommuner.filter((kommune) => !kommune.opprettet);
  const kommunerMedAvtale = kommuner.filter((kommune) => kommune.opprettet);

  if (kommuner && !kommuner.length) {
    return (
      <>
        <Alert variant="info">
          <BodyLong>{t('kommune.ingen_kommuner')}</BodyLong>
        </Alert>
      </>
    );
  }

  return (
    <>
      {kommunerUtenAvtale.length > 0 && (
        <>
          <Heading level="2" size="medium" spacing>
            {t('kommune.uten_avtale')}
          </Heading>
          <Kolonne>
            {kommunerUtenAvtale.map((kommune) => (
              <OpprettAvtaleLinkPanel key={kommune.orgnr} kommune={kommune} />
            ))}
          </Kolonne>
        </>
      )}
      {kommunerMedAvtale.length > 0 && (
        <>
          <Avstand marginTop={10} />
          <Heading level="2" size="medium" spacing>
            {t('kommune.med_avtale')}
          </Heading>
          <Kolonne>
            {kommunerMedAvtale.map((kommune) => (
              <AvtalePanel key={kommune.orgnr} kommune={kommune} />
            ))}
          </Kolonne>
        </>
      )}
    </>
  );
}

const Kolonne = styled.div`
  display: grid;
  gap: var(--a-spacing-5);
`;
