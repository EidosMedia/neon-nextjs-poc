import RenderContentElement from '@/components/RenderContent/RenderContentElement';
import { Typography } from '@mui/material';
import { findElementsInContentJson } from 'src/utils/ContentUtil';

const Summary = ({ data }) => (
    <Typography sx={{ mb: 2 }} variant="body1" color="text.secondary">
        <RenderContentElement jsonElement={findElementsInContentJson(['summary'], data.object.helper.content)[0]} />
    </Typography>
);

export default Summary;
