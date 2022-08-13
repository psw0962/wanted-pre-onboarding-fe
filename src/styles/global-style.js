import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif !important;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  input, button {
    background-color: transparent;
    border: none;
    outline: none;
  }

 textarea:focus, input:focus {
    outline: none;
  }
  
`;

export default GlobalStyle;
