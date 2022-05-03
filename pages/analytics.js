import { getcobaltPageById } from '../src/lib/cobalt-cms/cobalt-api';
import { getAnalyticsReport } from '../src/lib/ga/ga-reporting.api';
import { Chart } from "react-google-charts";
import { Leaderboard } from '@mui/icons-material';
import { getChartDataFromContentReport } from '../src/lib/ga/ga-reporting-helpers';
import React from 'react';
import BarChart from '../src/components/Analytics/BarChart';
import { Box, Container, Fab, Typography } from '@mui/material';
import Table from '../src/components/Analytics/Table';
import RealtimeSummary from '../src/components/Analytics/RealtimeSummary';
import Segment from '../src/components/Segment/Segment';
import Layout from '../src/components/Layout/Layout';
import LandingPage from '../src/components/Page/LandingPage';
import HelpIcon from '@mui/icons-material/Help';
import HelpDialog from '../src/components/Analytics/HelpDialog';


export default function Analytics({ cobaltData, analyticsReport }) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    let render = null;

    switch (cobaltData.object.data.sys.baseType) {
        case 'liveblog':
        case 'article':
            render = (
                <Container maxWidth="md">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h4">Last 30 minutes</Typography>
                        <RealtimeSummary cobaltData={cobaltData} realtimeReport={analyticsReport.realtimeReport} />
                    </Box>
                    <Box sx={{ mt: 2, pt: 1, borderTop: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h4">Last 7 days</Typography>
                        <BarChart analyticsReport={analyticsReport.contentReport.gaData} dimension1='date' dimension2='hostName' metric='screenPageViews' chartTitle='Views per site' />
                        <BarChart analyticsReport={analyticsReport.contentReport.gaData} dimension1='date' dimension2='deviceCategory' metric='screenPageViews' chartTitle='Views per device' />
                        <BarChart analyticsReport={analyticsReport.contentReport.gaData} dimension1='date' dimension2='city' metric='screenPageViews' chartTitle='Views per city' />
                    </Box>
                </Container>
            )
            break;
        case 'section':
        case 'webpage':
            render = (
                <Layout cobaltData={cobaltData}>
                    <LandingPage cobaltData={cobaltData} analyticsReport={analyticsReport} />
                </Layout>
            );
            break;
        case 'webpagefragment':
            render = (
                <Container maxWidth="lg">
                    <Segment cobaltData={cobaltData} analyticsReport={analyticsReport} />
                    <Fab sx={{ position: 'absolute', bottom: 16, right: 16 }} color="secondary" aria-label="edit" onClick={handleClickOpen}>
                        <HelpIcon />
                    </Fab>
                    <HelpDialog
                        open={open}
                        onClose={handleClose}
                        cobaltData={cobaltData}
                        analyticsReport={analyticsReport}
                    />
                </Container>
            );
            break;
    }


    return render;
}

export async function getServerSideProps(context) {

    let cobaltId = null;
    let cobaltForeignId = null
    let siteName = null;

    try {
        cobaltId = context.query.id;
        cobaltForeignId = context.query.foreignid;
        siteName = context.query.site;
    } catch (e) { }

    let cobaltData = null;

    if (cobaltId && siteName) {
        cobaltData = await getcobaltPageById(cobaltId, siteName)
    } else if (cobaltForeignId && siteName) {
        cobaltData = await getcobaltPageById(cobaltForeignId, siteName, true)
    }

    const analyticsReport = await getAnalyticsReport(cobaltData)

    let props = {
        cobaltData,
        analyticsReport
    }

    return {
        props: props
    }
}