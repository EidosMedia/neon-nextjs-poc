import { Container, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { getCurrentSite, getSectionChildrenObjects } from '../../services/neon-cms/neon-helpers';
import GenericFragment from '../Fragment/GenericFragment';
import TopSection from '../Fragment/TopSection';
import ListSection from '../Fragment/ListSection';
import Layout from '../Layout/Layout';
import React from 'react';
import { GenericPageProps } from '@/types/commonTypes';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.pageTitle
 */
const SectionPage: React.FC<GenericPageProps> = ({ neonData, pageTitle, isPreview }) => {
    return (
        <Layout neonData={neonData} isPreview={isPreview}>
            <Container>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem 0' }}>
                    {pageTitle ? <Typography variant="h1">{pageTitle}</Typography> : null}
                </Box>
                <Divider />
                <TopSection neonData={neonData} />
                <Divider />
                <ListSection neonData={neonData} />
                <Divider />
            </Container>
        </Layout>
    );
};

export default SectionPage;
