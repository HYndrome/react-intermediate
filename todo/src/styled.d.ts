import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    boxColor: string;
    textColor: string;
    desColor: string;
    accentColor: string;
  }
}
