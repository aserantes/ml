import { createGlobalStyle } from "styled-components";

const theme = {
  primary: "#FFE600",
  highLight: "3483FA",
  black: "#333",
  darkGray: "#666",
  gray: "#999",
  lightGray: "#EEE"
};

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,600&display=swap');

  * {
    margin: 0;
    padding: 0;
    border: 0;
    font-family: 'Montserrat', Helvetica, sans-serif;
    font-size: 1em;
  }

  div {
    display: flex;
  }

  body {
    background: #eee;
    color: #000;
    box-sizing: border-box;
  }
  button {
    margin: 0;
    padding: 0;
    border: none;
    font: inherit;
    color: inherit;
    background: none;
  }
  button:focus {
    outline:none;
  }
  input:focus {
    outline:none;
  }
  button::-moz-focus-inner {
    padding: 0;
    border: none;
  }
  ol, ul {
    list-style: none;
  }
`;

export { GlobalStyle, theme };
