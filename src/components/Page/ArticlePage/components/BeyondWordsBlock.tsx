import { Container } from '@mui/material';
import { BlockProps } from '../ArticlePage.types';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.styleVariant
 */
const BeyondWordsBlock: React.FC<BlockProps> = ({ neonData, styleVariant }) => {
    let render = null;
    try {
        if (neonData.object.data.attributes.AudioId) {
            render = (
                <Container sx={{ my: 1 }} maxWidth="md">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: `<iframe allowfullscreen='false' data-src='https://audio.beyondwords.io/e/${neonData.object.data.attributes.AudioId}' frameborder='0' id='speechkit-io-iframe' scrolling='no' ></iframe><script src='https://proxy.beyondwords.io/npm/@beyondwords/audio-player@latest/dist/module/iframe-helper.js' type='text/javascript'></script>`
                        }}
                    />
                </Container>
            );
        }
    } catch (e) {}
    return render;
};

export default BeyondWordsBlock;
