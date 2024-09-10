import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const fontSerif = '"ff-meta-serif-web-pro", "Cambria", "Charter", serif';
const fontSansSerif =
    '"ff-zwo-web-pro", "Franklin Gothic", -apple-system, BlinkMacSystemFont, ui-sans-serif, "DIN Alternate", sans-serif';

const accentColor = '#0472e3';
const titleFontFamily = fontSansSerif;
const textFontFamily = fontSansSerif;

// Create a theme instance.
const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1300,
            xl: 1600
        }
    },
    palette: {
        primary: {
            main: '#0472e3'
        },
        secondary: {
            main: '#0359b1',
            contrastText: accentColor
        },
        error: {
            main: red.A400
        },
        text: {
            primary: '#222222',
            secondary: accentColor
        }
    },
    typography: {
        h1: {
            fontFamily: textFontFamily,
            fontWeight: 700,
            fontSize: '2em',
            margin: '0.67em 0',
            lineHeight: 1.2
        },
        h2: {
            fontFamily: textFontFamily,
            fontWeight: 800,
            fontSize: '1.875rem',
            lineHeight: 1.2,
            textTransform: 'uppercase'
        },
        h3: {
            fontFamily: textFontFamily,
            fontWeight: 700,
            fontSize: '2.074rem',
            lineHeight: 1.2
        },
        h4: {
            fontFamily: textFontFamily,
            fontWeight: 500,
            fontSize: '1rem',
            lineHeight: 1.2,
            textTransform: 'uppercase'
        },
        h5: {
            fontFamily: textFontFamily,
            fontSize: '1.44rem',
            lineHeight: 1.2
        },
        h6: {
            fontFamily: textFontFamily,
            fontWeight: 800,
            fontSize: '1.2rem',
            lineHeight: 1.2,
            textTransform: 'uppercase'
        },
        subtitle1: {
            fontFamily: textFontFamily,
            fontWeight: 500,
            fontStyle: 'normal'
        },
        subtitle2: {
            fontFamily: textFontFamily,
            fontWeight: 400,
            fontStyle: 'normal'
        },
        body1: {
            fontFamily: fontSerif,
            fontWeight: 400,
            fontStyle: 'normal',
            lineHeight: 1.4
        },
        body2: {
            fontFamily: fontSerif,
            fontWeight: 400,
            fontStyle: 'normal'
        },
        button: {
            fontFamily: textFontFamily,
            fontWeight: 700,
            fontStyle: 'normal'
        },
        caption: {
            fontFamily: textFontFamily,
            fontWeight: 400,
            fontStyle: 'italic'
        }
    },
    components: {
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderBottomWidth: 2,
                    borderColor: '#1D1930'
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderBottomWidth: 2,
                    borderColor: '#1D1930'
                }
            }
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    fontFamily: fontSansSerif
                }
            }
        }
    }
});

export default theme;
