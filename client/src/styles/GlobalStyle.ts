import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
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
  
`;
