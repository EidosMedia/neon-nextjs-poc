import { getMainImageUrl } from '@/services/neon-cms/neon-helpers';
import { Box, Container } from '@mui/material';
import Image from 'next/image';

const StoryFragmentMainMedia = ({ data }) => {
    // let mainPictureElement = null;
    // let mainImageUrl = null;
    // let cloudinaryVideo = null;
    // let extraElement = null;

    // console.log('Main image block - neonData', neonData);
    // console.log('neonData.mainImage', neonData.object.helper.mainPicture);

    // try {
    //     console.log(
    //         'mainPictureElement find result',
    //         findElementsInContentJson(['figure'], neonData.object.helper.content)[0]
    //     );

    //     mainPictureElement = findElementsInContentJson(['figure'], neonData.object.helper.content)[0];
    //     extraElement = findElementsInContentJson(['extra'], neonData.object.helper.content);
    //     try {
    //         cloudinaryVideo = extraElement[0].elements.find(el => {
    //             let found = false;
    //             try {
    //                 found = el.attributes['emk-type'] == 'cloudinaryVideo';
    //             } catch (e) {}
    //             return found;
    //         });
    //     } catch (e) {}

    //     mainImageUrl = ResourceResolver(
    //         getImageFormatUrl(getImageUrl(mainPictureElement, 'wide', neonData), 'large'),
    //         neonData.previewData ? neonData.previewData : null,
    //         neonData.siteContext.site
    //     );
    // } catch (e) {
    //     console.log(e);
    // }

    const imageWidth = 1024;
    const imageHeight = 576;

    const mainImageUrl = getMainImageUrl(data);

    console.log('mainImageUrl', mainImageUrl);

    // let mainMediaBlock = null;
    // if (cloudinaryVideo) {
    //     mainMediaBlock = <CloudinaryVideo jsonElement={cloudinaryVideo} />;
    // } else if (mainImageUrl) {
    //     mainMediaBlock = <Image src={mainImageUrl} width={imageWidth} height={imageHeight} alt="" />;
    // }

    return (
        <Container sx={{ my: 2 }}>
            <Box display="flex">
                <Image src={mainImageUrl} width={imageWidth} height={imageHeight} alt="" />
            </Box>
        </Container>
    );
};

export default StoryFragmentMainMedia;
