import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function BasicNewsletter(props) {
    const render = (
        <Container maxWidth="lg">
            <Container sx={{ my: 2 }} maxWidth="md">
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Typography align="center" variant="h3" component="h1" sx={{ fontStyle: 'italic', fontWeight: 'medium' }}>
                        Example newsletter
                    </Typography>
                </Box>
            </Container>

            <Container sx={{ my: 2 }} maxWidth="md">
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Typography align="center" variant="h5" component="h2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et mauris suscipit, gravida sem sit amet, eleifend arcu. Duis elementum ligula ut est suscipit, ut sollicitudin velit tristique. Donec aliquet lacus eget mollis iaculis. Morbi tincidunt arcu sed mattis lobortis. Quisque rhoncus, arcu sit amet accumsan ornare, arcu risus porta erat, sit amet ultrices sapien ipsum sed ante. Ut condimentum hendrerit turpis non accumsan.
                    </Typography>
                </Box>
            </Container>
            <Container sx={{ my: 2 }} maxWidth="md">
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Typography align="center" variant="h5" component="h2">
                    Nulla in nisl non dolor ultrices imperdiet. Aenean eu dapibus ligula. Cras pretium quam rutrum mi euismod egestas. Quisque dolor nulla, egestas et fermentum ut, fermentum non nulla. Nunc malesuada dapibus sem, scelerisque tincidunt sem elementum et. Nam vulputate, lacus non elementum tincidunt, dolor quam placerat velit, sed posuere justo velit tempor dolor. Pellentesque congue congue diam, sed porta diam fermentum in. Integer fermentum arcu ac magna tincidunt, in tempor dui cursus. Pellentesque ut erat enim. Nunc non tellus at ipsum auctor luctus.
                    </Typography>
                </Box>
            </Container>
        </Container>
    )
    return render;
}