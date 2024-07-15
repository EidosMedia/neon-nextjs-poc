import RenderContentElement from '@/components/RenderContent/RenderContentElement';
import { Box, Typography } from '@mui/material';
import { findElementsInContentJson } from 'src/utils/ContentUtil';

const Overhead = ({ data }) => {
    if (!data) return null;

    console.log('data', data);
    const overheadContent = findElementsInContentJson(['overhead'], data.object.helper.content)[0];

    console.log('overheadContent', overheadContent);

    if (!overheadContent) return null;

    return (
        <Box>
            <Typography
                sx={{ mb: 2, backgroundColor: 'text.secondary', padding: '2px 5px', fontWeight: 'bold' }}
                color="white"
                component="span"
            >
                <RenderContentElement jsonElement={overheadContent} />
            </Typography>
        </Box>
    );
};
export default Overhead;
