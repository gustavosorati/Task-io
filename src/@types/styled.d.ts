import { THEME } from "../styles/theme";

type theme = typeof THEME;

declare module 'styled-components' {
  export interface DefaultTheme extends theme {
  
  }
}