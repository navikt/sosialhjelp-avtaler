import React from 'react';
import { Button } from '@navikt/ds-react';
import { usePost } from '../api/usePost';

const TestSignerFlere = (): React.JSX.Element => {
  const { post: startSignering } = usePost('/masse-signer');

  return <Button onClick={startSignering}>Signer flere greier</Button>;
};

export default TestSignerFlere;
