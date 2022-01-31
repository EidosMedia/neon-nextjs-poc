import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';

import productLogo from '../../public/img/head-logo.png'

export default function MenuDrawer() {

    const [open, setOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const list = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={handleDrawerToggle}
            onKeyDown={handleDrawerToggle}
        >
            <List>
                {['Home', 'Sport', 'World', 'National'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Globe Finance', 'Globe Sports'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    )

    return (
        <div>
            <React.Fragment>
                <AppBar position="sticky">
                    <Toolbar sx={{ justifyContent: "space-between" }}>
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
                        <Box m={2}>
                            <Image src={productLogo}></Image>
                        </Box>
                        <Box>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <SearchIcon fontSize="large" />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box sx={{display: { xs: 'none', md:'block' }}}>
                <Stack sx={{ my: 2 }} direction="row" justifyContent="center">
                    <Box sx={{ px:2, borderRight: 1 }}>
                        <Typography variant="h5" component="div">
                            Coronavirus
                        </Typography>
                    </Box>
                    <Box sx={{ px:2, borderRight: 1 }}>
                        <Typography variant="h5" component="div">
                            Ukraine Crisis
                        </Typography>
                    </Box>
                    <Box sx={{ px:2, borderRight: 1 }}>
                        <Typography variant="h5" component="div">
                            Winter Olympics
                        </Typography>
                    </Box>
                    <Box sx={{ px:2, borderRight: 1 }}>
                        <Typography variant="h5" component="div">
                            Markets
                        </Typography>
                    </Box>
                    <Box sx={{ px:2, borderRight: 1 }}>
                        <Typography variant="h5" component="div">
                            Climate Crisis
                        </Typography>
                    </Box>
                    <Box sx={{ px:2 }}>
                        <Typography variant="h5" component="div">
                            Champions League
                        </Typography>
                    </Box>

                    {/* <Chip label="Markets Corection" />
                    <Chip label="Winter Olympics" />
                    <Chip label="Football" />
                    <Chip label="Climate Crisis" /> */}
                </Stack>
                </Box>
                <Toolbar sx={{ display:{sm:'block',md:'none'}}}/>
                <Drawer
                    anchor="left"
                    open={open}
                    onClose={handleDrawerToggle}
                >
                    {list}
                </Drawer>
            </React.Fragment>
        </div>
    );
}