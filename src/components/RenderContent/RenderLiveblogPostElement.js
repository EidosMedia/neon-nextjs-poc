import { useRouter } from "next/dist/client/router";
import ResourceResolver from "../../utils/ResourceResolver";
import RenderFormattedText from "./RenderFormattedText";
import { Video, Transformation } from 'cloudinary-react';
import React from "react";
import { Container, Typography, Paper } from "@mui/material";
import { findElementsInContentJson, getImageUrl } from "../../utils/ContentUtil";
import Image from "next/image";
import { Box } from "@mui/system";
import ImageGallery from 'react-image-gallery';
import NextLink from 'next/link'
import { Link as MUILink } from '@mui/material';
import { getCobaltDataHelper, getImageFormatUrl } from "../../lib/cobalt-cms/cobalt-helpers";
import Card from "./Card";

export default function RenderLiveblogPostElement({ jsonElement, excludeElements, renderMode, rawPost, cobaltData }) {
    let render = null;
    let id = null;
    if (!excludeElements || !excludeElements.includes(jsonElement.name)) {
        switch (jsonElement.name) {
            case "article":
                render = jsonElement.elements.map((subel, i) => <RenderLiveblogPostElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} rawPost={rawPost} cobaltData={cobaltData} />);
                break;
            case "h1":
                render = (
                    <React.Fragment>
                        {(jsonElement.elements ? jsonElement.elements.map((subel) => subel.text) : null)}
                    </React.Fragment>
                )
                if (renderMode && renderMode === 'styled') {
                    render = (
                        <Container sx={{ my: 1 }} maxWidth="md">
                            <Typography variant="h5" component="h2">
                                {render}
                            </Typography>
                        </Container>
                    )
                }
                break;
            case "p":
                render = (
                    <React.Fragment>
                        {(jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderFormattedText key={i} jsonElement={subel} />) : null)}
                    </React.Fragment>
                );
                if (renderMode && renderMode === 'styled') {
                    render = (
                        <Container sx={{ my: 1 }} maxWidth="md">
                            <Typography variant="body1" component="p">
                                {render}
                            </Typography>
                        </Container>
                    )
                }
                break;
            case "ul":
                render = (
                    <React.Fragment>
                        {jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderLiveblogPostElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} rawPost={rawPost} cobaltData={cobaltData} />) : null}
                    </React.Fragment>
                );
                if (renderMode && renderMode === 'styled') {
                    render = (
                        <Container sx={{ my: 1 }} maxWidth="md" component="ul">
                            {render}
                        </Container>
                    )
                }
                break;
            case "ol":
                render = (
                    <React.Fragment>
                        {jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderLiveblogPostElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} rawPost={rawPost} cobaltData={cobaltData} />) : null}
                    </React.Fragment>
                );
                if (renderMode && renderMode === 'styled') {
                    render = (
                        <Container sx={{ my: 1 }} maxWidth="md" component="ol">
                            {render}
                        </Container>
                    )
                }
                break;
            case "li":
                // TODO manage nested ul/li/ul/...,
                render = (
                    <React.Fragment>
                        {(jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderFormattedText key={i} jsonElement={subel} />) : null)}
                    </React.Fragment>
                );
                if (renderMode && renderMode === 'styled') {
                    render = (
                        <Typography sx={{ ml: 4 }} variant='body1' component='li'>
                            {render}
                        </Typography>
                    )
                }
                break;
            case "figure":
                if (jsonElement.attributes['type'] === 'mediagallery') {
                    render = <FigureGallery jsonElement={jsonElement} excludeElements={excludeElements} cobaltData={cobaltData} />
                } else {
                    render = <Figure jsonElement={jsonElement} excludeElements={excludeElements} cobaltData={cobaltData} />
                }
                break;
            case "blockquote":
                try {
                    if (jsonElement.attributes['emk-class'] === 'card'){
                        render = <Card jsonElement={jsonElement} cobaltData={cobaltData}/>
                    } else if (jsonElement.attributes["data-id"]) {
                        //This is a content link
                        render = <ContentLink jsonElement={jsonElement} excludeElements={excludeElements} cobaltData={cobaltData} />
                    }
                } catch (error) {
                    
                }
                if (!render){
                    //This is a standard quote
                    render = (
                        <React.Fragment>
                            {(jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderFormattedText key={i} jsonElement={subel} />) : null)}
                        </React.Fragment>
                    );
                    if (renderMode && renderMode === 'styled') {
                        render = (
                            <Container sx={{ my: 1, mx:3 }} maxWidth="md">
                                <Typography variant="h6" component="p" sx={{mr:6,p:1, fontStyle:'italic', backgroundColor:'#F0F8FF'}}>
                                    "{render}"
                                </Typography>
                            </Container>
                        )
                    }

                }
            case 'style':
                break;
            case 'social':    
                try {
                    const src = jsonElement.elements[0].elements[0].elements[0].attributes.src 
                    render = (        
                        <iframe src={src} style={{height:'500px'}}/>       
                    )
                    if (renderMode && (['styled', 'newsletter'].includes(renderMode))) {
                        render = (
                            <Container sx={{ my: 2 }} maxWidth="md" component="div">
                                <Box display="flex"
                                    justifyContent="center"
                                    alignItems="center">
                                    {render}
                                </Box>
                            </Container>
                        )
                    }
                } catch (error) {
                    
                }
                break;
            case 'video':
                try {
                    const src = jsonElement.attributes.src
                    render = (
                        <video src={src}/>
                    )
                    if (renderMode && (['styled', 'newsletter'].includes(renderMode))) {
                        render = (
                            <Container sx={{ my: 2 }} maxWidth="md" component="div">
                                <Box display="flex"
                                    justifyContent="center"
                                    alignItems="center">
                                    {render}
                                </Box>
                            </Container>
                        )
                    }
                }catch(e){}
                break;
            default:
                render = (
                    <div>Element not managed: {jsonElement.name}</div>
                )
        }
    }
    return render
}

