import { Container, Divider, Grid, Typography } from '@mui/material';
import _ from 'lodash';
import Layout from '../../Layout';
import TopSection from './fragments/TopSection';
import ListSection from './fragments/ListSection';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.pageTitle
 */
export default function SectionPage({ neonData, pageTitle }) {
    return (
        <Layout neonData={neonData}>
            <Container>
                <Typography variant="h1">{pageTitle}</Typography>
                <TopSection neonData={neonData} />
                <Divider />
                <ListSection neonData={neonData} />
                <Divider />
            </Container>
        </Layout>
    );
}
