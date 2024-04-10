import { Box, Container, Typography } from '@mui/material';
// import HTMLComment from "react-html-comment";
import { getNeonDataHelper, getCurrentSite, getDwxLinkedObjects } from '../../lib/neon-cms/neon-helpers';
import GenericFragment from '../Fragment/GenericFragment';
import QuerySegment from '../Segment/QuerySegment';
import Segment from '../Segment/Segment';
import GenericWidget from '../Widgets/GenericWidget';
import React from 'react';
import { GenericPageProps } from 'src/types/commonTypes';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.pageTitle
 * @param root0.analyticsReport
 * @param root0.semanticSearchData
 */
const LandingPage: React.FC<GenericPageProps> = ({ neonData, pageTitle, analyticsReport, semanticSearchData }) => {
    const mainObjects = getDwxLinkedObjects(neonData, 'main');

    // Swing quick open
    let uuid = null;
    try {
        uuid = `Methode uuid: "${neonData.object.data.foreignId}"`;
    } catch (e) {}

    const customColor = getCurrentSite(neonData)?.customAttributes?.customColor;

    const render = (
        <Container maxWidth="lg">
            {/* {uuid ? <HTMLComment text={uuid} /> : null} */}
            {pageTitle ? (
                <Box
                    sx={{
                        mb: 2,
                        backgroundColor: customColor || 'secondary.main'
                    }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography sx={{ color: 'primary.main' }} variant="h4" component="h4">
                        {pageTitle}
                    </Typography>
                </Box>
            ) : null}
            {mainObjects.map((obj, i) => {
                switch (obj.object.data.sys.baseType) {
                    case 'webpagefragment':
                        return <Segment key={i} neonData={obj} analyticsReport={analyticsReport} />;

                    case 'query':
                        return <QuerySegment key={i} neonData={obj} />;

                    case 'widget':
                        return <GenericWidget key={i} neonData={obj} semanticSearchData={semanticSearchData} />;

                    case 'article':
                        return (
                            <GenericFragment
                                key={i}
                                neonData={obj}
                                gridContext={{ xs: 12, md: 3 }}
                                analyticsReport={analyticsReport}
                            />
                        );
                }
            })}
        </Container>
    );

    return render;
};

export default LandingPage;
