import { Loader } from '@navikt/ds-react';
import styled from 'styled-components';

const Spinner = () => {
  return (
    <CenteredContent>
      <Loader size="large" />
    </CenteredContent>
  );
};

const CenteredContent = styled.div`
  width: 100%;
  padding: 40px;
  text-align: center;
`;

export default Spinner;
