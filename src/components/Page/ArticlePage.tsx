import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
// import HTMLComment from "react-html-comment";
import { getCurrentLiveSite, getImageFormatUrl } from '../../lib/neon-cms/neon-helpers';
import { findElementsInContentJson, getImageUrl } from '../../utils/ContentUtil';
import ResourceResolver from '../../utils/ResourceResolver';
import BreadCrumb from '../Furnitures/BreadCrumb';
import RenderContentElement, { CloudinaryVideo } from '../RenderContent/RenderContentElement';

/**
 *
 * @param root0
 * @param root0.neonData
 */
export default function ArticlePage({ neonData }) {
    let render = null;
    // Swing quick open
    let uuid = null;
    try {
        uuid = `Methode uuid: "${neonData.object.data.foreignId}"`;
    } catch (e) {}

    // Style variant for "faking" different websites styles -> it is set as a site attribute

    const currentSite = getCurrentLiveSite(neonData);
    const { siteStructure } = neonData.siteContext;

    const site = siteStructure?.find(site => site.name === currentSite);
    let styleVariant = null;
    try {
        styleVariant = site.customAttributes.style;
    } catch (e) {}

    switch (styleVariant) {
        case '1':
            render = (
                <Container maxWidth="lg">
                    {/* {uuid ? <HTMLComment text={uuid} /> : null} */}
                    <BreadcrumbBlock neonData={neonData} />
                    <BeyondWordsBlock neonData={neonData} />
                    <MainImageBlock neonData={neonData} />
                    <HeadlineBlock neonData={neonData} />
                    <SummaryBlock neonData={neonData} />
                    <ContentBlock neonData={neonData} />
                </Container>
            );
            break;
        case '2':
            render = (
                <Container maxWidth="lg">
                    {/* {uuid ? <HTMLComment text={uuid} /> : null} */}
                    <BreadcrumbBlock neonData={neonData} styleVariant="leftAligned" />
                    <BeyondWordsBlock neonData={neonData} styleVariant="leftAligned" />
                    <HeadlineBlock neonData={neonData} styleVariant="leftAligned" />
                    <SummaryBlock neonData={neonData} styleVariant="leftAligned" />
                    <MainImageBlock neonData={neonData} styleVariant="leftAligned" />
                    <ContentBlock neonData={neonData} styleVariant="leftAligned" />
                </Container>
            );
            break;
        default:
            render = (
                <Container maxWidth="lg">
                    {/* {uuid ? <HTMLComment text={uuid} /> : null} */}
                    <BreadcrumbBlock neonData={neonData} />
                    <BeyondWordsBlock neonData={neonData} />
                    <HeadlineBlock neonData={neonData} />
                    <SummaryBlock neonData={neonData} />
                    <MainImageBlock neonData={neonData} />
                    <ContentBlock neonData={neonData} />
                </Container>
            );
    }

    return render;
}

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.styleVariant
 */
function BeyondWordsBlock({ neonData, styleVariant }) {
    let render = null;
    try {
        if (neonData.object.data.attributes.AudioId) {
            render = (
                <Container sx={{ my: 1 }} maxWidth="md">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: `<iframe allowfullscreen='false' data-src='https://audio.beyondwords.io/e/${neonData.object.data.attributes.AudioId}' frameborder='0' id='speechkit-io-iframe' scrolling='no' ></iframe><script src='https://proxy.beyondwords.io/npm/@beyondwords/audio-player@latest/dist/module/iframe-helper.js' type='text/javascript'></script>`
                        }}
                    />
                </Container>
            );
        }
    } catch (e) {}
    return render;
}

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.styleVariant
 */
function BreadcrumbBlock({ neonData, styleVariant }) {
    let justify = 'center';
    let maxWidth = 'md';
    if (styleVariant && styleVariant === 'leftAligned') {
        justify = 'left';
        maxWidth = 'lg';
    }

    const render = (
        <Container sx={{ my: 0 }} maxWidth={maxWidth}>
            <Box display="flex" justifyContent={justify} alignItems={justify}>
                <BreadCrumb neonData={neonData} />
            </Box>
        </Container>
    );
    return render;
}

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.styleVariant
 */
