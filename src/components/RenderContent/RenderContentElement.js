import { useRouter } from "next/dist/client/router";
import ResourceResolver from "../../utils/ResourceResolver";
import RenderFormattedText from "./RenderFormattedText";
import { Video, Transformation } from 'cloudinary-react';
import React from "react";

export default function RenderContentElement({ jsonElement, excludeElements, renderMode }) {
    let render = null;
    let id = null;
    if (!excludeElements || !excludeElements.includes(jsonElement.name)) {
        switch (jsonElement.name) {
            case "document":
                render = jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} />);
                break;
            case "disclosure":
                render = jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} />);
                break;
            case "headgroup":
                render = jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} />);
                break;
            case "headline":
                render = (
                    <React.Fragment>
                        {jsonElement.elements.map((subel, i) => <RenderFormattedText key={i} jsonElement={subel} />)}
                    </React.Fragment>
                )
                break;
            case "summary":
                render = (
                    <React.Fragment>
                        {jsonElement.elements.map((subel, i) => <RenderFormattedText key={i} jsonElement={subel} />)}
                    </React.Fragment>

                )
                break;
            case "content":
                render = (
                    <div className="GLtext">
                        {jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} />)}
                    </div>
                );
                break;
            case "h1":
                render = (
                    <React.Fragment>
                        {(jsonElement.elements ? jsonElement.elements.map((subel) => subel.text) : null)}
                    </React.Fragment>
                )
                if(!renderMode || renderMode !== 'raw'){
                    render = (
                        <h1>
                            {render}
                        </h1>
                    )
                }
                break;
            case "h2":
                id = (jsonElement.attributes && jsonElement.attributes.id ? jsonElement.attributes.id : null)
                render = (
                    <h2 id={id}>
                        {jsonElement.elements ? jsonElement.elements.map((subel) => subel.text) : null}
                    </h2>
                )
                break;
            case "h3":
                id = (jsonElement.attributes && jsonElement.attributes.id ? jsonElement.attributes.id : null)
                render = (
                    <h3 id={id}>
                        {jsonElement.elements ? jsonElement.elements.map((subel) => subel.text) : null}
                    </h3>
                )
                break;

            case "p":
                render = (
                    <p>
                        {(jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderFormattedText key={i} jsonElement={subel} />) : null)}
                    </p>
                );
                break;
            case "ul":
                render = (
                    <ul>
                        {jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} />) : null}
                    </ul>
                );
                break;
            case "li":
                render = (
                    <li>
                        {jsonElement.elements ? jsonElement.elements.map((subel) => subel.text) : null}
                    </li>
                );
                break;
            case "figure":
                if (jsonElement.attributes['emk-type'] === 'cloudinaryVideo') {
                    render = <CloudinaryVideo jsonElement={jsonElement} excludeElements={excludeElements} />
                } else {
                    render = <Figure jsonElement={jsonElement} excludeElements={excludeElements} />
                }
                break;
            case 'table':
                const tableAttr = jsonElement.attributes;
                const className = (tableAttr ? tableAttr.class : null);
                const tableCellPadding = (tableAttr ? tableAttr.cellpadding : null);
                const tableCellSpacing = (tableAttr ? tableAttr.cellspacing : null);
                render = (
                    <table className={className} cellPadding={tableCellPadding} cellSpacing={tableCellSpacing}>
                        {(jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} />) : null)}
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
                        {(jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} />) : null)}
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
                        {(jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} />) : null)}
                    </tbody>
                );
                break;
            case 'tr':
                const trAttr = jsonElement.attributes;
                const trAlign = (trAttr ? trAttr.align : null);
                const trValign = (trAttr ? trAttr.valign : null);
                render = (
                    <tr align={trAlign} valign={trValign}>
                        {(jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderContentElement key={i} jsonElement={subel} excludeElements={excludeElements} />) : null)}
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

function Poll({ jsonElement }) {
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

function Figure({ jsonElement, excludeElements }) {
    const router = useRouter();

    let figureHeadline = jsonElement.elements.find((subel) => subel.name === 'figure-headline')
    figureHeadline = (figureHeadline ? figureHeadline.elements : null)
    figureHeadline = (figureHeadline ? figureHeadline.find((subel) => subel.name === 'p') : null)
    figureHeadline = (figureHeadline ? figureHeadline.elements : null)
    let figureHeadlineNumber = (figureHeadline ? figureHeadline.find((subel) => subel.name === 'sysvar') : null)
    figureHeadlineNumber = (figureHeadlineNumber ? figureHeadlineNumber.elements : null)
    figureHeadlineNumber = (figureHeadlineNumber ? figureHeadlineNumber[0] : null)
    figureHeadlineNumber = (figureHeadlineNumber ? figureHeadlineNumber.text : null)
    let figureHeadlineText = (figureHeadline ? figureHeadline.find((subel) => subel.type === 'text') : null)
    figureHeadlineText = (figureHeadlineText ? figureHeadlineText.text : null)
    figureHeadline = (figureHeadlineNumber && figureHeadlineText ? "Figure " + figureHeadlineNumber + ": " + figureHeadlineText : null)

    let figureAsset = jsonElement.elements.find((subel) => subel.name === 'figure-asset')
    figureAsset = (figureAsset ? figureAsset.elements : null)
    figureAsset = (figureAsset ? figureAsset[0] : null)
    figureAsset = (figureAsset ? figureAsset.attributes : null)
    figureAsset = (figureAsset ? figureAsset.src : null)
    figureAsset = (figureAsset ? ResourceResolver(figureAsset) : null)
    if (figureAsset && figureAsset.endsWith('.pdf')) {
        const lastSlash = figureAsset.lastIndexOf('/');
        figureAsset = [figureAsset.slice(0, lastSlash), '/format/lowres', figureAsset.slice(lastSlash)].join('');

    }

    let figureCaption = jsonElement.elements.find((subel) => subel.name === 'figure-caption')
    figureCaption = (figureCaption ? figureCaption.elements : null)
    figureCaption = (figureCaption ? figureCaption[0] : null)
    figureCaption = (figureCaption ? figureCaption.elements : null)
    figureCaption = (figureCaption ? figureCaption.find((subel) => subel.type === 'text') : null)
    figureCaption = (figureCaption ? figureCaption.text : null)
    figureCaption = (figureCaption ? "Source : " + figureCaption : null)

    const render = (
        <div className="figure-holder media-size-10">
            <header>{figureHeadline}</header>
            <section>
                <img src={figureAsset} className="cq-dd-image" /></section>
            <footer>{figureCaption}</footer>
        </div>
    );

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
