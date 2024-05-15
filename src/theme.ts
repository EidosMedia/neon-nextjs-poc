import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#FFFFFF'
        },
        secondary: {
            main: '#47807a',
            contrastText: '#F75880'
        },
        error: {
            main: red.A400
        },
        
    },
    typography: {
        h1: {
            fontFamily: '"Noto Serif", serif',
            fontWeight: 700,
            fontSize: '2.986rem',
            lineHeight: 1.2,
        },
        h2: {
            fontFamily: '"Noto Serif", serif',
            fontWeight: 400,
            fontSize: '2.488rem',
            lineHeight: 1.2,
        },
        h3: {
            fontFamily: '"Noto Sans", sans-serif',
            fontWeight: 700,
            fontSize: '2.074rem',
            lineHeight: 1.2
            
        },
        h4: {
            fontFamily: '"Noto Sans", sans-serif',
            fontWeight: 500,
            fontStyle: 'italic',
            fontSize: '1.728rem',
            lineHeight: 1.2
        },
        h5: {
            fontFamily: '"Noto Sans", sans-serif',
            fontSize: '1.44rem',
            lineHeight: 1.2
        },
        h6: {
            fontFamily: '"Noto Sans", sans-serif',
            fontWeight: 700,
            fontSize: '1.2rem',
            lineHeight: 1.2
        },
        subtitle1: {
            fontFamily: '"Noto Sans", sans-serif',
            fontWeight: 500,
            fontStyle: 'normal'
        },
        subtitle2: {
            fontFamily: '"Noto Sans", sans-serif',
            fontWeight: 400,
            fontStyle: 'normal'
        },
        body1: {
            fontFamily: '"Noto Sans", sans-serif',
            fontWeight: 400,
            fontStyle: 'normal',
            lineHeight: 1.4
        },
        body2: {
            fontFamily: '"Noto Sans", sans-serif',
            fontWeight: 400,
            fontStyle: 'normal'
        },
        button: {
            fontFamily: '"Noto Sans", sans-serif',
            fontWeight: 700,
            fontStyle: 'normal'
        },
        caption: {
            fontFamily: '"Noto Sans", sans-serif',
            fontWeight: 400,
            fontStyle: 'italic'
        }
    }
});

export default theme;
