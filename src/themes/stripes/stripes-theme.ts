import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Variant A - Market Pulse
const neonTeal = '#0472e3'; // Finance Teal
// https://fonts.google.com/share?selection.family=IBM+Plex+Sans+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700|IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700
const ibmPlexSansCondensed = '"IBM Plex Sans Condensed", Helvetica, Arial, sans-serif';
const ibmPlexSans = '"IBM Plex Sans Condensed", Helvetica, Arial, sans-serif';
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
            fontFamily: titleFontFamily,
            fontWeight: 700,
            fontSize: '2em',
            margin: '0.67em 0',
            lineHeight: 1.2
        },
        h2: {
            fontFamily: titleFontFamily,
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
            fontFamily: textFontFamily,
            fontWeight: 400,
            fontStyle: 'normal',
            lineHeight: 1.4
        },
        body2: {
            fontFamily: textFontFamily,
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
        }
    }
});

export default theme;
