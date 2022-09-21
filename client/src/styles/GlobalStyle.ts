import { createGlobalStyle } from 'styled-components'
import { enhet } from './enhet'

export const GlobalStyle = createGlobalStyle`
  main {
    max-width: 42rem;
    width: 100%;
    margin: 0 auto;
    padding: 40px;

    @media ${enhet.mobil} {
      padding: 18px;
    }
  }
  
  html,
  body {
    height: 100%;
  }
  body {
    display: flex;
    flex-direction: column;
  }
  #root {
    flex: 1 0 auto;
  }
  header,
  footer {
    flex-shrink: 0;
  }
  
   
`
