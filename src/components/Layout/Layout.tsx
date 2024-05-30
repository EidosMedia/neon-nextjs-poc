import { Box, Container } from '@mui/material';
import Copyright from '../Furnitures/Copyright';
import MenuDrawer from './MenuDrawer';
import React from 'react';
import MenuHeader from './MenuHeader';
import { GLOBAL_MAX_WIDTH_PX } from '@/utils/Constants';

/**
 *
 * @param props
 */
const Layout: React.FC<any> = props => {
    console.log('props layout', props);

    return (
        <>
            <Container sx={{ maxWidth: GLOBAL_MAX_WIDTH_PX }}>
                <MenuHeader {...props} />
                {/* <MenuDrawer {...props} /> */}
                {props.children}
                <Container sx={{ maxWidth: GLOBAL_MAX_WIDTH_PX }}>
                    <Box sx={{ my: 4 }}>
                        <Copyright />
                    </Box>
                </Container>
            </Container>
        </>
    );
};

export default Layout;
