import ResourceResolver from '../../utils/ResourceResolver';
import RenderFormattedText from './RenderFormattedText';
import React from 'react';
import { Container, Typography, Paper, Link as MUILink } from '@mui/material';
import { findElementsInContentJson, findElementText, getImageUrl } from '../../utils/ContentUtil';
import Image from 'next/image';
import { Box } from '@mui/system';
import ImageGallery from 'react-image-gallery';
import NextLink from 'next/link';
import { getNeonDataHelper, getImageFormatUrl } from '../../services/neon-cms/neon-helpers';
import InlinePoll from './InlinePoll';
import Card from './Card';
import { GenericPageProps } from 'src/types/commonTypes';
import logger from 'logger';

type RenderContentElementProps = Partial<GenericPageProps> & {
    jsonElement: any;
    excludeElements?: string[];
    renderMode?: string;
};

/**
 *
 * @param root0
 * @param root0.jsonElement
 * @param root0.excludeElements
 * @param root0.renderMode
 * @param root0.neonData
 */
const RenderContentElement: React.FC<RenderContentElementProps> = ({
    jsonElement,
    excludeElements,
    renderMode,
    neonData
}) => {
    let render = null;

    try {
        if (!excludeElements || !excludeElements.includes(jsonElement.nodeType)) {
            switch (jsonElement.nodeType) {
                case 'document':
                    render = jsonElement.elements.map((subel, i) => (
                        <RenderContentElement
                            key={i}
                            jsonElement={subel}
                            excludeElements={excludeElements}
                            renderMode={renderMode}
                            neonData={neonData}
                        />
                    ));
                    break;
                case 'headgroup':
                    render = jsonElement.elements.map((subel, i) => (
                        <RenderContentElement
                            key={i}
                            jsonElement={subel}
                            excludeElements={excludeElements}
                            renderMode={renderMode}
                            neonData={neonData}
                        />
                    ));
                    break;
                case 'overhead':
                    render = (
                        <React.Fragment>
                            {jsonElement.elements.map((subel, i) => (
                                <RenderFormattedText key={i} jsonElement={subel} neonData={neonData} />
                            ))}
                        </React.Fragment>
                    );
                    break;
                case 'headline':
                    render = (
                        <React.Fragment>
                            {jsonElement.elements.map((subel, i) => (
                                <RenderFormattedText key={i} jsonElement={subel} neonData={neonData} />
                            ))}
                        </React.Fragment>
                    );
                    break;
                case 'overhead':
                    render = (
                        <React.Fragment>
                            {jsonElement.elements.map((subel, i) => (
                                <RenderFormattedText key={i} jsonElement={subel} neonData={neonData} />
                            ))}
                        </React.Fragment>
                    );
                    break;
                case 'summary':
                    if (renderMode === 'styled') {
                        render = (
                            <React.Fragment>
                                {jsonElement.elements.map((subel, i) => (
                                    <RenderContentElement
                                        key={i}
                                        jsonElement={subel}
                                        excludeElements={excludeElements}
                                        renderMode={renderMode}
                                        neonData={neonData}
                                    />
                                ))}
                            </React.Fragment>
                        );
                    } else {
                        render = (
                            <React.Fragment>
                                {jsonElement.elements.map((subel, i) => (
                                    <RenderFormattedText key={i} jsonElement={subel} neonData={neonData} />
                                ))}
                            </React.Fragment>
                        );
                    }
                    break;
                case 'text':
                    render = (
                        <React.Fragment>
                            {jsonElement.elements.map((subel, i) => (
                                <RenderContentElement
                                    key={i}
                                    jsonElement={subel}
                                    excludeElements={excludeElements}
                                    renderMode={renderMode}
                                    neonData={neonData}
                                />
                            ))}
                        </React.Fragment>
                    );
                case 'content':
                    render = (
                        <React.Fragment>
                            {jsonElement.elements.map((subel, i) => (
                                <RenderContentElement
                                    key={i}
                                    jsonElement={subel}
                                    excludeElements={excludeElements}
                                    renderMode={renderMode}
                                    neonData={neonData}
                                />
                            ))}
                        </React.Fragment>
                    );
                    break;
                case 'h1':
                    render = <React.Fragment>{findElementText(jsonElement)}</React.Fragment>;
                    if (renderMode && ['styled', 'newsletter'].includes(renderMode)) {
                        render = (
                            <Container sx={{ my: 1 }} maxWidth="md">
                                <Typography variant="h1">{render}</Typography>
                            </Container>
                        );
                    }
                    break;
                case 'h2':
                    render = <React.Fragment>{findElementText(jsonElement)}</React.Fragment>;
                    if (renderMode && ['styled', 'newsletter'].includes(renderMode)) {
                        render = (
                            <Container sx={{ my: 1 }} maxWidth="md">
                                <Typography variant="h2">{render}</Typography>
                            </Container>
                        );
                    }
                    break;
                case 'h3':
                    render = <React.Fragment>{findElementText(jsonElement)}</React.Fragment>;
                    if (renderMode && ['styled', 'newsletter'].includes(renderMode)) {
                        render = (
                            <Container sx={{ my: 1 }} maxWidth="md">
                                <Typography variant="h3">{render}</Typography>
                            </Container>
                        );
                    }
                    break;
                case 'h4':
                    render = <React.Fragment>{findElementText(jsonElement)}</React.Fragment>;
                    if (renderMode && ['styled', 'newsletter'].includes(renderMode)) {
                        render = (
                            <Container sx={{ my: 1 }} maxWidth="md">
                                <Typography variant="h4">{render}</Typography>
                            </Container>
                        );
                    }
                    break;
                case 'h5':
                    render = <React.Fragment>{findElementText(jsonElement)}</React.Fragment>;
                    if (renderMode && ['styled', 'newsletter'].includes(renderMode)) {
                        render = (
                            <Container sx={{ my: 1 }} maxWidth="md">
                                <Typography variant="h5">{render}</Typography>
                            </Container>
                        );
                    }
                    break;
                case 'h6':
                    render = <React.Fragment>{findElementText(jsonElement)}</React.Fragment>;
                    if (renderMode && ['styled', 'newsletter'].includes(renderMode)) {
                        render = (
                            <Container sx={{ my: 1 }} maxWidth="md">
                                <Typography variant="h6">{render}</Typography>
                            </Container>
                        );
                    }
                    break;
                case 'i':
                    render = <em>{findElementText(jsonElement)}</em>;
                    break;
                case 'b':
                    render = <strong>{findElementText(jsonElement)}</strong>;
                    break;
                case 'u':
                    render = <u>{findElementText(jsonElement)}</u>;
                    break;
                case 'a':
                    render = (
                        <NextLink href={jsonElement.attributes.href} passHref>
                            <MUILink underline="hover" color="secondary">
                                {findElementText(jsonElement)}
                            </MUILink>
                        </NextLink>
                    );
                    break;
                case 'p':
                    render = (
                        <React.Fragment>
                            {jsonElement.elements
                                ? jsonElement.elements
                                      .filter(
                                          subel =>
                                              subel.nodeType === 'text' ||
                                              subel.nodeType === 'element' ||
                                              subel.nodeType === 'plainText' ||
                                              subel.nodeType === 'u' ||
                                              subel.nodeType === 'b' ||
                                              subel.nodeType === 'i' ||
                                              subel.nodeType === 'sub' ||
                                              subel.nodeType === 'sup' ||
                                              subel.nodeType === 'a' ||
                                              subel.nodeType === 'anchor'
                                          // && subel.name === 'keyword'
                                      )
                                      .map((subel, i) => (
                                          <RenderFormattedText key={i} jsonElement={subel} neonData={neonData} />
                                      ))
                                : null}
                        </React.Fragment>
                    );
                    if (renderMode && ['styled', 'newsletter'].includes(renderMode)) {
                        render = (
                            <Container sx={{ my: 1 }} maxWidth="md">
                                <Typography variant="body1" component="p">
                                    {render}
                                </Typography>
                            </Container>
                        );
                    }
                    const table = jsonElement.elements
                        ? jsonElement.elements.find(subel => subel.nodeType === 'table')
                        : null;
                    if (table) {
                        render = (
                            <React.Fragment>
                                {render}
                                <RenderContentElement
                                    jsonElement={table}
                                    excludeElements={excludeElements}
                                    renderMode={renderMode}
                                    neonData={neonData}
                                />
                                ;
                            </React.Fragment>
                        );
                    }
                    break;
                case 'ul':
                    render = (
                        <React.Fragment>
                            {jsonElement.elements
                                ? jsonElement.elements.map((subel, i) => (
                                      <RenderContentElement
                                          key={i}
                                          jsonElement={subel}
                                          excludeElements={excludeElements}
                                          renderMode={renderMode}
                                          neonData={neonData}
                                      />
                                  ))
                                : null}
                        </React.Fragment>
                    );
                    if (renderMode && ['styled', 'newsletter'].includes(renderMode)) {
                        render = (
                            <Container sx={{ my: 1 }} maxWidth="md" component="ul">
                                {render}
                            </Container>
                        );
                    }
                    break;
                case 'ol':
                    render = (
                        <React.Fragment>
                            {jsonElement.elements
                                ? jsonElement.elements.map((subel, i) => (
                                      <RenderContentElement
                                          key={i}
                                          jsonElement={subel}
                                          excludeElements={excludeElements}
                                          renderMode={renderMode}
                                          neonData={neonData}
                                      />
                                  ))
                                : null}
                        </React.Fragment>
                    );
                    if (renderMode && ['styled', 'newsletter'].includes(renderMode)) {
                        render = (
                            <Container sx={{ my: 1 }} maxWidth="md" component="ol">
                                {render}
                            </Container>
                        );
                    }
                    break;
                case 'li':
                    render = (
                        <React.Fragment>
                            {jsonElement.elements
                                ? jsonElement.elements.map((subel, i) => {
                                      if (
                                          subel.nodeType === 'element' &&
                                          (subel.nodeType === 'ul' || subel.nodeType === 'ol')
                                      ) {
                                          return (
                                              <RenderContentElement
                                                  key={i}
                                                  jsonElement={subel}
                                                  excludeElements={excludeElements}
                                                  renderMode={renderMode}
                                                  neonData={neonData}
                                              />
                                          );
                                      }
                                      return <RenderFormattedText key={i} jsonElement={subel} />;
                                  })
                                : null}
                        </React.Fragment>
                    );
                    if (renderMode && ['styled', 'newsletter'].includes(renderMode)) {
                        render = (
                            <Typography sx={{ ml: 3 }} variant="body1" component="li">
                                {/* hydration error */}
                                {render}
                            </Typography>
                        );
                    }
                    break;
                case 'mediagallery':
                    render = (
                        <FigureGallery
                            jsonElement={jsonElement}
                            excludeElements={excludeElements}
                            neonData={neonData}
                        />
                    );
                    break;

                case 'image':
                case 'figure':
                case 'inline-media-group':
                    if (jsonElement.attributes['emk-type'] === 'cloudinaryVideo') {
                        render = (
                            <CloudinaryVideo
                                jsonElement={jsonElement}
                                excludeElements={excludeElements}
                                renderMode={renderMode}
                                neonData={neonData}
                            />
                        );
                    } else {
                        render = (
                            <Figure
                                jsonElement={jsonElement}
                                excludeElements={excludeElements}
                                renderMode={renderMode}
                                neonData={neonData}
                            />
                        );
                    }
                    break;
                case 'div':
                    if (jsonElement.attributes['emk-type'] === 'gallery') {
                        render = (
                            <FigureGallery
                                jsonElement={jsonElement}
                                excludeElements={excludeElements}
                                neonData={neonData}
                            />
                        );
                    } else if (jsonElement.attributes['emk-type'] === 'extra-links') {
                        render = (
                            <ExtraLinks
                                jsonElement={jsonElement}
                                excludeElements={excludeElements}
                                renderMode={renderMode}
                                neonData={neonData}
                            />
                        );
                    }
                    break;
                case 'table':
                    if (jsonElement.attributes && jsonElement.attributes.class === 'DataMap') {
                        render = (
                            <Container sx={{ my: 1 }} maxWidth="md">
                                {/* <SimpleMap jsonElement={jsonElement} neonData={neonData} /> */}
                            </Container>
                        );
                    } else {
                        const tableAttr = jsonElement.attributes;
                        const className = tableAttr ? tableAttr.class : null;
                        const tableCellPadding = tableAttr ? tableAttr.cellpadding : null;
                        const tableCellSpacing = tableAttr ? tableAttr.cellspacing : null;
                        render = (
                            <table className={className} cellPadding={tableCellPadding} cellSpacing={tableCellSpacing}>
                                {jsonElement.elements
                                    ? jsonElement.elements.map((subel, i) => (
                                          <RenderContentElement
                                              key={i}
                                              jsonElement={subel}
                                              excludeElements={excludeElements}
                                              renderMode={renderMode}
                                              neonData={neonData}
                                          />
                                      ))
                                    : null}
                            </table>
                        );
                    }
                    break;
                case 'thead':
                    const theadAttr = jsonElement.attributes;

                    render = (
                        <thead {...theadAttr}>
                            {jsonElement.elements
                                ? jsonElement.elements.map((subel, i) => (
                                      <RenderContentElement
                                          key={i}
                                          jsonElement={subel}
                                          excludeElements={excludeElements}
                                          renderMode={renderMode}
                                          neonData={neonData}
                                      />
                                  ))
                                : null}
                        </thead>
                    );
                    break;
                case 'tbody':
                    const tbodyAttr = jsonElement.attributes;

                    render = (
                        <tbody {...tbodyAttr}>
                            {jsonElement.elements
                                ? jsonElement.elements.map((subel, i) => (
                                      <RenderContentElement
                                          key={i}
                                          jsonElement={subel}
                                          excludeElements={excludeElements}
                                          renderMode={renderMode}
                                          neonData={neonData}
                                      />
                                  ))
                                : null}
                        </tbody>
                    );
                    break;
                case 'tr':
                    const trAttr = jsonElement.attributes;

                    render = (
                        <tr {...trAttr}>
                            {jsonElement.elements
                                ? jsonElement.elements.map((subel, i) => (
                                      <RenderContentElement
                                          key={i}
                                          jsonElement={subel}
                                          excludeElements={excludeElements}
                                          renderMode={renderMode}
                                          neonData={neonData}
                                      />
                                  ))
                                : null}
                        </tr>
                    );
                    break;
                case 'td':
                    const tdAttr = jsonElement.attributes;

                    render = (
                        <td {...tdAttr}>
                            {jsonElement.elements
                                ? jsonElement.elements.map((subel, i) => (
                                      <RenderFormattedText key={i} jsonElement={subel} neonData={neonData} />
                                  ))
                                : null}
                        </td>
                    );
                    break;
                case 'oembedblock':
                    // TODO

                    const cdata = jsonElement.elements.filter(el => (el.nodeType = 'plainText')).map(el => el.value);
                    render = <div dangerouslySetInnerHTML={{ __html: cdata }}></div>;
                    if (renderMode && ['styled', 'newsletter'].includes(renderMode)) {
                        render = (
                            <Container sx={{ my: 2 }} maxWidth="md" component="div">
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    {render}
                                </Box>
                            </Container>
                        );
                    }
                    break;
                case 'poll':
                    render = <InlinePoll jsonElement={jsonElement} neonData={neonData} />;
                    break;
                case 'blockquote':
                    // logger.debug(neonData.object.helper.content);
                    render = (
                        <React.Fragment>
                            {jsonElement.elements
                                ? jsonElement.elements.map((subel, i) => (
                                      <RenderFormattedText key={i} jsonElement={subel} neonData={neonData} />
                                  ))
                                : null}
                        </React.Fragment>
                    );
                    if (renderMode && ['styled', 'newsletter'].includes(renderMode)) {
                        render = (
                            <Container sx={{ my: 3 }} maxWidth="sm" component="blockquote">
                                <Typography variant="h5" component="p">
                                    {render}
                                </Typography>
                            </Container>
                        );
                    }
                    break;
                case 'extra':
                    if (jsonElement.attributes['emk-class'] === 'card') {
                        render = (
                            <Container sx={{ my: 3 }} maxWidth="sm">
                                <Card jsonElement={jsonElement} neonData={neonData} />
                            </Container>
                        );
                    } else {
                        let extraHeadline = null;
                        try {
                            extraHeadline = jsonElement.elements.find(
                                subel => subel.attributes['emk-type'] === 'extra-content-headline'
                            );
                            if (extraHeadline.elements) {
                                extraHeadline = extraHeadline.elements
                                    .map((subel, i) => (subel.text ? subel.text : ''))
                                    .join();
                            } else {
                                extraHeadline = null;
                            }
                        } catch (e) {}

                        render = (
                            <React.Fragment>
                                {jsonElement.elements
                                    ? jsonElement.elements
                                          .filter(subel => subel.attributes['emk-type'] !== 'extra-content-headline')
                                          .map((subel, i) => (
                                              <RenderContentElement
                                                  key={i}
                                                  jsonElement={subel}
                                                  excludeElements={excludeElements}
                                                  renderMode={renderMode}
                                                  neonData={neonData}
                                              />
                                          ))
                                    : null}
                            </React.Fragment>
                        );
                        if (renderMode && ['styled', 'newsletter'].includes(renderMode)) {
                            render = (
                                <Container
                                    maxWidth="md"
                                    sx={{
                                        my: 4,
                                        py: 2,
                                        border: 2,
                                        borderColor: 'grey.500',
                                        textAlign: 'left'
                                    }}
                                >
                                    {extraHeadline ? (
                                        <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
                                            {extraHeadline}
                                        </Typography>
                                    ) : null}
                                    {render}
                                </Container>
                            );
                        }
                    }
                    break;
                case 'style':
                    break;
                default:
                    render = (
                        <React.Fragment>
                            {jsonElement.elements
                                ? jsonElement.elements.map((subel, i) => {
                                      return (
                                          <RenderContentElement
                                              key={i}
                                              jsonElement={subel}
                                              excludeElements={excludeElements}
                                              renderMode={renderMode}
                                              neonData={neonData}
                                          />
                                      );
                                  })
                                : null}
                        </React.Fragment>
                    );
            }
        }
    } catch (error) {}
    return render;
};

