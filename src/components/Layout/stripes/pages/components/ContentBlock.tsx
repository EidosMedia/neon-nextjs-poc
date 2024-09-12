import RenderContentElement from '@/components/RenderContent/RenderContentElement';
import { findElementsInContentJson } from 'src/utils/ContentUtil';
import { BlockProps } from '../../ArticlePage/ArticlePage.types';
import logger from 'logger';

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
                jsonElement={findElementsInContentJson(['content'], neonData.object.helper.content)[0]}
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
