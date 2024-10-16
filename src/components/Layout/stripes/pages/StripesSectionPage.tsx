import { Container, Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import _ from 'lodash';
import Layout from '../../Layout';
import TopSection from './fragments/TopSection';
import ListSection from './fragments/ListSection';
import FollowUs from '../../FollowUs';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.pageTitle
 */
export default function SectionPage({ neonData, pageTitle }) {
    const theme = useTheme();
    const onlySmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Layout neonData={neonData}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item md={8} sm={12}>
                        <Typography variant="h1">{pageTitle}</Typography>
                        <TopSection neonData={neonData} />
                        <Divider />
                        <ListSection neonData={neonData} />
                        <Divider />
                    </Grid>
                    <Grid item md={4} display={onlySmallScreen ? 'none' : 'block'}>
                        <FollowUs />
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
}
