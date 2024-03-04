import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { findElementsInContentJson } from '../../utils/ContentUtil';
import RenderContentElement from '../RenderContent/RenderContentElement';

/**
 *
 * @param root0
 * @param root0.neonData
 */
export default function BasicNewsletter({ neonData }) {
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
        console.log(e);
    }

    render = (
        <React.Fragment>
            {neonData.previewData ? (
                <Container maxWidth="md" sx={{ mb: 3, pb: 1, borderBottom: 2 }}>
                    <Typography
                        sx={{ fontWeight: 600 }}
                        display="inline-flex"
                        justifyContent="flex-start"
                        alignItems="center"
                        variant="h6"
                    >
                        Subject:&nbsp;
                    </Typography>
                    <Typography display="inline-flex" justifyContent="flex-start" alignItems="center" variant="h6">
                        {subject}
                    </Typography>
                </Container>
            ) : null}
            <Container maxWidth="md">{content}</Container>
        </React.Fragment>
    );
    return render;
}
