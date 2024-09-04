import { BlockProps } from '@/components/Page/ArticlePage/ArticlePage.types';
import { Box, Grid } from '@mui/material';
import React from 'react';
import GenericFragment from '../GenericFragment';
import { getDwxLinkedObjects } from '@/services/neon-cms/neon-helpers';
import StoryFragmentMainTop from '../StoryFragment/components/StoryFragmentMainTop';

const TopSection: React.FC<BlockProps> = ({ neonData }) => {
    const linkedObjects = getDwxLinkedObjects(neonData, 'top');

    console.log('linkedObjects', linkedObjects);

    if (!linkedObjects.length) {
        return null;
    }

    const gridContent = [];

    for (let i = 1; i < Math.min(linkedObjects.length, 5); i++) {
        gridContent.push(
            <Grid item md={6}>
                <GenericFragment neonData={linkedObjects[i]} key={linkedObjects[i].id} size="small" />
            </Grid>
        );
    }

    return (
        <Box>
            <Box>
                <StoryFragmentMainTop data={linkedObjects[0]} />
            </Box>
            <Grid container spacing={2}>
                {gridContent}
            </Grid>
        </Box>
    );
};

export default TopSection;
