import { Container, Grid } from '@mui/material';
// import HTMLComment from "react-html-comment";
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { isStripes } from '@/components/Layout/stripes/Stripes.utils';
import FollowUs from '../../FollowUs';
import BreadcrumbBlock from '@/components/Page/ArticlePage/components/BreadcrumbBlock';
import BeyondWordsBlock from '@/components/Page/ArticlePage/components/BeyondWordsBlock';
import HeadlineBlock from '@/components/Page/commons/components/HeadlineBlock';
import SummaryBlock from '@/components/Page/commons/components/SummaryBlock';
import ContentBlock from '@/components/Page/commons/components/ContentBlock';
import MainImageBlock from '@/components/Page/commons/components/MainImageBlock';

/**
 *
 * @param root0
 * @param root0.neonData
 */
export default function StripesArticlePage({ neonData }) {
    return (
        <Container maxWidth="lg">
            <Layout neonData={neonData}>
                <BreadcrumbBlock neonData={neonData} />
                <BeyondWordsBlock neonData={neonData} />
                <HeadlineBlock neonData={neonData} />
                <SummaryBlock neonData={neonData} />
                <Grid container spacing={2}>
                    <Grid item md={8}>
                        {neonData?.object?.data?.links?.system?.mainPicture && <MainImageBlock neonData={neonData} />}
                        <ContentBlock neonData={neonData} />
                    </Grid>
                    <Grid item md={4}>
                        <FollowUs />
                    </Grid>
                </Grid>
            </Layout>
        </Container>
    );
}
