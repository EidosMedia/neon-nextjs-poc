import { Container, Divider } from '@mui/material';
import React from 'react';
import { GenericPageProps } from 'src/types/commonTypes';
import Layout from '../../Layout';
import TopSection from './fragments//TopSection';
import ListSection from './fragments//ListSection';
import Banner from './fragments/Banner';

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
                <Banner neonData={neonData} />
                <Divider />
                <TopSection neonData={neonData} />
                <Divider />
                <ListSection neonData={neonData} />
                <Divider />
            </Container>
        </Layout>
    );
};

export default LandingPage;
