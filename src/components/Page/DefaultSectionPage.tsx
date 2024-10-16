import { Box, Container, Divider, Grid, Typography } from '@mui/material';
// import HTMLComment from "react-html-comment";
import { getSectionChildrenObjects } from '../../services/neon-cms/neon-helpers';
import GenericFragment from '../Fragment/GenericFragment';
import Layout from '../Layout/Layout';
import { NeonData } from '@/types/commonTypes';
import _ from 'lodash';
import StripesDefaultSectionPage from '../Layout/stripes/pages/StripesDefaultSectionPage';
import { isStripes } from '../Layout/stripes/Stripes.utils';

type DefaultSectionPageProps = {
    neonData: NeonData;
    pageTitle: string;
    analyticsReport?: any;
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
export const DefaultSectionPage: React.FC<DefaultSectionPageProps> = ({
    neonData,
    pageTitle,
    analyticsReport,
    isPreview
}) => {
    if (isStripes(neonData)) {
        return <StripesDefaultSectionPage neonData={neonData} pageTitle={pageTitle} />;
    }

    const sectionChildrenObjects = getSectionChildrenObjects(neonData);

    return (
        <Layout neonData={neonData} isPreview={isPreview}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem 0' }}>
                    {pageTitle ? <Typography variant="h1">{pageTitle}</Typography> : null}
                </Box>
                <Divider />
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

export default DefaultSectionPage;
