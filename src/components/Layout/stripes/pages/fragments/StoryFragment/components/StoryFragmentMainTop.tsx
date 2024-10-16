import { Box } from '@mui/material';
import React from 'react';
import Headline from './Headline';
import NextLink from 'next/link';
import Summary from './Summary';
import { getStoryUrl } from '../StoryFragment.utils';
import { NeonData } from '@/types/commonTypes';
import StoryFragmentMainMedia from './StoryFragmentMainMedia';

type StoryFragmentLargeProps = {
    data: NeonData;
};

const StoryFragmentLarge: React.FC<StoryFragmentLargeProps> = ({ data }) => (
    <NextLink href={getStoryUrl(data)} passHref legacyBehavior>
        <Box
            sx={{
                display: 'flex',
                padding: '20px',
                gap: '20px',
                cursor: 'pointer',
                flexDirection: { xs: 'column', sm: 'column', md: 'row' }
            }}
        >
            <StoryFragmentMainMedia data={data} size="large" />
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Headline data={data} sx={{ fontSize: '40px', textDecoration: 'none' }} />
                <Summary data={data} />
            </Box>
        </Box>
    </NextLink>
);

export default StoryFragmentLarge;