// function Poll({ jsonElement, neonData }) {
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
//     } catch (e) { logger.info(e) }

//     return render;
// }

/**
 *
 * @param root0
 * @param root0.jsonElement
 * @param root0.excludeElements
 * @param root0.neonData
 * @param root0.renderMode
 */
function Figure({ jsonElement, excludeElements, neonData, renderMode }) {
    let render = null;

    let imageUrl = null;
    let imageWidth = 1024;
    let imageHeight = 576;

    const wideCrop = jsonElement.elements.find(elem => elem.attributes.softCrop === 'Wide');

    try {
        const classes = wideCrop.attributes.class;

        const tmx = wideCrop.attributes.tmx;
        if (tmx) {
            let tokens = tmx.split(' ');
            imageWidth = tokens[tokens.length - 2];
            imageHeight = tokens[tokens.length - 1];
        }

        imageUrl = ResourceResolver(wideCrop.attributes.src);
    } catch (e) {
        console.log('error', e);
    }

    render = (
        <Container sx={{ my: 4 }} maxWidth="lg">
            <Box display="flex" justifyContent="center" alignItems="center">
                {imageUrl ? (
                    renderMode === 'newsletter' ? (
                        <img src={imageUrl} width={imageWidth} height={imageHeight} alt="Newsletter Image" />
                    ) : (
                        <img src={imageUrl} width={imageWidth} height={imageHeight} alt="Main Image" />
                    )
                ) : (
                    <p>No image available</p>
                )}
            </Box>
        </Container>
    );

    return render;
}

