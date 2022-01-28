import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Copyright from '../src/Copyright';
import TemporaryDrawer from '../src/Navigation/TemporaryDrawer';
import { Grid } from '@mui/material';

export default function Index() {
  return (
    <Container maxWidth="false">
      <TemporaryDrawer />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid sx={{ border:1 }} item xs={12} md={8}>
            <div>Fragment</div>
          </Grid>
          <Grid sx={{ border:1 }} item xs={12} md={4}>
            <div>Fragment</div>
          </Grid>
          <Grid sx={{ border:1 }} item xs={12} md={4}>
            <div>Fragment</div>
          </Grid>
          <Grid sx={{ border:1 }} item xs={12} md={8}>
            <div>Fragment</div>
          </Grid>

        </Grid>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Hello World!
          </Typography>
          <Copyright />
        </Box>
      </Container>
    </Container>
  );
}
