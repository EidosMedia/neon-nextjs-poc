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
import { GenericPageProps } from '@/types/commonTypes';

/**
 *
 * @param root0
 * @param root0.neonData
 */
const ArticlePage: React.FC<GenericPageProps> = ({ neonData, isPreview }) => {
    return (
        <Container maxWidth="lg">
            <Layout neonData={neonData} isPreview={isPreview}>
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
};

export default ArticlePage;
