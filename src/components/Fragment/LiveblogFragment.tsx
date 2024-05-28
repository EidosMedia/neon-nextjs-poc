import useSWR from 'swr';
import axios from 'axios';
import { Card, CardActionArea, CardContent, styled, Typography } from '@mui/material';
import { getNeonLiveblogPostHelper, getCurrentLiveSite, getImageFormatUrl } from '../../services/neon-cms/neon-helpers';
import RenderContentElement from '../RenderContent/RenderContentElement';
import { findElementsInContentJson, getImageUrl } from '../../utils/ContentUtil';
import { Box } from '@mui/system';
import NextLink from 'next/link';
import { Link as MUILink } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import ResourceResolver from '../../utils/ResourceResolver';
import StoryFragmentMainMedia from './StoryFragment/components/StoryFragmentMainMedia';
import Summary from './StoryFragment/components/Summary';
import Headline from './StoryFragment/components/Headline';
import { getStoryUrl } from './StoryFragment/StoryFragment.utils';

const fetcher = url => axios.get(url).then(res => res.data);

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.gridContext
 */
export default function LiveblogFragment({ neonData, gridContext, size }) {
    if (neonData) {
        return (
            <Card square elevation={0} sx={{ display: { xs: 'none', md: 'block' } }}>
                <StoryFragmentMainMedia data={neonData} size={size} />

                <NextLink href={getStoryUrl(neonData)} passHref prefetch={neonData.previewData ? false : true}>
                    <CardActionArea>
                        <CardContent sx={{ py: 0, px: 0 }}>
                            <Headline data={neonData} />
                            <Summary data={neonData} />
                        </CardContent>
                    </CardActionArea>
                </NextLink>
            </Card>
        );
    }
}
