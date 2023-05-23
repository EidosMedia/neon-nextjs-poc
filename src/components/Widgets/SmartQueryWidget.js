import { Box, Card, CardActionArea, CardContent, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import NextLink from 'next/link'
import React from "react";

export default function SmartQueryWidget({ cobaltData, semanticSearchData, gridContext }) {
    let render = null;
    const removeSimilars = (cobaltData.linkContext.linkData.parameters.semanticDeduplication === 'yes')
    const similarityThreshold = 0.9
    
    const boxTitle = cobaltData.linkContext.linkData.parameters.topic

    let list = semanticSearchData.matches
    if (removeSimilars) {
        list = list.filter((el, i) => {
            let include = true;
            for (let j = 0; j < i; j++) {
                if (semanticSearchData.similarities[i][j] > similarityThreshold) {
                    include = false
                }
            }
            return include
        })
    }

    if (list) {
        list = list.slice(0,7)
        render = (
            <Container maxWidth="lg">
                {(boxTitle ?
                    <Box sx={{ mb: 2, backgroundColor:'secondary.main'}}
                        display="flex"
                        justifyContent="center"
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


