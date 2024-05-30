import { Avatar, Button, ClickAwayListener, Container, IconButton, Tooltip, Typography, styled } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
// import HTMLComment from "react-html-comment";
import useSWR from 'swr';
import { getNeonLiveblogPostHelper, getCurrentLiveSite, getImageFormatUrl } from '../../services/neon-cms/neon-helpers';
import { findElementsInContentJson, getImageUrl } from '../../utils/ContentUtil';
import RenderContentElement, { CloudinaryVideo } from '../RenderContent/RenderContentElement';
import RenderLiveblogPostElement from '../RenderContent/RenderLiveblogPostElement';
import ResourceResolver from '../../utils/ResourceResolver';
import Image from 'next/image';
import SportsIcon from '@mui/icons-material/Sports';
import SportsSoccerSharpIcon from '@mui/icons-material/SportsSoccerSharp';
import CelebrationSharpIcon from '@mui/icons-material/CelebrationSharp';
import StyleSharpIcon from '@mui/icons-material/StyleSharp';
import LinkIcon from '@mui/icons-material/Link';
import React from 'react';
import theme from 'src/theme';
import Layout from '../Layout/Layout';

const fetcher = url => axios.get(url).then(res => res.data);

/**
 *
 */
export default function LiveblogPage({ neonData }) {
    let render = null;

    // Swing quick open

    if (neonData) {
        let data;

        let error = null;
        ({ data, error } = useSWR(
            '/api/' + getCurrentLiveSite(neonData) + '/liveblogs/' + neonData.object.data.id,
            fetcher,
            { refreshInterval: 5000, dedupingInterval: 0 }
        ));

        let overhead = null;
        let headline = null;
        const overheadStyle = {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.secondary.contrastText,
            width: 'fit-content',
            textTransform: 'uppercase',
            padding: '0.3em 0.5em',
            marginBottom: '1.5rem'
        };
        try {
            overhead = (
                <RenderContentElement
                    jsonElement={findElementsInContentJson(['p'], neonData.object.helper.content)[0]}
                />
            );
            headline = (
                <RenderContentElement
                    jsonElement={findElementsInContentJson(['headline'], neonData.object.helper.content)[0]}
                />
            );
        } catch (e) {
            console.log(e);
        }

        let summary = null;
        try {
            summary = (
                <RenderContentElement
                    jsonElement={findElementsInContentJson(['summary'], neonData.object.helper.content)[0]}
                />
            );
        } catch (e) {}

        let content = null;
        try {
            content = (
                <RenderContentElement
                    jsonElement={findElementsInContentJson(['content'], neonData.object.helper.content)[0]}
                    renderMode="styled"
                    neonData={neonData}
                />
            );
        } catch (e) {
            console.log(e);
        }

        let reporters = null;
        try {
            reporters = neonData.object.data.attributes.liveblogData.lbNeutralReporters.map(r => ({
                authorId: r.lbNeutralReporterId,
                authorName: r.lbNeutralReporterName,
                authorRole: r.lbNeutralReporterRole,
                authorPic: '/static/img/avatars/' + r.lbNeutralReporterId + '.jpg'
            }));
        } catch (e) {
            console.log(e);
        }

        let ambassadors = null;
        try {
            const gallery = findElementsInContentJson(['div'], neonData.object.helper.content)[0];
            ambassadors = gallery.elements.map(el => {
                const authorName = el.elements.find(el2 => el2.name === 'person').elements[0].text;
                const authorRole = el.elements.find(el2 => el2.name === 'description').elements[0].text;
                let authorPic = el.elements.find(el2 => el2.name === 'img' && el2.attributes.class === 'square')
                    .attributes.src;
                authorPic = ResourceResolver(authorPic);
                return {
                    authorName,
                    authorRole,
                    authorPic,
                    isAmbassador: true
                };
            });
        } catch (e) {}

        let eventStartDate = null;
        try {
            eventStartDate = neonData.object.data.attributes.liveblogData.eventStartDate;
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
                                    case '3':
                                        eventData = {
                                            eventText: 'Goal',
                                            eventIcon: (
                                                <>
                                                    <SportsSoccerSharpIcon fontSize="large" color="secondary" />
                                                    <CelebrationSharpIcon fontSize="large" color="secondary" />
                                                </>
                                            ),
                                            eventTime: computeEventTime(post, eventStartDate)
                                        };
                                        boxStyle = {
                                            border: 6,
                                            borderColor: 'green',
                                            my: 4,
                                            px: 2
                                        };
                                        break;
                                    case '2':
                                        eventData = {
                                            eventText: 'Red card',
                                            eventIcon: <StyleSharpIcon fontSize="large" sx={{ color: '#DC143C' }} />,
                                            eventTime: computeEventTime(post, eventStartDate)
                                        };
                                        boxStyle = {
                                            border: 1,
                                            borderColor: 'grey.300',
                                            my: 4,
                                            px: 2
                                        };
                                        break;
                                    case '5':
                                        eventData = {
                                            eventText: 'Penalty',
                                            eventIcon: <SportsIcon fontSize="large" color="secondary" />,
                                            eventTime: computeEventTime(post, eventStartDate)
                                        };
                                        boxStyle = {
                                            border: 4,
                                            borderColor: 'secondary.main',
                                            my: 4,
                                            px: 2
                                        };
                                        break;
                                    case '13':
                                        eventData = {
                                            eventText: 'Match start',
                                            eventIcon: <SportsIcon fontSize="large" color="secondary" />,
                                            eventTime: { minutes: 0, seconds: 0 }
                                        };
                                        boxStyle = {
                                            border: 1,
                                            borderColor: 'grey.300',
                                            my: 4,
                                            px: 2
                                        };
                                        break;
                                    case '14':
                                        eventData = {
                                            eventText: 'Match end',
                                            eventIcon: <SportsIcon fontSize="large" color="secondary" />,
                                            eventTime: computeEventTime(post, eventStartDate)
                                        };
                                        boxStyle = {
                                            border: 4,
                                            borderColor: 'grey.300',
                                            my: 4,
                                            px: 2
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
                                    a => a.authorName === post.attributes.liveblogPostData.postAmbassador
                                );
                                if (postAuthor && !boxStyle) {
                                    boxStyle = {
                                        border: 4,
                                        borderColor: 'secondary.main',
                                        my: 4,
                                        px: 2
                                    };
                                }
                            }
                        } catch (error) {}

                        if (!postAuthor) {
                            // check if is reporter
                            try {
                                if (!post.attributes.liveblogPostData.forceNeutral) {
                                    let creator = post.attributes.creator.split(':');
                                    creator = creator[creator.length - 1];
                                    postAuthor = reporters.find(r => r.authorId === creator);
                                    if (postAuthor && !boxStyle) {
                                        boxStyle = {
                                            border: 1,
                                            borderColor: 'grey.500',
                                            my: 4,
                                            px: 2
                                        };
                                    }
                                }
                            } catch (error) {}
                        }

                        try {
                            if (post.attributes.liveblogPostData.isSticky) {
                                boxStyle = {
                                    border: 4,
                                    borderColor: 'secondary.main',
                                    my: 4,
                                    px: 2
                                };
                            }
                        } catch (e) {}

                        if (!boxStyle) {
                            boxStyle = {
                                borderLeft: 2,
                                borderColor: 'grey.700',
                                position: 'relative',
                                pb: 2,
                                '::before': {
                                    content: '"⬤"',
                                    fontSize: '1.7rem',
                                    color: 'secondary.contrastText',
                                    position: 'absolute',
                                    left: '-18px',
                                    top: '-10px'
                                }
                            };
                        }

                        console.log('post', post);
                        const postContent = getNeonLiveblogPostHelper(post);
                        let contentRender = null;
                        try {
                            contentRender = (
                                <RenderLiveblogPostElement
                                    jsonElement={findElementsInContentJson(['article'], postContent.content)[0]}
                                    renderMode="styled"
                                    rawPost={post}
                                    neonData={neonData}
                                />
                            );
                        } catch (e) {
                            console.log(e);
                        }
                        if (contentRender) {
                            const postTimestamp = new Date(post.timestamp);
                            const parsedPostTimestamp = `${postTimestamp.getHours()}:${postTimestamp.getMinutes()}`;
                            const lastItem = length === i + 1;
                            contentRender = (
                                <Box
                                    id={post.id}
                                    key={post.id}
                                    sx={[boxStyle, lastItem && { borderColor: 'transparent' }]}
                                >
                                    {eventData ? (
                                        <Box
                                            sx={{ my: 1 }}
                                            display="flex"
                                            justifyContent="flexStart"
                                            alignItems="flexStart"
                                        >
                                            <Box sx={{ mx: 1, my: 2 }}>{eventData.eventIcon}</Box>
                                            <Box sx={{ mx: 1, my: 2, flex: 1, alignItems: 'center' }}>
                                                {contentRender}
                                            </Box>
                                            <Box
                                                sx={{
                                                    mx: 1,
                                                    my: 2,
                                                    display: 'flex',
                                                    marginLeft: 'auto'
                                                }}
                                            >
                                                <Typography variant="h6" component="div" color="secondary.main">
                                                    {eventData.eventTime ? eventData.eventTime.minutes + "'" : "0'"}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ) : null}
                                    {!eventData && postAuthor ? (
                                        <Box
                                            sx={{
                                                borderBottom: 1,
                                                borderColor: 'secondary.main',
                                                my: 1
                                            }}
                                            display="flex"
                                            justifyContent="flexStart"
                                            alignItems="flexStart"
                                        >
                                            <Box sx={{ mx: 1, my: 2 }}>
                                                <Avatar alt={postAuthor.authorName} src={postAuthor.authorPic} />
                                            </Box>
                                            <Box
                                                sx={{
                                                    mx: 1,
                                                    my: 2,
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Typography variant="h6" component="div" color="secondary.main">
                                                    {postAuthor.authorName}
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    mx: 1,
                                                    my: 2,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    marginLeft: 'auto'
                                                }}
                                            >
                                                <Typography variant="h6" component="div" color="secondary.main">
                                                    {postAuthor.authorRole}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ) : null}
                                    {!eventData ? (
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography variant="h1" component="h2" sx={{ fontSize: '1.2rem', ml: 2 }}>
                                                {parsedPostTimestamp}
                                            </Typography>
                                            <Box>{contentRender}</Box>
                                        </Box>
                                    ) : null}
                                    {/* <SharePostBlock post={post} /> */}
                                </Box>
                            );
                        }
                        return contentRender;
                    })}
                </Container>
            );
        }
        render = (
            <Layout neonData={neonData}>
                <Container maxWidth="lg">
                    <Container sx={{ my: 2 }} maxWidth="md">
                        {overhead?.props?.jsonElement?.elements && (
                            <Typography variant="h6" component="h6" sx={overheadStyle}>
                                {overhead}
                            </Typography>
                        )}
                        <Typography variant="h1" component="h1">
                            {headline}
                        </Typography>
                    </Container>
                    {summary && (
                        <Container sx={{ my: 2 }} maxWidth="md">
                            <Typography variant="h5" component="h2">
                                {summary}
                            </Typography>
                        </Container>
                    )}
                    {neonData?.object?.data?.links?.system?.mainPicture && <MainImageBlock neonData={neonData} />}
                    {content && (
                        <Typography variant="h5" component="h2">
                            {content}
                        </Typography>
                    )}
                    {postsRender}
                </Container>
            </Layout>
        );
    }
    return render;
}

