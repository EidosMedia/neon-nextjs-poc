export function findElementsInContentJson(elementNames, json) {
  if (elementNames.includes(json.name)) {
    return [json];
  } else if (json.elements) {
    return json.elements.reduce((acc, elem) => {
      return [...acc, ...findElementsInContentJson(elementNames, elem)];
    }, []);
  } else {
    return [];
  }
}

//jsonElement expected to be a "figure"
export function getImageUrl(jsonElement, imageClass, neonData) {
  let imageUrl = null;
  try {
    imageUrl = jsonElement.elements.find(
      (el) => el.attributes.class === imageClass
    ).attributes.src;
  } catch (e) {}
  if (imageUrl.startsWith("cobalt:") && neonData) {
    // Manage the case in which the URL is not resolved in the XML -> we take it from the model
    let imageId = null;
    try {
      imageId = imageUrl.split(":")[1];
      imageUrl = neonData.pageContext.nodes[imageId].resourceUrl;
    } catch (e) {
      console.log("problem fetching imageUrl of: " + imageId);
      imageUrl = null;
    }
  }
  if (!imageUrl) {
    // fallback
    imageUrl = "/static/img/nothumb.jpeg";
  }
  return imageUrl;
}

export function checkIsCloudinaryVideo(jsonElement) {
  let result = false;
  try {
    result = jsonElement.elements[0].attributes.dtxInsert === "cloudinaryVideo";
  } catch (e) {}
  return result;
}
