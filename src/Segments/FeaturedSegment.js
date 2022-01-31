import { Grid } from "@mui/material";
import CardFragment from "../Fragments/CardFragment";

export default function FeaturedSegment({ templateName }) {
    let render = null;
    switch (templateName) {
        case 'featured-standard':
            render = (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3} order={{xs:2,md:1}}>
                        <CardFragment templateName="head-pic" gridContext={{ xs: 12, md: 3 }} />
                        <CardFragment templateName="head-pic" gridContext={{ xs: 12, md: 3 }} />
                    </Grid>
                    <Grid item xs={12} md={6} order={{xs:1,md:2}}>
                        <CardFragment templateName="head-sum-pic" gridContext={{ xs: 12, md: 6 }} />
                    </Grid>
                    <Grid item xs={12} md={3} order={{xs:6,md:3}}>
                        <CardFragment templateName="head-pic" gridContext={{ xs: 12, md: 3 }} />
                        <CardFragment templateName="head" gridContext={{ xs: 12, md: 3 }} />
                        <CardFragment templateName="head" gridContext={{ xs: 12, md: 3 }} />
                        <CardFragment templateName="head" gridContext={{ xs: 12, md: 3 }} />
                    </Grid>
                    <Grid item xs={12} md={4} order={{xs:3,md:4}}>
                        <CardFragment templateName="head-pic" gridContext={{ xs: 12, md: 4 }} />
                    </Grid>
                    <Grid item xs={12} md={4} order={{xs:4,md:5}}>
                        <CardFragment templateName="head-pic" gridContext={{ xs: 12, md: 4 }} />
                    </Grid>
                    <Grid item xs={12} md={4} order={{xs:5,md:6}}>
                        <CardFragment templateName="head-pic" gridContext={{ xs: 12, md: 4 }} />
                    </Grid>
                </Grid>
            );
            break;
        case 'featured-big':
            render = (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={9}>
                        <CardFragment templateName="head-sum-pic" gridContext={{ xs: 12, md: 9 }} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <CardFragment templateName="head-pic" gridContext={{ xs: 12, md: 3 }} />
                        <CardFragment templateName="head-sum" gridContext={{ xs: 12, md: 3 }} />
                        <CardFragment templateName="head" gridContext={{ xs: 12, md: 3 }} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CardFragment templateName="head-pic" gridContext={{ xs: 12, md: 4 }} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CardFragment templateName="head-pic" gridContext={{ xs: 12, md: 4 }} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CardFragment templateName="head-pic" gridContext={{ xs: 12, md: 4 }} />
                    </Grid>
                </Grid>
            )
            break;
            case 'featured-condensed':
                render = (
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
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
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <CardFragment templateName="head-pic" gridContext={{ xs: 12, md: 2 }} />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <CardFragment templateName="head-pic" gridContext={{ xs: 12, md: 2 }} />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <CardFragment templateName="head-pic" gridContext={{ xs: 12, md: 2 }} />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <CardFragment templateName="head-pic" gridContext={{ xs: 12, md: 2 }} />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <CardFragment templateName="head-pic" gridContext={{ xs: 12, md: 2 }} />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <CardFragment templateName="head-pic" gridContext={{ xs: 12, md: 2 }} />
                        </Grid>
                    </Grid>
                );
                break;
        
    }
    return render;
}