type BlockProps = {
    neonData?: any;
    styleVariant?: string;
};

/**
 *
 */
const MainImageBlock: React.FC<BlockProps> = ({ neonData, styleVariant }) => {
    let mainPictureElement = null;
    let mainImageUrl = null;
    let cloudinaryVideo = null;
    let extraElement = null;
    try {
        mainPictureElement = findElementsInContentJson(['figure'], neonData.object.helper.content)[0];
        extraElement = findElementsInContentJson(['extra'], neonData.object.helper.content);
        try {
            cloudinaryVideo = extraElement[0].elements.find(el => {
                let found = false;
                try {
                    found = el.attributes['emk-type'] == 'cloudinaryVideo';
                } catch (e) {
                    console.log(e);
                }
                return found;
            });
        } catch (e) {
            console.log(e);
        }
        mainImageUrl = ResourceResolver(getImageFormatUrl(getImageUrl(mainPictureElement, 'wide', neonData), 'large'));
    } catch (e) {
        console.log(e);
    }

    const imageWidth = 1024;
    const imageHeight = 576;

    let mainMediaBlock = null;

    if (cloudinaryVideo) {
        mainMediaBlock = <CloudinaryVideo jsonElement={cloudinaryVideo} />;
    } else if (mainImageUrl) {
        console.log('mainImageUrl', mainImageUrl);
        mainMediaBlock = <Image src={mainImageUrl} width={imageWidth} height={imageHeight} alt="" />;
    }

    const justify = styleVariant && styleVariant === 'leftAligned' ? ('left' as const) : ('center' as const);
    const maxWidth = styleVariant && styleVariant === 'leftAligned' ? ('lg' as const) : ('md' as const);

    const render = (
        <Container sx={{ my: 2 }} maxWidth={maxWidth}>
            <Box display="flex" justifyContent={justify} alignItems={justify}>
                {mainMediaBlock}
            </Box>
        </Container>
    );
    return render;
};

