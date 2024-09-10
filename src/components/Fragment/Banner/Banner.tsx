import { BlockProps } from '@/components/Page/ArticlePage/ArticlePage.types';
import { Box } from '@mui/material';
import React from 'react';
import { getDwxLinkedObjects } from '@/services/neon-cms/neon-helpers';
import StoryFragmentBanner from '../StoryFragment/components/StoryFragmentBanner';
import KTownContainer from '@/components/Layout/stripes/KTownContainer';

const Banner: React.FC<BlockProps> = ({ neonData }) => {
    const linkedObjects = getDwxLinkedObjects(neonData, 'banner');

    return (
        <Box>
            <KTownContainer />
            <StoryFragmentBanner data={linkedObjects[0]} />
        </Box>
    );
};

export default Banner;
