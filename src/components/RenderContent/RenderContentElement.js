import { useRouter } from "next/dist/client/router";
import ResourceResolver from "../../utils/ResourceResolver";
import RenderFormattedText from "./RenderFormattedText";
import { Video, Transformation } from 'cloudinary-react';
import React from "react";
import { Container, Typography } from "@mui/material";
import { getImageUrl } from "../../utils/ContentUtil";
import Image from "next/image";
import { Box } from "@mui/system";

export default function RenderContentElement({ jsonElement, excludeElements, renderMode, previewData, site }) {
    let render = null;
    let id = null;
    if (!excludeElements || !excludeElements.includes(jsonElement.name)) {
        switch (jsonElement.name) {
            case "document":
                render = jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} previewData={previewData} site={site} />);
                break;
            case "disclosure":
                render = jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} previewData={previewData} site={site} />);
                break;
            case "headgroup":
                render = jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} previewData={previewData} site={site} />);
                break;
            case "headline":
                render = (
                    <React.Fragment>
                        {jsonElement.elements.map((subel, i) => <RenderFormattedText key={i} jsonElement={subel} renderMode={renderMode} />)}
                    </React.Fragment>
                )
                break;
            case "summary":
                render = (
                    <React.Fragment>
                        {jsonElement.elements.map((subel, i) => <RenderFormattedText key={i} jsonElement={subel} renderMode={renderMode} />)}
                    </React.Fragment>

                )
                break;
            case "content":
                console.log(JSON.stringify(jsonElement, null, 2))
                render = (
                    <React.Fragment>
                        {jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} previewData={previewData} site={site} />)}
                    </React.Fragment>
                );
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
                            <Typography variant="h4" component="h2">
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
                if (renderMode && renderMode === 'styled') {
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
                if (renderMode && renderMode === 'styled') {
                    render = (
                        <Container sx={{ my: 1 }} maxWidth="md">
                            <Typography variant="h6" component="h4">
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
                        {jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} previewData={previewData} site={site} />) : null}
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
                        {jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} previewData={previewData} site={site} />) : null}
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
                // TODO manage nested ul/li/ul/...
                render = (
                    <Typography sx={{ ml: 4 }} variant='body1' component='li'>
                        {jsonElement.elements ? jsonElement.elements.map((subel) => subel.text) : null}
                    </Typography>
                );
                break;
            case "figure":
                if (jsonElement.attributes['emk-type'] === 'cloudinaryVideo') {
                    render = <CloudinaryVideo jsonElement={jsonElement} excludeElements={excludeElements} />
                } else {
                    render = <Figure jsonElement={jsonElement} excludeElements={excludeElements} previewData={previewData} site={site} />
                }
                break;
            case 'table':
                const tableAttr = jsonElement.attributes;
                const className = (tableAttr ? tableAttr.class : null);
                const tableCellPadding = (tableAttr ? tableAttr.cellpadding : null);
                const tableCellSpacing = (tableAttr ? tableAttr.cellspacing : null);
                render = (
                    <table className={className} cellPadding={tableCellPadding} cellSpacing={tableCellSpacing}>
                        {(jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} previewData={previewData} site={site} />) : null)}
                    </table>
                );
                break;
            case 'thead':
                const theadAttr = jsonElement.attributes;
                const theadAlign = (theadAttr ? theadAttr.align : null);
                const theadValign = (theadAttr ? theadAttr.valign : null);
                const theadColspan = (theadAttr ? theadAttr.colspan : null);
                render = (
                    <thead align={theadAlign} valign={theadValign} colSpan={theadColspan}>
                        {(jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} previewData={previewData} site={site} />) : null)}
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
                        {(jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} previewData={previewData} site={site} />) : null)}
                    </tbody>
                );
                break;
            case 'tr':
                const trAttr = jsonElement.attributes;
                const trAlign = (trAttr ? trAttr.align : null);
                const trValign = (trAttr ? trAttr.valign : null);
                render = (
                    <tr align={trAlign} valign={trValign}>
                        {(jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} renderMode={renderMode} previewData={previewData} site={site} />) : null)}
                    </tr>
                );
                break;
            case 'td':
                const tdAttr = jsonElement.attributes;
                const tdAlign = (tdAttr ? tdAttr.align : null);
                const tdValign = (tdAttr ? tdAttr.valign : null);
                render = (
                    <td align={tdAlign} valign={tdValign}>
                        {(jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderFormattedText key={i} jsonElement={subel} />) : null)}
                    </td>
                );
                break;
            case 'figure-gallery':
                render = (
                    <div>FIGURE-GALLERY (todo)</div>
                );
                break;
            case 'embed':
                //TODO
                const cdata = jsonElement.elements.filter((el) => el.type = 'CDATA').map((el) => el.cdata)
                render = (
                    <div className="GListMap" dangerouslySetInnerHTML={{ __html: cdata }}>

                    </div>
                );
                break;
            case 'poll':
                render = <Poll jsonElement={jsonElement} />;
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

function Poll({ jsonElement, previewData, site }) {
    //TODO real react component with state and interaction
    let render = null
    try {
        const question = <RenderFormattedText jsonElement={jsonElement.elements.filter((el) => el.name === 'question')[0]} />
        render = (
            <div className="GLpoll left">

                <div className="GLpollLabel">{question}</div>
                <div id="alreadyVoted"></div>
                <div className="GLpollOption">
                    <form action="#" className="em-poll" method="post" id={jsonElement.attributes['data-poll-id']}>
                        {jsonElement.elements.filter((el) => el.name === 'answers')[0].elements.map((el, i) => {
                            return (
                                <div key={i} className="radio">
                                    <input type="radio"
                                        name={"answerId-" + jsonElement.attributes['data-poll-id']}
                                        id={el.attributes['data-answer-id']}
                                        value={el.attributes['data-answer-id']} />
                                    <label htmlFor={el.attributes['data-answer-id']}>{el.elements.map((el2, j) => <RenderFormattedText key={j} jsonElement={el2} />)}</label>
                                </div>
                            )
                        })}
                        <div className="GLpollSubmit">
                            <button className="btn btn-default" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    } catch (e) { console.log(e) }

    return render;
}

function Figure({ jsonElement, excludeElements, previewData, site }) {

    let render = null;
    console.log("inline figure")
    console.log(JSON.stringify(jsonElement, null, 2))

    let imageUrl = null;

    try {
        imageUrl = ResourceResolver(getImageUrl(jsonElement, "landscape"), (previewData ? previewData : null), site);
    } catch (e) { }

    const imageWidth = 1024;
    const imageHeight = 576;

    render = (
        <Container sx={{ my: 2 }} maxWidth="lg">
            <Box display="flex"
                justifyContent="center"
                alignItems="center">
                <Image src={imageUrl} width={imageWidth} height={imageHeight} />
            </Box>
        </Container>
    )

    return render;
}

export function CloudinaryVideo({ jsonElement, excludeElements }) {
    const videoSrc = jsonElement.elements[0].attributes.src
    const videoSrcArray = videoSrc.split('/')
    const videoFileName = videoSrcArray.slice(-1)[0]
    const videoId = videoFileName.substring(0, videoFileName.lastIndexOf('.'))
    const render = <Video cloudName="eidosmedia-test" publicId={videoId} controls="true" width="100%"></Video>
    return render
} 
