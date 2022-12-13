import useSWR from 'swr'
import axios from 'axios'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Card, CardActionArea, CardContent, styled, Typography } from '@mui/material';
import { getCobaltLiveblogPostHelper, getCurrentLiveSite, getImageFormatUrl } from '../../lib/cobalt-cms/cobalt-helpers';
import RenderContentElement from '../RenderContent/RenderContentElement';
import { findElementsInContentJson, getImageUrl } from '../../utils/ContentUtil';
import { Box } from '@mui/system';
import NextLink from 'next/link'
import { Link as MUILink } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import ResourceResolver from '../../utils/ResourceResolver';


const fetcher = url => axios.get(url).then(res => res.data)

export default function LiveblogFragment({ cobaltData, gridContext }) {
    let render = null;
    if (cobaltData) {
        let blogId = cobaltData.object.data.id;

        let data, error = null;

        ({ data, error } = useSWR('/api/' + getCurrentLiveSite(cobaltData) + '/liveblogs/' + blogId, fetcher, { refreshInterval: 5000, dedupingInterval: 0 }));

        if (error) return <div>Failed to load</div>
        if (!data) return <div>Loading...</div>

        const CustomizedTimeline = styled(Timeline)`
        .MuiTimelineItem-root:before {
            content: none
        }
        `;

        let templateName = ""
        if (cobaltData) {
            templateName = cobaltData.linkContext.linkTemplate;
        }

        let variantId = 0

        if (cobaltData.abTesting && cobaltData.abTesting.variant) {
            [, variantId] = cobaltData.abTesting.variant.split('.');
        }

        let postCount = 3;
        try {
            postCount = cobaltData.linkContext.linkData.parameters.lbCount
        } catch (e) { }

        const pulsatingIcon = (
            <Box component="span"
                sx={{

                    borderRadius: '62.5rem',
                    display: 'inline-block',
                    position: 'relative',
                    backgroundColor: '#7aa09c',
                    width: '.75em',
                    height: '.75em',
                    marginRight: '0.4rem',
                    verticalAlign: 'initial',
                    animation: '3s ease-in 1s infinite reverse both running slidein',

                    color: '#7aa09c'
                }} />
        )

        let myUrl = ""
        try {
            myUrl = cobaltData.object.data.url
            if (!myUrl) { myUrl = cobaltData.pageContext.nodesUrls[cobaltData.object.data.id] }
        } catch (e) { }

        let headline = null;
        try {
            headline = cobaltData.linkContext.linkData.parameters.customHeadline
        } catch (e) { }

        if (!headline) {
            try {
                headline = <RenderContentElement jsonElement={findElementsInContentJson(['headline'], cobaltData.object.helper.content)[0]} />
            } catch (e) {
            }
        }

        let summary = null;
        if (variantId > 0) {
            try {
                summary = cobaltData.linkContext.linkData.parameters['customSummary_v' + variantId]
            } catch (e) { }
        }
        if (!summary) {
            try {
                summary = cobaltData.linkContext.linkData.parameters.customSummary
            } catch (e) { }
        }
        if (!summary) {
            try {
                summary = <RenderContentElement jsonElement={findElementsInContentJson(['summary'], cobaltData.object.helper.content)[0]} />
            } catch (e) {
            }
        }


        let timelineRender = []
        let timelineDone = false;
        let postIndex = 0;
        let renderIndex = 0;
        while (!timelineDone) {
            let post = null;
            try {
                post = data.result[postIndex]
            } catch (e) { }
            if (post) {
                const postContent = getCobaltLiveblogPostHelper(post);
                if (findElementsInContentJson(['h1'], postContent.content)[0].elements) { // has headline
                    const itemRender = (
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot />
                                {(renderIndex === postCount ? null : <TimelineConnector />)}
                            </TimelineSeparator>
                            <TimelineContent sx={{ pr: 0 }}>
                                <Typography variant="body1">
                                    <RenderContentElement jsonElement={findElementsInContentJson(['h1'], postContent.content)[0]} />
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                    )
                    timelineRender.push(itemRender);
                    renderIndex++;
                    if (renderIndex >= postCount) {
                        timelineDone = true;
                    }
                }
            } else {
                timelineDone = true
            }
            postIndex++
        }

        if (gridContext.md > 3) {

            let mainPictureElement = null;
            let mainPictureLandscapeUrl = null;
            try {
                mainPictureElement = findElementsInContentJson(['mediagroup'], cobaltData.object.helper.content)[0].elements[0];
                mainPictureLandscapeUrl = ResourceResolver(getImageFormatUrl(getImageUrl(mainPictureElement, "landscape", cobaltData), 'medium'), (cobaltData.previewData ? cobaltData.previewData : null), cobaltData.siteContext.site);
            } catch (e) {
                console.log(e)
            }

            const mediaBlock = <Image src={mainPictureLandscapeUrl} width={1024} height={576} />

            render = (
                <React.Fragment>
                    <Card square elevation={0} sx={{ display: { xs: 'none', md: 'block' } }}>
                        {templateName.includes('pic') || templateName.includes('list') ?
                            mediaBlock : null}
                        <NextLink href={myUrl} passHref prefetch={(cobaltData.previewData ? false : true)}>
                            <CardActionArea>
                                <CardContent sx={{ py: 0, px: 0 }}>
                                    {templateName.includes('head') || templateName.includes('list') ?
                                        <Typography gutterBottom variant="h4" component="div">
                                            {headline}
                                        </Typography>
                                        : null}
                                    <Typography display="inline" color="red" sx={{ fontWeight: 'bold' }}>LIVE </Typography>
                                    {templateName.includes('sum') || templateName.includes('list') ?
                                        <Typography display="inline" sx={{ mb: 2 }} variant="body1" color="text.secondary">
                                            / {summary}
                                        </Typography>
                                        : null}
                                </CardContent>
                            </CardActionArea>
                        </NextLink>
                    </Card>
                    <Card square elevation={0} sx={{ display: { xs: 'block', md: 'none' }, borderBottom: 1, borderColor: 'grey.500' }}>
                        {templateName.includes('pic') || templateName.includes('list') ?
                            mediaBlock : null}
                        <NextLink href={myUrl} passHref prefetch={(cobaltData.previewData ? false : true)}>
                            <CardActionArea>
                                <CardContent sx={{ py: 0, px: 0 }}>
                                    {templateName.includes('head') || templateName.includes('list') ?
                                        <Typography gutterBottom variant="h4" component="div">
                                            {headline}
                                        </Typography>
                                        : null}
                                    {templateName.includes('sum') || templateName.includes('list') ?
                                        <Typography sx={{ mb: 2 }} variant="h6" color="text.secondary">
                                            {summary}
                                        </Typography>
                                        : null}
                                </CardContent>
                            </CardActionArea>
                        </NextLink>
                    </Card>
                    <CustomizedTimeline sx={{ my: 0, pr: 1 }} position="right">
                        {timelineRender}
                    </CustomizedTimeline>
                </React.Fragment>
            )

        } else {
            render = (
                <Card square elevation={0} sx={{ border: 2, p: 1, mb: 1, borderColor: 'secondary.main' }}>
                    <NextLink href={myUrl} passHref prefetch={(cobaltData.previewData ? false : true)}>
                        <CardActionArea>
                            <Typography sx={{ my: 0 }} variant="h5" component="div">
                                {pulsatingIcon}
                                {headline}
                            </Typography>
                            <CustomizedTimeline sx={{ my: 0, pr: 1 }} position="right">
                                {timelineRender}
                            </CustomizedTimeline>
                        </CardActionArea>
                    </NextLink>
                </Card>
            )
        }
    }
    return render;
}