import { isStripes } from '@/components/Layout/stripes/Stripes.utils';
import RenderContentElement from '@/components/RenderContent/RenderContentElement';
import { Box, Typography } from '@mui/material';
import { findElementsInContentJson } from 'src/utils/ContentUtil';

const defaultStyles = {
    mb: 2,
    backgroundColor: 'text.secondary',
    padding: '2px 5px',
    fontWeight: 'bold'
};

const Overhead = ({ data }) => {
    if (!data) return null;

    const overheadContent = findElementsInContentJson(['overhead'], data.object.helper.content)[0];

    if (!overheadContent) return null;

    console.log('data', data);

    return (
        <Box>
            <Typography
                sx={isStripes(data) ? { color: 'primary.main', padding: '2px 5px', fontWeight: 'bold' } : defaultStyles}
                color="white"
                component="span"
            >
                <RenderContentElement jsonElement={overheadContent} />
            </Typography>
        </Box>
    );
};
export default Overhead;
