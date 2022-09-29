import { Heading, BodyLong, Panel } from '@navikt/ds-react';
import { Data } from '../components/Data';
import { Dato } from '../components/Dato';
import { Datum } from '../components/Datum';
import { Organisasjonsnummer } from '../components/Organisasjonsnummer';
import { Kommune } from '../types';

export interface AvtalePanelProps {
  kommune: Kommune;
}

export function AvtalePanel(props: AvtalePanelProps) {
  const { kommune } = props;
  return (
    <Panel border={true}>
      <Heading spacing size="small" as="p">
        {kommune.navn}
      </Heading>
      <BodyLong>
        <Data>
          <Datum label="ledetekst.orgnr">
            <Organisasjonsnummer verdi={kommune.orgnr} />
          </Datum>
          <Datum label="ledetekst.dato_opprettet">
            <Dato verdi={kommune.opprettet} />
          </Datum>
        </Data>
      </BodyLong>
    </Panel>
  );
}
