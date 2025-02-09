import { BlockProps } from '../../ArticlePage/ArticlePage.types';
import Image from 'next/image';
import { getMainImageUrl } from '@/services/neon-cms/neon-helpers';
import { Box, Container } from '@mui/material';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.styleVariant
 */
const MainImageBlock: React.FC<BlockProps> = ({ neonData, styleVariant }) => {
    let imageWidth = 1024;
    let imageHeight = 576;

    const mainImageUrl = getMainImageUrl(neonData);

    let tmx = neonData?.pageContext?.mainPicture?.metadata.softCrops?.Wide?.tmx;
    if (!tmx) {
        tmx = neonData?.pageContext?.mainPicture?.metadata.softCrops?.Square?.tmx;
    }

    if (tmx) {
        let tokens = tmx.split(' ');
        imageWidth = tokens[tokens.length - 2];
        imageHeight = tokens[tokens.length - 1];
    }

    const justify = styleVariant && styleVariant === 'leftAligned' ? ('left' as const) : ('center' as const);
    const maxWidth = styleVariant && styleVariant === 'leftAligned' ? ('lg' as const) : ('md' as const);

    const render = (
        <Container sx={{ my: 2 }} maxWidth={maxWidth}>
            <Box
                display="flex"
                justifyContent={justify}
                alignItems={justify}
                position="relative"
                height="100%"
                width="100%"
            >
                {mainImageUrl ? <img src={mainImageUrl} alt="" /> : <p>No image available</p>}
            </Box>
        </Container>
    );
    return render;
};

export default MainImageBlock;
