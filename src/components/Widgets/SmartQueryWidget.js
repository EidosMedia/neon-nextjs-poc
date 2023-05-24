import { Box, Card, CardActionArea, CardContent, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import NextLink from 'next/link'
import React from "react";

export default function SmartQueryWidget({ cobaltData, semanticSearchData, gridContext }) {
    let render = null;
    // let relevancyThreshold = 0.80
    // switch(cobaltData.linkContext.linkData.parameters.relevancy){
    //     case 'high':
    //         relevancyThreshold = 0.90
    //         break;
    //     case 'medium':
    //         relevancyThreshold = 0.80
    //         break;
    //     case 'low':
    //         relevancyThreshold = 0.70
    //         break;
    //     default:
    //         relevancyThreshold = 0
    // }
    let varietyThreshold = 0
    switch(cobaltData.linkContext.linkData.parameters.variety){
        case 'high':
            varietyThreshold = 0.90
            break;
        case 'medium':
            varietyThreshold = 0.95
            break;
        case 'low':
            varietyThreshold = 0.99
            break;
        default:
            varietyThreshold = 0
    }
    
    const boxTitle = cobaltData.linkContext.linkData.parameters.topic

    let list = semanticSearchData.matches
    
    list = list.filter((el, i) => {
        let include = true;
        for (let j = 0; j < i; j++) {
            if (semanticSearchData.similarities[i][j] > varietyThreshold) {
                include = false
            }
        }
        return include
    })
    

    if (list) {
        list = list.slice(0,7)
        render = (
            <Container maxWidth="lg">
                {(boxTitle ?
                    <Box sx={{ p:1, mb: 2, backgroundColor:'secondary.main'}}
                        display="flex"
                        justifyContent="start"
                        alignItems="center">
                        <Typography sx={{ color: 'primary.main' }} variant="h4" component="h4">
                            {boxTitle}
                        </Typography>
                    </Box> : null)}
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        {list.slice(0, 1).map((object, i) => <SmartQueryFragment data={object} includeSummary={true} gridContext={{ xs: 12, md: 8 }}/>)}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {list.slice(1, 3).map((object, i) => <SmartQueryFragment data={object} includeSummary={true} gridContext={{ xs: 12, md: 4 }}/>)}
                    </Grid>
                    {list.slice(3).map((object, i) => (
                        <Grid key={i} item xs={12} md={3}>
                            <SmartQueryFragment data={object} includeSummary={true} gridContext={{ xs: 12, md: 3 }}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        )
    }
    return render;
}

function SmartQueryFragment({ data, includeSummary, gridContext }) {
    let render = null;

    let imageWidth = 800;
    let imageHeight = 600;

    const myUrl = "/";

    let headlineVariant = "h4"

    if (gridContext && (gridContext.md < 6)) {
        imageWidth = 1024;
        imageHeight = 576;
    }
    if (gridContext.md >= 6) {
        headlineVariant = "h4"
    } else if (gridContext.md >= 3) {
        headlineVariant = "h6"
    } else {
        headlineVariant = "body1"
    }

    render = (
        <React.Fragment>
            <Card square elevation={0} sx={{ display: { xs: 'none', md: 'block' } }}>
                <Image src={data.metadata.url} width={imageWidth} height={imageHeight} />
                <NextLink href={myUrl}>
                    <CardActionArea>
                        <CardContent sx={{ py: 0, px: 0 }}>
                            <Typography gutterBottom variant={headlineVariant} component="div">
                                {data.metadata.headline}
                            </Typography>
                            {includeSummary ?
                                <Typography sx={{ mb: 2 }} variant="body1" color="text.secondary">
                                    {data.metadata.summary}
                                </Typography>
                                : null}
                        </CardContent>
                    </CardActionArea>
                </NextLink>
            </Card>
            <Card square elevation={0} sx={{ display: { xs: 'block', md: 'none' }, borderBottom: 1, borderColor: 'grey.500' }}>
                <Image src={data.metadata.url} width={imageWidth} height={imageHeight} />
                <NextLink href={myUrl}>
                    <CardActionArea>
                        <CardContent sx={{ py: 0, px: 0 }}>
                            <Typography gutterBottom variant={headlineVariant} component="div">
                                {data.metadata.headline}
                            </Typography>
                            {includeSummary ?
                                <Typography sx={{ mb: 2 }} variant="h6" color="text.secondary">
                                    {data.metadata.summary}
                                </Typography>
                                : null}
                        </CardContent>
                    </CardActionArea>
                </NextLink>
            </Card>
        </React.Fragment>
    )

    return render;
}


