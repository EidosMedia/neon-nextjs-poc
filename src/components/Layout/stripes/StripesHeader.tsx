import { AppBar, Box, Button, Container, IconButton, TextField, Toolbar, Typography } from '@mui/material';
import { BlockProps } from '../../Page/ArticlePage/ArticlePage.types';
import React from 'react';
import Link from '../Link';
import StripesLogo from './StripesLogo';
import { Menu, Search } from '@mui/icons-material';

const getNavItems = neonData =>
    neonData.siteContext.root.items.map(({ name, title }) => ({
        name,
        title
    }));

const StripesHeader: React.FC<BlockProps> = ({ neonData }) => {
    if (!neonData) return null;

    const navItems = getNavItems(neonData);

    return (
        <>
            <AppBar sx={{ display: 'flex', alignItems: 'center', background: 'white', boxShadow: 'none' }}>
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
                            <Box display="flex" gap="10px" width="25%">
                                <IconButton disableRipple sx={{ border: '1px solid black', borderRadius: '5px' }}>
                                    <Menu />
                                </IconButton>
                                <Button variant="contained">Subscribe</Button>
                            </Box>
                            <Link href={`/`} disableActive width="50%">
                                <StripesLogo neonData={neonData} />
                            </Link>
                            <Box display="flex" width="25%" gap="10px">
                                <Box display="flex">
                                    <TextField
                                        variant="outlined"
                                        sx={{ borderColor: 'black', outlineColor: 'black' }}
                                        placeholder="Search..."
                                        InputProps={{
                                            sx: {
                                                height: '1em',
                                                padding: '21px 0',
                                                borderColor: 'black',
                                                outlineColor: 'black',
                                                borderRadius: '5px 0 0 5px'
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
                                display: { xs: 'none', sm: 'none', md: 'flex' },
                                gap: '40px',
                                borderTop: '1px solid #c1c1c1',
                                borderBottom: '1px solid #c1c1c1',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Link href={`/`}>
                                <Typography variant="h6">Home</Typography>
                            </Link>
                            {navItems.map(item => (
                                <Link href={`/${item.name}`} key={item.name}>
                                    <Typography variant="h6">{item.title}</Typography>
                                </Link>
                            ))}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar sx={{ minHeight: { md: '210px' } }} />
        </>
    );
};

export default StripesHeader;
