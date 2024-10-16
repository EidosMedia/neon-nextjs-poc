import { Container, Divider } from '@mui/material';
import React from 'react';
import { GenericPageProps } from 'src/types/commonTypes';
import Layout from '../Layout/Layout';
import TopSection from '../Fragment/TopSection';
import ListSection from '../Fragment/ListSection';
import Banner from '../Fragment/Banner';
import StripesDefaultLandingPage from '../Layout/stripes/pages/StripesLandingPage'
import { isStripes } from '../Layout/stripes/Stripes.utils';
import logger from 'logger';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.pageTitle
 * @param root0.analyticsReport
 * @param root0.semanticSearchData
 */
const LandingPage: React.FC<GenericPageProps> = ({ neonData, isPreview }) => {
    if (!neonData) {
        return null;
    }

    const isStripesVariant = isStripes(neonData);

    logger.debug(`Is Stripes Variant? - ${isStripesVariant}`);
    
    if (isStripesVariant) {
        return <StripesDefaultLandingPage neonData={neonData} />;
    }

    return (
        <Layout neonData={neonData} isPreview={isPreview}>
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
