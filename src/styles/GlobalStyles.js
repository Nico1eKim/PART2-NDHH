import { BLUE, GRAYSCALE, GREEN, MAIN, ORANGE, PURPLE } from "@/styles/ColorStyles";
import { createGlobalStyle, keyframes } from "styled-components";
import { FONTFAMILY } from "./FontStyles";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const GlobalStyles = createGlobalStyle`
  :root {
    ${ORANGE};
    ${PURPLE};
    ${BLUE};
    ${GREEN};
    ${GRAYSCALE};
    ${MAIN};
  }
  ${FONTFAMILY}

  *{
    box-sizing: border-box;
    font-family: "Noto Sans KR";
  }

  a{
    text-decoration: none;
    color: inherit;
  }

  html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
  a, dl, dt, dd, ol, ul, li, form, label, table, button{
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    /* animation: ${fadeIn} 0.3s ease-out; */
  }
  
  ol, ul{
    list-style: none;
  }

  button {
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  html{
    line-height: 1;
    font-size: 62.5%;
    font-family: 'Noto Sans KR', sans-serif;
    background-color: #FFFFFF;  
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default GlobalStyles;
