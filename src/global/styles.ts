import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;    
  }

  * {
    margin: 0;
    padding: 0;
    line-height: 1.6;
    box-sizing: border-box;
  }

  body {
    color: #333;
    background-color: #f5f5f5;
    font-size: 0.9rem;
  } 

  a, button {
    font-size: inherit;
    font-family: inherit;
  }

  main {    
    height: calc(100vh - 160px);
    padding-top: 32px;
    padding-inline: 24px;    

    div.settings {
      display: flex;
      flex-direction: column;
      margin-block: 0.75rem;
      row-gap: 4px;
    }
  }

  .container {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    gap: 16px;
    height: 100%;
    padding-bottom: 32px;
    padding-right: 32px;
    overflow-y: none;
    overflow-x: auto;
  }
`
