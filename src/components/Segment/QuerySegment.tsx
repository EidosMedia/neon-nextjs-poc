import { Box, Grid, Typography } from '@mui/material';
import { getQueryResultObjects } from '../../services/neon-cms/neon-helpers';
import GenericFragment from '../Fragment/GenericFragment';
import React from 'react';

/**
 *
 * @param root0
 * @param root0.neonData
 */
export default function QuerySegment({ neonData }) {
    let render = null;
    const queryResults = getQueryResultObjects(neonData);
    let kicker = null;
    try {
        kicker = neonData.linkContext.linkData.parameters.kicker;
    } catch (e) {}

    render = (
        <Grid container spacing={2}>
            {queryResults.map((object, i) => (
                <Grid key={i} item xs={12} md={4}>
                    <GenericFragment neonData={object} gridContext={{ xs: 12, md: 4 }} />
                </Grid>
            ))}
        </Grid>
    );

    if (kicker) {
        render = (
            <React.Fragment>
                .
                <Box display="flex" justifyContent="space-between">
                    <Typography sx={{ mx: 0, my: 1, color: 'secondary.main' }} variant="h6" component="h5">
                        {kicker}
                    </Typography>
                </Box>
                {render}
            </React.Fragment>
        );
    }

    return render;
}
