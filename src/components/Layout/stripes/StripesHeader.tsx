import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    TextField,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { BlockProps } from '../../Page/ArticlePage/ArticlePage.types';
import React from 'react';
import Link from '../Link';
import StripesLogo from './StripesLogo';
import { Menu, Search } from '@mui/icons-material';
import { fontSansSerif } from '@/themes/stripes/stripes-theme';

const getNavItems = neonData =>
    neonData.siteContext.root.items.map(({ name, title }) => ({
        name,
        title
    }));

const StripesHeader: React.FC<BlockProps> = ({ neonData }) => {
    const theme = useTheme();
    const onlySmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    if (!neonData) return null;

    const navItems = getNavItems(neonData);

    return (
        <>
            <AppBar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'white',
                    boxShadow: 'none',
                    position: 'relative'
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar
                        sx={{
                            display: 'flex',
                            width: '100%',
                            flexDirection: 'column',
                            justifyContent: 'inherit'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                width: '100%'
                            }}
                        >
                            <Box display="flex" gap="10px" flexGrow={1}>
                                <IconButton
                                    disableRipple
                                    sx={{
                                        border: { md: '1px solid black', sm: 'none', xs: 'none' },
                                        borderRadius: '5px'
                                    }}
                                >
                                    <Menu />
                                </IconButton>
                                <Button variant="contained" sx={{ display: onlySmallScreen ? 'none' : 'block' }}>
                                    Subscribe
                                </Button>
                            </Box>
                            <Link href={`/`} padding="15px 0" disableActive width="100%" flexGrow={2}>
                                <StripesLogo neonData={neonData} />
                            </Link>
                            <Box display="flex" gap="10px" flexGrow={1}>
                                <Box display={onlySmallScreen ? 'none' : 'flex'}>
                                    <TextField
                                        variant="outlined"
                                        sx={{
                                            borderColor: 'black',
                                            outlineColor: 'black',
                                            display: 'flex'
                                        }}
                                        placeholder="Search..."
                                        InputProps={{
                                            sx: {
                                                height: '1em',
                                                padding: '21px 0',
                                                borderColor: 'black',
                                                outlineColor: 'black',
                                                borderRadius: '5px 0 0 5px',
                                                fontFamily: fontSansSerif,
                                                fontSize: '0.8em',
                                                minWidth: '10em'
                                            }
                                        }}
                                    />
                                    <IconButton
                                        disableRipple
                                        sx={{ border: '1px solid #c1c1c1', borderRadius: '0 5px 5px 0' }}
                                    >
                                        <Search />
                                    </IconButton>
                                </Box>
                                <Button color="primary" variant="outlined">
                                    Login
                                </Button>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: onlySmallScreen ? 'none' : 'flex',
                                gap: '40px',
                                borderTop: '1px solid #c1c1c1',
                                borderBottom: '1px solid #c1c1c1',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Link href={`/`}>
                                <Typography variant="h6" fontFamily={fontSansSerif}>
                                    Home
                                </Typography>
                            </Link>
                            {navItems.map(item => (
                                <Link href={`/${item.name}`} key={item.name}>
                                    <Typography variant="h6" fontFamily={fontSansSerif}>
                                        {item.title}
                                    </Typography>
                                </Link>
                            ))}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};

export default StripesHeader;
