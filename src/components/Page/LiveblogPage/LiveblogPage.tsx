import { Container } from '@mui/material';
import React from 'react';
import Layout from '../../Layout/Layout';
import MainImageBlock from '../commons/components/MainImageBlock';
import _ from 'lodash';
import PostsRender from './components/PostsRender';
import HeadlineBlock from '../commons/components/HeadlineBlock';
import SummaryBlock from '../commons/components/SummaryBlock';
import ContentBlock from '../commons/components/ContentBlock';
import { NeonData } from '@/types/commonTypes';

type LiveblogPageProps = {
    neonData: NeonData;
    isPreview?: boolean;
};

/**
 *
 */
const LiveblogPage: React.FC<LiveblogPageProps> = ({ neonData, isPreview }) => {
    if (!neonData) return null;

    return (
        <Layout neonData={neonData} isPreview={isPreview}>
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
