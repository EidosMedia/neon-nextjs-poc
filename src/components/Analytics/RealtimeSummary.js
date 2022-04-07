import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { getSeoTitle } from "../../lib/helpers";

export default function RealtimeSummary({ cobaltData, realtimeReport }) {
    const seoTitle = getSeoTitle(cobaltData)

    const findFn = ((r) => r.dimensionValues[0].value === seoTitle)
    let views = 0;
    try {
        views = realtimeReport.rows.find(findFn).metricValues[0].value
    } catch (e) { }

    const rank = realtimeReport.rows.findIndex(findFn) + 1

    const render = (
            <Box>
                <Typography variant="h6">Rank: {(rank > 0?rank:'-')}</Typography>
                <Typography variant="h6">Views: {(views > 0?views:'-')}</Typography>

            </Box>
    );
    return render;
}