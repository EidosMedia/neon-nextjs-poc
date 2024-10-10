import { BlockProps } from '@/components/Page/ArticlePage/ArticlePage.types';
import { Box } from '@mui/material';
import React from 'react';
import { getDwxLinkedObjects } from '@/services/neon-cms/neon-helpers';
import StoryFragmentBanner from '../StoryFragment/components/StoryFragmentBanner';
import LiveblogBannerFragment from '../StoryFragment/components/LiveblogBannerFragment';

const Banner: React.FC<BlockProps> = ({ neonData }) => {
    const linkedObjects = getDwxLinkedObjects(neonData, 'banner');

    return (
        <Box sx={{ marginTop: '2rem' }}>
            {linkedObjects.length > 0 && (linkedObjects?.[0]?.object?.data?.sys?.baseType === 'liveblog' ? (
                <LiveblogBannerFragment neonData={linkedObjects[0]} />
            ) : (
                <StoryFragmentBanner data={linkedObjects[0]} />
            ))}
        </Box>
    );
};

export default Banner;
