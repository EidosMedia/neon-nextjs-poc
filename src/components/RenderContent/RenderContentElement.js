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
import { getCobaltDataHelper } from "../../lib/cobalt-cms/cobalt-helpers";
import InlinePoll from "./InlinePoll";
import SimpleMap from "./SimpleMap";

export default function RenderContentElement({ jsonElement, excludeElements, renderMode, cobaltData }) {
    let render = null;
    let id = null;
    if (!excludeElements || !excludeElements.includes(jsonElement.name)) {
        switch (jsonElement.name) {
            case "document":
                render = jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} cobaltData={cobaltData} />);
                break;
            case "headgroup":
                render = jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} cobaltData={cobaltData} />);
                break;
            case "headline":
                render = (
                    <React.Fragment>
                        {jsonElement.elements.map((subel, i) => <RenderFormattedText key={i} jsonElement={subel} renderMode={renderMode} cobaltData={cobaltData} />)}
                    </React.Fragment>
                )
                break;
            case "summary":
                render = (
                    <React.Fragment>
                        {jsonElement.elements.map((subel, i) => <RenderFormattedText key={i} jsonElement={subel} renderMode={renderMode} cobaltData={cobaltData} />)}
                    </React.Fragment>

                )
                break;
            case "content":
                //console.log(JSON.stringify(jsonElement, null, 2))
                render = (
                    <React.Fragment>
                        {jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} cobaltData={cobaltData} />)}
                    </React.Fragment>
                );
                break;
            case "h1":
                render = (
                    <React.Fragment>
                        {(jsonElement.elements ? jsonElement.elements.map((subel) => subel.text) : null)}
                    </React.Fragment>
                )
                if (renderMode && (['styled', 'newsletter'].includes(renderMode))) {
                    render = (
                        <Container sx={{ my: 1 }} maxWidth="md">
                            <Typography variant="h3" component="h2">
                                {render}
                            </Typography>
                        </Container>
                    )
                }
                break;
            case "h2":
                render = (
                    <React.Fragment>
                        {jsonElement.elements ? jsonElement.elements.map((subel) => subel.text) : null}
                    </React.Fragment>
                )
                if (renderMode && (['styled', 'newsletter'].includes(renderMode))) {
                    render = (
                        <Container sx={{ my: 1 }} maxWidth="md">
                            <Typography variant="h5" component="h3">
                                {render}
                            </Typography>
                        </Container>
                    )
                }
                break;
            case "h3":
                render = (
                    <React.Fragment>
                        {jsonElement.elements ? jsonElement.elements.map((subel) => subel.text) : null}
                    </React.Fragment>
                )
                if (renderMode && (['styled', 'newsletter'].includes(renderMode))) {
                    render = (
                        <Container sx={{ my: 1 }} maxWidth="md">
                            <Typography variant="body1" component="h4">
                                {render}
                            </Typography>
                        </Container>
                    )
                }
                break;
            case "p":
                render = (
                    <React.Fragment>
                        {(jsonElement.elements ? 
                            jsonElement.elements
                            .filter((subel) => subel.type === 'text' || (subel.type === 'element' && subel.name === 'keyword'))
                            .map((subel, i) => <RenderFormattedText key={i} jsonElement={subel} cobaltData={cobaltData} />)
                            : null)}
                    </React.Fragment>
                )
                if (renderMode && (['styled', 'newsletter'].includes(renderMode))) {
                    render = (
                        <Container sx={{ my: 1 }} maxWidth="md">
                            <Typography variant="body1" component="p">
                                {render}
                            </Typography>
                        </Container>
                    )
                }
                const table = (jsonElement.elements? jsonElement.elements.find(subel => subel.name === 'table'):null)
                if(table){
                    render = (
                        <React.Fragment>
                            {render}
                            <RenderContentElement jsonElement={table} excludeElements={excludeElements} renderMode={renderMode} cobaltData={cobaltData} />;
                        </React.Fragment>
                    )
                }
                break;
            case "ul":
                render = (
                    <React.Fragment>
                        {jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} cobaltData={cobaltData} />) : null}
                    </React.Fragment>
                );
                if (renderMode && (['styled', 'newsletter'].includes(renderMode))) {
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
                        {jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} cobaltData={cobaltData} />) : null}
                    </React.Fragment>
                );
                if (renderMode && (['styled', 'newsletter'].includes(renderMode))) {
                    render = (
                        <Container sx={{ my: 1 }} maxWidth="md" component="ol">
                            {render}
                        </Container>
                    )
                }
                break;
            case "li":
                render = (
                    <React.Fragment>
                        {(jsonElement.elements ? jsonElement.elements.map((subel, i) => {
                            if (subel.type === "element" && (subel.name === "ul" || subel.name === "ol")) {
                                return <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} cobaltData={cobaltData} />
                            } else {
                                return <RenderFormattedText key={i} jsonElement={subel} />
                            }
                        }) : null)}
                    </React.Fragment>
                );
                if (renderMode && (['styled', 'newsletter'].includes(renderMode))) {
                    render = (
                        <Typography sx={{ ml: 4 }} variant='body1' component='li'>
                            {render}
                        </Typography>
                    )
                }
                break;
            case "figure":
                if (jsonElement.attributes['emk-type'] === 'cloudinaryVideo') {
                    render = <CloudinaryVideo jsonElement={jsonElement} excludeElements={excludeElements} renderMode={renderMode} cobaltData={cobaltData} />
                } else {
                    render = <Figure jsonElement={jsonElement} excludeElements={excludeElements} renderMode={renderMode} cobaltData={cobaltData} />
                }
                break;
            case "div":
                if (jsonElement.attributes['emk-type'] === 'gallery') {
                    render = <FigureGallery jsonElement={jsonElement} excludeElements={excludeElements} cobaltData={cobaltData} />
                } else if (jsonElement.attributes['emk-type'] === 'extra-links') {
                    render = <ExtraLinks jsonElement={jsonElement} excludeElements={excludeElements} renderMode={renderMode} cobaltData={cobaltData} />
                }
                break;
            case 'table':
                if (jsonElement.attributes && jsonElement.attributes.class === 'DataMap') {
                    render = (
                        <Container sx={{ my: 1 }} maxWidth="md">
                            <SimpleMap jsonElement={jsonElement} cobaltData={cobaltData}/>
                        </Container>
                    )

                } else {
                    const tableAttr = jsonElement.attributes;
                    const className = (tableAttr ? tableAttr.class : null);
                    const tableCellPadding = (tableAttr ? tableAttr.cellpadding : null);
                    const tableCellSpacing = (tableAttr ? tableAttr.cellspacing : null);
                    render = (
                        <table className={className} cellPadding={tableCellPadding} cellSpacing={tableCellSpacing}>
                            {(jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} cobaltData={cobaltData} />) : null)}
                        </table>
                    );
                }
                break;
            case 'thead':
                const theadAttr = jsonElement.attributes;
                const theadAlign = (theadAttr ? theadAttr.align : null);
                const theadValign = (theadAttr ? theadAttr.valign : null);
                const theadColspan = (theadAttr ? theadAttr.colspan : null);
                render = (
                    <thead align={theadAlign} valign={theadValign} colSpan={theadColspan}>
                        {(jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} cobaltData={cobaltData} />) : null)}
                    </thead>
                );
                break;
            case 'tbody':
                const tbodyAttr = jsonElement.attributes;
                const tbodyAlign = (tbodyAttr ? tbodyAttr.align : null);
                const tbodyValign = (tbodyAttr ? tbodyAttr.valign : null);
                const tbodyColspan = (tbodyAttr ? tbodyAttr.colspan : null);
                render = (
                    <tbody align={tbodyAlign} valign={tbodyValign} colSpan={tbodyColspan}>
                        {(jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} cobaltData={cobaltData} />) : null)}
                    </tbody>
                );
                break;
            case 'tr':
                const trAttr = jsonElement.attributes;
                const trAlign = (trAttr ? trAttr.align : null);
                const trValign = (trAttr ? trAttr.valign : null);
                render = (
                    <tr align={trAlign} valign={trValign}>
                        {(jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} cobaltData={cobaltData} />) : null)}
                    </tr>
                );
                break;
            case 'td':
                const tdAttr = jsonElement.attributes;
                const tdAlign = (tdAttr ? tdAttr.align : null);
                const tdValign = (tdAttr ? tdAttr.valign : null);
                render = (
                    <td align={tdAlign} valign={tdValign}>
                        {(jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderFormattedText key={i} jsonElement={subel} cobaltData={cobaltData} />) : null)}
                    </td>
                );
                break;
            case 'embed':
                //TODO
                const cdata = jsonElement.elements.filter((el) => el.type = 'CDATA').map((el) => el.cdata)
                render = (
                    <div dangerouslySetInnerHTML={{ __html: cdata }}>

                    </div>
                );
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
                break;
            case 'poll':
                render = <InlinePoll jsonElement={jsonElement} cobaltData={cobaltData} />;
                break;
            case 'blockquote':
                render = (
                    <React.Fragment>
                        {(jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderFormattedText key={i} jsonElement={subel} cobaltData={cobaltData} />) : null)}
                    </React.Fragment>
                );
                if (renderMode && (['styled', 'newsletter'].includes(renderMode))) {
                    render = (
                        <Container sx={{ my: 3 }} maxWidth="sm" component="blockquote">
                            <Typography variant="h5" component="p">
                                {render}
                            </Typography>
                        </Container>
                    )
                }
                break;
            case 'style':
                break;
            default:
                render = (
                    <div>Element not managed: {jsonElement.name}</div>
                )
        }
    }
    return render
}

