import { Container } from "@mui/material";
import { getCobaltDataHelper, getDwxLinkedObjects } from "../../lib/cobalt-cms/cobalt-helpers";
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

    const mainObjects = getDwxLinkedObjects(cobaltData,"main");

    const render = (
        <Container maxWidth="lg">
            {mainObjects.map((obj) => <Segment cobaltData={obj}/>)}
            {/* {cobaltData.object.helper.zones.map((zone, i) =>
                zone.objects.map((object, j) => {
                    // Here we need to build the cobaltData for each object
                    const objNodeData = cobaltData.pageContext.nodes[object.objectId]
                    const objCobaltData = {
                        object: {
                            data: objNodeData,
                            helper: getCobaltDataHelper(objNodeData)
                        },
                        linkContext: {
                            linkData: object.linkData
                        },
                        pageContext: cobaltData.pageContext
                    }
                    console.log(JSON.stringify(objCobaltData.linkContext,undefined,2))
                    return (<Segment cobaltData={objCobaltData}/>)
                }))} */}
        </Container>
    )

    return render;
}