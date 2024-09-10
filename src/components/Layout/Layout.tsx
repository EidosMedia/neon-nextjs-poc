import { Box, Container, Grid } from '@mui/material';
import Copyright from '../Furnitures/Copyright';
import MenuDrawer from './MenuDrawer';
import React from 'react';
import MenuHeader from './MenuHeader';
import StripesHeader from './stripes/StripesHeader';
import KTownContainer from './stripes/KTownContainer';
import FollowUs from './FollowUs';
import _ from 'lodash';
import StripesCopyright from './stripes/StripesCopyright';

const isStripes = props => _.get(props, 'neonData.siteContext.root.attributes.theme') === 'stripes';

/**
 *
 * @param props
 */
const Layout: React.FC<any> = props => {
    return (
        <>
            <Container maxWidth="lg">
                {isStripes(props) ? <StripesHeader {...props} /> : <MenuHeader {...props} />}
                <Grid container spacing={2}>
                    {isStripes(props) ? (
                        <>
                            <Grid item xs={8}>
                                {props.children}
                            </Grid>
                            <Grid item xs={4}>
                                <aside>
                                    <FollowUs />
                                </aside>
                            </Grid>
                        </>
                    ) : (
                        props.children
                    )}
                </Grid>
                <Box sx={{ my: 4 }}>{isStripes(props) ? <StripesCopyright /> : <Copyright />}</Box>
            </Container>
        </>
    );
};

export default Layout;
