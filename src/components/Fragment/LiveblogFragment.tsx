import { Box } from '@mui/system';
import NextLink from 'next/link';
import React from 'react';
import StoryFragmentMainMedia from './StoryFragment/components/StoryFragmentMainMedia';
import Summary from './StoryFragment/components/Summary';
import Headline from './StoryFragment/components/Headline';
import { getStoryUrl } from './StoryFragment/StoryFragment.utils';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.gridContext
 */
export default function LiveblogFragment({ neonData, gridContext, size }) {
    if (neonData) {
        return (
            <NextLink
                href={getStoryUrl(neonData)}
                passHref
                legacyBehavior
                prefetch={neonData.previewData ? false : true}
            >
                <Box sx={{ display: 'flex', padding: '20px', gap: '20px', cursor: 'pointer' }}>
                    <StoryFragmentMainMedia data={neonData} size={size} />
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        <Headline data={neonData} />
                        <Summary data={neonData} />
                    </Box>
                </Box>
            </NextLink>
        );
    }
}
