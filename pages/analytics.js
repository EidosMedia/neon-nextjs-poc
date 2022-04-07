import { getcobaltPageById } from '../src/lib/cobalt-cms/cobalt-api';
import { getAnalyticsReport } from '../src/lib/ga/ga-reporting.api';
import { Chart } from "react-google-charts";
import { Leaderboard } from '@mui/icons-material';
import { getChartDataFromContentReport } from '../src/lib/ga/ga-reporting-helpers';
import React from 'react';
import BarChart from '../src/components/Analytics/BarChart';
import { Box, Container, Typography } from '@mui/material';
import Table from '../src/components/Analytics/Table';
import RealtimeSummary from '../src/components/Analytics/RealtimeSummary';


export default function Analytics({ cobaltData, analyticsReport }) {

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
            break;
        case 'webpagefragment':
            render = (
                <Container maxWidth="lg">
                    {analyticsReport.contentReport.map((report) => (
                        <Box sx={{borderBottom:1, my:2}}>
                            <Typography variant="h5">{report.cobaltData.object.data.title}</Typography>
                            <Box sx={{my: 2, display:'flex', justifyContent: 'flex-start'}}>
                                <Box>
                                    <Typography sx={{mb:1, fontWeight:'bold'}} variant="h6">Last 30 minutes</Typography>
                                    <RealtimeSummary cobaltData={report.cobaltData} realtimeReport={analyticsReport.realtimeReport} />
                                </Box>
                                <Box sx={{ml:2, pl:2, borderLeft:1}}>
                                    <Typography sx={{mb:1, fontWeight:'bold'}} variant="h6">Last 7 days</Typography>
                                    <Table cobaltData={report.cobaltData} analyticsReport={report.gaData} topContentPagesReport={analyticsReport.topContentPagesReport} dimension1='date' metric='screenPageViews' />
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Container>
            )
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