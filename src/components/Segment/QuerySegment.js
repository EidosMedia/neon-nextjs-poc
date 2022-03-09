import { Box, Grid, Typography } from "@mui/material";
import { getQueryResultObjects } from "../../lib/cobalt-cms/cobalt-helpers";
import GenericFragment from "../Fragment/GenericFragment";
import React from "react";

export default function QuerySegment({ cobaltData }) {
    let render = null;
    const queryResults = getQueryResultObjects(cobaltData);
    let kicker = null;
    try {
        kicker = cobaltData.linkContext.linkData.parameters.kicker
    } catch (e) { }

    render = (
        <Grid container spacing={2}>
            {queryResults.map((object, i) => (
                <Grid key={i} item xs={12} md={4}>
                    <GenericFragment cobaltData={object} gridContext={{ xs: 12, md: 4 }} />
                </Grid>
            ))}
        </Grid>
    )

    if (kicker) {
        render = <React.Fragment>.
            <Box display="flex" justifyContent="space-between">
                <Typography sx={{ mx: 0, my: 1, color: 'secondary.main' }} variant="h6" component="h5">
                    {kicker}
                </Typography>
            </Box>
            {render}
        </React.Fragment>
    }

    return render;
}