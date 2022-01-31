import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Copyright from '../src/Copyright';
import MenuDrawer from '../src/Navigation/MenuDrawer';
import { Chip, Grid, Stack } from '@mui/material';
import CardFragment from '../src/Fragments/CardFragment';
import FeaturedSegment from '../src/Segments/FeaturedSegment';
import SectionSegment from '../src/Segments/SectionSegment';

export default function Index() {
  return (
    <Container maxWidth="false">
      <MenuDrawer />
      <Container maxWidth="lg">  
        <FeaturedSegment templateName="featured-standard"/>
        {/* <FeaturedSegment templateName="featured-big"/>
        <FeaturedSegment templateName="featured-condensed"/> */}
        <SectionSegment templateName="section-teaser-big"/>
        <SectionSegment templateName="section-teaser"/>
        <SectionSegment templateName="section-teaser-big"/>
        <SectionSegment templateName="section-top"/>
        <Box sx={{ my: 4 }}>
          <Copyright />
        </Box>
      </Container>
    </Container>
  );
}
