import { BlockProps } from '@/components/Page/ArticlePage/ArticlePage.types';
import { Box } from '@mui/material';
import React from 'react';
import { getDwxLinkedObjects } from '@/services/neon-cms/neon-helpers';
import StoryFragmentBanner from '../StoryFragment/components/StoryFragmentBanner';
import KTownContainer from '@/components/Layout/stripes/KTownContainer';
import LiveblogBannerFragment from '../LiveblogBannerFragment';

const Banner: React.FC<BlockProps> = ({ neonData }) => {
    const linkedObjects = getDwxLinkedObjects(neonData, 'banner');

    return (
        <Box>
            {linkedObjects[0].object.data.sys.baseType === 'liveblog' ? (
                <LiveblogBannerFragment neonData={linkedObjects[0]} />
            ) : (
                <StoryFragmentBanner data={linkedObjects[0]} />
            )}
            <KTownContainer />
        </Box>
    );
};

export default Banner;
