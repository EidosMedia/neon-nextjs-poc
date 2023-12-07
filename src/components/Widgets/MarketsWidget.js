import { Container, Typography } from "@mui/material";
import { Box, breakpoints } from "@mui/system";
import Image from "next/image";
import { widgetsConfig } from "../../../widgets.config";

export default function MarketsWidget({ neonData, gridContext }) {
  let render = null;
  if (neonData) {
    let type = null;
    let display = null;
    try {
      type = neonData.linkContext.linkData.parameters.type;
      display = neonData.linkContext.linkData.parameters.display;
    } catch (e) {}

    if (!type) {
      type = widgetsConfig.markets.params.find(
        (param) => param.name === "type"
      ).defaultValue;
    }
    if (!display) {
      display = widgetsConfig.markets.params.find(
        (param) => param.name === "display"
      ).defaultValue;
    }

    const arrowUp = <Box sx={{ color: "#228b22" }}>▲</Box>;

    const arrowDown = (
      <Box sx={{ transform: "rotate(180deg)", color: "#dc143c" }}>▲</Box>
    );

    if (type && display) {
      switch (type) {
        case "currencies":
          render = (
            <Container
              sx={{ my: 2, p: 2, backgroundColor: "grey.300" }}
              maxWidth="lg"
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  {arrowDown}
                  <Typography
                    sx={{ ml: 1, mr: 1, color: "#dc143c" }}
                    variant="h6"
                  >
                    0.25%
                  </Typography>
                  <Typography sx={{ ml: 0, mr: 4 }} variant="h6">
                    EUR/USD
                  </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  {arrowUp}
                  <Typography
                    sx={{ ml: 1, mr: 1, color: "#228b22" }}
                    variant="h6"
                  >
                    0.02%
                  </Typography>
                  <Typography sx={{ ml: 0, mr: 4 }} variant="h6">
                    GBP/USD
                  </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  {arrowDown}
                  <Typography
                    sx={{ ml: 1, mr: 1, color: "#dc143c" }}
                    variant="h6"
                  >
                    0.56%
                  </Typography>
                  <Typography sx={{ ml: 0, mr: 4 }} variant="h6">
                    USD/JPY
                  </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  {arrowDown}
                  <Typography
                    sx={{ ml: 1, mr: 1, color: "#dc143c" }}
                    variant="h6"
                  >
                    0.12%
                  </Typography>
                  <Typography sx={{ ml: 0, mr: 4 }} variant="h6">
                    AUD/USD
                  </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  {arrowUp}
                  <Typography
                    sx={{ ml: 1, mr: 1, color: "#228b22" }}
                    variant="h6"
                  >
                    1.25%
                  </Typography>
                  <Typography sx={{ ml: 0, mr: 4 }} variant="h6">
                    BTC
                  </Typography>
                </Box>
              </Box>
            </Container>
          );
          break;
        case "indexes":
        default:
          render = (
            <Container
              sx={{ my: 2, p: 2, backgroundColor: "grey.300" }}
              maxWidth="lg"
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  {arrowUp}
                  <Typography
                    sx={{ ml: 1, mr: 1, color: "#228b22" }}
                    variant="h6"
                  >
                    0.49%
                  </Typography>
                  <Typography sx={{ ml: 0, mr: 4 }} variant="h6">
                    S&amp;P 500
                  </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  {arrowUp}
                  <Typography
                    sx={{ ml: 1, mr: 1, color: "#228b22" }}
                    variant="h6"
                  >
                    0.40%
                  </Typography>
                  <Typography sx={{ ml: 0, mr: 4 }} variant="h6">
                    DOW
                  </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  {arrowUp}
                  <Typography
                    sx={{ ml: 1, mr: 1, color: "#228b22" }}
                    variant="h6"
                  >
                    0.71%
                  </Typography>
                  <Typography sx={{ ml: 0, mr: 4 }} variant="h6">
                    NASDAQ
                  </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  {arrowDown}
                  <Typography
                    sx={{ ml: 1, mr: 1, color: "#dc143c" }}
                    variant="h6"
                  >
                    0.10%
                  </Typography>
                  <Typography sx={{ ml: 0, mr: 4 }} variant="h6">
                    Crude Oil
                  </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  {arrowDown}
                  <Typography
                    sx={{ ml: 1, mr: 1, color: "#dc143c" }}
                    variant="h6"
                  >
                    0.27%
                  </Typography>
                  <Typography sx={{ ml: 0, mr: 4 }} variant="h6">
                    Gold
                  </Typography>
                </Box>
              </Box>
            </Container>
          );
      }
    }
  }
  return render;
}
