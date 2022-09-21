import { LinkPanel } from '@navikt/ds-react'
import { useNavigate } from 'react-router-dom'
import { Data } from '../components/Data'
import { Dato } from '../components/Dato'
import { Datum } from '../components/Datum'
import { Organisasjonsnummer } from '../components/Organisasjonsnummer'
import { Virksomhet } from '../types'
import { logSkjemaStartet, skjemanavn } from '../utils/amplitude'

export interface AvtalePanelProps {
  virksomhet: Virksomhet
}

export function AvtalePanel(props: AvtalePanelProps) {
  const { virksomhet } = props
  const navigate = useNavigate()
  return (
    <LinkPanel
      onClick={() => {
        logSkjemaStartet(virksomhet.orgnr, skjemanavn.SKJEMANAVN_ENDRE)
        navigate(`/oppdater-avtale/${virksomhet.orgnr}`)
      }}
    >
      <LinkPanel.Title className="navds-heading--small">{virksomhet.navn}</LinkPanel.Title>
      <LinkPanel.Description>
        <Data>
          <Datum label="ledetekst.orgnr">
            <Organisasjonsnummer verdi={virksomhet.orgnr} />
          </Datum>
          <Datum label="ledetekst.dato_opprettet">
            <Dato verdi={virksomhet.opprettet} />
          </Datum>
          <Datum label="ledetekst.epost">{virksomhet.epost}</Datum>
        </Data>
      </LinkPanel.Description>
    </LinkPanel>
  )
}
