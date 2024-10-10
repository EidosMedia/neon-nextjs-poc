import { getSectionChildrenObjects } from '@/services/neon-cms/neon-helpers';
import { Box, Container, Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
// import HTMLComment from "react-html-comment";
import _ from 'lodash';
import Layout from '../../Layout';
import KTownContainer from '../KTownContainer';
import FollowUs from '../../FollowUs';
import GenericStripesFragment from './GenericStripesFragment';

type DefaultHomePageProps = {
    neonData: any;
};

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.pageTitle
 * @param root0.analyticsReport
 * @param root0.semanticSearchData
 */
export const DefaultStripesHomePage: React.FC<DefaultHomePageProps> = ({ neonData }) => {
    const theme = useTheme();
    const onlySmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const sectionChildrenObjects = getSectionChildrenObjects(neonData);

    return (
        <Layout neonData={neonData}>
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item md={8} sm={12}>
                        <KTownContainer />
                        <Grid container spacing={2}>
                            {sectionChildrenObjects.map(child => (
                                <Grid item md={12}>
                                    <GenericStripesFragment neonData={child} size="small" />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item md={4} display={onlySmallScreen ? 'none' : 'block'}>
                        <FollowUs />
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};

export default DefaultStripesHomePage;
