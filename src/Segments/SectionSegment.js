import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import CardFragment from "../Fragments/CardFragment";

export default function SectionSegment({ templateName }) {
    let render = null;
    switch (templateName) {
        case 'section-teaser':
            render = (
                <React.Fragment>
                    <Box sx={{ my: 1, borderTop: 1, borderColor: 'grey.500' }}>
                        <Typography sx={{ my: 1 }} variant="h4" component="div">Section</Typography>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <CardFragment templateName="head-picsmall" gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment templateName="head-picsmall" gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment templateName="head-picsmall" gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment templateName="head-picsmall" gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment templateName="head-picsmall" gridContext={{ xs: 12, md: 3 }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CardFragment templateName="head-sum-pic" gridContext={{ xs: 12, md: 6 }} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <CardFragment templateName="head" gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment templateName="head" gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment templateName="head" gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment templateName="head" gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment templateName="head" gridContext={{ xs: 12, md: 3 }} />
                        </Grid>
                    </Grid>
                </React.Fragment>
            );
            break;
        case 'section-teaser-big':
            render = (
                <React.Fragment>
                    <Box sx={{ my: 1, borderTop: 1, borderColor: 'grey.500' }}>
                        <Typography sx={{ my: 1 }} variant="h4" component="div">Section</Typography>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={9}>
                            <CardFragment templateName="head-sum-pic" gridContext={{ xs: 12, md: 9 }} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <CardFragment templateName="head-picsmall" gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment templateName="head-picsmall" gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment templateName="head-picsmall" gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment templateName="head-picsmall" gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment templateName="head-picsmall" gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment templateName="head-picsmall" gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment templateName="head-picsmall" gridContext={{ xs: 12, md: 3 }} />
                        </Grid>
                    </Grid>
                </React.Fragment>
            );
            break;
        case 'section-top':
            render = (
                <React.Fragment>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <CardFragment templateName="head-sum-pic" gridContext={{ xs: 12, md: 6 }} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <CardFragment templateName="head-picsmall" gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment templateName="head" gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment templateName="head-picsmall" gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment templateName="head" gridContext={{ xs: 12, md: 3 }} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <CardFragment templateName="head" gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment templateName="head-picsmall" gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment templateName="head" gridContext={{ xs: 12, md: 3 }} />
                            <CardFragment templateName="head-picsmall" gridContext={{ xs: 12, md: 3 }} />
                        </Grid>
                    </Grid>
                </React.Fragment>
            )
    }
    return render;
}