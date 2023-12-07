import { Box, Container, Grid, Typography } from "@mui/material";
import HTMLComment from "react-html-comment";
import {
  getCurrentSite,
  getDwxLinkedObjects,
  getQueryResultObjects,
} from "../../lib/cobalt-cms/cobalt-helpers";
import GenericFragment from "../Fragment/GenericFragment";
import { node } from "prop-types";
import GenericWidget from "../Widgets/GenericWidget";

export default function SemiAutomaticSectionPage({
  neonData,
  pageTitle,
  analyticsReport,
  semanticSearchData,
}) {
  //Swing quick open
  let uuid = null;
  try {
    uuid = 'Methode uuid: "' + neonData.object.data.foreignId + '"';
  } catch (e) {}

  const mainObjects = getDwxLinkedObjects(neonData, "main");

  let widgets = mainObjects.filter(
    (o) => o.object.data.sys.baseType === "widget"
  );

  const flattenedObjects = mainObjects.reduce((acc, o) => {
    switch (o.object.data.sys.baseType) {
      case "query":
        const queryResults = getQueryResultObjects(o);
        return [...acc, ...queryResults];
        break;
      case "widget":
        return [...acc];
        break;
      default:
        return [...acc, o];
    }
  }, []);

  const nonDupObjects = flattenedObjects.reduce((acc, o) => {
    if (
      acc.find(
        (a) =>
          a.object.data.id === o.object.data.id ||
          a.object.data.foreignId.includes(o.object.data.foreignId) // to manage preview of queries
      )
    ) {
      // don't add, it's a duplicate
      return acc;
    } else {
      return [...acc, o];
    }
  }, []);

  const customColor = getCurrentSite(neonData).customAttributes.customColor;

  const render = (
    <Container maxWidth="lg">
      {uuid ? <HTMLComment text={uuid} /> : null}
      {pageTitle ? (
        <Box
          sx={{
            mb: 2,
            backgroundColor: customColor ? customColor : "secondary.main",
          }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            sx={{ color: "primary.main" }}
            variant="h4"
            component="h4"
          >
            {pageTitle}
          </Typography>
        </Box>
      ) : null}

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {nonDupObjects.slice(0, 1).map((object, i) => (
            <GenericFragment
              key={i}
              neonData={object}
              gridContext={{ xs: 12, md: 8 }}
              analyticsReport={analyticsReport}
            />
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          {nonDupObjects.slice(1, 3).map((object, i) => (
            <GenericFragment
              key={i}
              neonData={object}
              gridContext={{ xs: 12, md: 4 }}
              analyticsReport={analyticsReport}
            />
          ))}
        </Grid>
        {widgets
          ? widgets.map((w) => (
              <GenericWidget
                key="widget"
                neonData={w}
                semanticSearchData={semanticSearchData}
              />
            ))
          : null}
      </Grid>

      <Box
        sx={{
          p: 1,
          mb: 2,
          backgroundColor: customColor ? customColor : "secondary.main",
        }}
        display="flex"
        justifyContent="start"
        alignItems="center"
      >
        <Typography sx={{ color: "primary.main" }} variant="h4" component="h4">
          More news
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {nonDupObjects.slice(3).map((object, i) => (
          <Grid key={i} item xs={12} md={3}>
            <GenericFragment
              neonData={object}
              gridContext={{ xs: 12, md: 3 }}
              analyticsReport={analyticsReport}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );

  return render;
}
