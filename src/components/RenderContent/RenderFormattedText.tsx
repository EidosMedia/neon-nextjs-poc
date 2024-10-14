import NextLink from 'next/link';
import { Link as MUILink } from '@mui/material';

import React from 'react';
import { GenericPageProps } from 'src/types/commonTypes';

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

    switch (jsonElement.type) {
        case 'text':
            render = jsonElement.text;
            break;
        case 'element':
            let subRender = null;
            subRender = jsonElement.elements
                ? jsonElement.elements.map((subel, i) => <RenderFormattedText key={i} jsonElement={subel} />)
                : null;
            if (subRender) {
                switch (jsonElement.name) {
                    case 'i':
                    case 'em':
                        render = <em>{subRender}</em>;
                        break;
                    case 'b':
                    case 'strong':
                        render = <strong>{subRender}</strong>;
                        break;
                    case 'u':
                        render = <u>{subRender}</u>;
                        break;
                    case 'sub':
                        render = <sub>{subRender}</sub>;
                        break;
                    case 'sup':
                        render = <sup>{subRender}</sup>;
                        break;
                    case 'a':
                        render = (
                            <NextLink href={jsonElement.attributes.href} color="secondary">
                                {subRender}
                            </NextLink>
                        );
                        break;
                    case 'p':
                        // avoid <p> in <p>
                        render = <React.Fragment>{subRender}</React.Fragment>;
                        break;
                    case 'question':
                        render = <React.Fragment>{subRender}</React.Fragment>;
                        break;
                    case 'keyword':
                        const keywordText = jsonElement.elements.map((subel, i) => subel.text).toString();
                        if (neonData && neonData.previewData) {
                            render = keywordText;
                        } else {
                            const defaultText = `'default=${keywordText}'`;
                            render = <span>{`{{ insert first_name "default=${keywordText}" }}`}</span>;
                        }
                }
            }
            break;
    }

    return render;
};

export default RenderFormattedText;
