import { Card, CardActionArea, CardContent } from '@mui/material';
import React from 'react';
import Headline from './Headline';
import NextLink from 'next/link';
import Summary from './Summary';
import { getStoryUrl } from '../StoryFragment.utils';
import { NeonData } from 'src/types/commonTypes';
import StoryFragmentMainMedia from './StoryFragmentMainMedia';

type StoryFragmentLargeProps = {
    data: NeonData;
};

const StoryFragmentLarge: React.FC<StoryFragmentLargeProps> = ({ data }) => (
    <Card square elevation={0} sx={{ display: { xs: 'none', md: 'block' } }}>
        <StoryFragmentMainMedia data={data} />
        <NextLink href={getStoryUrl(data)} passHref>
            <CardActionArea>
                <CardContent sx={{ py: 0, px: 0 }}>
                    <Headline data={data} />
                    <Summary data={data} />
                </CardContent>
            </CardActionArea>
        </NextLink>
    </Card>
);

export default StoryFragmentLarge;
