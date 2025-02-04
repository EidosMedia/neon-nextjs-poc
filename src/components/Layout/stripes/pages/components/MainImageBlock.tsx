import Image from 'next/image';
import { getMainImageUrl } from '@/services/neon-cms/neon-helpers';
import { Box, Container } from '@mui/material';
import { BlockProps } from '@/components/Page/ArticlePage/ArticlePage.types';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.styleVariant
 */
const MainImageBlock: React.FC<BlockProps> = ({ neonData, styleVariant }) => {
    // logger.info('neonData main picture', neonData.object.helper.mainPicture);
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
            <Box display="flex" justifyContent={justify} alignItems={justify} position="relative" height={400}>
                {mainImageUrl ? <Image src={mainImageUrl} fill alt="" priority={true} /> : <p>No image available</p>}
            </Box>
        </Container>
    );
    return render;
};

export default MainImageBlock;
