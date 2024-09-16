import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ContentElement from './ContentElement';
import { findElementsInContentJson } from '@/utils/ContentUtil';

/**
 *
 * @param root0
 * @param root0.neonData
 */
export default function BreakingNewsFragment({ neonData }) {
    const headline = findElementsInContentJson(['headline'], neonData.object.helper.content)[0];

    const headlineVariant = 'h4';

    return (
        <React.Fragment>
            <Card square elevation={4} sx={{ mb: 2 }}>
                <CardContent>
                    <Typography display="inline" color="red" variant={headlineVariant} sx={{ fontWeight: 'bold' }}>
                        BREAKING /{' '}
                    </Typography>
                    <Typography display="inline" gutterBottom variant={headlineVariant} component="div" sx={{ mb: 0 }}>
                        {headline ? <ContentElement name="headline" content={neonData.object.helper.content} /> : null}
                    </Typography>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}
