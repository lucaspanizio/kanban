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
    font-size: 0.9rem;
    color: #333;
    background-color: #f5f5f5;
  } 

  a, button {
    font-size: inherit;
    font-family: inherit;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;

    h1 {
      margin-top: 32px;
    }
  }

  .container {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    gap: 16px;
    padding: 16px;
    overflow-y: none;
    overflow-x: auto;
  }
`