/**
 *
 * @param root0
 * @param root0.jsonElement
 * @param root0.excludeElements
 * @param root0.neonData
 */
function FigureGallery({ jsonElement, excludeElements, neonData }) {
    let render = null;
    let images = [];
    try {
        images = jsonElement.elements.map(el => {
            const origImageUrl = getImageUrl(el, 'Wide', neonData);
            const thumbImageUrl = getImageUrl(el, 'Square', neonData);

            const origImageFullUrl = ResourceResolver(origImageUrl);
            const thumbImageFullUrl = ResourceResolver(thumbImageUrl);

            return {
                original: origImageFullUrl,
                thumbnail: thumbImageFullUrl
            };
        });

        render = (
            <Container sx={{ my: 4 }} maxWidth="lg">
                <Box display="flex" justifyContent="center" alignItems="center">
                    <ImageGallery items={images} />
                </Box>
            </Container>
        );
    } catch (error) {}
    return render;
}

/**
 *
 * @param root0
 * @param root0.jsonElement
 * @param root0.excludeElements
 * @param root0.renderMode
 * @param root0.neonData
 */
function ExtraLinks({ jsonElement, excludeElements, renderMode, neonData }) {
    let render = null;

    let headlineBlock = null;
    try {
        headlineBlock = jsonElement.elements.find(el => el.attributes['emk-type'] === 'extra-links-headline');
        if (headlineBlock) {
            headlineBlock = (
                <React.Fragment>
                    {headlineBlock.elements
                        ? headlineBlock.elements.map((subel, i) => (
                              <RenderFormattedText key={i} jsonElement={subel} neonData={neonData} />
                          ))
                        : null}
                </React.Fragment>
            );
        }
    } catch (e) {}

    let linksBlock = null;
    try {
        linksBlock = jsonElement.elements.filter(el => el.attributes['emk-type'] === 'extra-link');
        if (linksBlock) {
            linksBlock = linksBlock.map((el, i) => {
                let blockRender = null;
                const linkHeadline = (
                    <React.Fragment>
                        {el.elements
                            ? el.elements.map((subel, i) => (
                                  <RenderFormattedText key={i} jsonElement={subel} neonData={neonData} />
                              ))
                            : null}
                    </React.Fragment>
                );
                const linkedObject = neonData.pageContext.nodes[el.attributes['data-id']];
                if (linkedObject) {
                    const linkedObjectHelper: any = getNeonDataHelper(linkedObject);

                    let linkedObjectMainPictureElement = null;
                    let linkedObjectMainImageUrl = null;
                    try {
                        linkedObjectMainPictureElement = findElementsInContentJson(
                            ['mediagroup'],
                            linkedObjectHelper.content
                        )[0].elements[0];
                        linkedObjectMainImageUrl = getImageUrl(linkedObjectMainPictureElement, 'square', neonData);
                        if (linkedObjectMainImageUrl && linkedObjectMainImageUrl !== '#') {
                            // TODO fix this
                            linkedObjectMainImageUrl = getImageFormatUrl(linkedObjectMainImageUrl, 'thumb');
                            linkedObjectMainImageUrl = ResourceResolver(linkedObjectMainImageUrl);
                        } else {
                            linkedObjectMainImageUrl = null;
                        }
                    } catch (e) {
                        logger.error(e);
                    }

                    const imageWidth = 100;
                    const imageHeight = 100;
                    let linkImage = null;
                    if (linkedObjectMainImageUrl) {
                        if (renderMode && renderMode === 'newsletter') {
                            linkImage = <img src={linkedObjectMainImageUrl} width={imageWidth} height={imageHeight} />;
                        } else {
                            linkImage = (
                                <Image src={linkedObjectMainImageUrl} width={imageWidth} height={imageHeight} alt="" />
                            );
                        }
                    } else {
                        linkImage = <p>No image available</p>;
                    }

                    blockRender = (
                        <Box key={i} display="flex" justifyContent="flexStart" alignItems="center">
                            <Box sx={{ py: 1 }}>{linkImage || null}</Box>
                            <Box sx={{ mx: 2, maxWidth: '70%' }} flexShrink={1}>
                                <NextLink href={el.attributes.href} passHref prefetch={!neonData.previewData}>
                                    <MUILink variant="h6" underline="hover" color="secondary">
                                        {linkHeadline}
                                    </MUILink>
                                </NextLink>
                            </Box>
                        </Box>
                    );
                }
                return blockRender;
            });
        }
    } catch (e) {
        logger.info(e);
    }

    render = (
        <Container maxWidth="sm" sx={{ my: 4, border: 2, borderColor: 'grey.500' }}>
            <Box display="flex" flexDirection="column" justifyContent="flexStart" alignItems="flexStart">
                {headlineBlock ? (
                    <Box key="extra-links-headline" sx={{ borderBottom: 1, borderColor: 'grey.500', my: 1 }}>
                        <Typography variant="h6" component="h5" gutterBottom>
                            {headlineBlock}
                        </Typography>
                    </Box>
                ) : null}
                {linksBlock}
            </Box>
        </Container>
    );
    return render;
}

export default RenderContentElement;

type CloudinaryVideoProps = {
    jsonElement: any;
    excludeElements?: string[];
    renderMode?: string;
    neonData?: any;
};

/**
 *
 * @param root0
 * @param root0.jsonElement
 * @param root0.excludeElements
 * @param root0.renderMode
 * @param root0.neonData
 */
export const CloudinaryVideo: React.FC<CloudinaryVideoProps> = ({
    jsonElement,
    excludeElements,
    renderMode,
    neonData
}) => {
    const videoSrc = jsonElement.elements[0].attributes.src;
    const videoSrcArray = videoSrc.split('/');
    const videoFileName = videoSrcArray.slice(-1)[0];
    const videoId = videoFileName.substring(0, videoFileName.lastIndexOf('.'));
    let render = <></>;

    if (renderMode && ['styled', 'newsletter'].includes(renderMode)) {
        render = (
            <Container sx={{ my: 4 }} maxWidth="lg">
                <Box display="flex" justifyContent="center" alignItems="center">
                    {render}
                </Box>
            </Container>
        );
    }

    return render;
};
