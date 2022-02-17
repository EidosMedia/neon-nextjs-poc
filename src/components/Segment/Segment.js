import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { getCobaltDataHelper, getDwxLinkedObjects } from "../../lib/cobalt-cms/cobalt-helpers";
import GenericFragment from "../Fragment/GenericFragment";

export default function Segment({ cobaltData }) {
    let render = null;
    let templateName = null;
    if (cobaltData.linkContext) {
        templateName = cobaltData.linkContext.linkTemplate;
    } else {
        // Might be a preview request directly on the Segment
        templateName = cobaltData.object.helper.pageTemplate;
    }
    let firstObjects = []
    firstObjects = getDwxLinkedObjects(cobaltData, "first")
    let secondObjects = []
    secondObjects = getDwxLinkedObjects(cobaltData, "second")
    let opinionObjects = []
    opinionObjects = getDwxLinkedObjects(cobaltData, "opinion")
    let extraObjects = []
    extraObjects = getDwxLinkedObjects(cobaltData, "extra")

    let sectionHeadline = null;
    try {
        sectionHeadline = cobaltData.object.data.attributes.classification.genres[0]
    } catch (e) { }

    switch (templateName) {
        case 'featured_standard':
            render = (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3} order={{ xs: 2, md: 1 }}>
                        {secondObjects.map((object,i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 3 }} />)}
                    </Grid>
                    <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
                        {firstObjects.map((object,i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 6 }} />)}
                    </Grid>
                    <Grid item xs={12} md={3} order={{ xs: 3, md: 3 }}>
                        {opinionObjects.map((object,i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 3 }} />)}
                    </Grid>
                    {extraObjects.map((object,i) => (
                        <Grid item xs={12} md={2} order={{ xs: 4, md: 4 }} key={i}>
                            <GenericFragment cobaltData={object} gridContext={{ xs: 12, md: 2 }} />
                        </Grid>
                    ))}
                </Grid>
            );
            break;
        case 'featured_big':
            render = (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        {firstObjects.map((object,i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 8 }} />)}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {secondObjects.map((object,i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 4 }} />)}
                    </Grid>
                    {opinionObjects.slice(0, 3).map((object,i) => (
                        <Grid key={i} item xs={12} md={4}>
                            <GenericFragment cobaltData={object} gridContext={{ xs: 12, md: 4 }} />
                        </Grid>
                    ))}
                    {extraObjects.map((object,i) => (
                        <Grid key={i} item xs={12} md={2}>
                            <GenericFragment cobaltData={object} gridContext={{ xs: 12, md: 2 }} />
                        </Grid>
                    ))}
                </Grid>
            )
            break;
        case 'featured_condensed':
            render = (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 6 }} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 2 }} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 2 }} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 2 }} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 2 }} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 2 }} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <GenericFragment cobaltData={null} gridContext={{ xs: 12, md: 2 }} />
                    </Grid>
                </Grid>
            );
            break;
        case 'section_teaser':
            render = (
                <React.Fragment>
                    <Box sx={{ my: 1, borderTop: 2, borderColor: 'grey.500' }}>
                        <Typography sx={{ my: 1 }} variant="h4" component="div">{sectionHeadline}</Typography>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            {firstObjects.map((object,i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 6 }} />)}
                        </Grid>
                        <Grid item xs={12} md={3}>
                            {secondObjects.slice(0, 3).map((object,i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 3 }} />)}
                        </Grid>
                        <Grid item xs={12} md={3}>
                            {secondObjects.slice(3, 6).map((object,i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 3 }} />)}
                        </Grid>
                    </Grid>
                </React.Fragment>
            );
            break;
        case 'section_teaser_big':
            render = (
                <React.Fragment>
                    <Box sx={{ my: 1, borderTop: 2, borderColor: 'grey.500' }}>
                        <Typography sx={{ my: 1 }} variant="h4" component="div">{sectionHeadline}</Typography>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={9}>
                            {firstObjects.map((object,i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 9 }} />)}
                        </Grid>
                        <Grid item xs={12} md={3}>
                            {secondObjects.map((object,i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 3 }} />)}
                        </Grid>
                        {opinionObjects.slice(0, 3).map((object,i) => (
                            <Grid key={i} item xs={12} md={4}>
                                <GenericFragment cobaltData={object} gridContext={{ xs: 12, md: 4 }} />
                            </Grid>
                        ))}
                        {extraObjects.map((object,i) => (
                            <Grid key={i} item xs={12} md={2}>
                                <GenericFragment cobaltData={object} gridContext={{ xs: 12, md: 2 }} />
                            </Grid>
                        ))}
                    </Grid>
                </React.Fragment>
            );
            break;
        case 'section_top':
            render = (
                <React.Fragment>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            {firstObjects.map((object,i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 6 }} />)}
                        </Grid>
                        <Grid item xs={12} md={3}>
                            {secondObjects.slice(0, 3).map((object,i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 3 }} />)}
                        </Grid>
                        <Grid item xs={12} md={3}>
                            {secondObjects.slice(3, 6).map((object,i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 3 }} />)}
                        </Grid>
                    </Grid>
                </React.Fragment>
            )
    }
    if(cobaltData.previewData){
        // In preview mode, wrap the DWC with a maxWidth container identical to homepage
        render = <Container maxWidth="lg">
            {render}
        </Container>
    }
    return render;
}