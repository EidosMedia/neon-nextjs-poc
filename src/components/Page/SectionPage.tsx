import { Container, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { getCurrentSite, getSectionChildrenObjects } from '../../services/neon-cms/neon-helpers';
import GenericFragment from '../Fragment/GenericFragment';
import TopSection from '../Fragment/TopSection';
import ListSection from '../Fragment/ListSection';
import Layout from '../Layout/Layout';
import _ from 'lodash';

const isStripes = neonData => _.get(neonData, 'siteContext.root.attributes.theme') === 'stripes';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.pageTitle
 */
export default function SectionPage({ neonData, pageTitle }) {
    console.log('neonData', neonData);

    return (
        <Layout neonData={neonData}>
            <Container>
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
                <TopSection neonData={neonData} />
                <Divider />
                <ListSection neonData={neonData} />
                <Divider />
            </Container>
        </Layout>
    );
}
