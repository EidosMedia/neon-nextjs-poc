import { Container, Typography, styled } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import useSWR from "swr";
import { getCobaltLiveblogPostHelper } from "../../lib/cobalt-cms/cobalt-helpers";
import { findElementsInContentJson, getImageUrl } from "../../utils/ContentUtil";
import RenderContentElement, { CloudinaryVideo } from "../RenderContent/RenderContentElement";
import RenderLiveblogPostElement from "../RenderContent/RenderLiveblogPostElement";

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
        if (!error && data) {
            postsRender = (
                <Container sx={{ my: 2 }} maxWidth="md">
                    {data.result.map((post, i, { length }) => {
                        let itemRender = null;
                        const postContent = getCobaltLiveblogPostHelper(post);
                        let contentRender = null;
                        try {
                            contentRender = <RenderLiveblogPostElement jsonElement={findElementsInContentJson(['article'], postContent.content)[0]} renderMode='styled' cobaltData={cobaltData} />
                        } catch (e) {
                            console.log(e)
                        }
                        if (contentRender) {
                            contentRender = (
                                <Box sx={{ border: 1, borderColor: 'grey.500', my: 4, px: 2 }}>
                                    {contentRender}
                                </Box>
                            )
                        }
                        return contentRender;
                    })}
                </Container>
            )
        }
        render = (
            <Container maxWidth="lg">
                <Container sx={{ my: 2 }} maxWidth="sm">
                    <Box display="flex"
                        justifyContent="center"
                        alignItems="center">
                        <Typography variant="h3" component="h1" sx={{ fontStyle: 'italic', fontWeight: 'medium' }}>
                            {headline}
                        </Typography>
                    </Box>
                </Container>
                {summary ?
                    <Container sx={{ my: 2 }} maxWidth="sm">
                        <Box display="flex"
                            justifyContent="center"
                            alignItems="center">
                            <Typography variant="h5" component="h2">
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