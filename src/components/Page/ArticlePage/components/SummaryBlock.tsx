import RenderContentElement from '@/components/RenderContent/RenderContentElement';
import { Box, Container, Typography } from '@mui/material';
import { findElementsInContentJson } from 'src/utils/ContentUtil';
import { BlockProps } from '../ArticlePage.types';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.styleVariant
 */
const SummaryBlock: React.FC<BlockProps> = ({ neonData, styleVariant }) => {
    let summary = null;
    try {
        summary = (
            <RenderContentElement
                jsonElement={findElementsInContentJson(['summary'], neonData.object.helper.content)[0]}
            />
        );
    } catch (e) {}

    const justify = styleVariant && styleVariant === 'leftAligned' ? ('left' as const) : ('center' as const);
    const maxWidth = styleVariant && styleVariant === 'leftAligned' ? ('lg' as const) : ('md' as const);

    let render = null;
    if (summary) {
        render = (
            <Container sx={{ my: 2 }} maxWidth={maxWidth}>
                <Box display="flex" justifyContent={justify} alignItems={justify}>
                    <Typography variant="h5" component="h2">
                        {summary}
                    </Typography>
                </Box>
            </Container>
        );
    }
    return render;
};

export default SummaryBlock;
