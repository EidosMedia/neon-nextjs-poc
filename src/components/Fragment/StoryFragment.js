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
import Link from 'next/link';
import { CardActionArea } from '@mui/material';

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

    let myUrl = ""
    try {
        myUrl = cobaltData.pageContext.nodesUrls[cobaltData.object.data.id]
    } catch (e) { }

    console.log("url: "+ myUrl)

    let headline = null;
    try {
        headline = cobaltData.linkContext.linkData.parameters.customHeadline
    } catch (e) { }

    if (!headline) {
        try {
            headline = <RenderContentElement jsonElement={findElementsInContentJson(['headline'], cobaltData.object.helper.content)[0]} />
        } catch (e) {
        }
    }

    let summary = null;
    try {
        summary = cobaltData.linkContext.linkData.parameters.customSummary
    } catch (e) { }
    if (!summary) {
        try {
            summary = <RenderContentElement jsonElement={findElementsInContentJson(['summary'], cobaltData.object.helper.content)[0]} />
        } catch (e) {
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

        mainPictureLandscapeUrl = ResourceResolver(getImageUrl(mainPictureElement, "landscape"), (cobaltData.previewData ? cobaltData.previewData : null), cobaltData.siteContext.site);
        mainPictureSquareUrl = ResourceResolver(getImageUrl(mainPictureElement, "square"), (cobaltData.previewData ? cobaltData.previewData : null), cobaltData.siteContext.site);
        mainPictureRectangleUrl = ResourceResolver(getImageUrl(mainPictureElement, "rect"), (cobaltData.previewData ? cobaltData.previewData : null), cobaltData.siteContext.site);
    } catch (e) {
        console.log(e)
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
        } else if (gridContext.md > 5) {
            headlineVariant = "h5"
            headlineVariantSm = "h5";
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
                <Link href={myUrl} passHref>
                    <CardActionArea>
                        <CardContent sx={{ py: 1, px: 0, '&:last-child': { pb: 1 } }}>
                            {templateName.includes('head') || templateName.includes('list') ?
                                <Typography gutterBottom variant={headlineVariant} component="div">
                                    {headline}
                                </Typography>
                                : null}
                            {templateName.includes('sum') || templateName.includes('list') ?
                                <Typography variant="body2" color="text.secondary">
                                    {summary}
                                    {/* Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica */}
                                </Typography>
                                : null}
                        </CardContent>
                    </CardActionArea>
                </Link>
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
                <CardContent sx={{ py: 1, px: 0, '&:last-child': { pb: 1 } }}>
                    {templateName.includes('head') || templateName.includes('list') ?
                        <Typography gutterBottom variant={headlineVariantSm} component="div">
                            {headline}
                        </Typography>
                        : null}
                    {templateName.includes('sum') || templateName.includes('list') ?
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