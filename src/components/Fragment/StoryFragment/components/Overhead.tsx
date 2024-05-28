import RenderContentElement from '@/components/RenderContent/RenderContentElement';
import { Typography } from '@mui/material';
import { findElementsInContentJson } from 'src/utils/ContentUtil';

const Summary = ({ data }) => {
    if (!data) return null;

    return (
        <Typography sx={{ mb: 2, backgroundColor: 'text.secondary' }} variant="body1" color="white">
            <RenderContentElement jsonElement={findElementsInContentJson(['summary'], data.object.helper.content)[0]} />
        </Typography>
    );
};
export default Summary;
