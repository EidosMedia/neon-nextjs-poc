import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function ErrorPage({ errorType }) {
    let errorMessage = "Page not found!"
    const render = (
        <Grid container justifyContent="center">
            <Typography sx={{ mt:2, color: 'secondary.main' }} variant="h4" component="h4">
                {errorMessage}
            </Typography>
        </Grid>
    )
    return render;
}