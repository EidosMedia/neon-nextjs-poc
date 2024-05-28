import { AppBar, Box, Toolbar, Typography, useScrollTrigger } from '@mui/material';
import { BlockProps } from '../Page/ArticlePage/ArticlePage.types';
import React from 'react';
import Link from './Link';

const getNavItems = neonData => neonData.siteContext.siteStructure[0].root.items.map(item => item.name);

const ElevationScroll = (props: any) => {
    const { children } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0
    });
};

const MenuHeader: React.FC<BlockProps> = ({ neonData }) => {
    if (!neonData) return null;

    const navItems = getNavItems(neonData);

    const isSite = neonData.object.data.sys.baseType === 'site';

    return (
        <>
            <ElevationScroll>
                <AppBar position="fixed">
                    <Toolbar sx={{ flexDirection: isSite ? 'column' : 'row' }}>
                        <Typography
                            component="div"
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'none', sm: 'block' },
                                fontFamily: 'Noto serif',
                                fontSize: isSite ? '80px' : '30px',
                                fontWeight: 'bold'
                            }}
                        >
                            {neonData.siteContext.site.root.name}
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: isSite ? '40px' : '20px' }}>
                            <Link href={`/`}>
                                <Typography variant="h6">Home</Typography>
                            </Link>
                            {navItems.map(item => (
                                <Link href={`/${item}`} key={item}>
                                    <Typography variant="h6">{item}</Typography>
                                </Link>
                            ))}
                        </Box>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
        </>
    );
};

export default MenuHeader;
