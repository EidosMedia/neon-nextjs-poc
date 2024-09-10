import { Box, Container, Divider, Grid, Typography } from '@mui/material';
// import HTMLComment from "react-html-comment";
import { getSectionChildrenObjects } from '../../services/neon-cms/neon-helpers';
import GenericFragment from '../Fragment/GenericFragment';
import Layout from '../Layout/Layout';
import _ from 'lodash';

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
                {isStripes(neonData) ? (
                    <Typography variant="h1">{pageTitle}</Typography>
                ) : (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem 0' }}>
                            {pageTitle ? <Typography variant="h1">{pageTitle}</Typography> : null}
                        </Box>
                        <Divider />
                    </>
                )}
                <Grid container spacing={2}>
                    {sectionChildrenObjects.map(child => (
                        <Grid item md={isStripes(neonData) ? 12 : 6}>
                            <GenericFragment neonData={child} size="small" />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Layout>
    );
};

export default DefaultSectionPage;
