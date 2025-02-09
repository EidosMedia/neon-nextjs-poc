import RenderLiveblogPostElement from '@/components/RenderContent/RenderLiveblogPostElement';
import { getCurrentLiveSite, getNeonLiveblogPostHelper } from '@/services/neon-cms/neon-helpers';
import { NeonData } from '@/types/commonTypes';
import { findElementsInContentJson } from '@/utils/ContentUtil';
import { Box, Container, Typography } from '@mui/material';
import _ from 'lodash';
import logger from 'logger';
import { isStripes } from '@/components/Layout/stripes/Stripes.utils';
import { FC, useEffect, useState } from 'react';

function computeEventTime(post, eventStartDate) {
    let eventTime = null;
    try {
        const postDateString = post.title.substring(0, post.title.indexOf('.')).slice(0, -3);

        const postDate = new Date(
            parseInt(postDateString.substring(0, 4)), // Year
            parseInt(postDateString.substring(4, 6)) - 1, // Month (0-based)
            parseInt(postDateString.substring(6, 8)), // Day
            parseInt(postDateString.substring(8, 10)), // Hours
            parseInt(postDateString.substring(10, 12)), // Minutes
            parseInt(postDateString.substring(12, 14)) // Seconds
        ).getTime();

        const eventDate = new Date(
            parseInt(eventStartDate.substring(0, 4)), // Year
            parseInt(eventStartDate.substring(4, 6)) - 1, // Month (0-based)
            parseInt(eventStartDate.substring(6, 8)), // Day
            parseInt(eventStartDate.substring(8, 10)), // Hours
            parseInt(eventStartDate.substring(10, 12)), // Minutes
            parseInt(eventStartDate.substring(12, 14)) // Seconds
        ).getTime();

        const deltaSeconds = (postDate - eventDate) / 1000;
        logger.debug(deltaSeconds);
        if (deltaSeconds > 0) {
            const minutes = Math.floor(deltaSeconds / 60);
            const seconds = deltaSeconds % 60;
            eventTime = {
                minutes,
                seconds
            };
        }
    } catch (e) {}
    return eventTime;
}

const defaultBoxStyle = {
    borderLeft: 2,
    borderColor: 'grey.700',
    position: 'relative',
    pb: 2,
    '::before': {
        content: '"⬤"',
        fontSize: '1.7rem',
        color: 'secondary.contrastText',
        position: 'absolute',
        left: '-13px',
        top: '-7px'
    }
};

const stripesBoxStyle = {
    borderLeft: 2,
    borderColor: 'grey.700',
    position: 'relative',
    pb: 2,
    '::before': {
        content: '"⬤"',
        fontSize: '1.7rem',
        color: 'secondary.contrastText',
        position: 'absolute',
        left: '-13px',
        top: '7px'
    }
};

type PostsRenderProps = {
    neonData: NeonData;
};

const PostsRender: FC<PostsRenderProps> = ({ neonData }) => {
    const boxStyle = isStripes(neonData) ? stripesBoxStyle : defaultBoxStyle;

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

    return (
        <Container sx={{ my: 2 }} maxWidth="lg">
            {posts.map((post, i, { length }) => {
                const postContent = getNeonLiveblogPostHelper(post);
                let contentRender = null;

                try {
                    contentRender = (
                        <RenderLiveblogPostElement
                            jsonElement={postContent.content}
                            renderMode="styled"
                            rawPost={post}
                            neonData={neonData}
                        />
                    );
                } catch (e) {
                    logger.error(e);
                }

                if (contentRender && post) {
                    const postTimestamp = new Date(post.sys.updateTime);
                    const parsedPostTimestamp = `${postTimestamp.getHours()}:${postTimestamp.getMinutes()}`;
                    const lastItem = length === i + 1;

                    contentRender = (
                        <Box id={post.id} key={post.id} sx={[boxStyle, lastItem && { borderColor: 'transparent' }]}>
                            <Box sx={{ display: 'flex' }}>
                                <Typography variant="h1" component="h2" sx={{ fontSize: '1.2rem', ml: 2 }}>
                                    {parsedPostTimestamp}
                                </Typography>
                                <Box>{contentRender}</Box>
                            </Box>
                        </Box>
                    );
                }
                return contentRender;
            })}
        </Container>
    );
};

export default PostsRender;
