import { Box } from '@mui/material';
import React from 'react';
import Headline from './Headline';
import NextLink from 'next/link';
import Summary from './Summary';
import { getStoryUrl } from '../StoryFragment.utils';
import { NeonData } from '@/types/commonTypes';
import StoryFragmentMainMedia from './StoryFragmentMainMedia';
import Overhead from './Overhead';

type StoryFragmentLargeProps = {
    data: NeonData;
    theme: string;
};

const StoryFragmentMedium: React.FC<StoryFragmentLargeProps> = ({ data, theme }) => (
    <NextLink href={getStoryUrl(data)} passHref legacyBehavior>
        <Box
            sx={{
                display: 'flex',
                flexDirection: theme === 'stripes' ? 'row-reverse' : 'row',
                padding: '20px',
                gap: '20px',
                cursor: 'pointer'
            }}
        >
            <StoryFragmentMainMedia data={data} size="wide_small" />
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Overhead data={data} />
                <Headline data={data} />
                <Summary data={data} />
            </Box>
        </Box>
    </NextLink>
);

export default StoryFragmentMedium;
