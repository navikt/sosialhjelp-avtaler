import { Accordion, Alert, BodyLong, Heading, VStack } from '@navikt/ds-react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { AvtalePanel } from './AvtalePanel';
import { AvtaleResponse, KommuneResponse } from '../types';
import { useGet } from '../api/useGet';
import { OpprettAvtaleLinkPanel } from './OpprettAvtaleLinkPanel';
import Spinner from '../components/Spinner';
import useBreadcrumbs from '../components/hooks/useBreadcrumbs';
import * as R from 'remeda';
import React, { Fragment } from 'react';

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
  /*
    [kommune1, kommune2] -> [kommune1: [{usignert, usignert}], kommune2: [{usignert, usignert}] ], [kommune1: [{signert}], kommune2: [{signert}]
   */
  const kommunerMedUsignerteAvtaler: KommuneResponse[] = kommuner
    .map((kommune) => ({ ...kommune, avtaler: kommune.avtaler.filter((avtale) => !avtale.opprettet) }))
    .filter((kommune) => kommune.avtaler.length > 0);
  const signerteAvtaler = R.pipe(
    kommuner,
    R.groupBy((avtale) => avtale.orgnr)
  );

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
      <AvtaleAccordion heading={t('kommune.uten_avtale')} avtaleMap={usignerteAvtaler} />
      <AvtaleAccordion heading={t('kommune.med_avtale')} avtaleMap={signerteAvtaler} readonly />
    </VStack>
  );
}

const Kolonne = styled.div`
  display: grid;
  gap: var(--a-spacing-5);
`;

interface Props {
  heading: string;
  avtaleMap: Record<string, AvtaleResponse[]>;
  readonly?: boolean;
}

const AvtaleAccordion = ({ heading, avtaleMap, readonly }: Props) => {
  const kommuneCount = Object.keys(avtaleMap).length;
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
          {Object.values(avtaleMap)[0].map((avtale) => (
            <OpprettAvtaleLinkPanel key={avtale.uuid} kommune={avtale} />
          ))}
        </Kolonne>
      )}
      {kommuneCount > 1 && (
        <Accordion>
          {Object.keys(avtaleMap).map((orgnr, index) => (
            <Accordion.Item defaultOpen={index === 0} key={orgnr}>
              <Accordion.Header>{avtaleMap[orgnr][0].kommunenavn}</Accordion.Header>
              <Accordion.Content>
                {avtaleMap[orgnr].map((kommune) => (
                  <Fragment key={kommune.uuid}>
                    {readonly ? <AvtalePanel kommune={kommune} /> : <OpprettAvtaleLinkPanel kommune={kommune} />}
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
