import { LinkPanel } from '@navikt/ds-react';
import { Data } from '../components/Data';
import { Dato } from '../components/Dato';
import { Datum } from '../components/Datum';
import { Organisasjonsnummer } from '../components/Organisasjonsnummer';
import { Kommune } from '../types';
import { baseUrl } from '../api/http';

export interface AvtalePanelProps {
  kommune: Kommune;
}

export function AvtaleLinkPanel(props: AvtalePanelProps) {
  const { kommune } = props;
  return (
    <LinkPanel href={baseUrl(`/opprett-avtale/kvittering`)}>
      <LinkPanel.Title className="navds-heading--small navds-typo--spacing">{kommune.navn}</LinkPanel.Title>
      <LinkPanel.Description>
        <Data>
          <Datum label="ledetekst.orgnr">
            <Organisasjonsnummer verdi={kommune.orgnr} />
          </Datum>
          <Datum label="ledetekst.dato_opprettet">
            <Dato verdi={kommune.opprettet} />
          </Datum>
        </Data>
      </LinkPanel.Description>
    </LinkPanel>
  );
}
