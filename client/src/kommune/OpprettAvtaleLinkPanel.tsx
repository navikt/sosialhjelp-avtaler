import { LinkPanel } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';
import { Data } from '../components/Data';
import { Datum } from '../components/Datum';
import { Organisasjonsnummer } from '../components/Organisasjonsnummer';
import { Kommune } from '../types';
import { logSkjemaStartet, skjemanavn } from '../utils/amplitude';

export interface KommunePanelProps {
  kommune: Kommune;
}

export function OpprettAvtaleLinkPanel(props: KommunePanelProps) {
  const { kommune } = props;
  const navigate = useNavigate();

  return (
    <LinkPanel
      onClick={() => {
        logSkjemaStartet(kommune.orgnr, skjemanavn.SKJEMANAVN_OPPRETT);
        navigate(`/opprett-avtale/${kommune.orgnr}`);
      }}
    >
      <LinkPanel.Title className="navds-heading--small navds-typo--spacing">{kommune.navn}</LinkPanel.Title>
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
