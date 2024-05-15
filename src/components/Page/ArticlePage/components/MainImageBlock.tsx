import { findElementsInContentJson, getImageUrl } from 'src/utils/ContentUtil';
import { BlockProps } from '../ArticlePage.types';
import { CloudinaryVideo } from '@/components/RenderContent/RenderContentElement';
import Image from 'next/image';
import ResourceResolver from 'src/utils/ResourceResolver';
import { getImageFormatUrl, getMainImageUrl } from '@/services/neon-cms/neon-helpers';
import { Box, Container } from '@mui/material';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.styleVariant
 */
const MainImageBlock: React.FC<BlockProps> = ({ neonData, styleVariant }) => {
    // console.log('neonData main picture', neonData.object.helper.mainPicture);
    const imageWidth = 1024;
    const imageHeight = 576;

    const mainImageUrl = getMainImageUrl(neonData);

    // console.log('mainImageUrl', mainImageUrl);

    // let mainMediaBlock = null;
    // if (cloudinaryVideo) {
    //     mainMediaBlock = <CloudinaryVideo jsonElement={cloudinaryVideo} />;
    // } else if (mainImageUrl) {
    //     mainMediaBlock = <Image src={mainImageUrl} width={imageWidth} height={imageHeight} alt="" />;
    // }

    const justify = styleVariant && styleVariant === 'leftAligned' ? ('left' as const) : ('center' as const);
    const maxWidth = styleVariant && styleVariant === 'leftAligned' ? ('lg' as const) : ('md' as const);

    const render = (
        <Container sx={{ my: 2 }} maxWidth={maxWidth}>
            <Box display="flex" justifyContent={justify} alignItems={justify}>
                <Image src={mainImageUrl} width={imageWidth} height={imageHeight} alt="" priority={true} />
            </Box>
        </Container>
    );
    return render;
};

export default MainImageBlock;
