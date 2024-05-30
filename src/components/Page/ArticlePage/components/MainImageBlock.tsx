import { BlockProps } from '../ArticlePage.types';
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
    // console.log('neonData main picture', neonData.object.helper.mainPicture);
    let imageWidth = 1024;
    let imageHeight = 576;

    const mainImageUrl = getMainImageUrl(neonData);

    let tmx = neonData?.pageContext?.mainPicture?.metadata.softCrops?.Wide?.tmx;
    if( tmx === undefined)
        tmx = neonData?.pageContext?.mainPicture?.metadata.softCrops?.Square?.tmx

    if(tmx !== undefined) {
        let tokens = tmx.split(' ');
        imageWidth = tokens[tokens.length - 2];
        imageHeight = tokens[tokens.length - 1];
    }

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
