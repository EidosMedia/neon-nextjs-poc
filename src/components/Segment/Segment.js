import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { getCobaltDataHelper, getDwxLinkedObjects } from "../../lib/cobalt-cms/cobalt-helpers";
import CardFragment from "../Fragment/CardFragment";

export default function Segment({ cobaltData }) {
    let render = null;
    let templateName = null;
    if (cobaltData.linkContext) {
        templateName = cobaltData.linkContext.linkTemplate;
    } else {
        // Might be a preview request directly on the Segment
        templateName = cobaltData.object.helper.pageTemplate;
    }
    // console.log("HERE1")
    // console.log(JSON.stringify(cobaltData.object.helper, null, 2))
    let firstObjects = []
    firstObjects = getDwxLinkedObjects(cobaltData, "first")
    let secondObjects = []
    secondObjects = getDwxLinkedObjects(cobaltData, "second")
    let opinionObjects = []
    opinionObjects = getDwxLinkedObjects(cobaltData, "opinion")
    let extraObjects = []
    extraObjects = getDwxLinkedObjects(cobaltData, "extra")

    console.log(secondObjects)

    switch (templateName) {
        case 'featured_standard':
            render = (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3} order={{ xs: 2, md: 1 }}>
                        {secondObjects.map((object) => <CardFragment cobaltData={object} gridContext={{ xs: 12, md: 3 }} />)}
                    </Grid>
                    <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
                        {firstObjects.map((object) => <CardFragment cobaltData={object} gridContext={{ xs: 12, md: 6 }} />)}
                    </Grid>
                    <Grid item xs={12} md={3} order={{ xs: 6, md: 3 }}>
                        {opinionObjects.map((object) => <CardFragment cobaltData={object} gridContext={{ xs: 12, md: 3 }} />)}
                    </Grid>
                    {extraObjects.map((object) => (
                        <Grid item xs={12} md={2} order={{ xs: 3, md: 4 }}>
                            <CardFragment cobaltData={object} gridContext={{ xs: 12, md: 2 }} />
                        </Grid>
                    ))}
                </Grid>
            );
            break;
        case 'featured_big':
            render = (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={9}>
                    {firstObjects.map((object) => <CardFragment cobaltData={object} gridContext={{ xs: 12, md: 9 }} />)}
                    </Grid>
                    <Grid item xs={12} md={3}>
                    {secondObjects.map((object) => <CardFragment cobaltData={object} gridContext={{ xs: 12, md: 3 }} />)}
                    </Grid>
                    {opinionObjects.slice(0,3).map((object) => (
                        <Grid item xs={12} md={4}>
                            <CardFragment cobaltData={object} gridContext={{ xs: 12, md: 4 }} />
                        </Grid>
                    ))}
                    {extraObjects.map((object) => (
                        <Grid item xs={12} md={2}>
                            <CardFragment cobaltData={object} gridContext={{ xs: 12, md: 2 }} />
                        </Grid>
                    ))}
                </Grid>
            )
            break;
        case 'featured_condensed':
            render = (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                        <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                        <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                        <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 6 }} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                        <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                        <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                        <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 2 }} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 2 }} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 2 }} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 2 }} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 2 }} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 2 }} />
                    </Grid>
                </Grid>
            );
            break;
        case 'section_teaser':
            render = (
                <React.Fragment>
                    <Box sx={{ my: 1, borderTop: 2, borderColor: 'grey.500' }}>
                        <Typography sx={{ my: 1 }} variant="h4" component="div">Section</Typography>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            {firstObjects.map((object) => <CardFragment cobaltData={object} gridContext={{ xs: 12, md: 6 }} />)}
                        </Grid>
                        <Grid item xs={12} md={3}>
                            {secondObjects.slice(0,3).map((object) => <CardFragment cobaltData={object} gridContext={{ xs: 12, md: 3 }} />)}
                        </Grid>
                        <Grid item xs={12} md={3}>
                            {secondObjects.slice(3,6).map((object) => <CardFragment cobaltData={object} gridContext={{ xs: 12, md: 3 }} />)}
                        </Grid>
                    </Grid>
                </React.Fragment>
            );
            break;
        case 'section_teaser_big':
            render = (
                <React.Fragment>
                    <Box sx={{ my: 1, borderTop: 2, borderColor: 'grey.500' }}>
                        <Typography sx={{ my: 1 }} variant="h4" component="div">Section</Typography>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={9}>
                            <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 9 }} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 4 }} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 4 }} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 4 }} />
                        </Grid>
                    </Grid>
                </React.Fragment>
            );
            break;
        case 'section_top':
            render = (
                <React.Fragment>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 6 }} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment cobaltData={null} gridContext={{ xs: 12, md: 3 }} />
                        </Grid>
                    </Grid>
                </React.Fragment>
            )
    }
    return render;
}