/**
 *
 */
function SharePostBlock({ post }) {
    const [open, setOpen] = React.useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleClickLink = () => {
        navigator.clipboard.writeText(window.location.href.split('?')[0].split('#')[0] + '#' + post.id);
        setOpen(true);
    };

    return (
        <Box display="flex">
            <Box sx={{ marginLeft: 'auto' }}>
                <ClickAwayListener onClickAway={handleTooltipClose}>
                    <div>
                        <Tooltip
                            PopperProps={{
                                disablePortal: true
                            }}
                            onClose={handleTooltipClose}
                            open={open}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            title="Post link copied to clipboard!"
                        >
                            <IconButton sx={{ marginLeft: 'auto', color: 'secondary.main' }} onClick={handleClickLink}>
                                <LinkIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </ClickAwayListener>
            </Box>
        </Box>
    );
}

/**
 *
 */
function computeEventTime(post, eventStartDate) {
    let eventTime = null;
    try {
        const postDateString = post.title.substring(0, post.title.indexOf('.')).slice(0, -3);

        const postDate = new Date(
            parseInt(postDateString.substring(0, 4)), // Year
            parseInt(postDateString.substring(4, 6)) - 1, // Month (0-based)
            parseInt(postDateString.substring(6, 8)), // Day
            parseInt(postDateString.substring(8, 10)), // Hours
            parseInt(postDateString.substring(10, 12)), // Minutes
            parseInt(postDateString.substring(12, 14)) // Seconds
        ).getTime();

        const eventDate = new Date(
            parseInt(eventStartDate.substring(0, 4)), // Year
            parseInt(eventStartDate.substring(4, 6)) - 1, // Month (0-based)
            parseInt(eventStartDate.substring(6, 8)), // Day
            parseInt(eventStartDate.substring(8, 10)), // Hours
            parseInt(eventStartDate.substring(10, 12)), // Minutes
            parseInt(eventStartDate.substring(12, 14)) // Seconds
        ).getTime();

        const deltaSeconds = (postDate - eventDate) / 1000;
        console.log(deltaSeconds);
        if (deltaSeconds > 0) {
            const minutes = Math.floor(deltaSeconds / 60);
            const seconds = deltaSeconds % 60;
            eventTime = {
                minutes,
                seconds
            };
        }
    } catch (e) {}
    return eventTime;
}
