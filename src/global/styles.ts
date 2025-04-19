import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #f5f5f5;
    color: #333;
    line-height: 1.6;
    font-size: 16px;
  } 

  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .container {
    display: flex;
    gap: 1rem;
    padding: 2rem;
  }
`
