import { Box, Container, Typography } from "@mui/material";
import { getCobaltDataHelper, getDwxLinkedObjects } from "../../lib/cobalt-cms/cobalt-helpers";
import QuerySegment from "../Segment/QuerySegment";
import Segment from "../Segment/Segment";

export default function LandingPage({ cobaltData, pageTitle }) {
    const renderTest = (
        <Container maxWidth="lg">
            <Segment templateName="featured-big" />
            {/* <FeaturedSegment templateName="featured-big"/>
        <FeaturedSegment templateName="featured-condensed"/> */}
            <Segment templateName="section-teaser-big" />
            <Segment templateName="section-teaser" />
            <Segment templateName="section-teaser-big" />
            <Segment templateName="section-top" />
        </Container>
    )

    const mainObjects = getDwxLinkedObjects(cobaltData, "main");

    const render = (
        <Container maxWidth="lg">
            {(pageTitle?
            <Box sx={{mb:2, backgroundColor:'secondary.main'}} 
                display="flex"
                justifyContent="center"
                alignItems="center">
                <Typography sx={{color: 'primary.main'}} variant="h3" component="h3">
                    {pageTitle}
                </Typography>
            </Box>:null)}
            {mainObjects.map((obj,i) => {
                switch (obj.object.data.sys.baseType) {
                    case "webpagefragment":
                        return <Segment key={i} cobaltData={obj} />;
                        break;
                    case "query":
                        return <QuerySegment key={i} cobaltData={obj} />
                        break;
                }

            })}
        </Container>
    )

    return render;
}