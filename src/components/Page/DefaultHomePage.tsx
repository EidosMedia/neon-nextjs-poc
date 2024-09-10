import { Box, Container, Divider, Grid, Typography } from '@mui/material';
// import HTMLComment from "react-html-comment";
import { getSectionChildrenObjects } from '../../services/neon-cms/neon-helpers';
import GenericFragment from '../Fragment/GenericFragment';
import Layout from '../Layout/Layout';
import _ from 'lodash';
import KTownContainer from '../Layout/stripes/KTownContainer';

type DefaultHomePageProps = {
    neonData: any;
};

const isStripes = neonData => _.get(neonData, 'siteContext.root.attributes.theme') === 'stripes';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.pageTitle
 * @param root0.analyticsReport
 * @param root0.semanticSearchData
 */
export const DefaultHomePage: React.FC<DefaultHomePageProps> = ({ neonData }) => {
    const sectionChildrenObjects = getSectionChildrenObjects(neonData);

    return (
        <Layout neonData={neonData}>
            <Container maxWidth="lg">
                {isStripes(neonData) && <KTownContainer />}
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

export default DefaultHomePage;
