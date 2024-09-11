import { getSectionChildrenObjects } from '@/services/neon-cms/neon-helpers';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
// import HTMLComment from "react-html-comment";
import _ from 'lodash';
import Layout from '../../Layout';
import KTownContainer from '../KTownContainer';
import GenericFragment from '@/components/Fragment/GenericFragment';
import FollowUs from '../../FollowUs';

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
    const sectionChildrenObjects = getSectionChildrenObjects(neonData);

    return (
        <Layout neonData={neonData}>
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item md={8}>
                        <KTownContainer />
                        <Grid container spacing={2}>
                            {sectionChildrenObjects.map(child => (
                                <Grid item md={12}>
                                    <GenericFragment neonData={child} size="small" />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item md={4}>
                        <FollowUs />
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};

export default DefaultStripesHomePage;
