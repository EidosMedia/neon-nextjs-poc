import Link from 'next/link';

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
        case 'anchor':
            const isExternal = jsonElement.attributes.class === 'ext';
            const sanitizedHref = isExternal 
                ? jsonElement.attributes.href.replace(/https%3A%2F%2F/g, 'https://').replace(/http%3A%2F%2F/g, 'https://') 
                : jsonElement.attributes.href.replace(/https%3A%2F%2F/g, '').replace(/http%3A%2F%2F/g, '');

            render = isExternal 
                ? <a href={sanitizedHref} target={jsonElement.attributes.target}>{findElementText(jsonElement)}</a> 
                : <Link href={sanitizedHref} target={jsonElement.attributes.target}>{findElementText(jsonElement)}</Link>
            break;
        case 'p':
            render = <React.Fragment>{findElementText(jsonElement)}</React.Fragment>;
            break;
        case 'sub':
            render = <sub>{findElementText(jsonElement)}</sub>;
            break;
        case 'sup':
            render = <sup>{findElementText(jsonElement)}</sup>;
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
