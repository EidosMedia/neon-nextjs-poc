import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RenderContentElement, { CloudinaryVideo } from '../RenderContent/RenderContentElement';
import { checkIsCloudinaryVideo, findElementsInContentJson, getImageUrl } from '../../utils/ContentUtil';
import ResourceResolver from '../../utils/ResourceResolver';
import Image from 'next/image';
import WeatherWidget from '../Widgets/WeatherWidget';
import NextLink from 'next/link'
import { Link as MUILink } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { Box } from '@mui/system';
import { getImageFormatUrl } from '../../lib/cobalt-cms/cobalt-helpers';

export default function StoryFragment({ cobaltData, gridContext }) {

    const dummyImage_landscape = 'https://dummyimage.com/1024x576/a8a8a8/FFF&text=landscape'
    const dummyImage_square = 'https://dummyimage.com/600x600/a8a8a8/FFF&text=square'
    const dummyImage_rectangle = 'https://dummyimage.com/800x600/a8a8a8/FFF&text=rectangle'

    // if (cobaltData) {
    //     console.log("CONTENT")
    //     console.log(JSON.stringify(cobaltData.object.helper.content, null, 2))
    // }

    let templateName = ""
    if (cobaltData) {
        templateName = cobaltData.linkContext.linkTemplate;
    }

    let myUrl = "/"
    try {
        myUrl = cobaltData.pageContext.nodesUrls[cobaltData.object.data.id]
    } catch (e) { }

    let variantId = 0

    if (cobaltData.abTesting && cobaltData.abTesting.variant) {
        [, variantId] = cobaltData.abTesting.variant.split('.');
    }

    let headline = null;

    if (variantId > 0) {
        try {
            headline = cobaltData.linkContext.linkData.parameters['customHeadline_v' + variantId]
        } catch (e) { }
    }
    if (!headline) {
        try {
            headline = cobaltData.linkContext.linkData.parameters.customHeadline
        } catch (e) { }
    }
    if (!headline) {
        try {
            headline = <RenderContentElement jsonElement={findElementsInContentJson(['headline'], cobaltData.object.helper.content)[0]} />
        } catch (e) {
        }
    }

    let summary = null;
    if (variantId > 0) {
        try {
            summary = cobaltData.linkContext.linkData.parameters['customSummary_v' + variantId]
        } catch (e) { }
    }
    if (!summary) {
        try {
            summary = cobaltData.linkContext.linkData.parameters.customSummary
        } catch (e) { }
    }
    if (!summary) {
        try {
            summary = <RenderContentElement jsonElement={findElementsInContentJson(['summary'], cobaltData.object.helper.content)[0]} />
        } catch (e) {
        }
    }

    let additionalLinks = null;
    try {
        additionalLinks = JSON.parse(cobaltData.linkContext.linkData.parameters.customLinks)
    } catch (e) { }

    let additionalLinksInlineRender = null;
    let additionalLinksBelowRender = null;
    if (additionalLinks) {
        additionalLinksInlineRender = additionalLinks
            .filter((l) => (l['show_v' + variantId] && l['show_v' + variantId] === 'inline') || (!l['show_v' + variantId] && l.show === "inline"))
            .map((l) => {
                let linkedObjectUrl = '/'
                if (cobaltData.previewData) { //TODO manage the link in preview
                    linkedObjectUrl = '/preview'
                } else {
                    try {
                        linkedObjectUrl = cobaltData.pageContext.nodesUrls[l.id]
                    } catch (e) { }
                }
                if(!linkedObjectUrl){linkedObjectUrl = "/"}
                return (
                    <React.Fragment>
                        <span> / </span>
                        <NextLink href={linkedObjectUrl} passHref>
                            <MUILink underline="hover" component="span" color="secondary" sx={{ fontWeight: 500 }}>
                                {(l['headline_v' + variantId] ? l['headline_v' + variantId] : l.headline)}
                            </MUILink>
                        </NextLink>
                    </React.Fragment>
                )
            })


        additionalLinksBelowRender = additionalLinks
            .filter((l) => (l['show_v' + variantId] && l['show_v' + variantId] === 'below') || (!l['show_v' + variantId] && l.show === "below"))
            .map((l) => {
                let linkedObjectUrl = '/'
                if (cobaltData.previewData) { //TODO manage the link in preview
                    linkedObjectUrl = '/preview'
                } else {
                    try {
                        linkedObjectUrl = cobaltData.pageContext.nodesUrls[l.id]
                    } catch (e) { }
                }
                if(!linkedObjectUrl){linkedObjectUrl = "/"}
                return (
                    <Typography variant="body2" component="li">
                        <NextLink href={linkedObjectUrl} passHref>
                            <MUILink underline="hover" color="grey.500">
                                {(l['headline_v' + variantId] ? l['headline_v' + variantId] : l.headline)}
                            </MUILink>
                        </NextLink>
                    </Typography>
                )
            })
        if (additionalLinksBelowRender) {
            additionalLinksBelowRender = (
                <Box sx={{ pb: 1 }}>
                    {additionalLinksBelowRender}
                </Box>
            )
        }
    }

    let mainPictureElement = null;
    let mainPictureLandscapeUrl = null;
    let mainPictureSquareUrl = null;
    let mainPictureRectangleUrl = null;
    let cloudinaryVideo = null;
    let extraElement = null;
    try {
        mainPictureElement = findElementsInContentJson(['mediagroup'], cobaltData.object.helper.content)[0].elements[0];
        extraElement = findElementsInContentJson(['extra'], cobaltData.object.helper.content);
        try {
            cloudinaryVideo = extraElement[0].elements.find((el) => {
                let found = false;
                try {
                    found = (el.attributes['emk-type'] == 'cloudinaryVideo')
                } catch (e) { }
                return found
            })
        } catch (e) { }

        mainPictureLandscapeUrl = ResourceResolver(getImageFormatUrl(getImageUrl(mainPictureElement, "landscape",cobaltData),'medium'), (cobaltData.previewData ? cobaltData.previewData : null), cobaltData.siteContext.site);
        mainPictureSquareUrl = ResourceResolver(getImageFormatUrl(getImageUrl(mainPictureElement, "square",cobaltData),'medium'), (cobaltData.previewData ? cobaltData.previewData : null), cobaltData.siteContext.site);
        mainPictureRectangleUrl = ResourceResolver(getImageFormatUrl(getImageUrl(mainPictureElement, "rect",cobaltData),'medium'), (cobaltData.previewData ? cobaltData.previewData : null), cobaltData.siteContext.site);
    } catch (e) {
        console.log(e)
    }



    // let image = dummyImage_rectangle;
    let image = mainPictureRectangleUrl;
    let imageWidth = 800;
    let imageHeight = 600;
    //let cardStyle = null;
    let imgStyle = null;

    if (gridContext && (gridContext.md < 6)) {
        // image = dummyImage_landscape
        image = mainPictureLandscapeUrl;
        imageWidth = 1024;
        imageHeight = 576;
    }

    let headlineVariant = "h4";
    let headlineVariantSm = "h4";

    if (gridContext.md >= 6) {
        headlineVariant = "h4"
        headlineVariantSm = "h4";
    } else if (gridContext.md >= 3) {
        headlineVariant = "h6"
        headlineVariantSm = "h4";
    } else {
        headlineVariant = "body1"
        headlineVariantSm = "h6";
    }


    if (templateName.includes('picsmall')) {
        image = mainPictureSquareUrl
        imageWidth = 600;
        imageHeight = 600;
        // image = dummyImage_square
        //cardStyle = { display: 'flex' }
        imgStyle = { width: '30%' }
    }

    let mediaBlock = null;
    if (cloudinaryVideo) {
        mediaBlock = <CloudinaryVideo jsonElement={cloudinaryVideo} />
    } else if (image) {
        mediaBlock = <Image src={image} width={imageWidth} height={imageHeight} />
    }

    return (
        <React.Fragment>
            <Card square elevation={0} sx={{ display: { xs: 'none', md: 'block' } }}>
                {/* {templateName.includes('pic') ?
                    <CardMedia
                        component="img"
                        image={image}
                        alt="nothumb"
                        sx={imgStyle}
                    /> : null} */}
                {templateName.includes('pic') || templateName.includes('list') ?
                    mediaBlock : null}
                <NextLink href={myUrl} passHref prefetch={(cobaltData.previewData ? false : true)}>
                    <CardActionArea>
                        <CardContent sx={{ py: 0, px: 0 }}>
                            {templateName.includes('head') || templateName.includes('list') ?
                                <Typography gutterBottom variant={headlineVariant} component="div">
                                    {headline}{additionalLinksInlineRender}
                                </Typography>
                                : null}
                            {templateName.includes('sum') || templateName.includes('list') ?
                                <Typography sx={{ mb: 2 }} variant="body1" color="text.secondary">
                                    {summary}
                                    {/* Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica */}
                                </Typography>
                                : null}
                        </CardContent>
                    </CardActionArea>
                </NextLink>
                {additionalLinksBelowRender}
            </Card>
            <Card square elevation={0} sx={{ display: { xs: 'block', md: 'none' }, borderBottom: 1, borderColor: 'grey.500' }}>
                {/* {templateName.includes('pic') ?
                    <CardMedia
                        component="img"
                        image={image}
                        alt="nothumb"
                        sx={imgStyle}
                    /> : null}
                     */}
                {templateName.includes('pic') || templateName.includes('list') ?
                    mediaBlock : null}
                <NextLink href={myUrl} passHref prefetch={(cobaltData.previewData ? false : true)}>
                    <CardActionArea>
                        <CardContent sx={{ py: 0, px: 0 }}>
                            {templateName.includes('head') || templateName.includes('list') ?
                                <Typography gutterBottom variant={headlineVariantSm} component="div">
                                    {headline}{additionalLinksInlineRender}
                                </Typography>
                                : null}
                            {templateName.includes('sum') || templateName.includes('list') ?
                                <Typography sx={{ mb: 2 }} variant="h6" color="text.secondary">
                                    {summary}
                                    {/* Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica */}
                                </Typography>
                                : null}
                        </CardContent>
                    </CardActionArea>
                </NextLink>
                {additionalLinksBelowRender}
            </Card>
        </React.Fragment>
    );
}