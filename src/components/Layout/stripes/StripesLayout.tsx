import { Box, Container, Grid } from '@mui/material';
import React from 'react';
import StripesHeader from './StripesHeader';
import StripesCopyright from './StripesCopyright';

/**
 *
 * @param props
 */
const StripesLayout: React.FC<any> = props => {
    return (
        <>
            <Container maxWidth="lg">
                <StripesHeader {...props} />
                <Grid container>{props.children}</Grid>
                <Box sx={{ my: 4 }}>
                    <StripesCopyright />
                </Box>
            </Container>
        </>
    );
};

export default StripesLayout;
