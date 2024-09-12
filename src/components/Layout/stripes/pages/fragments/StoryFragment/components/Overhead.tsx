import { isStripes } from '@/components/Layout/stripes/Stripes.utils';
import RenderContentElement from '@/components/RenderContent/RenderContentElement';
import { fontSansSerif } from '@/themes/stripes/stripes-theme';
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

    const overheadContent = findElementsInContentJson(['p'], data.object.helper.content)[0];

    if (!overheadContent) return null;

    return (
        <Box>
            <Typography
                sx={{ color: 'primary.main', fontWeight: 'bold', textTransform: 'uppercase' }}
                component="span"
                fontFamily={fontSansSerif}
            >
                <RenderContentElement jsonElement={overheadContent} />
            </Typography>
        </Box>
    );
};
export default Overhead;
