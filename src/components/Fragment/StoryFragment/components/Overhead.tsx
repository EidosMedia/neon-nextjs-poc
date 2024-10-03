import RenderContentElement from '@/components/RenderContent/RenderContentElement';
import { Box, Typography } from '@mui/material';
import { findElementsInContentJson } from 'src/utils/ContentUtil';

const defaultStyles = {
    mb: 2,
    backgroundColor: 'text.secondary',
    padding: '2px 5px',
    fontWeight: 'bold'
};

const Overhead = ({ data, size }) => {
    if (!data) return null;

    const overheadContent = findElementsInContentJson(['overhead'], data.object.helper.content)[0];

    if (!overheadContent) return null;

    const overheadStyles = size === 'small' ? {
        mb: 2,
        color: 'text.secondary',
        fontWeight: 'bold'
    } : defaultStyles;

    return (
        <Box>
            <Typography sx={overheadStyles} color="white" component="span">
                <RenderContentElement jsonElement={overheadContent} />
            </Typography>
        </Box>
    );
};
export default Overhead;
