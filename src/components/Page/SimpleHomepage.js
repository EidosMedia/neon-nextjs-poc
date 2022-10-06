import { Box, Container, Grid, Typography } from "@mui/material";
import HTMLComment from "react-html-comment";
import { getDwxLinkedObjects, getQueryResultObjects } from "../../lib/cobalt-cms/cobalt-helpers";
import GenericFragment from "../Fragment/GenericFragment";
import Segment from "../Segment/Segment";

export default function SimpleHomepage({ cobaltData, pageTitle, analyticsReport }) {
    //Swing quick open
    let uuid = null;
    try { uuid = 'Methode uuid: "' + cobaltData.object.data.foreignId + '"' } catch (e) { }

    const mainObjects = getDwxLinkedObjects(cobaltData, "main");

    const flattenedObjects = mainObjects.reduce((acc, o) => {
        switch (o.object.data.sys.baseType) {
            case "query":
                const queryResults = getQueryResultObjects(o);
                return [...acc, ...queryResults];
                break;
            default:
                return [...acc, o]
        }
    }, [])

    const nonDupObjects = flattenedObjects.reduce((acc, o) => {
        if (acc.find((a) => ((a.object.data.id === o.object.data.id)
            || a.object.data.foreignId.includes(o.object.data.foreignId))  // to manage preview of queries
        )) {
            // don't add, it's a duplicate
            return acc
        } else {
            return [...acc, o]
        }
    }, [])

    const render = (
        <Container maxWidth="lg">
            {uuid ? <HTMLComment text={uuid} /> : null}
            {(pageTitle ?
                <Box sx={{ mb: 2, backgroundColor: 'secondary.main' }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Typography sx={{ color: 'primary.main' }} variant="h4" component="h4">
                        {pageTitle}
                    </Typography>
                </Box> : null)}
            <Grid container spacing={2}>
                <Grid item xs={12} md={3} order={{ xs: 2, md: 1 }}>
                    {nonDupObjects.slice(1, 3).map((object, i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 3 }} analyticsReport={analyticsReport} />)}
                </Grid>
                <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
                    {nonDupObjects.slice(0, 1).map((object, i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 6 }} analyticsReport={analyticsReport} />)}
                </Grid>
                <Grid item xs={12} md={3} order={{ xs: 3, md: 3 }}>
                    {nonDupObjects.slice(3, 5).map((object, i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 3 }} analyticsReport={analyticsReport} />)}
                </Grid>
            </Grid>
            {nonDupObjects.slice(5).map((object, i) => {
                    console.log(object)
                    switch (object.object.data.sys.baseType) {
                        case 'webpagefragment':
                            return <Segment key={i} cobaltData={object} analyticsReport={analyticsReport} />;
                            break;
                        default:
                            return null;
                    }
                })}
        </Container>
    )

    return render;
}