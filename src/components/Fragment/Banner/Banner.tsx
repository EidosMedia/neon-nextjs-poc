import { BlockProps } from '@/components/Page/ArticlePage/ArticlePage.types';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { getDwxLinkedObjects } from '@/services/neon-cms/neon-helpers';
import StoryFragmentBanner from '../StoryFragment/components/StoryFragmentBanner';

const Banner: React.FC<BlockProps> = ({ neonData }) => {
    const linkedObjects = getDwxLinkedObjects(neonData, 'banner');

    return (
        <Box>
            <StoryFragmentBanner data={linkedObjects[0]} />
        </Box>
    );
};

export default Banner;
