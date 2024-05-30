import { Box, Card } from '@mui/material';
import React from 'react';
import Headline from './Headline';
import NextLink from 'next/link';
import Summary from './Summary';
import { getStoryUrl } from '../StoryFragment.utils';
import { NeonData } from '@/types/commonTypes';
import StoryFragmentMainMedia from './StoryFragmentMainMedia';

type StoryFragmentProps = {
    data: NeonData;
};

const StoryFragmentSmall: React.FC<StoryFragmentProps> = ({ data }) => (
    <NextLink href={getStoryUrl(data)} passHref legacyBehavior>
        <Box sx={{ display: 'flex', padding: '20px', gap: '20px', cursor: 'pointer' }}>
            <StoryFragmentMainMedia data={data} size="small" />
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Headline data={data} />
                <Summary data={data} />
            </Box>
        </Box>
    </NextLink>
);

export default StoryFragmentSmall;
