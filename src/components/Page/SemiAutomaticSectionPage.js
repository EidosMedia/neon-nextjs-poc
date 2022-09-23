import { Box, Container, Grid, Typography } from "@mui/material";
import HTMLComment from "react-html-comment";
import { getDwxLinkedObjects, getQueryResultObjects } from "../../lib/cobalt-cms/cobalt-helpers";
import GenericFragment from "../Fragment/GenericFragment";

export default function SemiAutomaticSectionPage({ cobaltData, pageTitle, analyticsReport }) {
    //Swing quick open
    let uuid = null;
    try { uuid = 'Methode uuid: "' + cobaltData.object.data.foreignId + '"' } catch (e) { }

    const mainObjects = getDwxLinkedObjects(cobaltData, "main");
    // mainObjects.forEach((o) => console.log(o.object.data))
    
    const flattenedObjects = mainObjects.reduce((acc,o) => {
        switch(o.object.data.sys.baseType){
            case "query":
                const queryResults = getQueryResultObjects(o);
                return [...acc,...queryResults];
                break;
            default:
                return [...acc,o]
        }
    },[])

    console.log(flattenedObjects)

    const nonDupObjects = flattenedObjects.reduce((acc,o) => {
        if(acc.find((a) => a.object.data.id === o.object.data.id)){
            // don't add, it's a duplicate
            return acc
        } else {
            return [...acc,o]
        }
    },[])

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
                <Grid item xs={12} md={8}>
                    {nonDupObjects.slice(0,1).map((object, i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 8 }} analyticsReport={analyticsReport} />)}
                </Grid>
                <Grid item xs={12} md={4}>
                    {nonDupObjects.slice(1,3).map((object, i) => <GenericFragment key={i} cobaltData={object} gridContext={{ xs: 12, md: 4 }} analyticsReport={analyticsReport} />)}
                </Grid>
                {nonDupObjects.slice(3).map((object, i) => (
                    <Grid key={i} item xs={12} md={3}>
                        <GenericFragment cobaltData={object} gridContext={{ xs: 12, md: 3 }} analyticsReport={analyticsReport} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )

    return render;
}