import RenderContentElement from '@/components/RenderContent/RenderContentElement';
import { Box, Container, Typography } from '@mui/material';
import { findElementsInContentJson } from 'src/utils/ContentUtil';
import { BlockProps } from '../../ArticlePage/ArticlePage.types';
import logger from 'logger';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.styleVariant
 */
const HeadlineBlock: React.FC<BlockProps> = ({ neonData, styleVariant }) => {
    let overhead = null;
    let headline = null;

    console.log('content', neonData.object.helper.content);
    console.log('overheadContent', findElementsInContentJson(['overhead'], neonData.object.helper.content)[0]);

    try {
        overhead = (
            <RenderContentElement
                jsonElement={findElementsInContentJson(['overhead'], neonData.object.helper.content)[0]}
            />
        );
        headline = (
            <RenderContentElement
                jsonElement={findElementsInContentJson(['headline'], neonData.object.helper.content)[0]}
            />
        );
    } catch (e) {
        logger.error(e);
    }

    const overheadStyle = {
        color: 'white',
        backgroundColor: 'secondary.contrastText',
        width: 'fit-content',
        textTransform: 'uppercase',
        padding: '0.3em 0.5em',
        marginBottom: '1.5rem'
    };

    const render = (
        <Container sx={{ my: 4 }} maxWidth="md">
            <Box display="flex" flexDirection="column">
                {overhead?.props?.jsonElement?.elements && (
                    <Typography variant="h6" component="h6" sx={overheadStyle}>
                        {overhead}
                    </Typography>
                )}
                <Typography variant="h1" component="h1">
                    {headline}
                </Typography>
            </Box>
        </Container>
    );

    return render;
};

export default HeadlineBlock;
