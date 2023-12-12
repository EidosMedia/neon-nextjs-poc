import { Breadcrumbs } from "@mui/material";
import NextLink from "next/link";
import { Link as MUILink } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import {
  getCurrentLiveSite,
  getObjectMainSection,
} from "../../lib/neon-cms/neon-helpers";

export default function BreadCrumb({ neonData }) {
  let render = null;

  const section = getObjectMainSection(neonData.object.data);

  if (section) {
    const content = [
      <MUILink
        underline="hover"
        sx={{ display: "flex", alignItems: "center" }}
        color="inherit"
        href="/"
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        {
          neonData.siteContext.siteStructure.find(
            (site) => site.name === getCurrentLiveSite(neonData)
          ).title
        }
      </MUILink>,
    ];

    let sectionUrl = "";
    section.split("/").forEach((token) => {
      if (token) {
        sectionUrl += "/" + token;
        content.push(
          <MUILink
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href={sectionUrl}
          >
            {token}
          </MUILink>
        );
      }
    });

    render = (
      <Breadcrumbs separator=">" aria-label="breadcrumb">
        {content}
      </Breadcrumbs>
    );
  }
  return render;
}
