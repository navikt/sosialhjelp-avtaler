import { LinkPanel } from '@navikt/ds-react';
import { Data } from '../components/Data';
import { Datum } from '../components/Datum';
import { Organisasjonsnummer } from '../components/Organisasjonsnummer';
import { AvtaleResponse } from '../types';
import { baseUrl } from '../api/http';

export interface KommunePanelProps {
  kommune: AvtaleResponse;
}

export function OpprettAvtaleLinkPanel(props: KommunePanelProps) {
  const { kommune } = props;

  return (
    <LinkPanel href={baseUrl(`/opprett-avtale/${kommune.orgnr}`)}>
      <LinkPanel.Title className="navds-heading--small navds-typo--spacing">{kommune.kommunenavn}</LinkPanel.Title>
      <LinkPanel.Description>
        <Data>
          <Datum label="ledetekst.orgnr">
            <Organisasjonsnummer verdi={kommune.orgnr} />
          </Datum>
        </Data>
      </LinkPanel.Description>
    </LinkPanel>
  );
}
