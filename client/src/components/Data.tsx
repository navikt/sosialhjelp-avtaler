import styled from 'styled-components';
import { enhet } from '../styles/enhet';

export const Data = styled.dl`
  display: grid;
  grid-template-columns: min-content auto;
  gap: var(--ax-space-4) var(--ax-space-8);
  margin: 0;
  align-items: center;
  dd {
    margin-inline-start: 20px;
  }

  @media ${enhet.mobil} {
    grid-template-columns: auto;
    dd {
      margin-inline-start: 0;
    }
  }
`;
