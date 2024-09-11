export const getStoryUrl = neonData => {
    let myUrl = '/';
    try {
        myUrl = neonData.object.data.url;
        if (!myUrl) {
            myUrl = neonData.pageContext.nodesUrls[neonData.object.data.id];
        }
    } catch (e) {}
    return myUrl;
};
