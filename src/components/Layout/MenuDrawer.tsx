import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { AppBar, Container, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import productLogo from '../../../public/static/img/head-logo.png';
import Link from 'next/link';
import {
    getNeonDataHelper,
    getCurrentLiveSite,
    getCurrentSite,
    getLiveHostname
} from '../../services/neon-cms/neon-helpers';
import logger from 'logger';

/**
 *
 * @param root0
 * @param root0.neonData
 */
export default function MenuDrawer({ neonData, ...props }) {
    const [open, setOpen] = React.useState(false);

    // logger.info('neonData', neonData);
    // logger.info('props', props);

    if (!neonData) return null;

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const currentSite = getCurrentLiveSite(neonData);
    const { siteStructure } = neonData.siteContext;

    const site = siteStructure?.find(site => site?.root?.name === currentSite?.root?.name);

    const logoOverlay = null;
    const logo = productLogo;

    let sectionsRender = null;
    try {
        sectionsRender = site?.root.items.map((item, i) => {
            const title = item.title.charAt(0).toUpperCase() + item.title.slice(1);

            return (
                <Link key={i} href={item.path} passHref prefetch={!neonData.previewData}>
                    <ListItem component="a">
                        <ListItemText disableTypography primary={<Typography variant="h5">{title}</Typography>} />
                    </ListItem>
                </Link>
            );
        });
    } catch (e) {
        logger.error(e);
    }

    let sitesRender = null;
    try {
        sitesRender = siteStructure
            .filter(site => site?.root?.name !== currentSite && site?.headless)
            .map((site, i) => (
                <Link key={i} href={getLiveHostname(site)} passHref prefetch={!neonData.previewData}>
                    <ListItem button component="a">
                        <ListItemText disableTypography primary={<Typography variant="h5">{site?.title}</Typography>} />
                    </ListItem>
                </Link>
            ));
    } catch (e) {
        logger.error(e);
    }

    const list = (
        <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle} onKeyDown={handleDrawerToggle}>
            <List>
                <Link key="homeLink" href="/" passHref prefetch={!neonData.previewData}>
                    <ListItem component="a">
                        <ListItemText disableTypography primary={<Typography variant="h5">Home</Typography>} />
                    </ListItem>
                </Link>
                {sectionsRender}
            </List>
            <Divider />
            <List>{sitesRender}</List>
        </Box>
    );
    const customColor = getCurrentSite(neonData)?.customAttributes?.customColor;

    return (
        <div>
            <React.Fragment>
                <AppBar position="static" sx={{ backgroundColor: customColor || 'primary' }}>
                    <Container maxWidth="xl">
                        <Toolbar sx={{ justifyContent: 'space-between' }}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon fontSize="large" />
                            </IconButton>
                            <Box m={2} alignItems="flex-end" sx={{ display: { xs: 'none', md: 'flex' } }}>
                                {logoOverlay ? (
                                    <Typography variant="h5" sx={{ mb: 1 }} component="div">
                                        {logoOverlay}.
                                    </Typography>
                                ) : null}
                                <Typography variant="h1">{site.root.title}</Typography>
                            </Box>
                            <Box m={2} sx={{ display: { xs: 'block', md: 'none' } }}>
                                {logoOverlay ? (
                                    <Typography variant="h5" component="div">
                                        {logoOverlay}.
                                    </Typography>
                                ) : null}
                                {logo ? (
                                    <Image src={logo} alt="Logo" />
                                ) : (
                                    <p>No logo available</p> 
                                )}                                
                            </Box>
                            <Box>
                                {/* <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <SearchIcon fontSize="large" />
                            </IconButton> */}
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
                <Drawer anchor="left" open={open} onClose={handleDrawerToggle}>
                    {list}
                </Drawer>
            </React.Fragment>
            <Toolbar sx={{ display: { sm: 'block', md: 'none' } }} />
        </div>
    );
}
