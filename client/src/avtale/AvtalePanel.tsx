import { LinkPanel } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';
import { Data } from '../components/Data';
import { Dato } from '../components/Dato';
import { Datum } from '../components/Datum';
import { Organisasjonsnummer } from '../components/Organisasjonsnummer';
import { Kommune } from '../types';
import { logSkjemaStartet, skjemanavn } from '../utils/amplitude';

export interface AvtalePanelProps {
  kommune: Kommune;
}

export function AvtalePanel(props: AvtalePanelProps) {
  const { kommune } = props;
  const navigate = useNavigate();
  return (
    <LinkPanel
      onClick={() => {
        logSkjemaStartet(kommune.orgnr, skjemanavn.SKJEMANAVN_ENDRE);
        navigate(`/oppdater-avtale/${kommune.orgnr}`);
      }}
    >
      <LinkPanel.Title className="navds-heading--small">{kommune.navn}</LinkPanel.Title>
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
