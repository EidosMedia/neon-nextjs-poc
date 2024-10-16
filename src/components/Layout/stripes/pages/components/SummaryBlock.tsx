import RenderContentElement from '@/components/RenderContent/RenderContentElement';
import { Box, Typography } from '@mui/material';
import { findElementsInContentJson } from 'src/utils/ContentUtil';
import { fontSansSerif } from '@/themes/stripes/stripes-theme';
import { BlockProps } from '@/components/Page/ArticlePage/ArticlePage.types';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.styleVariant
 */
const SummaryBlock: React.FC<BlockProps> = ({ neonData, styleVariant }) => {
    return (
        <Box display="flex" padding={3}>
            <Typography variant="h6" component="h2" fontFamily={fontSansSerif} fontWeight="normal" color="#666">
                <RenderContentElement
                    jsonElement={findElementsInContentJson(['summary'], neonData.object.helper.content)[0]}
                />
            </Typography>
        </Box>
    );
};

export default SummaryBlock;
