import { LinkPanel } from '@navikt/ds-react';
import { AvtaleResponse } from '../types';
import { baseUrl } from '../api/http';

export interface KommunePanelProps {
  avtale: AvtaleResponse;
}

export function OpprettAvtaleLinkPanel(props: KommunePanelProps) {
  const { avtale } = props;

  return (
    <LinkPanel href={baseUrl(`/opprett-avtale/${avtale.uuid}`)}>
      <LinkPanel.Title className="navds-heading--small navds-typo--spacing">{avtale.navn}</LinkPanel.Title>
    </LinkPanel>
  );
}
