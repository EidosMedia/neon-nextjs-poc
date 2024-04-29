import { Container } from '@mui/material';
// import HTMLComment from "react-html-comment";
import React from 'react';
import BeyondWordsBlock from './components/BeyondWordsBlock';
import BreadcrumbBlock from './components/BreadcrumbBlock';
import MainImageBlock from './components/MainImageBlock';
import HeadlineBlock from './components/HeadlineBlock';
import SummaryBlock from './components/SummaryBlock';
import ContentBlock from './components/ContentBlock';

/**
 *
 * @param root0
 * @param root0.neonData
 */
export default function ArticlePage({ neonData }) {
    return (
        <Container maxWidth="lg">
            {/* {uuid ? <HTMLComment text={uuid} /> : null} */}
            <BreadcrumbBlock neonData={neonData} />
            <BeyondWordsBlock neonData={neonData} />
            <HeadlineBlock neonData={neonData} />
            <SummaryBlock neonData={neonData} />
            <MainImageBlock neonData={neonData} />
            <ContentBlock neonData={neonData} />
        </Container>
    );
}
