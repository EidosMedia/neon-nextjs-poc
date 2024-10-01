import { Box, Container, Divider, Grid, Typography } from '@mui/material';
// import HTMLComment from "react-html-comment";
import { getSectionChildrenObjects } from '../../services/neon-cms/neon-helpers';
import GenericFragment from '../Fragment/GenericFragment';
import Layout from '../Layout/Layout';
import { NeonData } from '@/types/commonTypes';

type DefaultHomePageProps = {
    neonData: NeonData;
    isPreview?: boolean;
};

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.pageTitle
 * @param root0.analyticsReport
 * @param root0.semanticSearchData
 */
export const DefaultHomePage: React.FC<DefaultHomePageProps> = ({ neonData, isPreview }) => {
    const sectionChildrenObjects = getSectionChildrenObjects(neonData);

    return (
        <Layout neonData={neonData} isPreview={isPreview}>
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    {sectionChildrenObjects.map(child => (
                        <Grid item md={6}>
                            <GenericFragment neonData={child} size="small" />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Layout>
    );
};

export default DefaultHomePage;
