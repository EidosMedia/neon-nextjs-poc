import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Variant C - Sports Arena
const neonYellow = '#ffc23b'; // Corporate Yellow
// https://fonts.google.com/share?selection.family=Abril+Fatface|Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900
const abrilSerif = '"Abril Fatface", Georgia, serif';
const poppinsSans =  '"Poppins", Helvetica, Arial, sans-serif';

const accentColor = neonYellow;
const titleFontFamily = abrilSerif;
const textFontFamily = poppinsSans;

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
