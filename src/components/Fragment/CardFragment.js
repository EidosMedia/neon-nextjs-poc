import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RenderContentElement from '../RenderContent/RenderContentElement';
import { findElementsInContentJson, getImageUrl } from '../../utils/ContentUtil';
import ResourceResolver from '../../utils/ResourceResolver';
import Image from 'next/image';

export default function CardFragment({ cobaltData, gridContext }) {

    const dummyImage_landscape = 'https://dummyimage.com/1024x576/a8a8a8/FFF&text=landscape'
    const dummyImage_square = 'https://dummyimage.com/600x600/a8a8a8/FFF&text=square'
    const dummyImage_rectangle = 'https://dummyimage.com/800x600/a8a8a8/FFF&text=rectangle'

    if (cobaltData) {
        // console.log("CONTENT")
        // console.log(JSON.stringify(cobaltData.object.helper.content, null, 2))
    }

    let templateName = ""
    if (cobaltData) {
        templateName = cobaltData.linkContext.linkTemplate;
    }

    let headline = null;
    try {
        headline = <RenderContentElement jsonElement={findElementsInContentJson(['headline'], cobaltData.object.helper.content)[0]} renderMode="teaser" />
    } catch (e) {
    }

    let summary = null;
    try {
        summary = <RenderContentElement jsonElement={findElementsInContentJson(['summary'], cobaltData.object.helper.content)[0]} />
    } catch (e) {
    }

    let mainPictureLandscapeUrl = null;
    let mainPictureSquareUrl = null;
    let mainPictureRectangleUrl = null;

    try {
        const mainPictureElement = findElementsInContentJson(['mediagroup'], cobaltData.object.helper.content)[0].elements[0];
        //console.log(JSON.stringify(mainPictureElement,null,2))

        mainPictureLandscapeUrl = ResourceResolver(getImageUrl(mainPictureElement, "landscape"), (cobaltData.previewData ? cobaltData.previewData.emauth : null), (cobaltData.previewData ? cobaltData.previewData.previewToken : null));
        mainPictureSquareUrl = ResourceResolver(getImageUrl(mainPictureElement, "square"), (cobaltData.previewData ? cobaltData.previewData.emauth : null), (cobaltData.previewData ? cobaltData.previewData.previewToken : null));
        mainPictureRectangleUrl = ResourceResolver(getImageUrl(mainPictureElement, "rect"), (cobaltData.previewData ? cobaltData.previewData.emauth : null), (cobaltData.previewData ? cobaltData.previewData.previewToken : null));
    } catch (e) {
        //console.log(e)
    }

    let headlineVariant = "h6";
    let headlineVariantSm = "h4";

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

        if (gridContext.md < 3) {
            headlineVariant = "body2"
            headlineVariantSm = "h6";
        } else {
            headlineVariant = "h7"
            headlineVariantSm = "h6";
        }
    }

    if (templateName.includes('picsmall')) {
        image = mainPictureSquareUrl
        imageWidth = 600;
        imageHeight = 600;
        // image = dummyImage_square
        //cardStyle = { display: 'flex' }
        imgStyle = { width: '30%' }
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
                {templateName.includes('pic') ?
                    <Image
                        src={image}
                        width={imageWidth}
                        height={imageHeight} /> : null}
                <CardContent sx={{ py: 1, px: 0, '&:last-child': { pb: 1 } }}>
                    {templateName.includes('head') ?
                        <Typography gutterBottom variant={headlineVariant} component="div">
                            {headline}
                        </Typography>
                        : null}
                    {templateName.includes('sum') ?
                        <Typography variant="body2" color="text.secondary">
                            {summary}
                            {/* Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica */}
                        </Typography>
                        : null}
                </CardContent>
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
                {templateName.includes('pic') ?
                    <Image
                        src={image}
                        width={imageWidth}
                        height={imageHeight} /> : null}
                <CardContent sx={{ py: 1, px: 0, '&:last-child': { pb: 1 } }}>
                    {templateName.includes('head') ?
                        <Typography gutterBottom variant={headlineVariantSm} component="div">
                            {headline}
                        </Typography>
                        : null}
                    {templateName.includes('sum') ?
                        <Typography variant="body2" color="text.secondary">
                            {summary}
                            {/* Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica */}
                        </Typography>
                        : null}
                </CardContent>
            </Card>
        </React.Fragment>
    );
}