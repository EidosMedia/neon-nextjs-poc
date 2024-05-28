import { Box, Container, Divider, Typography } from '@mui/material';
// import HTMLComment from "react-html-comment";
import { getNeonDataHelper, getCurrentSite, getDwxLinkedObjects } from '../../services/neon-cms/neon-helpers';
import GenericFragment from '../Fragment/GenericFragment';
import QuerySegment from '../Segment/QuerySegment';
import Segment from '../Segment/Segment';
import React from 'react';
import { GenericPageProps } from 'src/types/commonTypes';
import Layout from '../Layout/Layout';
import TopSection from '../Fragment/TopSection';
import ListSection from '../Fragment/ListSection';
import Banner from '../Fragment/Banner';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.pageTitle
 * @param root0.analyticsReport
 * @param root0.semanticSearchData
 */
const LandingPage: React.FC<GenericPageProps> = ({ neonData, pageTitle }) => {
    if (!neonData) {
        return null;
    }

    return (
        <Layout neonData={neonData}>
            <Container maxWidth="lg">
                {/* <Banner neonData={neonData} />
                <Divider /> */}
                <TopSection neonData={neonData} />
                <Divider />
                <ListSection neonData={neonData} />
                <Divider />
            </Container>
        </Layout>
    );
};

export default LandingPage;
