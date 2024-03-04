import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { getCurrentSite, getSectionChildrenObjects } from '../../lib/neon-cms/neon-helpers';
import GenericFragment from '../Fragment/GenericFragment';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.pageTitle
 */
export default function SectionPage({ neonData, pageTitle }) {
    let render = null;

    const searchResults = getSectionChildrenObjects(neonData);

    const customColor = getCurrentSite(neonData)?.customAttributes?.customColor;

    render = (
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
                    <Typography sx={{ color: 'primary.main' }} variant="h2" component="h2">
                        {pageTitle}
                    </Typography>
                </Box>
            ) : null}
            <Grid container spacing={2}>
                {searchResults
                    .filter(object => object.object.data.sys.baseType === 'article')
                    .map((object, i) => (
                        <Grid key={i} item xs={12} md={4}>
                            <GenericFragment neonData={object} gridContext={{ xs: 12, md: 4 }} />
                        </Grid>
                    ))}
            </Grid>
        </Container>
    );

    return render;
}
