import { getNeonPageById } from "../src/lib/cobalt-cms/cobalt-api";
import { getAnalyticsReport } from "../src/lib/ga/ga-reporting.api";
import { Chart } from "react-google-charts";
import { Leaderboard } from "@mui/icons-material";
import { getChartDataFromContentReport } from "../src/lib/ga/ga-reporting-helpers";
import React from "react";
import BarChart from "../src/components/Analytics/BarChart";
import { Box, Container, Fab, Typography } from "@mui/material";
import Table from "../src/components/Analytics/Table";
import RealtimeSummary from "../src/components/Analytics/RealtimeSummary";
import Segment from "../src/components/Segment/Segment";
import Layout from "../src/components/Layout/Layout";
import LandingPage from "../src/components/Page/LandingPage";
import HelpIcon from "@mui/icons-material/Help";
import HelpDialog from "../src/components/Analytics/HelpDialog";

export default function Analytics({ neonData, analyticsReport }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  let render = null;

  switch (neonData.object.data.sys.baseType) {
    case "liveblog":
    case "article":
      render = (
        <Container maxWidth="md">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Last 30 minutes</Typography>
            <RealtimeSummary
              neonData={neonData}
              realtimeReport={analyticsReport.realtimeReport}
            />
          </Box>
          <Box
            sx={{
              mt: 2,
              pt: 1,
              borderTop: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Last 7 days</Typography>
            <BarChart
              analyticsReport={analyticsReport.contentReport.gaData}
              dimension1="date"
              dimension2="hostName"
              metric="screenPageViews"
              chartTitle="Views per site"
            />
            <BarChart
              analyticsReport={analyticsReport.contentReport.gaData}
              dimension1="date"
              dimension2="deviceCategory"
              metric="screenPageViews"
              chartTitle="Views per device"
            />
            <BarChart
              analyticsReport={analyticsReport.contentReport.gaData}
              dimension1="date"
              dimension2="city"
              metric="screenPageViews"
              chartTitle="Views per city"
            />
          </Box>
        </Container>
      );
      break;
    case "section":
    case "webpage":
      render = (
        <Layout neonData={neonData}>
          <LandingPage neonData={neonData} analyticsReport={analyticsReport} />
        </Layout>
      );
      break;
    case "webpagefragment":
      render = (
        <Container maxWidth="lg">
          <Segment neonData={neonData} analyticsReport={analyticsReport} />
          <Fab
            sx={{ position: "absolute", top: 16, right: 16 }}
            color="secondary"
            aria-label="edit"
            onClick={handleClickOpen}
          >
            <HelpIcon />
          </Fab>
          <HelpDialog
            open={open}
            onClose={handleClose}
            neonData={neonData}
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
  let cobaltForeignId = null;
  let siteName = null;

  try {
    cobaltId = context.query.id;
    cobaltForeignId = context.query.foreignid;
    siteName = context.query.site;
  } catch (e) {}

  let neonData = null;

  if (cobaltId && siteName) {
    neonData = await getNeonPageById(cobaltId, siteName);
  } else if (cobaltForeignId && siteName) {
    neonData = await getNeonPageById(cobaltForeignId, siteName, true);
  }

  const analyticsReport = await getAnalyticsReport(neonData);

  let props = {
    neonData,
    analyticsReport,
  };

  return {
    props: props,
  };
}
