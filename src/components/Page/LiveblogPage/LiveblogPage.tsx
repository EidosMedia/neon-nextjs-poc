import { Container } from '@mui/material';
import React from 'react';
import Layout from '../../Layout/Layout';
import MainImageBlock from '../commons/components/MainImageBlock';
import _ from 'lodash';
import PostsRender from './components/PostsRender';
import HeadlineBlock from '../commons/components/HeadlineBlock';
import SummaryBlock from '../commons/components/SummaryBlock';
import ContentBlock from '../commons/components/ContentBlock';

/**
 *
 */
const LiveblogPage = ({ neonData }) => {
    if (!neonData) return null;

    return (
        <Layout neonData={neonData}>
            <Container maxWidth="lg">
                <HeadlineBlock neonData={neonData} />
                <SummaryBlock neonData={neonData} />
                {neonData?.object?.data?.links?.system?.mainPicture && <MainImageBlock neonData={neonData} />}
                <ContentBlock neonData={neonData} />
                <PostsRender neonData={neonData} />
            </Container>
        </Layout>
    );
};

export default LiveblogPage;

/**
 *
 */
