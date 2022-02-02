import { Container } from "@mui/material";
import { getCobaltDataHelper, getDwxLinkedObjects } from "../../lib/cobalt-cms/cobalt-helpers";
import QuerySegment from "../Segment/QuerySegment";
import Segment from "../Segment/Segment";

export default function LandingPage({ cobaltData }) {
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
            {mainObjects.map((obj) => {
                switch(obj.object.data.sys.baseType){
                    case "webpagefragment":
                        return <Segment cobaltData={obj} />;
                        break;
                    case "query":                        
                        return <QuerySegment cobaltData={obj} />
                        break;
                }
                
            })}
        </Container>
    )

    return render;
}