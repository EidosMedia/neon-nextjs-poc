import Image from 'next/image';
import { getImageUrl } from '@/services/neon-cms/neon-helpers';
import { Box, Container } from '@mui/material';

type InlineImageProps = {
    jsonElement: any;
    styleVariant?: string;
};

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.styleVariant
 */
const InlineImageBlock: React.FC<InlineImageProps> = ({ jsonElement, styleVariant }) => {
    // logger.info('neonData main picture', neonData.object.helper.mainPicture);
    let imageWidth = 1200;
    let imageHeight = 675;

    const image = jsonElement.elements.find(item => item.attributes.softCrop === 'Square');

    const imageUrl = getImageUrl(image?.attributes.src);

    const tmx = image?.attributes.tmx;

    if (tmx) {
        let tokens = tmx.split(' ');
        imageWidth = tokens[tokens.length - 2];
        imageHeight = tokens[tokens.length - 1];
    }

    const justify = styleVariant && styleVariant === 'leftAligned' ? ('left' as const) : ('center' as const);
    const maxWidth = styleVariant && styleVariant === 'leftAligned' ? ('lg' as const) : ('md' as const);

    const render = (
        <Container sx={{ my: 2 }} maxWidth={maxWidth}>
            <Box display="flex" justifyContent={justify} alignItems={justify}>
                {imageUrl ? (
                    <Image src={imageUrl} width={imageWidth} height={imageHeight} alt="" priority={true} />
                ) : (
                    <p>No image available</p>
                )}
            </Box>
        </Container>
    );
    return render;
};

export default InlineImageBlock;
