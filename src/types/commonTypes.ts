export type NeonDataObject = {
    data: {
        id: string;
        title: string;
        sys: {
            baseType: string;
            type: string;
        };
        pubInfo: {
            publicationTime: string;
            visible: false;
        };
        attributes: Record<string, string>;
        children: string[];
        url: string;
        dataType: string;
    };
    helper: {
        content?: any[];
        mainPicture?: any[];
    };
};

export type SiteNode = {
    nodeType: string;
    id: string;
    name: string;
    title: string;
    uri: string;
    items: SiteNode[];
    status: string;
    commentsEnabled: boolean;
    attributes: Record<string, string>;
    type: string;
    path: string;
    staticAttributes: { status: string; categories: [] };
    hostname: string;
    apiHostnames: {
        liveHostname: string;
        stageHostname: string;
        previewHostname: string;
    };
    root: SiteNode;
};

export type SiteStructure = [
    {
        root: SiteNode;
        providersBlackList: string[];
        hostname: string;
        type: 'headless';
        path: string;
        nodes: Record<string, SiteNode>;
        apiHostnames: {
            liveHostname: string;
            stageHostname: string;
            previewHostname: string;
        };
        sitemap: SiteStructure;
    }
];

export type NeonPageNode = {
    id: string;
    title: string;
    summary: string;
    sys: {
        baseType: string;
        type: string;
    };
    pubInfo: {
        publicationTime: string;
        visible: true;
    };
    attributes: {};
    files: {
        content: {
            fileName: string;
            mimeType: string;
            updatedBy: { userId: string };
            updateTime: string;
            size: number;
            data: string;
        };
    };
    links: {
        hyperlink: {
            image: [{ targetId: string }, { targetId: string }];
        };
        system: {
            mainPicture: [{ targetId: string }];
        };
    };
    url: string;
    resourceUrl: string;
    picture: string;
    dataType: string;
};

export type NeonData = {
    object: NeonDataObject;
    linkContext: null;
    pageContext: {
        url: string;
        nodes: Record<string, NeonPageNode>;
        resourcesUrls: Record<string, string>;
        nodesUrls: Record<string, string>;
        children: string[];
    };
    siteContext: {
        site: string;
        siteStructure: SiteStructure;
    };
};

export type GenericPageProps = {
    neonData: NeonData;
    pageTitle?: string;
    fallback?: any;
};
