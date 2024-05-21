import React from 'react';
import { Button } from '@navikt/ds-react';
import useSWR from 'swr';

const TestSignerFlere = (): React.JSX.Element => {
  const { mutate } = useSWR('/masse-signer', () => fetch('/sosialhjelp/avtaler/api/masse-signer', { method: 'POST' }));

  return <Button onClick={() => mutate()}>Signer flere greier</Button>;
};

export default TestSignerFlere;
