import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#47807a",
    },
    error: {
      main: red.A400,
    },
  },
  // typography: {
  //   h1: {
  //     fontFamily: '"Merriweather", serif',
  //     fontWeight: 900,
  //     fontStyle: 'italic',
  //   },
  //   h2: {
  //     fontFamily: '"Libre Franklin", sans-serif',
  //     fontWeight: 300,
  //     fontStyle: 'normal'
  //   },
  //   h3: {
  //     fontFamily: '"Merriweather", serif',
  //     fontWeight: 900,
  //     fontStyle: 'italic',
  //   },
  //   h4: {
  //     fontFamily: '"Libre Franklin", sans-serif',
  //     fontWeight: 500,
  //     fontStyle: 'normal'
  //   },
  //   h5: {
  //     fontFamily: '"Merriweather", serif',
  //     fontWeight: 700,
  //     fontStyle: 'italic',
  //   },
  //   h6: {
  //     fontFamily: '"Libre Franklin", sans-serif',
  //     fontWeight: 500,
  //     fontStyle: 'normal',
  //     lineHeight: 'normal'
  //   },
  //   subtitle1: {
  //     fontFamily: '"Libre Franklin", sans-serif',
  //     fontWeight: 500,
  //     fontStyle: 'normal'
  //   },
  //   subtitle2: {
  //     fontFamily: '"Merriweather", serif',
  //     fontWeight: 400,
  //     fontStyle: 'nnormal',
  //   },
  //   body1: {
  //     fontFamily: '"Merriweather", serif',
  //     fontWeight: 400,
  //     fontStyle: 'normal',
  //   },
  //   body2: {
  //     fontFamily: '"Libre Franklin", sans-serif',
  //     fontWeight: 400,
  //     fontStyle: 'normal'
  //   },
  //   button: {
  //     fontFamily: '"Libre Franklin", sans-serif',
  //     fontWeight: 700,
  //     fontStyle: 'normal'
  //   },
  //   caption: {
  //     fontFamily: '"Merriweather", serif',
  //     fontWeight: 400,
  //     fontStyle: 'italic',
  //   },
  // }
});

export default theme;
