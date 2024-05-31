import { AppBar, Box, Container, Toolbar, Typography, useScrollTrigger } from '@mui/material';
import { BlockProps } from '../Page/ArticlePage/ArticlePage.types';
import React from 'react';
import Link from './Link';
import SiteLogo from './SiteLogo';

const getNavItems = neonData =>
    neonData.siteContext.siteStructure[0].root.items.map(({ name, title }) => ({
        name,
        title
    }));

const ElevationScroll = (props: any) => {
    const { children } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return React.cloneElement(children, {
        elevation: trigger ? 1 : 0
    });
};

const MenuHeader: React.FC<BlockProps> = ({ neonData }) => {
    if (!neonData) return null;

    const navItems = getNavItems(neonData);

    const isSite = neonData.object.data.sys.baseType === 'site';

    return (
        <>
            <ElevationScroll>
                <AppBar position="fixed" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Container maxWidth="lg">
                        <Toolbar
                            sx={{
                                display: 'flex',
                                width: '100%',
                                flexDirection: isSite ? 'column' : 'row',
                                justifyContent: isSite ? 'inherit' : 'space-between'
                            }}
                        >
                            <Link href={`/`} disableActive>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <SiteLogo
                                        neonData={neonData}
                                        size={neonData.object.data.url === '/' ? 'medium' : 'small'}
                                    />
                                    <Typography
                                        component="div"
                                        sx={{
                                            flexGrow: 1,
                                            display: 'block',
                                            fontSize: isSite ? '80px' : '30px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {neonData.siteContext.site.root.title}
                                    </Typography>
                                </Box>
                            </Link>
                            <Box
                                sx={{ display: { xs: 'none', sm: 'none', md: 'flex' }, gap: isSite ? '40px' : '20px' }}
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
            </ElevationScroll>
            <Toolbar sx={neonData.object.data.url === '/' && { minHeight: { md: '210px' } }} />
        </>
    );
};

export default MenuHeader;
