import { Box } from '@mui/system';
import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';
import { getStoryUrl } from '../StoryFragment.utils';
import { getCurrentLiveSite, getNeonLiveblogPostHelper } from '@/services/neon-cms/neon-helpers';
import { findElementsInContentJson } from '@/utils/ContentUtil';
import { Typography } from '@mui/material';
import _ from 'lodash';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import RenderContentElement from '@/components/RenderContent/RenderContentElement';
import { Circle } from '@mui/icons-material';
import { fontSansSerif } from '@/themes/stripes/stripes-theme';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.gridContext
 */
export default function LiveblogBannerFragment({ neonData }) {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const resp = await fetch(`/api/${getCurrentLiveSite(neonData).root.name}/liveblogs/${neonData.object.data.id}`);

        const newPostsResponse = await resp.json();

        setPosts(oldResults => _.uniqBy([...newPostsResponse.posts, ...oldResults], 'id'));
    };

    useEffect(() => {
        fetchPosts();
        const interval = setInterval(() => {
            fetchPosts();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    if (neonData) {
        return (
            <NextLink
                href={getStoryUrl(neonData)}
                passHref
                legacyBehavior
                prefetch={neonData.previewData ? false : true}
            >
                <Box display="flex" sx={{ padding: '25px 25px 0' }}>
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
                    <Timeline
                        sx={{
                            [`& .${timelineItemClasses.root}:before`]: {
                                flex: 0,
                                padding: 0
                            },
                            margin: 0
                        }}
                    >
                        {posts.slice(0, 3).map((post, i, { length }) => {
                            const postContent = getNeonLiveblogPostHelper(post);
                            const postTimestamp = new Date(post.timestamp);

                            const parsedPostTimestamp = `${postTimestamp.getHours()}:${postTimestamp.getMinutes()}`;

                            return (
                                <TimelineItem key={post.timestamp} sx={{ minHeight: '45px' }}>
                                    <TimelineSeparator>
                                        <TimelineDot color="error" />
                                        {i < length - 1 && <TimelineConnector />}
                                    </TimelineSeparator>
                                    <TimelineContent display="flex">
                                        <Typography fontWeight="bold" sx={{ fontSize: '1.2rem', ml: 2 }}>
                                            {parsedPostTimestamp}
                                        </Typography>
                                        &nbsp;&ndash;&nbsp;
                                        <RenderContentElement
                                            jsonElement={findElementsInContentJson(['h1'], postContent.content)[0]}
                                        />
                                    </TimelineContent>
                                </TimelineItem>
                            );
                        })}
                    </Timeline>
                </Box>
            </NextLink>
        );
    }
}
