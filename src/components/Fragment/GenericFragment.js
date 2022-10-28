import { Dialog, DialogTitle, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { getSeoTitle } from "../../lib/helpers";
import GenericWidget from "../Widgets/GenericWidget";
import LiveblogFragment from "./LiveblogFragment";
import StoryFragment from "./StoryFragment";
import BarChartIcon from '@mui/icons-material/BarChart';
import RealtimeSummary from "../Analytics/RealtimeSummary";
import BarChart from "../Analytics/BarChart";
import AnalyticsFragmentOverlay from "../Analytics/AnalyticsFragmentOverlay";
import BreakingNewsFragment from "./BreakingNewsFragment";

export default function GenericFragment({ cobaltData, analyticsReport, gridContext }) {

    let render = null;

    if (cobaltData) {
        switch (cobaltData.object.data.sys.baseType) {
            case 'article':
                switch(cobaltData.object.data.sys.type){
                    case 'breakingnews':
                        render = <BreakingNewsFragment cobaltData={cobaltData} gridContext={gridContext} />;
                        break;
                    default:
                        render = <StoryFragment cobaltData={cobaltData} gridContext={gridContext} />;
                }
                break;
            case 'widget':
                render = <GenericWidget cobaltData={cobaltData} gridContext={gridContext} />;
                break;
            case 'liveblog':
                render = <LiveblogFragment cobaltData={cobaltData} gridContext={gridContext} />;
                break;
        }
    }

    if (analyticsReport) {
        render = (
            <AnalyticsFragmentOverlay cobaltData={cobaltData} analyticsReport={analyticsReport}>
                {render}
            </AnalyticsFragmentOverlay>
        )
    }

    return render
}

