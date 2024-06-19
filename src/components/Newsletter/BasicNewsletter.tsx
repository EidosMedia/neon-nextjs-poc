import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { findElementsInContentJson } from '../../utils/ContentUtil';
import RenderContentElement from '../RenderContent/RenderContentElement';
import { GenericPageProps } from 'src/types/commonTypes';
import logger from 'logger';

/**
 *
 * @param root0
 * @param root0.neonData
 */
const BasicNewsletter: React.FC<GenericPageProps> = ({ neonData }) => {
    let render = null;

    let subject = null;
    try {
        subject = (
            <RenderContentElement
                jsonElement={findElementsInContentJson(['headline'], neonData.object.helper.content)[0]}
            />
        );
    } catch (e) {}

    let content = null;
    try {
        content = (
            <RenderContentElement
                jsonElement={findElementsInContentJson(['content'], neonData.object.helper.content)[0]}
                renderMode="newsletter"
                neonData={neonData}
            />
        );
    } catch (e) {
        logger.error(e);
    }

    render = (
        <React.Fragment>
            <Container maxWidth="md">{content}</Container>
        </React.Fragment>
    );
    return render;
};

export default BasicNewsletter;
