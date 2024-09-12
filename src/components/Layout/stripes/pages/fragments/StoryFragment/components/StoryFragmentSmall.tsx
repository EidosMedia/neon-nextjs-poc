import { Box } from '@mui/material';
import React from 'react';
import Headline from './Headline';
import NextLink from 'next/link';
import Summary from './Summary';
import { getStoryUrl } from '../StoryFragment.utils';
import { NeonData } from '@/types/commonTypes';
import StoryFragmentMainMedia from './StoryFragmentMainMedia';
import Overhead from './Overhead';

type StoryFragmentProps = {
    data: NeonData;
    theme: string;
};

const StoryFragmentSmall: React.FC<StoryFragmentProps> = ({ data, theme }) => (
    <NextLink href={getStoryUrl(data)} passHref legacyBehavior>
        <Box
            sx={{
                display: 'flex',
                padding: '20px',
                gap: '20px',
                cursor: 'pointer',
                margin: 1
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', flexGrow: 1 }}>
                <Overhead data={data} />
                <Headline data={data} />
                <Summary data={data} />
            </Box>
            <StoryFragmentMainMedia data={data} size="wide_small" />
        </Box>
    </NextLink>
);

export default StoryFragmentSmall;
