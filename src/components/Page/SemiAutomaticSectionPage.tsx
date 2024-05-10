import { Box, Container, Grid, Typography } from '@mui/material';
// import HTMLComment from "react-html-comment";
import { getCurrentSite, getDwxLinkedObjects, getQueryResultObjects } from '../../services/neon-cms/neon-helpers';
import GenericFragment from '../Fragment/GenericFragment';

type SemiAutomaticSectionPageProps = {
    neonData: any;
    pageTitle: string;
    analyticsReport?: any;
};

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.pageTitle
 * @param root0.analyticsReport
 * @param root0.semanticSearchData
 */
export const SemiAutomaticSectionPage: React.FC<SemiAutomaticSectionPageProps> = ({
    neonData,
    pageTitle,
    analyticsReport
}) => {
    console.log('semiautomaticsectionpage');
    const mainObjects = getDwxLinkedObjects(neonData, 'banner');

    const flattenedObjects = mainObjects.reduce((acc, o) => {
        switch (o.object.data.sys.baseType) {
            case 'query':
                const queryResults = getQueryResultObjects(o);
                return [...acc, ...queryResults];
            default:
                return [...acc, o];
        }
    }, []);

    const nonDupObjects = flattenedObjects.reduce((acc, o) => {
        if (
            acc.find(
                a => a.object.data.id === o.object.data.id // to manage preview of queries
            )
        ) {
            // don't add, it's a duplicate
            return acc;
        }
        return [...acc, o];
    }, []);

    const customColor = getCurrentSite(neonData)?.customAttributes?.customColor;

    const render = (
        <Container maxWidth="lg">
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

            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    {nonDupObjects.slice(0, 1).map((object, i) => (
                        <GenericFragment key={i} neonData={object} gridContext={{ xs: 12, md: 8 }} />
                    ))}
                </Grid>
                <Grid item xs={12} md={4}>
                    {nonDupObjects.slice(1, 3).map((object, i) => (
                        <GenericFragment key={i} neonData={object} gridContext={{ xs: 12, md: 4 }} />
                    ))}
                </Grid>
            </Grid>

            <Box
                sx={{
                    p: 1,
                    mb: 2,
                    backgroundColor: customColor || 'secondary.main'
                }}
                display="flex"
                justifyContent="start"
                alignItems="center"
            >
                <Typography sx={{ color: 'primary.main' }} variant="h4" component="h4">
                    More news
                </Typography>
            </Box>

            <Grid container spacing={2}>
                {nonDupObjects.slice(3).map((object, i) => (
                    <Grid key={i} item xs={12} md={3}>
                        <GenericFragment neonData={object} gridContext={{ xs: 12, md: 3 }} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );

    return render;
};

export default SemiAutomaticSectionPage;
