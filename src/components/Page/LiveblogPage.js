import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";
import { Container, Typography, styled } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import Image from "next/image";
import useSWR from "swr";
import { getCobaltLiveblogPostHelper } from "../../lib/cobalt-cms/cobalt-helpers";
import { findElementsInContentJson, getImageUrl } from "../../utils/ContentUtil";
import ResourceResolver from "../../utils/ResourceResolver";
import RenderContentElement, { CloudinaryVideo } from "../RenderContent/RenderContentElement";

const fetcher = url => axios.get(url).then(res => res.data)

export default function LiveblogPage({ cobaltData }) {
    
    let render = null;

    if (cobaltData) {
        let data, error = null;
        ({ data, error } = useSWR('/api/' + cobaltData.siteContext.site + '/liveblogs/' + cobaltData.object.data.id, fetcher, { refreshInterval: 5000, dedupingInterval: 0 }));

        let headline = null;
        try {
            headline = <RenderContentElement jsonElement={findElementsInContentJson(['headline'], cobaltData.object.helper.content)[0]} />
        } catch (e) { }

        let summary = null;
        try {
            summary = <RenderContentElement jsonElement={findElementsInContentJson(['summary'], cobaltData.object.helper.content)[0]} />
        } catch (e) { }


        let content = null;
        try {
            content = <RenderContentElement jsonElement={findElementsInContentJson(['content'], cobaltData.object.helper.content)[0]} renderMode='styled' cobaltData={cobaltData} />
        } catch (e) {
            console.log(e)
        }

        let postsRender = null;

        if (error) postsRender = <div>Failed to load</div>
        if (!data) postsRender = <div>Loading...</div>

        const CustomizedTimeline = styled(Timeline)`
        .MuiTimelineItem-root:before {
            content: none
        }
        `;

        postsRender = (
            <Box sx={{ borderTop: 1, borderBottom: 1, borderColor: 'grey.500' }}>
                <Typography sx={{ my: 0 }} variant="h6" component="div">
                    {headline}
                </Typography>
                <CustomizedTimeline sx={{ my: 0, pr: 1 }} position="right">
                    {data.result.map((post, i, { length }) => {
                        let itemRender = null;
                        const postContent = getCobaltLiveblogPostHelper(post);
                        itemRender = (
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    {(length - 1 === i ? null : <TimelineConnector />)}
                                </TimelineSeparator>
                                <TimelineContent sx={{ pr: 0 }}>
                                    <RenderContentElement jsonElement={findElementsInContentJson(['h1'], postContent.content)[0]} />
                                </TimelineContent>
                            </TimelineItem>)
                        return itemRender;
                    })}
                </CustomizedTimeline>
            </Box>
        )

        render = (
            <Container maxWidth="lg">
                <Container sx={{ my: 2 }} maxWidth="sm">
                    <Box display="flex"
                        justifyContent="center"
                        alignItems="center">
                        <Typography variant="h4" component="h1" sx={{ fontStyle: 'italic', fontWeight: 'medium' }}>
                            {headline}
                        </Typography>
                    </Box>
                </Container>
                {summary ?
                    <Container sx={{ my: 2 }} maxWidth="sm">
                        <Box display="flex"
                            justifyContent="center"
                            alignItems="center">
                            <Typography variant="h6" component="h2">
                                {summary}
                            </Typography>
                        </Box>
                    </Container>
                    : null}
                {content}
                {postsRender}
            </Container>
        )
    }
    return render;
}