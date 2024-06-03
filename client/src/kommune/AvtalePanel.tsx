import { Heading, BodyLong, Panel, Label, HStack } from '@navikt/ds-react';
import { Dato } from '../components/Dato';
import { AvtaleResponse } from '../types';
import { useTranslation } from 'react-i18next';

export interface AvtalePanelProps {
  avtale: AvtaleResponse;
}

export function AvtalePanel(props: AvtalePanelProps) {
  const { avtale } = props;

  const { t } = useTranslation();
  return (
    <Panel border>
      <Heading spacing size="small" as="p">
        {avtale.navn}
      </Heading>
      <BodyLong as="span">
        <HStack gap={'2'} align={'center'}>
          <Label as="span" htmlFor={'opprettet_dato'}>
            {t('ledetekst.dato_opprettet')}
          </Label>
          <Dato verdi={avtale.opprettet} />
        </HStack>
      </BodyLong>
    </Panel>
  );
}
