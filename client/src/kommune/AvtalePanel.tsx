import { Heading, BodyLong, Panel, Label, HStack, VStack, Button } from '@navikt/ds-react';
import { Dato } from '../components/Dato';
import { AvtaleResponse } from '../types';
import { useTranslation } from 'react-i18next';
import { DownloadIcon } from '@navikt/aksel-icons';
import { AppLink } from '../components/AppLink';

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
        <VStack justify="space-between">
          <HStack gap={'2'} align={'center'}>
            <Label as="span" htmlFor={'opprettet_dato'}>
              {t('ledetekst.dato_opprettet')}
            </Label>
            <Dato verdi={avtale.opprettet} />
          </HStack>
          <Button
            icon={<DownloadIcon />}
            as={AppLink}
            target="_blank"
            href={`/api/avtale/${avtale.uuid}/signert-avtale`}
          />
        </VStack>
      </BodyLong>
    </Panel>
  );
}
