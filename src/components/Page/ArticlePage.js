import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import HTMLComment from "react-html-comment";
import { getCurrentLiveSite, getImageFormatUrl } from "../../lib/cobalt-cms/cobalt-helpers";
import { findElementsInContentJson, getImageUrl } from "../../utils/ContentUtil";
import ResourceResolver from "../../utils/ResourceResolver";
import BreadCrumb from "../Furnitures/BreadCrumb";
import RenderContentElement, { CloudinaryVideo } from "../RenderContent/RenderContentElement";

export default function ArticlePage({ cobaltData }) {
    let render = null;

    //Swing quick open
    let uuid = null;
    try { uuid = 'Methode uuid: "' + cobaltData.object.data.foreignId + '"' } catch (e) { }

    //Style variant for "faking" different websites styles -> it is set as a site attribute

    const currentSite = getCurrentLiveSite(cobaltData);
    const siteStructure = cobaltData.siteContext.siteStructure;

    const site = siteStructure.find((site) => site.name === currentSite)
    let styleVariant = null;
    try {
        styleVariant = site.customAttributes.style
    } catch (e) { }

    switch (styleVariant) {
        case "1":
            render = (
                <Container maxWidth="lg">
                    {uuid ? <HTMLComment text={uuid} /> : null}
                    <BreadcrumbBlock cobaltData={cobaltData} />
                    <MainImageBlock cobaltData={cobaltData} />
                    <HeadlineBlock cobaltData={cobaltData} />
                    <SummaryBlock cobaltData={cobaltData} />
                    <ContentBlock cobaltData={cobaltData} />
                </Container>
            )
            break;
        case "2":
            render = (
                <Container maxWidth="lg">
                    {uuid ? <HTMLComment text={uuid} /> : null}
                    <BreadcrumbBlock cobaltData={cobaltData} styleVariant="leftAligned" />
                    <HeadlineBlock cobaltData={cobaltData} styleVariant="leftAligned" />
                    <SummaryBlock cobaltData={cobaltData} styleVariant="leftAligned" />
                    <MainImageBlock cobaltData={cobaltData} styleVariant="leftAligned" />
                    <ContentBlock cobaltData={cobaltData} styleVariant="leftAligned" />
                </Container>
            )
            break;
        default:
            render = (
                <Container maxWidth="lg">
                    {uuid ? <HTMLComment text={uuid} /> : null}
                    <BreadcrumbBlock cobaltData={cobaltData} />
                    <HeadlineBlock cobaltData={cobaltData} />
                    <SummaryBlock cobaltData={cobaltData} />
                    <MainImageBlock cobaltData={cobaltData} />
                    <ContentBlock cobaltData={cobaltData} />
                </Container>
            )
    }
    return render;
}

function BreadcrumbBlock({ cobaltData, styleVariant }) {
    let justify = "center";
    let maxWidth = "md";
    if (styleVariant && styleVariant === "leftAligned") {
        justify = "left";
        maxWidth = "lg";
    }

    const render = (
        <Container sx={{ my: 0 }} maxWidth={maxWidth}>
            <Box display="flex"
                justifyContent={justify}
                alignItems={justify}>
                <BreadCrumb cobaltData={cobaltData} />
            </Box>
        </Container>
    )
    return render;
}

function HeadlineBlock({ cobaltData, styleVariant }) {
    let headline = null;
    try {
        headline = <RenderContentElement jsonElement={findElementsInContentJson(['headline'], cobaltData.object.helper.content)[0]} />
    } catch (e) { }

    let justify = "center";
    let maxWidth = "md";
    if (styleVariant && styleVariant === "leftAligned") {
        justify = "left";
        maxWidth = "lg";
    }

    const render = (
        <Container sx={{ my: 1 }} maxWidth={maxWidth}>
            <Box display="flex"
                justifyContent={justify}
                alignItems={justify}>
                <Typography align={justify} variant="h3" component="h1" sx={{ fontStyle: 'italic', fontWeight: 'medium' }}>
                    {headline}
                </Typography>
            </Box>
        </Container>
    )

    return render;
}

function SummaryBlock({ cobaltData, styleVariant }) {
    let summary = null;
    try {
        summary = <RenderContentElement jsonElement={findElementsInContentJson(['summary'], cobaltData.object.helper.content)[0]} />
    } catch (e) { }

    let justify = "center";
    let maxWidth = "md";
    if (styleVariant && styleVariant === "leftAligned") {
        justify = "left";
        maxWidth = "lg";
    }

    let render = null
    if (summary) {
        render = (
            <Container sx={{ my: 2 }} maxWidth={maxWidth}>
                <Box display="flex"
                    justifyContent={justify}
                    alignItems={justify}>
                    <Typography align={justify} variant="h5" component="h2">
                        {summary}
                    </Typography>
                </Box>
            </Container>
        )
    }
    return render;
}

function MainImageBlock({ cobaltData, styleVariant }) {
    let mainPictureElement = null;
    let mainImageUrl = null;
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

        mainImageUrl = ResourceResolver(getImageFormatUrl(getImageUrl(mainPictureElement, "landscape", cobaltData),'large'), (cobaltData.previewData ? cobaltData.previewData : null), cobaltData.siteContext.site);
    } catch (e) {
        console.log(e)
    }

    const imageWidth = 1024;
    const imageHeight = 576;

    let mainMediaBlock = null;
    if (cloudinaryVideo) {
        mainMediaBlock = <CloudinaryVideo jsonElement={cloudinaryVideo} />
    } else if (mainImageUrl) {
        mainMediaBlock = <Image src={mainImageUrl} width={imageWidth} height={imageHeight} />
    }

    let justify = "center";
    let maxWidth = "md";
    if (styleVariant && styleVariant === "leftAligned") {
        justify = "left";
        maxWidth = "lg";
    }

    const render = (
        <Container sx={{ my: 2 }} maxWidth={maxWidth}>
            <Box display="flex"
                justifyContent={justify}
                alignItems={justify}>
                {mainMediaBlock}
            </Box>
        </Container>
    )
    return render;
}

function ContentBlock({ cobaltData, styleVariant }) {
    let content = null;
    try {
        content = <RenderContentElement jsonElement={findElementsInContentJson(['content'], cobaltData.object.helper.content)[0]} renderMode='styled' cobaltData={cobaltData} />
    } catch (e) {
        console.log(e)
    }

    return content;
}