function HeadlineBlock({ neonData, styleVariant }) {
    let headline = null;
    try {
        headline = (
            <RenderContentElement
                jsonElement={findElementsInContentJson(['headline'], neonData.object.helper.content)[0]}
            />
        );
    } catch (e) {}

    let justify = 'center';
    let maxWidth = 'md';
    if (styleVariant && styleVariant === 'leftAligned') {
        justify = 'left';
        maxWidth = 'lg';
    }

    const render = (
        <Container sx={{ my: 1 }} maxWidth={maxWidth}>
            <Box display="flex" justifyContent={justify} alignItems={justify}>
                <Typography
                    align={justify}
                    variant="h3"
                    component="h1"
                    sx={{ fontStyle: 'italic', fontWeight: 'medium' }}
                >
                    {headline}
                </Typography>
            </Box>
        </Container>
    );

    return render;
}

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.styleVariant
 */
function SummaryBlock({ neonData, styleVariant }) {
    let summary = null;
    try {
        summary = (
            <RenderContentElement
                jsonElement={findElementsInContentJson(['summary'], neonData.object.helper.content)[0]}
            />
        );
    } catch (e) {}

    let justify = 'center';
    let maxWidth = 'md';
    if (styleVariant && styleVariant === 'leftAligned') {
        justify = 'left';
        maxWidth = 'lg';
    }

    let render = null;
    if (summary) {
        render = (
            <Container sx={{ my: 2 }} maxWidth={maxWidth}>
                <Box display="flex" justifyContent={justify} alignItems={justify}>
                    <Typography align={justify} variant="h5" component="h2">
                        {summary}
                    </Typography>
                </Box>
            </Container>
        );
    }
    return render;
}

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.styleVariant
 */
function MainImageBlock({ neonData, styleVariant }) {
    let mainPictureElement = null;
    let mainImageUrl = null;
    let cloudinaryVideo = null;
    let extraElement = null;

    try {
        mainPictureElement = findElementsInContentJson(['mediagroup'], neonData.object.helper.content)[0].elements[0];
        extraElement = findElementsInContentJson(['extra'], neonData.object.helper.content);
        try {
            cloudinaryVideo = extraElement[0].elements.find(el => {
                let found = false;
                try {
                    found = el.attributes['emk-type'] == 'cloudinaryVideo';
                } catch (e) {}
                return found;
            });
        } catch (e) {}

        mainImageUrl = ResourceResolver(
            getImageFormatUrl(getImageUrl(mainPictureElement, 'landscape', neonData), 'large'),
            neonData.previewData ? neonData.previewData : null,
            neonData.siteContext.site
        );
    } catch (e) {
        console.log(e);
    }

    const imageWidth = 1024;
    const imageHeight = 576;

    let mainMediaBlock = null;
    if (cloudinaryVideo) {
        mainMediaBlock = <CloudinaryVideo jsonElement={cloudinaryVideo} />;
    } else if (mainImageUrl) {
        mainMediaBlock = <Image src={mainImageUrl} width={imageWidth} height={imageHeight} />;
    }

    let justify = 'center';
    let maxWidth = 'md';
    if (styleVariant && styleVariant === 'leftAligned') {
        justify = 'left';
        maxWidth = 'lg';
    }

    const render = (
        <Container sx={{ my: 2 }} maxWidth={maxWidth}>
            <Box display="flex" justifyContent={justify} alignItems={justify}>
                {mainMediaBlock}
            </Box>
        </Container>
    );
    return render;
}

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.styleVariant
 */
function ContentBlock({ neonData, styleVariant }) {
    let content = null;
    try {
        content = (
            <RenderContentElement
                jsonElement={findElementsInContentJson(['content'], neonData.object.helper.content)[0]}
                renderMode="styled"
                neonData={neonData}
            />
        );
    } catch (e) {
        console.log(e);
    }

    return content;
}
