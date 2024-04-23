import { Box, Container } from '@mui/material';
import Copyright from '../Furnitures/Copyright';
import MenuDrawer from './MenuDrawer';
import React from 'react';

/**
 *
 * @param props
 */
const Layout: React.FC<any> = props => {
    return (
        <Container maxWidth="lg">
            <MenuDrawer {...props} />
            {props.children}
            <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                    <Copyright />
                </Box>
            </Container>
        </Container>
    );
};

export default Layout;
