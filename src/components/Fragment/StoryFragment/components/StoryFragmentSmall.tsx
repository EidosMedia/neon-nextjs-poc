import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import React from 'react';
import Headline from './Headline';
import NextLink from 'next/link';
import MainImageBlock from '@/components/Page/ArticlePage/components/MainImageBlock';
import Summary from './Summary';
import { getStoryUrl } from '../StoryFragment.utils';
import { NeonData } from 'src/types/commonTypes';

type StoryFragmentProps = {
    data: NeonData;
};

const StoryFragmentSmall: React.FC<StoryFragmentProps> = ({ data }) => {
    console.log('data', data);

    return (
        <Card
            square
            elevation={0}
            sx={{
                display: { xs: 'block', md: 'none' },
                borderBottom: 1,
                borderColor: 'grey.500'
            }}
        >
            <NextLink href={getStoryUrl(data)} passHref>
                <CardActionArea>
                    <CardContent sx={{ py: 0, px: 0 }}>
                        <Typography gutterBottom component="div">
                            <Headline data={data} />
                        </Typography>

                        <Typography sx={{ mb: 2 }} variant="h6" color="text.secondary">
                            <Summary data={data} />
                            {/* Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica */}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </NextLink>
        </Card>
    );
};

export default StoryFragmentSmall;
