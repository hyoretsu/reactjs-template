import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
 * {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
 }

 body {
  -webkit-font-smoothing: antialiased;
 }

 body, input, button {
  font: 16px sans-serif;
 }

 #root {
  display: flex;
  align-items: center;
  justify-content: center;
 }

 button {
  cursor: pointer;
  background: transparent;
  border: none;
 }
 
 a {
 text-decoration: none;
 }
`;
