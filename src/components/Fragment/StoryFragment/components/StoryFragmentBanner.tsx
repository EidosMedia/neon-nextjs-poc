import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import React from 'react';
import Headline from './Headline';
import NextLink from 'next/link';
import Summary from './Summary';
import { getStoryUrl } from '../StoryFragment.utils';
import StoryFragmentMainMedia from './StoryFragmentMainMedia';
import { NeonData } from '@/types/commonTypes';
import { Circle } from '@mui/icons-material';
import { fontSansSerif } from '@/themes/stripes/stripes-theme';

type StoryFragmentLargeProps = {
    data: NeonData;
};

const StoryFragmentBanner: React.FC<StoryFragmentLargeProps> = ({ data }) => (
    <Box>
        <NextLink href={getStoryUrl(data)} passHref>
            <Box display="flex" gap="10px">
                <Box
                    height="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap="10px"
                    sx={{ backgroundColor: 'error.main', color: 'white' }}
                    padding="10px"
                >
                    <Circle fontSize="small" />
                    <Typography fontFamily={fontSansSerif}>LIVE</Typography>
                </Box>
                <Headline data={data} />
            </Box>
        </NextLink>
    </Box>
);

export default StoryFragmentBanner;
