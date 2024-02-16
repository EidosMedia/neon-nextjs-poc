import { Dialog, DialogTitle, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { getSeoTitle } from '../../lib/helpers';
import GenericWidget from '../Widgets/GenericWidget';
import LiveblogFragment from './LiveblogFragment';
import StoryFragment from './StoryFragment';
import BarChartIcon from '@mui/icons-material/BarChart';
import RealtimeSummary from '../Analytics/RealtimeSummary';
import BarChart from '../Analytics/BarChart';
import AnalyticsFragmentOverlay from '../Analytics/AnalyticsFragmentOverlay';
import BreakingNewsFragment from './BreakingNewsFragment';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.analyticsReport
 * @param root0.gridContext
 */
export default function GenericFragment({ neonData, analyticsReport, gridContext }) {
    let render = null;

    if (neonData) {
        switch (neonData.object.data.sys.baseType) {
            case 'article':
                switch (neonData.object.data.sys.type) {
                    case 'breakingnews':
                        render = <BreakingNewsFragment neonData={neonData} gridContext={gridContext} />;
                        break;
                    default:
                        render = <StoryFragment neonData={neonData} gridContext={gridContext} />;
                }
                break;
            case 'widget':
                render = <GenericWidget neonData={neonData} gridContext={gridContext} />;
                break;
            case 'liveblog':
                render = <LiveblogFragment neonData={neonData} gridContext={gridContext} />;
                break;
        }
    }

    if (analyticsReport) {
        render = (
            <AnalyticsFragmentOverlay neonData={neonData} analyticsReport={analyticsReport}>
                {render}
            </AnalyticsFragmentOverlay>
        );
    }

    return render;
}
