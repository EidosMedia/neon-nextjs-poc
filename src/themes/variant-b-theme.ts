import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Variant B - Political Insight
const neonPurple = '#a496ea'; // Corporate Purple
// https://fonts.google.com/share?selection.family=Noto+Sans:ital,wght@0,100..900;1,100..900|Noto+Serif:ital,wght@0,100..900;1,100..900
const sourceSerif = '"Source Serif 4", Georgia, serif';
const oswaldSans = '"Oswald", Helvetica, Arial, sans-serif';

const accentColor = neonPurple;
const titleFontFamily = sourceSerif;
const textFontFamily = oswaldSans;

// Create a theme instance.
const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536
        }
    },
    palette: {
        primary: {
            main: '#FFF'
        },
        secondary: {
            main: '#47807a',
            contrastText: accentColor
        },
        error: {
            main: red.A400
        },
        text: {
            primary: '#1D1930',
            secondary: accentColor
        }
    },
    typography: {
        h1: {
            fontFamily: titleFontFamily,
            fontWeight: 700,
            fontSize: '2.986rem',
            lineHeight: 1.2
        },
        h2: {
            fontFamily: titleFontFamily,
            fontWeight: 400,
            fontSize: '2.488rem',
            lineHeight: 1.2
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
            fontStyle: 'italic',
            fontSize: '1.728rem',
            lineHeight: 1.2
        },
        h5: {
            fontFamily: textFontFamily,
            fontSize: '1.44rem',
            lineHeight: 1.2
        },
        h6: {
            fontFamily: textFontFamily,
            fontWeight: 700,
            fontSize: '1.2rem',
            lineHeight: 1.2
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
