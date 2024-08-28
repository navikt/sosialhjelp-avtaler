import { Heading, Label, HStack, VStack, Button, Box } from '@navikt/ds-react';
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
    <Box borderWidth="1" padding="2">
      <HStack justify="space-between" align="center">
        <VStack gap="4">
          <Heading spacing size="small" as="p">
            {avtale.navn}
          </Heading>
          <HStack gap={'1'} align={'center'}>
            <Label as="span" htmlFor={'opprettet_dato'}>
              {t('ledetekst.dato_opprettet')}
            </Label>
            <Dato verdi={avtale.opprettet} />
          </HStack>
        </VStack>
        <Button
          icon={<DownloadIcon />}
          as={AppLink}
          variant="tertiary"
          target="_blank"
          href={`/api/avtale/${avtale.uuid}/signert-avtale`}
        >
          {t('avtale.last_ned')}
        </Button>
      </HStack>
    </Box>
  );
}
