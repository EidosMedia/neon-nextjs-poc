import { Container } from '@mui/material';
// import HTMLComment from "react-html-comment";
import React from 'react';
import BeyondWordsBlock from './components/BeyondWordsBlock';
import BreadcrumbBlock from './components/BreadcrumbBlock';
import MainImageBlock from './components/MainImageBlock';
import HeadlineBlock from './components/HeadlineBlock';
import SummaryBlock from './components/SummaryBlock';
import ContentBlock from './components/ContentBlock';
import Layout from '@/components/Layout/Layout';
import { GLOBAL_MAX_WIDTH_PX } from '@/utils/Constants';

/**
 *
 * @param root0
 * @param root0.neonData
 */
export default function ArticlePage({ neonData }) {
    return (
        <Container maxWidth="lg">
            <Layout neonData={neonData}>
                {/* {uuid ? <HTMLComment text={uuid} /> : null} */}
                <BreadcrumbBlock neonData={neonData} />
                <BeyondWordsBlock neonData={neonData} />
                <HeadlineBlock neonData={neonData} />
                <SummaryBlock neonData={neonData} />
                {neonData?.object?.data?.links?.system?.mainPicture && <MainImageBlock neonData={neonData} />}
                <ContentBlock neonData={neonData} />
            </Layout>
        </Container>
    );
}
