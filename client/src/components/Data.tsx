import styled from 'styled-components'

export const Data = styled.dl`
  display: grid;
  grid-template-columns: 150px auto;
  gap: var(--navds-spacing-1) var(--navds-spacing-2);
  margin: 0;
  align-items: center;

  @media only screen and (max-width: 500px) {
    grid-template-columns: auto;
    dd {
      margin-inline-start: 0;
    }
  }
`
