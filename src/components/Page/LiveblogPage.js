import {
  Avatar,
  Button,
  ClickAwayListener,
  Container,
  IconButton,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import HTMLComment from "react-html-comment";
import useSWR from "swr";
import {
  getCobaltLiveblogPostHelper,
  getCurrentLiveSite,
  getImageFormatUrl,
} from "../../lib/cobalt-cms/cobalt-helpers";
import {
  findElementsInContentJson,
  getImageUrl,
} from "../../utils/ContentUtil";
import RenderContentElement, {
  CloudinaryVideo,
} from "../RenderContent/RenderContentElement";
import RenderLiveblogPostElement from "../RenderContent/RenderLiveblogPostElement";
import ResourceResolver from "../../utils/ResourceResolver";
import Image from "next/image";
import SportsIcon from "@mui/icons-material/Sports";
import SportsSoccerSharpIcon from "@mui/icons-material/SportsSoccerSharp";
import CelebrationSharpIcon from "@mui/icons-material/CelebrationSharp";
import StyleSharpIcon from "@mui/icons-material/StyleSharp";
import LinkIcon from "@mui/icons-material/Link";
import React from "react";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function LiveblogPage({ neonData }) {
  let render = null;

  //Swing quick open
  let uuid = null;
  try {
    uuid = 'Methode uuid: "' + neonData.object.data.foreignId + '"';
  } catch (e) {}

  if (neonData) {
    let data,
      error = null;
    ({ data, error } = useSWR(
      "/api/" +
        getCurrentLiveSite(neonData) +
        "/liveblogs/" +
        neonData.object.data.id,
      fetcher,
      { refreshInterval: 5000, dedupingInterval: 0 }
    ));

    let headline = null;
    try {
      headline = (
        <RenderContentElement
          jsonElement={
            findElementsInContentJson(
              ["headline"],
              neonData.object.helper.content
            )[0]
          }
        />
      );
    } catch (e) {}

    let summary = null;
    try {
      summary = (
        <RenderContentElement
          jsonElement={
            findElementsInContentJson(
              ["summary"],
              neonData.object.helper.content
            )[0]
          }
          renderMode="styled"
        />
      );
    } catch (e) {}

    let content = null;
    try {
      content = (
        <RenderContentElement
          jsonElement={
            findElementsInContentJson(
              ["content"],
              neonData.object.helper.content
            )[0]
          }
          renderMode="styled"
          neonData={neonData}
        />
      );
    } catch (e) {
      console.log(e);
    }

    let reporters = null;
    try {
      reporters =
        neonData.object.data.attributes.liveblogData.lbNeutralReporters.map(
          (r) => {
            return {
              authorId: r.lbNeutralReporterId,
              authorName: r.lbNeutralReporterName,
              authorRole: r.lbNeutralReporterRole,
              authorPic:
                "/static/img/avatars/" + r.lbNeutralReporterId + ".jpg",
            };
          }
        );
    } catch (e) {}

    let ambassadors = null;
    try {
      const gallery = findElementsInContentJson(
        ["div"],
        neonData.object.helper.content
      )[0];
      ambassadors = gallery.elements.map((el) => {
        const authorName = el.elements.find((el2) => el2.name === "person")
          .elements[0].text;
        const authorRole = el.elements.find((el2) => el2.name === "description")
          .elements[0].text;
        let authorPic = el.elements.find(
          (el2) => el2.name === "img" && el2.attributes.class === "square"
        ).attributes.src;
        authorPic = ResourceResolver(
          authorPic,
          neonData.previewData ? neonData.previewData : null,
          neonData.siteContext.site
        );
        return {
          authorName,
          authorRole,
          authorPic,
          isAmbassador: true,
        };
      });
    } catch (e) {}

    let eventStartDate = null;
    try {
      eventStartDate =
        neonData.object.data.attributes.liveblogData.eventStartDate;
    } catch (e) {}

    let postsRender = null;

    if (error) postsRender = <div>Failed to load</div>;
    if (!data) postsRender = <div>Loading...</div>;
    if (!error && data) {
      postsRender = (
        <Container sx={{ my: 2 }} maxWidth="md">
          {data.result.map((post, i, { length }) => {
            let eventData = null;
            let boxStyle = null;

            try {
              if (post.attributes.liveblogPostData.eventType) {
                switch (post.attributes.liveblogPostData.eventType) {
                  case "3":
                    eventData = {
                      eventText: "Goal",
                      eventIcon: (
                        <React.Fragment>
                          <SportsSoccerSharpIcon
                            fontSize="large"
                            color="secondary"
                          />
                          <CelebrationSharpIcon
                            fontSize="large"
                            color="secondary"
                          />
                        </React.Fragment>
                      ),
                      eventTime: computeEventTime(post, eventStartDate),
                    };
                    boxStyle = {
                      border: 6,
                      borderColor: "green",
                      my: 4,
                      px: 2,
                    };
                    break;
                  case "2":
                    eventData = {
                      eventText: "Red card",
                      eventIcon: (
                        <StyleSharpIcon
                          fontSize="large"
                          sx={{ color: "#DC143C" }}
                        />
                      ),
                      eventTime: computeEventTime(post, eventStartDate),
                    };
                    boxStyle = {
                      border: 1,
                      borderColor: "grey.300",
                      my: 4,
                      px: 2,
                    };
                    break;
                  case "5":
                    eventData = {
                      eventText: "Penalty",
                      eventIcon: (
                        <SportsIcon fontSize="large" color="secondary" />
                      ),
                      eventTime: computeEventTime(post, eventStartDate),
                    };
                    boxStyle = {
                      border: 4,
                      borderColor: "secondary.main",
                      my: 4,
                      px: 2,
                    };
                    break;
                  case "13":
                    eventData = {
                      eventText: "Match start",
                      eventIcon: (
                        <SportsIcon fontSize="large" color="secondary" />
                      ),
                      eventTime: { minutes: 0, seconds: 0 },
                    };
                    boxStyle = {
                      border: 1,
                      borderColor: "grey.300",
                      my: 4,
                      px: 2,
                    };
                    break;
                  case "14":
                    eventData = {
                      eventText: "Match end",
                      eventIcon: (
                        <SportsIcon fontSize="large" color="secondary" />
                      ),
                      eventTime: computeEventTime(post, eventStartDate),
                    };
                    boxStyle = {
                      border: 4,
                      borderColor: "grey.300",
                      my: 4,
                      px: 2,
                    };
                    break;
                }
              }
            } catch (error) {}

            let postAuthor = null;

            // check if is ambassador
            try {
              if (ambassadors) {
                postAuthor = ambassadors.find(
                  (a) =>
                    a.authorName ===
                    post.attributes.liveblogPostData.postAmbassador
                );
                if (postAuthor && !boxStyle) {
                  boxStyle = {
                    border: 4,
                    borderColor: "secondary.main",
                    my: 4,
                    px: 2,
                  };
                }
              }
            } catch (error) {}

            if (!postAuthor) {
              // check if is reporter
              try {
                if (!post.attributes.liveblogPostData.forceNeutral) {
                  let creator = post.attributes.creator.split(":");
                  creator = creator[creator.length - 1];
                  postAuthor = reporters.find((r) => r.authorId === creator);
                  if (postAuthor && !boxStyle) {
                    boxStyle = {
                      border: 1,
                      borderColor: "grey.500",
                      my: 4,
                      px: 2,
                    };
                  }
                }
              } catch (error) {}
            }

            try {
              if (post.attributes.liveblogPostData.isSticky) {
                boxStyle = {
                  border: 4,
                  borderColor: "secondary.main",
                  my: 4,
                  px: 2,
                };
              }
            } catch (e) {}

            if (!boxStyle) {
              boxStyle = {
                border: 1,
                borderColor: "grey.500",
                my: 4,
                px: 2,
              };
            }

            const postContent = getCobaltLiveblogPostHelper(post);
            let contentRender = null;
            try {
              contentRender = (
                <RenderLiveblogPostElement
                  jsonElement={
                    findElementsInContentJson(
                      ["article"],
                      postContent.content
                    )[0]
                  }
                  renderMode="styled"
                  rawPost={post}
                  neonData={neonData}
                />
              );
            } catch (e) {
              console.log(e);
            }
            if (contentRender) {
              contentRender = (
                <Box id={post.id} key={post.id} sx={boxStyle}>
                  {eventData ? (
                    <Box
                      sx={{ my: 1 }}
                      display="flex"
                      justifyContent="flexStart"
                      alignItems="flexStart"
                    >
                      <Box sx={{ mx: 1, my: 2 }}>{eventData.eventIcon}</Box>
                      <Box sx={{ mx: 1, my: 2, flex: 1, alignItems: "center" }}>
                        {contentRender}
                      </Box>
                      <Box
                        sx={{
                          mx: 1,
                          my: 2,
                          display: "flex",
                          marginLeft: "auto",
                        }}
                      >
                        <Typography
                          variant="h6"
                          component="div"
                          color="secondary.main"
                        >
                          {eventData.eventTime
                            ? eventData.eventTime.minutes + "'"
                            : "0'"}
                        </Typography>
                      </Box>
                    </Box>
                  ) : null}
                  {!eventData && postAuthor ? (
                    <Box
                      sx={{
                        borderBottom: 1,
                        borderColor: "secondary.main",
                        my: 1,
                      }}
                      display="flex"
                      justifyContent="flexStart"
                      alignItems="flexStart"
                    >
                      <Box sx={{ mx: 1, my: 2 }}>
                        <Avatar
                          alt={postAuthor.authorName}
                          src={postAuthor.authorPic}
                        />
                      </Box>
                      <Box
                        sx={{
                          mx: 1,
                          my: 2,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="h6"
                          component="div"
                          color="secondary.main"
                        >
                          {postAuthor.authorName}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          mx: 1,
                          my: 2,
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "auto",
                        }}
                      >
                        <Typography
                          variant="h6"
                          component="div"
                          color="secondary.main"
                        >
                          {postAuthor.authorRole}
                        </Typography>
                      </Box>
                    </Box>
                  ) : null}
                  {!eventData ? contentRender : null}
                  <SharePostBlock post={post} sx={{ marginLeft: "auto" }} />
                </Box>
              );
            }
            return contentRender;
          })}
        </Container>
      );
    }
    render = (
      <Container maxWidth="lg">
        {uuid ? <HTMLComment text={uuid} /> : null}
        <Container sx={{ my: 2 }} maxWidth="md">
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography
              align="center"
              variant="h3"
              component="h1"
              sx={{ fontStyle: "italic", fontWeight: "medium" }}
            >
              {headline}
            </Typography>
          </Box>
        </Container>
        {summary ? (
          <Container sx={{ my: 2 }} maxWidth="md">
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography align="center" variant="h5" component="h2">
                {summary}
              </Typography>
            </Box>
          </Container>
        ) : null}
        <MainImageBlock neonData={neonData} />
        {postsRender}
      </Container>
    );
  }
  return render;
}

function MainImageBlock({ neonData, styleVariant }) {
  let mainPictureElement = null;
  let mainImageUrl = null;
  let cloudinaryVideo = null;
  let extraElement = null;
  try {
    mainPictureElement = findElementsInContentJson(
      ["mediagroup"],
      neonData.object.helper.content
    )[0].elements[0];
    extraElement = findElementsInContentJson(
      ["extra"],
      neonData.object.helper.content
    );
    try {
      cloudinaryVideo = extraElement[0].elements.find((el) => {
        let found = false;
        try {
          found = el.attributes["emk-type"] == "cloudinaryVideo";
        } catch (e) {}
        return found;
      });
    } catch (e) {}

    mainImageUrl = ResourceResolver(
      getImageFormatUrl(
        getImageUrl(mainPictureElement, "landscape", neonData),
        "large"
      ),
      neonData.previewData ? neonData.previewData : null,
      neonData.siteContext.site
    );
  } catch (e) {
    console.log(e);
  }

  const imageWidth = 1024;
  const imageHeight = 576;

  let mainMediaBlock = null;
  if (cloudinaryVideo) {
    mainMediaBlock = <CloudinaryVideo jsonElement={cloudinaryVideo} />;
  } else if (mainImageUrl) {
    mainMediaBlock = (
      <Image src={mainImageUrl} width={imageWidth} height={imageHeight} />
    );
  }

  let justify = "center";
  let maxWidth = "md";
  if (styleVariant && styleVariant === "leftAligned") {
    justify = "left";
    maxWidth = "lg";
  }

  const render = (
    <Container sx={{ my: 2 }} maxWidth={maxWidth}>
      <Box display="flex" justifyContent={justify} alignItems={justify}>
        {mainMediaBlock}
      </Box>
    </Container>
  );
  return render;
}

function SharePostBlock({ post }) {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleClickLink = () => {
    navigator.clipboard.writeText(
      window.location.href.split("?")[0].split("#")[0] + "#" + post.id
    );
    setOpen(true);
  };

  return (
    <Box display="flex">
      <Box sx={{ marginLeft: "auto" }}>
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <div>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={handleTooltipClose}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title="Post link copied to clipboard!"
            >
              <IconButton
                sx={{ marginLeft: "auto", color: "secondary.main" }}
                onClick={handleClickLink}
              >
                <LinkIcon />
              </IconButton>
            </Tooltip>
          </div>
        </ClickAwayListener>
      </Box>
    </Box>
  );
}

function computeEventTime(post, eventStartDate) {
  let eventTime = null;
  try {
    const postDateString = post.title
      .substring(0, post.title.indexOf("."))
      .slice(0, -3);

    const postDate = new Date(
      parseInt(postDateString.substring(0, 4)), // Year
      parseInt(postDateString.substring(4, 6)) - 1, // Month (0-based)
      parseInt(postDateString.substring(6, 8)), // Day
      parseInt(postDateString.substring(8, 10)), // Hours
      parseInt(postDateString.substring(10, 12)), // Minutes
      parseInt(postDateString.substring(12, 14)) // Seconds
    );

    const eventDate = new Date(
      parseInt(eventStartDate.substring(0, 4)), // Year
      parseInt(eventStartDate.substring(4, 6)) - 1, // Month (0-based)
      parseInt(eventStartDate.substring(6, 8)), // Day
      parseInt(eventStartDate.substring(8, 10)), // Hours
      parseInt(eventStartDate.substring(10, 12)), // Minutes
      parseInt(eventStartDate.substring(12, 14)) // Seconds
    );

    const deltaSeconds = (postDate - eventDate) / 1000;
    console.log(deltaSeconds);
    if (deltaSeconds > 0) {
      const minutes = Math.floor(deltaSeconds / 60);
      const seconds = deltaSeconds % 60;
      eventTime = {
        minutes,
        seconds,
      };
    }
  } catch (e) {}
  return eventTime;
}
