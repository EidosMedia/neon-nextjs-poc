import { isArray } from 'lodash';
import logger from 'logger';

/**
 *
 * @param elementNames
 * @param json
 */
export function findElementsInContentJson(elementNames, json) {
    if ((isArray(elementNames) && elementNames.includes(json?.nodeType)) || elementNames === json?.nodeType) {
        return [json];
    }
    if (json?.elements) {
        return json.elements.reduce((acc, elem) => [...acc, ...findElementsInContentJson(elementNames, elem)], []);
    }
    return [];
}

export const findElementText = jsonElement => {
    return findElementsInContentJson('plainText', jsonElement)[0]?.value;
};

// jsonElement expected to be a "figure"
/**
 *
 * @param jsonElement
 * @param imageClass
 * @param neonData
 */
export function getImageUrl(jsonElement, imageClass, neonData) {
    let imageUrl = null;
    try {
        imageUrl = jsonElement.elements.find(el => el.attributes.softCrop === imageClass).attributes.src;
    } catch (e) {
        logger.error('cannot find url with for imageClass ' + imageClass);
    }

    if (!imageUrl) {
        return '/static/img/nothumb.jpeg';
    }

    if (imageUrl.startsWith('cobalt:') && neonData) {
        // Manage the case in which the URL is not resolved in the XML -> we take it from the model
        let imageId = null;
        try {
            imageId = imageUrl.split(':')[1];
            imageUrl = neonData.pageContext.nodes[imageId].resourceUrl;
        } catch (e) {
            logger.error(`problem fetching imageUrl of: ${imageId}`);
            imageUrl = null;
        }
    }

    logger.debug('imageUrl ' + imageUrl);
    return imageUrl;
}

/**
 *
 * @param jsonElement
 */
export function checkIsCloudinaryVideo(jsonElement) {
    let result = false;
    try {
        result = jsonElement.elements[0].attributes.dtxInsert === 'cloudinaryVideo';
    } catch (e) {}
    return result;
}
