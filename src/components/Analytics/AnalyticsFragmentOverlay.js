import { Dialog, DialogTitle, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import BarChartIcon from '@mui/icons-material/BarChart';
import { getSeoTitle } from "../../lib/helpers";
import RealtimeSummary from "./RealtimeSummary";
import BarChart from "./BarChart";
import React from "react";

export default function AnalyticsFragmentOverlay({ cobaltData, analyticsReport, children }) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const seoTitle = getSeoTitle(cobaltData)
    const findFn = ((r) => r.dimensionValues[0].value === seoTitle)
    let views = 0;
    try {
        views = analyticsReport.realtimeReport.rows.find(findFn).metricValues[0].value
    } catch (e) { }

    const rank = analyticsReport.realtimeReport.rows.findIndex(findFn) + 1

    let color = 'rgba(255, 0, 0, 0.5)' //red
    if (rank > 0) {
        if (rank < 10) {
            color = 'rgba(0, 255, 0, 0.5)' //green
        } else if (rank < 20) {
            color = 'rgba(255, 255, 0, 0.5)' //yellow
        }
    }

    const hasGaReport = analyticsReport.contentReport.some((r) => r.cobaltData.object.data.id === cobaltData.object.data.id)

    const render = (
        <Box sx={{ position: 'relative' }}>
            {children}
            <Box sx={{
                zIndex: 10,
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                background: color,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-start'
            }}>
                {hasGaReport ?
                    <IconButton aria-label="data" size="large" onClick={handleClickOpen}>
                        <BarChartIcon fontSize="inherit" />
                    </IconButton> : null}
            </Box>
            {hasGaReport ?
                <GraphDialog
                    open={open}
                    onClose={handleClose}
                    cobaltData={cobaltData}
                    analyticsReport={analyticsReport}
                /> : null}
        </Box>
    )

    return render;
}

function GraphDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    let myGaData = null;

    try {
        myGaData = props.analyticsReport.contentReport.find((r) => r.cobaltData.object.data.id === props.cobaltData.object.data.id).gaData
    } catch (e) { }

    let render = null;

    if (myGaData) {
        render = (
            <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="md">
                <DialogTitle>{getSeoTitle(props.cobaltData)}</DialogTitle>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4">Last 30 minutes</Typography>
                    <RealtimeSummary cobaltData={props.cobaltData} realtimeReport={props.analyticsReport.realtimeReport} />
                </Box>
                <Box sx={{ mt: 2, pt: 1, borderTop: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4">Last 7 days</Typography>
                    <BarChart analyticsReport={myGaData} dimension1='date' dimension2='hostName' metric='screenPageViews' chartTitle='Views per site' />
                    <BarChart analyticsReport={myGaData} dimension1='date' dimension2='deviceCategory' metric='screenPageViews' chartTitle='Views per device' />
                    <BarChart analyticsReport={myGaData} dimension1='date' dimension2='city' metric='screenPageViews' chartTitle='Views per city' />
                </Box>
            </Dialog>
        );
    }

    return render;
}