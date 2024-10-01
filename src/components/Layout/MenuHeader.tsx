import { AppBar, Box, Container, Toolbar, Tooltip, Typography, useScrollTrigger } from '@mui/material';
import { BlockProps } from '../Page/ArticlePage/ArticlePage.types';
import React from 'react';
import Link from './Link';
import SiteLogo from './SiteLogo';
import { Info, RemoveRedEye, VisibilityOff } from '@mui/icons-material';
import { NeonData } from '@/types/commonTypes';

const getNavItems = neonData =>
    neonData.siteContext.root.items.map(({ name, title }) => ({
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

type MenuHeaderProps = {
    neonData: NeonData;
    isPreview?: boolean;
};

const MenuHeader: React.FC<MenuHeaderProps> = ({ neonData, isPreview }) => {
    if (!neonData) return null;

    const navItems = getNavItems(neonData);

    const isSite = neonData.object.data.sys.baseType === 'site';

    return (
        <>
            <ElevationScroll>
                <AppBar position="fixed" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Container maxWidth="lg">
                        {isPreview && (
                            <Box
                                sx={{
                                    backgroundColor: 'warning.light',
                                    color: 'warning.main',
                                    height: '50px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    border: '3px solid',
                                    borderColor: 'warning.main'
                                }}
                            >
                                <VisibilityOff />
                                <Typography fontWeight="bold">Preview mode</Typography>
                                <Tooltip title="The content you are viewing is not currently live on your site. You need to publish it first.">
                                    <Info sx={{ color: 'black' }} fontSize="small" />
                                </Tooltip>
                            </Box>
                        )}
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
                                        {neonData.siteContext.root.title}
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
