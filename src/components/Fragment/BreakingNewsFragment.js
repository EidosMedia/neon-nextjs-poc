import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import RenderContentElement from '../RenderContent/RenderContentElement';
import { findElementsInContentJson } from '../../utils/ContentUtil';
import { CardActionArea } from '@mui/material';

export default function BreakingNewsFragment({ cobaltData, gridContext }) {
    let templateName = ""
    if (cobaltData) {
        templateName = cobaltData.linkContext.linkTemplate;
    }

    let variantId = 0

    if (cobaltData.abTesting && cobaltData.abTesting.variant) {
        [, variantId] = cobaltData.abTesting.variant.split('.');
    }

    let headline = null;

    if (variantId > 0) {
        try {
            headline = cobaltData.linkContext.linkData.parameters['customHeadline_v' + variantId]
        } catch (e) { }
    }
    if (!headline) {
        try {
            headline = cobaltData.linkContext.linkData.parameters.customHeadline
        } catch (e) { }
    }
    if (!headline) {
        try {
            headline = <RenderContentElement jsonElement={findElementsInContentJson(['headline'], cobaltData.object.helper.content)[0]} />
        } catch (e) {
        }
    }

    let headlineVariant = "h4";

    return (
        <React.Fragment>
            <Card square elevation={4} sx={{mb:2}}>
                <CardContent>
                    <Typography display="inline" color="red" variant={headlineVariant} sx={{fontWeight:'bold'}}>BREAKING / </Typography>
                    <Typography display="inline" gutterBottom variant={headlineVariant} component="div" sx={{mb:0}}>
                        {headline}
                    </Typography>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}