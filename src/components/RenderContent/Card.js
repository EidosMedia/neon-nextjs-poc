import { Box } from "@mui/system";
import { cardsConfig } from "../../../cards.config";
import { Button, Container, Typography } from "@mui/material";

export default function Card({ jsonElement, neonData }) {
  let render = null;
  let img = null;

  const cardId = jsonElement.attributes["emk-data-id"];
  if (cardId === "advertisement-subscribe") {
    render = (
      <Container
        maxWidth="sm"
        sx={{ my: 4, border: 4, borderColor: "secondary.main" }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flexStart"
          alignItems="flexStart"
        >
          <Box
            key="subscribe-head"
            sx={{ borderBottom: 1, borderColor: "secondary.main", my: 1 }}
          >
            <Typography
              variant="h4"
              component="h5"
              gutterBottom
              color="secondary.main"
            >
              Subscribe to The Globe
            </Typography>
          </Box>
          <Typography variant="body1">
            Subscribe to our award-winning journalism, plans starting as low as
            9,99€/month.
          </Typography>
          <Button
            variant="contained"
            sx={{
              color: "primary.main",
              backgroundColor: "secondary.main",
              my: 2,
            }}
          >
            Subscribe Now
          </Button>
        </Box>
      </Container>
    );
  }

  if (!render) {
    try {
      img = cardsConfig[cardId].img;
    } catch (e) {}
    if (!img) {
      try {
        img = "/static/img/cards/" + cardId + ".png";
      } catch (e) {}
    }
    if (img) {
      render = (
        <Box display="flex" justifyContent="center" alignItems="center">
          <img src={img} style={{ maxWidth: "100%", height: "auto" }} />
        </Box>
      );
    }
  }
  return render;
}
