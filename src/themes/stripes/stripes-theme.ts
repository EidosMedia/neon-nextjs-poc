import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const fontSerif = '"ff-meta-serif-web-pro", "Cambria", "Charter", serif';
export const fontSansSerif =
    '"ff-zwo-web-pro", "Franklin Gothic", -apple-system, BlinkMacSystemFont, ui-sans-serif, "DIN Alternate", sans-serif';

const accentColor = '#0472e3';

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
            fontWeight: 700,
            fontSize: '2em',
            margin: '0.67em 0',
            lineHeight: 1.2
        },
        h2: {
            fontWeight: 800,
            fontSize: '1.875rem',
            lineHeight: 1.2,
            textTransform: 'uppercase'
        },
        h3: {
            fontWeight: 700,
            fontSize: '2.074rem',
            lineHeight: 1.2
        },
        h4: {
            fontWeight: 500,
            fontSize: '1rem',
            lineHeight: 1.2,
            textTransform: 'uppercase'
        },
        h5: {
            fontSize: '1.44rem',
            lineHeight: 1.2
        },
        h6: {
            fontWeight: 800,
            fontSize: '1.2rem',
            lineHeight: 1.2,
            textTransform: 'uppercase'
        },
        subtitle1: {
            fontWeight: 500,
            fontStyle: 'normal'
        },
        subtitle2: {
            fontWeight: 400,
            fontStyle: 'normal'
        },
        body1: {
            fontWeight: 400,
            fontStyle: 'normal',
            lineHeight: 1.4,
            fontSize: '1.25rem'
        },
        body2: {
            fontWeight: 400,
            fontStyle: 'normal'
        },
        button: {
            fontWeight: 700,
            fontStyle: 'normal',
            fontFamily: fontSansSerif
        },
        caption: {
            fontWeight: 400,
            fontStyle: 'italic'
        },
        fontFamily: fontSerif
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
