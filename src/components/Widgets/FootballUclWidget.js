import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import { widgetsConfig } from "../../../widgets.config";

export default function FootballUclWidget({ neonData, gridContext }) {
  let render = null;
  if (neonData) {
    let match = null;
    let type = null;
    try {
      match = neonData.linkContext.linkData.parameters.match;
      type = neonData.linkContext.linkData.parameters.type;
    } catch (e) {}

    if (!match) {
      match = widgetsConfig.ucl.params.find(
        (param) => param.name === "match"
      ).defaultValue;
    }
    if (!type) {
      type = widgetsConfig.ucl.params.find(
        (param) => param.name === "type"
      ).defaultValue;
    }

    let teamAName = null;
    let teamBName = null;
    let teamALogo = null;
    let teamBLogo = null;
    let score = null;

    switch (match) {
      case "Liverpool-Inter":
        teamAName = "Liverpool";
        teamBName = "Inter";
        teamALogo = "/static/img/ucl/liverpool.png";
        teamBLogo = "/static/img/ucl/inter.png";
        score = "0 - 1";
        break;
      case "Bayern-Salzburg":
        teamAName = "Bayern";
        teamBName = "Salzburg";
        teamALogo = "/static/img/ucl/bayern.png";
        teamBLogo = "/static/img/ucl/salzburg.png";
        score = "7 - 1";
        break;
      case "Madrid-Paris":
        teamAName = "Real Madrid";
        teamBName = "Paris";
        teamALogo = "/static/img/ucl/madrid.png";
        teamBLogo = "/static/img/ucl/paris.png";
        score = "3 - 1";
        break;
      case "ManCity-SportingCP":
        teamAName = "Man. City";
        teamBName = "Sporting CP";
        teamALogo = "/static/img/ucl/mancity.png";
        teamBLogo = "/static/img/ucl/sportingcp.png";
        score = "0 - 0";
        break;
    }

    if (match && type) {
      render = (
        <Container
          sx={{ my: 2, p: 2, backgroundColor: "grey.300" }}
          maxWidth="lg"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image width="50" height="50" src={teamALogo} />
            <Typography sx={{ mx: 3 }} variant="h4">
              {teamAName}
            </Typography>
            <Typography sx={{ mx: 3 }} variant="h2">
              {score}
            </Typography>
            <Typography sx={{ mx: 3 }} variant="h4">
              {teamBName}
            </Typography>
            <Image width="50" height="50" src={teamBLogo} />
          </Box>
        </Container>
      );
    }
  }
  return render;
}