// function Poll({ jsonElement, cobaltData }) {
//     //TODO real react component with state and interaction
//     let render = null
//     try {
//         const question = <RenderFormattedText jsonElement={jsonElement.elements.filter((el) => el.name === 'question')[0]} />
//         render = (
//             <div className="GLpoll left">

//                 <div className="GLpollLabel">{question}</div>
//                 <div id="alreadyVoted"></div>
//                 <div className="GLpollOption">
//                     <form action="#" className="em-poll" method="post" id={jsonElement.attributes['data-poll-id']}>
//                         {jsonElement.elements.filter((el) => el.name === 'answers')[0].elements.map((el, i) => {
//                             return (
//                                 <div key={i} className="radio">
//                                     <input type="radio"
//                                         name={"answerId-" + jsonElement.attributes['data-poll-id']}
//                                         id={el.attributes['data-answer-id']}
//                                         value={el.attributes['data-answer-id']} />
//                                     <label htmlFor={el.attributes['data-answer-id']}>{el.elements.map((el2, j) => <RenderFormattedText key={j} jsonElement={el2} />)}</label>
//                                 </div>
//                             )
//                         })}
//                         <div className="GLpollSubmit">
//                             <button className="btn btn-default" type="submit">Submit</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         )
//     } catch (e) { console.log(e) }

