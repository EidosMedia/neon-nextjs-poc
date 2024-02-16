import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import RenderContentElement from '../RenderContent/RenderContentElement';
import { findElementsInContentJson } from '../../utils/ContentUtil';
import { CardActionArea } from '@mui/material';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.gridContext
 */
export default function BreakingNewsFragment({ neonData, gridContext }) {
    let templateName = '';
    if (neonData) {
        templateName = neonData.linkContext.linkTemplate;
    }

    let variantId = 0;

    if (neonData.abTesting && neonData.abTesting.variant) {
        [, variantId] = neonData.abTesting.variant.split('.');
    }

    let headline = null;

    if (variantId > 0) {
        try {
            headline = neonData.linkContext.linkData.parameters[`customHeadline_v${variantId}`];
        } catch (e) {}
    }
    if (!headline) {
        try {
            headline = neonData.linkContext.linkData.parameters.customHeadline;
        } catch (e) {}
    }
    if (!headline) {
        try {
            headline = (
                <RenderContentElement
                    jsonElement={findElementsInContentJson(['headline'], neonData.object.helper.content)[0]}
                />
            );
        } catch (e) {}
    }

    const headlineVariant = 'h4';

    return (
        <React.Fragment>
            <Card square elevation={4} sx={{ mb: 2 }}>
                <CardContent>
                    <Typography display="inline" color="red" variant={headlineVariant} sx={{ fontWeight: 'bold' }}>
                        BREAKING /{' '}
                    </Typography>
                    <Typography display="inline" gutterBottom variant={headlineVariant} component="div" sx={{ mb: 0 }}>
                        {headline}
                    </Typography>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}
