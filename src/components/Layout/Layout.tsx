import { Box, Container, Grid } from '@mui/material';
import Copyright from '../Furnitures/Copyright';
import React from 'react';
import MenuHeader from './MenuHeader';
import { isStripes } from './stripes/Stripes.utils';
import StripesLayout from './stripes/StripesLayout';

/**
 *
 * @param props
 */
const Layout: React.FC<any> = props => {
    if (isStripes(props.neonData)) {
        return <StripesLayout {...props} />;
    }

    return (
        <>
            <Container maxWidth="lg">
                <MenuHeader {...props} />
                <Grid container spacing={2}>
                    {props.children}
                </Grid>
                <Box sx={{ my: 4 }}>
                    <Copyright />
                </Box>
            </Container>
        </>
    );
};

export default Layout;