//     return render;
// }

function Figure({ jsonElement, excludeElements, cobaltData, renderMode }) {

    let render = null;

    let imageUrl = null;
    console.log(cobaltData)
    try {
        imageUrl = ResourceResolver(getImageUrl(jsonElement, "landscape", cobaltData), (cobaltData.previewData ? cobaltData.previewData : null), cobaltData.siteContext.site);
    } catch (e) { }

    const imageWidth = 1024;
    const imageHeight = 576;

    render = (
        <Container sx={{ my: 4 }} maxWidth="lg">
            <Box display="flex"
                justifyContent="center"
                alignItems="center">
                {renderMode === 'newsletter' ?
                    <img src={imageUrl} width={imageWidth} height={imageHeight} />
                    : <Image src={imageUrl} width={imageWidth} height={imageHeight} />}
            </Box>
        </Container>
    )

    return render;
}

function FigureGallery({ jsonElement, excludeElements, cobaltData }) {
    let render = null;
    let images = [];
    images = jsonElement.elements.map((el) => {
        const origImageUrl = getImageUrl(el, "rect", cobaltData)
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
        <Container sx={{ my: 4 }} maxWidth="lg">
            <Box display="flex"
                justifyContent="center"
                alignItems="center">
                <ImageGallery items={images} />
            </Box>
        </Container>
    )
    return render;
}

function ExtraLinks({ jsonElement, excludeElements, renderMode, cobaltData }) {
    let render = null;

    let headlineBlock = null;
    try {
        headlineBlock = jsonElement.elements.find((el) => el.attributes['emk-type'] === 'extra-links-headline')
        if (headlineBlock) {
            headlineBlock = (
                <React.Fragment>
                    {(headlineBlock.elements ? headlineBlock.elements.map((subel, i) => <RenderFormattedText key={i} jsonElement={subel} cobaltData={cobaltData}/>) : null)}
                </React.Fragment>
            );
        }
    } catch (e) { }

    let linksBlock = null;
    try {
        linksBlock = jsonElement.elements.filter((el) => el.attributes['emk-type'] === 'extra-link')
        if (linksBlock) {
            linksBlock = linksBlock.map((el, i) => {
                let blockRender = null;
                const linkHeadline = (
                    <React.Fragment>
                        {(el.elements ? el.elements.map((subel, i) => <RenderFormattedText key={i} jsonElement={subel} cobaltData={cobaltData} />) : null)}
                    </React.Fragment>
                )
                const linkedObject = cobaltData.pageContext.nodes[el.attributes['data-id']]
                if (linkedObject) {
                    const linkedObjectHelper = getCobaltDataHelper(linkedObject);

                    let linkedObjectMainPictureElement = null;
                    let linkedObjectMainImageUrl = null;
                    try {
                        linkedObjectMainPictureElement = findElementsInContentJson(['mediagroup'], linkedObjectHelper.content)[0].elements[0];
                        linkedObjectMainImageUrl = getImageUrl(linkedObjectMainPictureElement, "square", cobaltData)
                        if (linkedObjectMainImageUrl && linkedObjectMainImageUrl !== '#') { //TODO fix this
                            const strIndex = linkedObjectMainImageUrl.lastIndexOf('/')
                            linkedObjectMainImageUrl = linkedObjectMainImageUrl.slice(0, strIndex) + '/format/thumb' + linkedObjectMainImageUrl.slice(strIndex)
                            linkedObjectMainImageUrl = ResourceResolver(linkedObjectMainImageUrl, (cobaltData.previewData ? cobaltData.previewData : null), cobaltData.siteContext.site);
                        } else {
                            linkedObjectMainImageUrl = null;
                        }
                    } catch (e) {
                        console.log(e)
                    }

                    const imageWidth = 100;
                    const imageHeight = 100;
                    let linkImage = null;
                    if (linkedObjectMainImageUrl) {
                        if (renderMode && renderMode === 'newsletter') {
                            linkImage = <img src={linkedObjectMainImageUrl} width={imageWidth} height={imageHeight} />;
                        } else {
                            linkImage = <Image src={linkedObjectMainImageUrl} width={imageWidth} height={imageHeight} />;
                        }
                    }
                    blockRender = (
                        <Box key={i} display="flex"
                            justifyContent="flexStart"
                            alignItems="center">
                            <Box sx={{ py: 1 }}>
                                {linkImage ? linkImage : null}
                            </Box>
                            <Box sx={{ mx: 2, maxWidth: '70%' }} flexShrink={1}>
                                <NextLink href={el.attributes.href} passHref prefetch={(cobaltData.previewData ? false : true)}>
                                    <MUILink variant="h6" underline="hover" color="secondary">
                                        {linkHeadline}
                                    </MUILink>
                                </NextLink>
                            </Box>
                        </Box>
                    )
                }
                return blockRender;
            })
        }
    } catch (e) { console.log(e) }

    render = (
        <Container maxWidth="sm" sx={{ my: 4, border: 2, borderColor: 'grey.500' }}>
            <Box display="flex"
                flexDirection="column"
                justifyContent="flexStart"
                alignItems="flexStart"
            >
                {headlineBlock ?
                    <Box key="extra-links-headline" sx={{ borderBottom: 1, borderColor: 'grey.500', my: 1 }}>

                        <Typography variant="h6" component="h5" gutterBottom>
                            {headlineBlock}
                        </Typography>

                    </Box> : null}
                {linksBlock}
            </Box>
        </Container>
    )
    return render;
}

export function CloudinaryVideo({ jsonElement, excludeElements, renderMode, cobaltData }) {
    const videoSrc = jsonElement.elements[0].attributes.src
    const videoSrcArray = videoSrc.split('/')
    const videoFileName = videoSrcArray.slice(-1)[0]
    const videoId = videoFileName.substring(0, videoFileName.lastIndexOf('.'))
    let render = (
        <Video cloudName="eidosmedia-test" publicId={videoId} controls="true" width="100%"></Video>
    )

    if (renderMode && (['styled', 'newsletter'].includes(renderMode))) {
        render = (
            <Container sx={{ my: 4 }} maxWidth="lg">
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center">
                    {render}
                </Box>
            </Container>
        )
    }


    return render
} 
