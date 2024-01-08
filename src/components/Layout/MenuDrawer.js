import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import productLogo from "../../../public/static/img/head-logo.png";
import adviserLogo from "../../../public/static/img/globe-adviser.png";
import investorLogo from "../../../public/static/img/globe-investor.png";
import Link from "next/link";
import {
  getNeonDataHelper,
  getCurrentLiveSite,
  getCurrentSite,
  getLiveHostname,
} from "../../lib/neon-cms/neon-helpers";

export default function MenuDrawer({ neonData }) {
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const currentSite = getCurrentLiveSite(neonData);
  const siteStructure = neonData.siteContext.siteStructure;

  console.log(neonData);

  const site = siteStructure?.find((site) => site?.root?.name === currentSite);

  let logoOverlay = null;
  let logo = productLogo;
  let sectionsRender = null;
  try {
    sectionsRender = site?.root.items.map((item, i) => {
      const title = item.title.charAt(0).toUpperCase() + item.title.slice(1);
      return (
        <Link
          key={i}
          href={item.path}
          passHref
          prefetch={neonData.previewData ? false : true}
        >
          <ListItem button component="a">
            <ListItemText
              disableTypography
              primary={<Typography variant="h6">{title}</Typography>}
            />
          </ListItem>
        </Link>
      );
    });
  } catch (e) {
    console.log(e);
  }

  let sitesRender = null;
  try {
    sitesRender = siteStructure
      .filter((site) => site?.root?.name !== currentSite && site?.headless)
      .map((site, i) => {
        return (
          <Link
            key={i}
            href={getLiveHostname(site, true)}
            passHref
            prefetch={neonData.previewData ? false : true}
          >
            <ListItem button component="a">
              <ListItemText
                disableTypography
                primary={<Typography variant="h6">{site?.title}</Typography>}
              />
            </ListItem>
          </Link>
        );
      });
  } catch (e) {
    console.log(e);
  }

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <List>
        <Link
          key="homeLink"
          href="/"
          passHref
          prefetch={neonData.previewData ? false : true}
        >
          <ListItem button component="a">
            <ListItemText
              disableTypography
              primary={<Typography variant="h6">Home</Typography>}
            />
          </ListItem>
        </Link>
        {sectionsRender}
      </List>
      <Divider />
      <List>{sitesRender}</List>
    </Box>
  );
  const customColor = getCurrentSite(neonData)?.customAttributes?.customColor;
  return (
    <div>
      <React.Fragment>
        <AppBar
          position="sticky"
          sx={{ backgroundColor: customColor ? customColor : "primary" }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            <Box
              m={2}
              alignItems="flex-end"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              {logoOverlay ? (
                <Typography variant="h6" sx={{ mb: 1 }} component="div">
                  {logoOverlay}.
                </Typography>
              ) : null}
              <Image src={logo} />
            </Box>
            <Box m={2} sx={{ display: { xs: "block", md: "none" } }}>
              {logoOverlay ? (
                <Typography variant="h6" component="div">
                  {logoOverlay}.
                </Typography>
              ) : null}
              <Image src={logo} />
            </Box>
            <Box>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <SearchIcon fontSize="large" />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={open} onClose={handleDrawerToggle}>
          {list}
        </Drawer>
      </React.Fragment>
      <Toolbar sx={{ display: { sm: "block", md: "none" } }} />
    </div>
  );
}
