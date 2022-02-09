import { Grid } from "@mui/material";
import { getQueryResultObjects } from "../../lib/cobalt-cms/cobalt-helpers";
import GenericFragment from "../Fragment/GenericFragment";

export default function QuerySegment({ cobaltData }) {
    let render = null;
    const queryResults = getQueryResultObjects(cobaltData);

    render = (
        <Grid container spacing={2}>
            {queryResults.map((object,i) => (
                <Grid key={i} item xs={12} md={4}>
                    <GenericFragment cobaltData={object} gridContext={{ xs: 12, md: 4 }} />
                </Grid>
            ))}
        </Grid>
    )

    return render;
}