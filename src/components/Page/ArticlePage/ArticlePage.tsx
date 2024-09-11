import { Container } from '@mui/material';
// import HTMLComment from "react-html-comment";
import React from 'react';
import BeyondWordsBlock from './components/BeyondWordsBlock';
import BreadcrumbBlock from './components/BreadcrumbBlock';
import Layout from '@/components/Layout/Layout';
import HeadlineBlock from '../commons/components/HeadlineBlock';
import SummaryBlock from '../commons/components/SummaryBlock';
import MainImageBlock from '../commons/components/MainImageBlock';
import ContentBlock from '../commons/components/ContentBlock';
import { isStripes } from '@/components/Layout/stripes/Stripes.utils';
import StripesArticlePage from '@/components/Layout/stripes/pages/StripesArticlePage';

/**
 *
 * @param root0
 * @param root0.neonData
 */
export default function ArticlePage({ neonData }) {
    if (isStripes(neonData)) {
        return <StripesArticlePage neonData={neonData} />;
    }

    return (
        <Container maxWidth="lg">
            <Layout neonData={neonData}>
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
