import { Grid, Typography } from '@mui/material';

/**
 *
 * @param root0
 * @param root0.errorType
 */
export default function ErrorPage({ errorType }) {
    const errorMessage = 'Page not found!';
    const render = (
        <Grid container justifyContent="center">
            <Typography sx={{ mt: 2, color: 'secondary.main' }} variant="h4" component="h4">
                {errorMessage}
            </Typography>
        </Grid>
    );
    return render;
}
