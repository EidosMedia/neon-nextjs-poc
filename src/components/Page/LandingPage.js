import { Box, Container, Typography } from "@mui/material";
import HTMLComment from "react-html-comment";
import { getCobaltDataHelper, getDwxLinkedObjects } from "../../lib/cobalt-cms/cobalt-helpers";
import QuerySegment from "../Segment/QuerySegment";
import Segment from "../Segment/Segment";
import GenericWidget from "../Widgets/GenericWidget";

export default function LandingPage({ cobaltData, pageTitle, analyticsReport }) {
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

    //Swing quick open
    let uuid = null;
    try {uuid = 'Methode uuid: "' + cobaltData.object.data.foreignId +'"'}catch(e){}

    const render = (
        <Container maxWidth="lg">
             {uuid?<HTMLComment text={uuid}/>:null}
            {(pageTitle ?
                <Box sx={{ mb: 2, backgroundColor: 'secondary.main' }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Typography sx={{ color: 'primary.main' }} variant="h4" component="h4">
                        {pageTitle}
                    </Typography>
                </Box> : null)}
            {mainObjects.map((obj, i) => {
                switch (obj.object.data.sys.baseType) {
                    case "webpagefragment":
                        return <Segment key={i} cobaltData={obj} analyticsReport={analyticsReport} />;
                        break;
                    case "query":
                        return <QuerySegment key={i} cobaltData={obj} />
                        break;
                    case "widget":
                        return <GenericWidget key={i} cobaltData={obj} />;
                }

            })}
            
        </Container>

    )

    return render;
}