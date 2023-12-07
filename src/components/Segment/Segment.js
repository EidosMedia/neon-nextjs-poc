import { Box, Container, Grid, Typography } from "@mui/material";
import NextLink from "next/link";
import { Link as MUILink } from "@mui/material";
import React from "react";
import {
  getCurrentLiveSite,
  getCurrentSite,
  getDwxLinkedObjects,
  getLiveHostname,
  getObjectMainSection,
  getObjectMainSite,
  isContentOnSite,
} from "../../lib/cobalt-cms/cobalt-helpers";
import GenericFragment from "../Fragment/GenericFragment";
import AbTestingPreviewController from "../AbTesting/AbTestingPreviewController";
import { experiments } from "../../../abtesting.config";

export default function Segment({ neonData, analyticsReport }) {
  const defaultVariantId =
    experiments[0].id + "." + experiments[0].variants[0].id;

  const [previewVariant, setPreviewVariant] = React.useState(defaultVariantId);

  const handleSetPreviewVariant = (pv) => {
    setPreviewVariant(pv);
    neonData.abTesting["variant"] = pv;
  };

  let render = null;
  let templateName = null;
  if (neonData.linkContext) {
    templateName = neonData.linkContext.linkTemplate;
  } else {
    // Might be a preview request directly on the Segment
    templateName = neonData.object.helper.pageTemplate;
  }
  let firstObjects = [];
  firstObjects = getDwxLinkedObjects(neonData, "first");
  let secondObjects = [];
  secondObjects = getDwxLinkedObjects(neonData, "second");
  let opinionObjects = [];
  opinionObjects = getDwxLinkedObjects(neonData, "opinion");
  let extraObjects = [];
  extraObjects = getDwxLinkedObjects(neonData, "extra");

  let sectionHeadline = null;
  try {
    sectionHeadline = neonData.object.data.attributes.classification.genres[0];
  } catch (e) {}

  let needsHeader = false;
  let isOtherSite = false;

  if (!isContentOnSite(neonData.object.data, getCurrentLiveSite(neonData))) {
    needsHeader = true;
    isOtherSite = true;
  }

  switch (templateName) {
    case "featured_standard":
      render = (
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} order={{ xs: 2, md: 1 }}>
            {secondObjects.map((object, i) => (
              <GenericFragment
                key={i}
                neonData={object}
                gridContext={{ xs: 12, md: 3 }}
                analyticsReport={analyticsReport}
              />
            ))}
          </Grid>
          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
            {firstObjects.map((object, i) => (
              <GenericFragment
                key={i}
                neonData={object}
                gridContext={{ xs: 12, md: 6 }}
                analyticsReport={analyticsReport}
              />
            ))}
          </Grid>
          <Grid item xs={12} md={3} order={{ xs: 3, md: 3 }}>
            {opinionObjects.map((object, i) => (
              <GenericFragment
                key={i}
                neonData={object}
                gridContext={{ xs: 12, md: 3 }}
                analyticsReport={analyticsReport}
              />
            ))}
          </Grid>
          {extraObjects.map((object, i) => (
            <Grid item xs={12} md={2} order={{ xs: 4, md: 4 }} key={i}>
              <GenericFragment
                neonData={object}
                gridContext={{ xs: 12, md: 2 }}
                analyticsReport={analyticsReport}
              />
            </Grid>
          ))}
        </Grid>
      );
      break;
    case "featured_big":
      render = (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {firstObjects.map((object, i) => (
              <GenericFragment
                key={i}
                neonData={object}
                gridContext={{ xs: 12, md: 8 }}
                analyticsReport={analyticsReport}
              />
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            {secondObjects.map((object, i) => (
              <GenericFragment
                key={i}
                neonData={object}
                gridContext={{ xs: 12, md: 4 }}
                analyticsReport={analyticsReport}
              />
            ))}
          </Grid>
          {opinionObjects.map((object, i) => (
            <Grid key={i} item xs={12} md={3}>
              <GenericFragment
                neonData={object}
                gridContext={{ xs: 12, md: 3 }}
                analyticsReport={analyticsReport}
              />
            </Grid>
          ))}
          {extraObjects.map((object, i) => (
            <Grid key={i} item xs={12} md={2}>
              <GenericFragment
                neonData={object}
                gridContext={{ xs: 12, md: 2 }}
                analyticsReport={analyticsReport}
              />
            </Grid>
          ))}
        </Grid>
      );
      break;
    case "featured_condensed":
      render = (
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <GenericFragment neonData={null} gridContext={{ xs: 12, md: 3 }} />
            <GenericFragment neonData={null} gridContext={{ xs: 12, md: 3 }} />
            <GenericFragment neonData={null} gridContext={{ xs: 12, md: 3 }} />
            <GenericFragment neonData={null} gridContext={{ xs: 12, md: 3 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <GenericFragment neonData={null} gridContext={{ xs: 12, md: 6 }} />
          </Grid>
          <Grid item xs={12} md={3}>
            <GenericFragment neonData={null} gridContext={{ xs: 12, md: 3 }} />
            <GenericFragment neonData={null} gridContext={{ xs: 12, md: 3 }} />
            <GenericFragment neonData={null} gridContext={{ xs: 12, md: 3 }} />
            <GenericFragment neonData={null} gridContext={{ xs: 12, md: 3 }} />
          </Grid>
          <Grid item xs={12} md={2}>
            <GenericFragment neonData={null} gridContext={{ xs: 12, md: 2 }} />
          </Grid>
          <Grid item xs={12} md={2}>
            <GenericFragment neonData={null} gridContext={{ xs: 12, md: 2 }} />
          </Grid>
          <Grid item xs={12} md={2}>
            <GenericFragment neonData={null} gridContext={{ xs: 12, md: 2 }} />
          </Grid>
          <Grid item xs={12} md={2}>
            <GenericFragment neonData={null} gridContext={{ xs: 12, md: 2 }} />
          </Grid>
          <Grid item xs={12} md={2}>
            <GenericFragment neonData={null} gridContext={{ xs: 12, md: 2 }} />
          </Grid>
          <Grid item xs={12} md={2}>
            <GenericFragment neonData={null} gridContext={{ xs: 12, md: 2 }} />
          </Grid>
        </Grid>
      );
      break;
    case "section_teaser":
      needsHeader = true;
      render = (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {firstObjects.map((object, i) => (
              <GenericFragment
                key={i}
                neonData={object}
                gridContext={{ xs: 12, md: 6 }}
                analyticsReport={analyticsReport}
              />
            ))}
          </Grid>
          <Grid item xs={12} md={3}>
            {secondObjects.slice(0, 3).map((object, i) => (
              <GenericFragment
                key={i}
                neonData={object}
                gridContext={{ xs: 12, md: 3 }}
                analyticsReport={analyticsReport}
              />
            ))}
          </Grid>
          <Grid item xs={12} md={3}>
            {secondObjects.slice(3, 6).map((object, i) => (
              <GenericFragment
                key={i}
                neonData={object}
                gridContext={{ xs: 12, md: 3 }}
                analyticsReport={analyticsReport}
              />
            ))}
          </Grid>
        </Grid>
      );
      break;
    case "section_teaser_big":
      needsHeader = true;
      render = (
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            {firstObjects.map((object, i) => (
              <GenericFragment
                key={i}
                neonData={object}
                gridContext={{ xs: 12, md: 9 }}
                analyticsReport={analyticsReport}
              />
            ))}
          </Grid>
          <Grid item xs={12} md={3}>
            {secondObjects.map((object, i) => (
              <GenericFragment
                key={i}
                neonData={object}
                gridContext={{ xs: 12, md: 3 }}
                analyticsReport={analyticsReport}
              />
            ))}
          </Grid>
          {opinionObjects.slice(0, 3).map((object, i) => (
            <Grid key={i} item xs={12} md={4}>
              <GenericFragment
                neonData={object}
                gridContext={{ xs: 12, md: 4 }}
                analyticsReport={analyticsReport}
              />
            </Grid>
          ))}
          {extraObjects.map((object, i) => (
            <Grid key={i} item xs={12} md={2}>
              <GenericFragment
                neonData={object}
                gridContext={{ xs: 12, md: 2 }}
                analyticsReport={analyticsReport}
              />
            </Grid>
          ))}
        </Grid>
      );
      break;
    case "section_top":
      render = (
        <React.Fragment>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {firstObjects.map((object, i) => (
                <GenericFragment
                  key={i}
                  neonData={object}
                  gridContext={{ xs: 12, md: 6 }}
                  analyticsReport={analyticsReport}
                />
              ))}
            </Grid>
            <Grid item xs={12} md={3}>
              {secondObjects.slice(0, 3).map((object, i) => (
                <GenericFragment
                  key={i}
                  neonData={object}
                  gridContext={{ xs: 12, md: 3 }}
                  analyticsReport={analyticsReport}
                />
              ))}
            </Grid>
            <Grid item xs={12} md={3}>
              {secondObjects.slice(3, 6).map((object, i) => (
                <GenericFragment
                  key={i}
                  neonData={object}
                  gridContext={{ xs: 12, md: 3 }}
                  analyticsReport={analyticsReport}
                />
              ))}
            </Grid>
          </Grid>
        </React.Fragment>
      );
  }

  if (needsHeader) {
    let otherHostname = null;
    let otherSiteBaseUrl = null;
    let finalUrl = null;
    let errorGettingOtherSite = false;
    try {
      let sectionUrl = null;
      let siteInfo = null;
      if (isOtherSite) {
        siteInfo = neonData.siteContext.siteStructure.find(
          (site) => site.name === getObjectMainSite(neonData.object.data)
        );
        otherSiteBaseUrl = getLiveHostname(siteInfo, true);
      }
      sectionUrl = getObjectMainSection(neonData.object.data);
      finalUrl = (otherSiteBaseUrl ? otherSiteBaseUrl : "") + sectionUrl;
    } catch (e) {
      console.log(e);
      errorGettingOtherSite = true;
    }
    if (!errorGettingOtherSite) {
      const customColor = getCurrentSite(neonData).customAttributes.customColor;
      render = (
        <React.Fragment>
          <Box
            sx={{
              mb: 2,
              backgroundColor: customColor ? customColor : "secondary.main",
            }}
            display="flex"
            justifyContent="space-between"
          >
            <Typography
              sx={{ mx: 2, my: 1, color: "primary.main" }}
              variant="h4"
              component="h4"
            >
              <NextLink
                href={finalUrl}
                passHref
                prefetch={neonData.previewData ? false : true}
              >
                <MUILink variant="h4" underline="hover">
                  {sectionHeadline}
                </MUILink>
              </NextLink>
            </Typography>
            {isOtherSite ? (
              <Typography
                sx={{ mx: 2, mb: 1, mt: 2, color: "primary.main" }}
                variant="h6"
                component="div"
              >
                <span>From </span>
                <NextLink
                  href={otherSiteBaseUrl}
                  passHref
                  prefetch={neonData.previewData ? false : true}
                >
                  <MUILink variant="h6" underline="always">
                    {otherHostname}
                  </MUILink>
                </NextLink>
              </Typography>
            ) : null}
          </Box>
          {/* <Box sx={{ my: 1, borderTop: 2, borderColor: 'grey.500' }}>
                <Typography sx={{ my: 1 }} variant="h4" component="div">{sectionHeadline}</Typography>
            </Box> */}
          {render}
        </React.Fragment>
      );
    }
  }

  if (neonData.previewData || analyticsReport) {
    // Add the AB testing controller in preview|analytics mode
    render = (
      <React.Fragment>
        <AbTestingPreviewController
          handleSetPreviewVariant={handleSetPreviewVariant}
        />
        {render}
      </React.Fragment>
    );
  }

  if (neonData.previewData) {
    // In preview mode, wrap the DWC with a maxWidth container identical to homepage, and add the AB Testing controller
    render = (
      <Container maxWidth="lg" sx={{ pb: "64px" }}>
        {render}
      </Container>
    );
  }

  return render;
}
