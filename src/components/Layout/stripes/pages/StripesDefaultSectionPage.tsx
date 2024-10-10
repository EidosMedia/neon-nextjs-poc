import { getSectionChildrenObjects } from '@/services/neon-cms/neon-helpers';
import { Box, Container, Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
// import HTMLComment from "react-html-comment";
import _ from 'lodash';
import Layout from '../../Layout';
import GenericStripesFragment from './GenericStripesFragment';
import FollowUs from '../../FollowUs';

const isStripes = neonData => _.get(neonData, 'siteContext.root.attributes.theme') === 'stripes';

type DefaultSectionPageProps = {
    neonData: any;
    pageTitle: string;
    analyticsReport?: any;
};

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.pageTitle
 * @param root0.analyticsReport
 * @param root0.semanticSearchData
 */
export const DefaultSectionPage: React.FC<DefaultSectionPageProps> = ({ neonData, pageTitle, analyticsReport }) => {
    const sectionChildrenObjects = getSectionChildrenObjects(neonData);

    const theme = useTheme();
    const onlySmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Layout neonData={neonData}>
            <Container maxWidth="lg">
                <Typography variant="h1">{pageTitle}</Typography>
                <Grid container spacing={2}>
                    <Grid item md={8} sm={12}>
                        {sectionChildrenObjects.map(child => (
                            <GenericStripesFragment key={child.id} neonData={child} size="small" />
                        ))}
                    </Grid>
                    <Grid item md={4} display={onlySmallScreen ? 'none' : 'block'}>
                        <FollowUs />
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};

export default DefaultSectionPage;
