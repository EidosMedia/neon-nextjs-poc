import ResourceResolver from '../../utils/ResourceResolver';
import RenderFormattedText from './RenderFormattedText';
import React from 'react';
import { Container, Typography, Link as MUILink } from '@mui/material';
import Image from 'next/image';
import { Box } from '@mui/system';
import ImageGallery from 'react-image-gallery';
import NextLink from 'next/link';
import { getImageFormatUrl } from '../../services/neon-cms/neon-helpers';
import Card from './Card';
import { GenericPageProps } from 'src/types/commonTypes';
import { findElementText } from '@/utils/ContentUtil';

type RenderLiveblogPostElementProps = GenericPageProps & {
    jsonElement?: any;
    excludeElements?: string[];
    renderMode?: string;
    rawPost?: any;
};

/**
 *
 * @param root0
 * @param root0.jsonElement
 * @param root0.excludeElements
 * @param root0.renderMode
 * @param root0.rawPost
 * @param root0.neonData
 */
const RenderLiveblogPostElement: React.FC<RenderLiveblogPostElementProps> = ({
    jsonElement,
    excludeElements,
    renderMode,
    rawPost,
    neonData
}) => {
    let render = null;

    if (jsonElement === null) {
        return null;
    }

    if (!excludeElements || !excludeElements.includes(jsonElement.nodeType)) {
        switch (jsonElement.nodeType) {
            case 'article':
                render = jsonElement.elements.map((subel, i) => (
                    <RenderLiveblogPostElement
                        key={i}
                        jsonElement={subel}
                        excludeElements={excludeElements}
                        renderMode={renderMode}
                        rawPost={rawPost}
                        neonData={neonData}
                    />
                ));
                break;
            case 'h1':
                render = <React.Fragment>{findElementText(jsonElement)}</React.Fragment>;

                if (renderMode && renderMode === 'styled') {
                    render = (
                        <Container sx={{ mb: 2 }} maxWidth="md">
                            <Typography variant="h1" component="h2" sx={{ fontSize: '1.2rem' }}>
                                {render}
                            </Typography>
                        </Container>
                    );
                }
                break;
            case 'p':
                render = (
                    <React.Fragment>
                        {jsonElement.elements
                            ? jsonElement.elements.map((subel, i) => (
                                  <RenderFormattedText key={i} jsonElement={subel} />
                              ))
                            : null}
                    </React.Fragment>
                );
                if (renderMode && renderMode === 'styled') {
                    render = (
                        <Container sx={{ my: 1 }} maxWidth="md">
                            <Typography variant="body1" component="p">
                                {render}
                            </Typography>
                        </Container>
                    );
                }
                break;
            case 'ul':
                render = (
                    <React.Fragment>
                        {jsonElement.elements
                            ? jsonElement.elements.map((subel, i) => (
                                  <RenderLiveblogPostElement
                                      key={i}
                                      jsonElement={subel}
                                      excludeElements={excludeElements}
                                      renderMode={renderMode}
                                      rawPost={rawPost}
                                      neonData={neonData}
                                  />
                              ))
                            : null}
                    </React.Fragment>
                );
                if (renderMode && renderMode === 'styled') {
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
                                  <RenderLiveblogPostElement
                                      key={i}
                                      jsonElement={subel}
                                      excludeElements={excludeElements}
                                      renderMode={renderMode}
                                      rawPost={rawPost}
                                      neonData={neonData}
                                  />
                              ))
                            : null}
                    </React.Fragment>
                );
                if (renderMode && renderMode === 'styled') {
                    render = (
                        <Container sx={{ my: 1 }} maxWidth="md" component="ol">
                            {render}
                        </Container>
                    );
                }
                break;
            case 'li':
                // TODO manage nested ul/li/ul/...,
                render = (
                    <React.Fragment>
                        {jsonElement.elements
                            ? jsonElement.elements.map((subel, i) => (
                                  <RenderFormattedText key={i} jsonElement={subel} />
                              ))
                            : null}
                    </React.Fragment>
                );
                if (renderMode && renderMode === 'styled') {
                    render = (
                        <Typography sx={{ ml: 4 }} variant="body1" component="li">
                            {render}
                        </Typography>
                    );
                }
                break;
            case 'figure':
                if (jsonElement.attributes.type === 'mediagallery') {
                    render = (
                        <FigureGallery
                            jsonElement={jsonElement}
                            excludeElements={excludeElements}
                            neonData={neonData}
                        />
                    );
                } else {
                    render = <Figure jsonElement={jsonElement} excludeElements={excludeElements} neonData={neonData} />;
                }
                break;
            case 'blockquote':
                try {
                    if (jsonElement.attributes['emk-class'] === 'card') {
                        render = <Card jsonElement={jsonElement} neonData={neonData} />;
                    } else if (jsonElement.attributes['data-id']) {
                        // This is a content link
                        render = (
                            <ContentLink
                                jsonElement={jsonElement}
                                excludeElements={excludeElements}
                                neonData={neonData}
                            />
                        );
                    }
                } catch (error) {}
                if (!render) {
                    // This is a standard quote
                    render = (
                        <React.Fragment>
                            {jsonElement.elements
                                ? jsonElement.elements.map((subel, i) => (
                                      <RenderFormattedText key={i} jsonElement={subel} />
                                  ))
                                : null}
                        </React.Fragment>
                    );
                    if (renderMode && renderMode === 'styled') {
                        render = (
                            <Container sx={{ my: 2, mx: 3 }} maxWidth="md">
                                <Typography
                                    variant="h6"
                                    component="p"
                                    sx={{
                                        mr: 6,
                                        p: 1,
                                        fontStyle: 'italic',
                                        backgroundColor: '#F0F8FF'
                                    }}
                                >
                                    "{render}"
                                </Typography>
                            </Container>
                        );
                    }
                }
            case 'style':
                break;
            case 'social':
                try {
                    const { src } = jsonElement.elements[0].elements[0].elements[0].attributes;
                    render = <iframe src={src} style={{ height: '500px' }} />;
                    if (renderMode && ['styled', 'newsletter'].includes(renderMode)) {
                        render = (
                            <Container sx={{ my: 2 }} maxWidth="md" component="div">
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    {render}
                                </Box>
                            </Container>
                        );
                    }
                } catch (error) {}
                break;
            case 'video':
                try {
                    if (jsonElement.attributes.type === 'youtube') {
                        const { id } = jsonElement.attributes;
                        const url = `https://www.youtube.com/embed/${id}`;
                        render = <iframe width="450" height="250" allowFullScreen={true} src={url} />;
                        if (renderMode && ['styled', 'newsletter'].includes(renderMode)) {
                            render = (
                                <Container sx={{ my: 2 }} maxWidth="md" component="div">
                                    <Box display="flex" justifyContent="center" alignItems="center">
                                        {render}
                                    </Box>
                                </Container>
                            );
                        }
                    }
                } catch (e) {}
                break;
            default:
                render = (
                    <React.Fragment>
                        {jsonElement.elements
                            ? jsonElement.elements.map((subel, i) => {
                                  return (
                                      <RenderLiveblogPostElement
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
    return render;
};

export default RenderLiveblogPostElement;

type BaseElementProps = {
    jsonElement?: any;
    excludeElements?: string[];
    neonData?: any;
};

/**
 *
 * @param root0
 * @param root0.jsonElement
 * @param root0.excludeElements
 * @param root0.neonData
 */
const Figure: React.FC<BaseElementProps> = ({ jsonElement, excludeElements, neonData }) => {
    let render = null;

    let imageUrl = null;

    try {
        imageUrl = ResourceResolver(jsonElement.elements[0].attributes.src);
    } catch (e) {
        console.log(e);
    }

    const imageWidth = 1024;
    const imageHeight = 576;

    render = (
        <Container sx={{ my: 4 }} maxWidth="md">
            <Box display="flex" justifyContent="center" alignItems="center">
                {imageUrl ? (
                    <Image src={imageUrl} width={imageWidth} height={imageHeight} alt="" />
                ) : (
                    <p>No image available</p>
                )}
                {/* <img width="100%" src={imageUrl} /> */}
            </Box>
        </Container>
    );

    return render;
};

/**
 *
 * @param root0
 * @param root0.jsonElement
 * @param root0.excludeElements
 * @param root0.neonData
 */
const FigureGallery: React.FC<BaseElementProps> = ({ jsonElement, excludeElements, neonData }) => {
    let render = null;
    let images = [];
    try {
        images = jsonElement.elements.map(el => {
            const origImageUrl = el.elements[0].attributes.src;
            const strIndex = origImageUrl.lastIndexOf('/');
            const thumbImageUrl = `${origImageUrl.slice(0, strIndex)}/format/thumb${origImageUrl.slice(strIndex)}`;

            const origImageFullUrl = ResourceResolver(origImageUrl);
            const thumbImageFullUrl = ResourceResolver(thumbImageUrl);

            return {
                original: origImageFullUrl,
                thumbnail: thumbImageFullUrl
            };
        });

        render = (
            <Container sx={{ my: 4 }} maxWidth="md">
                <Box display="flex" justifyContent="center" alignItems="center">
                    <ImageGallery items={images} />
                </Box>
            </Container>
        );
    } catch (e) {}
    return render;
};

/**
 *
 * @param root0
 * @param root0.jsonElement
 * @param root0.excludeElements
 * @param root0.neonData
 */
const ContentLink: React.FC<BaseElementProps> = ({ jsonElement, excludeElements, neonData }) => {
    let render = null;
    let linkHeadline = null;
    let linkUrl = null;
    try {
        linkHeadline = jsonElement.elements.map((subel, i) => <RenderFormattedText key={i} jsonElement={subel} />);
        linkUrl = jsonElement.attributes.href;
    } catch (e) {}

    render = (
        <Container maxWidth="md" sx={{ my: 4, border: 2, borderColor: 'grey.500' }}>
            <Box display="flex" justifyContent="flexStart" alignItems="flexStart">
                <Box sx={{ mx: 2, my: 2 }} key="extra-links-headline">
                    <Typography variant="h6" component="h5" color="error.main" gutterBottom sx={{ fontWeight: 'bold' }}>
                        READ
                    </Typography>
                </Box>
                <Box sx={{ mx: 2, my: 2 }} flexShrink={1}>
                    <NextLink href={linkUrl} passHref prefetch={!neonData.previewData}>
                        <MUILink variant="h6" underline="hover" color="secondary">
                            {linkHeadline}
                        </MUILink>
                    </NextLink>
                </Box>
            </Box>
        </Container>
    );
    return render;
};
