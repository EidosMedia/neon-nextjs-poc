import useSWR from 'swr'
import axios from 'axios'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { styled, Typography } from '@mui/material';
import { getCobaltLiveblogPostHelper } from '../../lib/cobalt-cms/cobalt-helpers';
import RenderContentElement from '../RenderContent/RenderContentElement';
import { findElementsInContentJson } from '../../utils/ContentUtil';
import { Box } from '@mui/system';


const fetcher = url => axios.get(url).then(res => res.data)

export default function LiveblogFragment({ cobaltData, gridContext }) {
    let render = null;
    if (cobaltData) {
        let blogId = cobaltData.object.data.id;
        console.log("liveblog linkContext");
        console.log(cobaltData.linkContext)

        let  data, error = null;

        ({ data, error } = useSWR('/api/liveblogs/' + blogId, fetcher));

        if (error) return <div>Failed to load</div>
        if (!data) return <div>Loading...</div>

        const CustomizedTimeline = styled(Timeline)`
        .MuiTimelineItem-root:before {
            content: none
        }
        `;

        let postCount = 3;
        if(cobaltData.linkContext && cobaltData.linkContext.linkData && cobaltData.linkContext.linkData.parameters && cobaltData.linkContext.linkData.parameters.count){
            postCount = cobaltData.linkContext.linkData.parameters.count
        }

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
        


        render = (
            <Box sx={{ borderTop: 1, borderBottom: 1, borderColor: 'grey.500' }}>
                <Typography sx={{ my: 0 }} variant="h6" component="div">
                    {pulsatingIcon}
                    <RenderContentElement jsonElement={findElementsInContentJson(['headline'], cobaltData.object.helper.content)[0]} />
                </Typography>
                <CustomizedTimeline sx={{ my: 0 }} position="right">
                    {data.result.slice(0,postCount).map((post, i, { length }) => {
                        let itemRender = null;
                        const postContent = getCobaltLiveblogPostHelper(post);
                        itemRender = (
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    {(length - 1 === i ? null : <TimelineConnector />)}
                                </TimelineSeparator>
                                <TimelineContent>
                                    <RenderContentElement jsonElement={findElementsInContentJson(['h1'], postContent.content)[0]} renderMode="raw" />
                                </TimelineContent>
                            </TimelineItem>)
                        return itemRender;
                    })}
                </CustomizedTimeline>
            </Box>
        )
    }
    return render;
}