import RenderContentElement from '@/components/RenderContent/RenderContentElement';
import { Box, Breakpoint, Container, Typography } from '@mui/material';
import { findElementsInContentJson } from 'src/utils/ContentUtil';
import { BlockProps } from '../ArticlePage.types';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.styleVariant
 */
const HeadlineBlock: React.FC<BlockProps> = ({ neonData, styleVariant }) => {
    let headline = null;
    try {
        headline = (
            <RenderContentElement
                jsonElement={findElementsInContentJson(['headline'], neonData.object.helper.content)[0]}
            />
        );
    } catch (e) {}

    const justify = styleVariant && styleVariant === 'leftAligned' ? ('left' as const) : ('center' as const);
    const maxWidth = styleVariant && styleVariant === 'leftAligned' ? ('lg' as const) : ('md' as const);

    const render = (
        <Container sx={{ my: 1 }} maxWidth={maxWidth as Breakpoint}>
            <Box display="flex" justifyContent={justify} alignItems={justify}>
                <Typography
                    align={justify}
                    variant="h3"
                    component="h1"
                    sx={{ fontStyle: 'italic', fontWeight: 'medium' }}
                >
                    {headline}
                </Typography>
            </Box>
        </Container>
    );

    return render;
};

export default HeadlineBlock;
