import { Box, Container, Grid } from '@mui/material';
import Copyright from '../Furnitures/Copyright';
import MenuDrawer from './MenuDrawer';
import React from 'react';
import MenuHeader from './MenuHeader';
import StripesHeader from './stripes/StripesHeader';
import KTownContainer from './stripes/KTownContainer';
import FollowUs from './FollowUs';

/**
 *
 * @param props
 */
const Layout: React.FC<any> = props => {
    return (
        <>
            <Container maxWidth="lg">
                <StripesHeader {...props} />
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <KTownContainer />
                        {props.children}
                    </Grid>
                    <Grid item xs={4}>
                        <aside>
                            <FollowUs />
                        </aside>
                    </Grid>
                </Grid>
                <Box sx={{ my: 4 }}>
                    <Copyright />
                </Box>
            </Container>
        </>
    );
};

export default Layout;
