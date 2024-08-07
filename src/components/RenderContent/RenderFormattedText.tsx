import NextLink from 'next/link';
import { Link as MUILink } from '@mui/material';

import React from 'react';
import { findElementsInContentJson, findElementText } from '@/utils/ContentUtil';

type RenderFormattedTextProps = {
    jsonElement?: any;
    neonData?: any;
};

/**
 *
 * @param root0
 * @param root0.jsonElement
 * @param root0.neonData
 */
const RenderFormattedText: React.FC<RenderFormattedTextProps> = ({ jsonElement, neonData }) => {
    let render = null;

    switch (jsonElement.nodeType) {
        case 'plainText':
        case 'text':
            return findElementText(jsonElement);
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
            render = <React.Fragment>{findElementText(jsonElement)}</React.Fragment>;
            break;
        case 'question':
            render = <React.Fragment>{findElementText(jsonElement)}</React.Fragment>;
            break;
        case 'keyword':
            const keywordText = jsonElement.elements.map((subel, i) => subel.text).toString();
            if (neonData && neonData.previewData) {
                render = keywordText;
            } else {
                const defaultText = `'default=${keywordText}'`;
                render = <span>{`{{ insert first_name "default=${keywordText}" }}`}</span>;
            }
            break;
    }

    return render;
};

export default RenderFormattedText;
