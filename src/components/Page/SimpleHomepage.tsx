import { Box, Container, Grid, Typography } from '@mui/material';
// import HTMLComment from "react-html-comment";
import { getCurrentSite, getDwxLinkedObjects, getQueryResultObjects } from '../../services/neon-cms/neon-helpers';
import BreakingNewsFragment from '../Fragment/BreakingNewsFragment';
import GenericFragment from '../Fragment/GenericFragment';
import Segment from '../Segment/Segment';
import { GenericPageProps, NeonData } from 'src/types/commonTypes';
import { uniq, uniqBy, uniqWith } from 'lodash';
import { unique } from 'next/dist/build/utils';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.pageTitle
 */
const SimpleHomepage: React.FC<GenericPageProps> = ({ neonData, pageTitle }) => {
    const mainObjects = getDwxLinkedObjects(neonData, 'main');

    console.log('mainObjects', mainObjects);

    const objectsWithoutDuplicates = uniqWith(
        mainObjects.reduce((acc, o) => {
            switch (o.object.data.sys.baseType) {
                case 'query':
                    const queryResults = getQueryResultObjects(o);
                    return [...acc, ...queryResults];
                default:
                    return [...acc, o];
            }
        }, []),
        (o: NeonData) => !!o.object.data.id
    );

    let breaking = null;
    if (objectsWithoutDuplicates) {
        const breakingIndex = objectsWithoutDuplicates.findIndex(o => o.object.data.sys.type === 'breakingnews');
        if (breakingIndex >= 0) {
            breaking = objectsWithoutDuplicates.splice(breakingIndex, 1)[0];
        }
    }

    let opening = null;
    const articleCount = objectsWithoutDuplicates.filter(o => o.object.data.sys.baseType === 'article').length;
    if (articleCount <= 3) {
        opening = (
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    {objectsWithoutDuplicates.slice(0, 1).map((object, i) => (
                        <GenericFragment key={i} neonData={object} gridContext={{ xs: 12, md: 6 }} />
                    ))}
                </Grid>
                <Grid item xs={12} md={4}>
                    {objectsWithoutDuplicates.slice(1, 3).map((object, i) => (
                        <GenericFragment key={i} neonData={object} gridContext={{ xs: 12, md: 3 }} />
                    ))}
                </Grid>
            </Grid>
        );
    } else {
        opening = (
            <Grid container spacing={2}>
                <Grid item xs={12} md={3} order={{ xs: 2, md: 1 }}>
                    {objectsWithoutDuplicates.slice(1, 3).map((object, i) => (
                        <GenericFragment key={i} neonData={object} gridContext={{ xs: 12, md: 3 }} />
                    ))}
                </Grid>
                <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
                    {objectsWithoutDuplicates.slice(0, 1).map((object, i) => (
                        <GenericFragment key={i} neonData={object} gridContext={{ xs: 12, md: 6 }} />
                    ))}
                </Grid>
                <Grid item xs={12} md={3} order={{ xs: 3, md: 3 }}>
                    {objectsWithoutDuplicates.slice(3, 5).map((object, i) => (
                        <GenericFragment key={i} neonData={object} gridContext={{ xs: 12, md: 3 }} />
                    ))}
                </Grid>
            </Grid>
        );
    }

    const customColor = getCurrentSite(neonData)?.customAttributes?.customColor;

    const render = (
        <Container maxWidth="lg">
            {/* {uuid ? <HTMLComment text={uuid} /> : null} */}
            {pageTitle ? (
                <Box
                    sx={{
                        mb: 2,
                        backgroundColor: customColor || customColor || 'secondary.main'
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
            {breaking ? <BreakingNewsFragment neonData={breaking} /> : null}
            {opening}
            {objectsWithoutDuplicates.slice(articleCount).map((object, i) => {
                switch (object.object.data.sys.baseType) {
                    case 'webpagefragment':
                        return <Segment key={i} neonData={object} />;
                        break;
                    default:
                        return null;
                }
            })}
        </Container>
    );

    return render;
};

export default SimpleHomepage;
