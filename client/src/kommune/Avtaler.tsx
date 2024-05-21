import { Accordion, Alert, BodyLong, Heading, VStack } from '@navikt/ds-react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { AvtalePanel } from './AvtalePanel';
import { KommuneResponse } from '../types';
import { useGet } from '../api/useGet';
import { OpprettAvtaleLinkPanel } from './OpprettAvtaleLinkPanel';
import Spinner from '../components/Spinner';
import useBreadcrumbs from '../components/hooks/useBreadcrumbs';
import React, { Fragment } from 'react';
import { Organisasjonsnummer } from '../components/Organisasjonsnummer';

export function Avtaler() {
  const { t } = useTranslation();
  useBreadcrumbs();

  const { data: kommuner, error } = useGet<Array<KommuneResponse>>('/kommuner');

  if (!kommuner && !error) {
    return <Spinner />;
  }
  if (!kommuner) {
    return null;
  }

  const kommunerMedUsignerteAvtaler: KommuneResponse[] = kommuner
    .map((kommune) => ({ ...kommune, avtaler: kommune.avtaler.filter((avtale) => !avtale.erSignert) }))
    .filter((kommune) => kommune.avtaler.length > 0);
  const kommunerMedSignerteAvtaler = kommuner
    .map((kommune) => ({ ...kommune, avtaler: kommune.avtaler.filter((avtale) => avtale.erSignert) }))
    .filter((kommune) => kommune.avtaler.length > 0);

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
    <VStack gap={'12'}>
      <AvtaleAccordion heading={t('kommune.uten_avtale')} kommuner={kommunerMedUsignerteAvtaler} />
      <AvtaleAccordion heading={t('kommune.med_avtale')} kommuner={kommunerMedSignerteAvtaler} readonly />
    </VStack>
  );
}

const Kolonne = styled.div`
  display: grid;
  gap: var(--a-spacing-5);
`;

interface Props {
  heading: string;
  kommuner: KommuneResponse[];
  readonly?: boolean;
}

const AvtaleAccordion = ({ heading, kommuner, readonly }: Props) => {
  const kommuneCount = kommuner.length;
  if (kommuneCount === 0) {
    return null;
  }
  return (
    <div>
      <Heading level="2" size="medium" spacing>
        {heading}
      </Heading>
      {kommuneCount === 1 && (
        <Kolonne>
          {kommuner[0].avtaler.map((avtale) => (
            <Fragment key={avtale.uuid}>
              <Heading level="3" size="medium">
                {kommuner[0].navn} - <Organisasjonsnummer verdi={kommuner[0].orgnr} />
              </Heading>
              {readonly ? <AvtalePanel avtale={avtale} /> : <OpprettAvtaleLinkPanel avtale={avtale} />}
            </Fragment>
          ))}
        </Kolonne>
      )}
      {kommuneCount > 1 && (
        <Accordion>
          {kommuner.map((kommune, index) => (
            <Accordion.Item defaultOpen={index === 0} key={kommune.orgnr}>
              <Accordion.Header>
                {kommune.navn} - <Organisasjonsnummer verdi={kommune.orgnr} />
              </Accordion.Header>
              <Accordion.Content>
                {kommune.avtaler.map((avtale) => (
                  <Fragment key={avtale.uuid}>
                    {readonly ? <AvtalePanel avtale={avtale} /> : <OpprettAvtaleLinkPanel avtale={avtale} />}
                  </Fragment>
                ))}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </div>
  );
};
