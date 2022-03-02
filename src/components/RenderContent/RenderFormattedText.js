import NextLink from 'next/link'
import { Link as MUILink } from '@mui/material';

import React from "react";

export default function RenderFormattedText({ jsonElement }) {
    let render = null;

    switch (jsonElement.type) {
        case 'text':
            render = jsonElement.text;
            break;
        case 'element':
            let subRender = null;
            subRender = (jsonElement.elements ? jsonElement.elements.map((subel, i) => <RenderFormattedText key={i} jsonElement={subel} />) : null)
            if (subRender) {
                switch (jsonElement.name) {
                    case 'i':
                        render = <em>{subRender}</em>;
                        break;
                    case 'b':
                        render = <strong>{subRender}</strong>;
                        break;
                    case 'u':
                        render = <u>{subRender}</u>;
                        break;
                    case 'a':
                        render = (
                            <NextLink href={jsonElement.attributes.href} passHref>
                                <MUILink underline="hover" color="secondary">
                                    {subRender}
                                </MUILink>
                            </NextLink>
                            )
                        break;
                    case 'p':
                        //avoid <p> in <p>
                        render = <React.Fragment>{subRender}</React.Fragment>;
                        break;
                    case 'question':
                        render = <React.Fragment>{subRender}</React.Fragment>;
                        break;
                }
            }
            break;
    }

    return render;
}

