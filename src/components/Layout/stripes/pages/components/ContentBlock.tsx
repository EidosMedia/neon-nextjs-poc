import RenderContentElement from '@/components/RenderContent/RenderContentElement';
import { findElementsInContentJson } from 'src/utils/ContentUtil';
import logger from 'logger';
import { BlockProps } from '@/components/Page/ArticlePage/ArticlePage.types';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.styleVariant
 */
const ContentBlock: React.FC<BlockProps> = ({ neonData, styleVariant }) => {
    let content = null;
    try {
        content = (
            <RenderContentElement
                jsonElement={findElementsInContentJson(['text'], neonData.object.helper.content)[0]}
                renderMode="styled"
                neonData={neonData}
            />
        );
    } catch (e) {
        logger.error(e);
    }

    return content;
};

export default ContentBlock;