function Figure({ jsonElement, excludeElements, cobaltData }) {

    let render = null;

    let imageUrl = null;

    try {
        imageUrl = ResourceResolver(getImageFormatUrl(jsonElement.elements[0].attributes.src,'large'), (cobaltData.previewData ? cobaltData.previewData : null), cobaltData.siteContext.site);
    } catch (e) { }

    const imageWidth = 1024;
    const imageHeight = 576;

    render = (
        <Container sx={{ my: 4 }} maxWidth="md">
            <Box display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Image src={imageUrl} width={imageWidth} height={imageHeight} />
                {/* <img width="100%" src={imageUrl} /> */}
            </Box>
        </Container>
    )

    return render;
}

function FigureGallery({ jsonElement, excludeElements, cobaltData }) {
    let render = null;
    let images = [];
    try {
        images = jsonElement.elements.map((el) => {
            const origImageUrl = el.elements[0].attributes.src
            const strIndex = origImageUrl.lastIndexOf('/')
            const thumbImageUrl = origImageUrl.slice(0, strIndex) + '/format/thumb' + origImageUrl.slice(strIndex)

            const origImageFullUrl = ResourceResolver(origImageUrl, (cobaltData.previewData ? cobaltData.previewData : null), cobaltData.siteContext.site);
            const thumbImageFullUrl = ResourceResolver(thumbImageUrl, (cobaltData.previewData ? cobaltData.previewData : null), cobaltData.siteContext.site);

            return {
                original: origImageFullUrl,
                thumbnail: thumbImageFullUrl
            }
        })
   
        render = (
            <Container sx={{ my: 4 }} maxWidth="md">
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <ImageGallery items={images} />
                </Box>
            </Container>
        )
    } catch (e) { }
    return render;
}

function ContentLink({ jsonElement, excludeElements, cobaltData }) {
    let render = null;
    let linkHeadline = null;
    let linkUrl = null;
    try {
        linkHeadline = jsonElement.elements.map((subel, i) => <RenderFormattedText key={i} jsonElement={subel} />)
        linkUrl = jsonElement.attributes.href
    } catch (e) { }

    render = (
        <Container maxWidth="md" sx={{ my: 4, border: 2, borderColor: 'grey.500' }}>
            <Box display="flex"
                justifyContent="flexStart"
                alignItems="flexStart"
            >
                <Box sx={{ mx: 2, my: 2 }} key="extra-links-headline">
                    <Typography variant="h6" component="h5" color="error.main" gutterBottom sx={{fontWeight:'bold'}}>READ</Typography>
                </Box>
                <Box sx={{ mx: 2, my: 2 }} flexShrink={1}>
                    <NextLink href={linkUrl} passHref prefetch={(cobaltData.previewData?false:true)}>
                        <MUILink variant="h6" underline="hover" color="secondary">
                            {linkHeadline}
                        </MUILink>
                    </NextLink>
                </Box>
            </Box>
        </Container>
    )
    return render;
}