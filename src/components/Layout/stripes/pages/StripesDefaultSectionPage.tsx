import { getSectionChildrenObjects } from '@/services/neon-cms/neon-helpers';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
// import HTMLComment from "react-html-comment";
import _ from 'lodash';
import Layout from '../../Layout';
import GenericStripesFragment from './GenericStripesFragment';

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

    return (
        <Layout neonData={neonData}>
            <Container maxWidth="lg">
                <Typography variant="h1">{pageTitle}</Typography>
                <Grid container spacing={2}>
                    {sectionChildrenObjects.map(child => (
                        <Grid item md={12}>
                            <GenericStripesFragment neonData={child} size="small" />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Layout>
    );
};

export default DefaultSectionPage;
