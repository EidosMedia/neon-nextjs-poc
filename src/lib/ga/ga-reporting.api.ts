import { getCurrentLiveSite, getDwxLinkedObjects, getLiveHostname } from '../neon-cms/neon-helpers';
import cacheData from 'memory-cache';
import {
    COMMON_GA_CACHE_ENABLED,
    COMMON_GA_CONTENT_CACHE_TTL_SECONDS,
    COMMON_GA_REALTIME_CACHE_TTL_SECONDS
} from '../../../apps.settings';

const propertyId = '308647898';
const credentialsJsonPath = './tmp/HeadlessPoC-191facb738e2.json';
const { BetaAnalyticsDataClient } = require('@google-analytics/data');

let gaKey = '';
try {
    gaKey = JSON.parse(process.env.GA_KEY); // WARNING: on Heroku config vars, the GA_KEY MUST be surrounded by double quotes!  Local var must also have single quotes, ie. '"key"'
} catch (e) {
    console.log('Error parsing GA key');
    console.log(e);
}
const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: {
        client_email: process.env.GA_ID, // WARNING: on Heroku config vars, the GA_ID must NOT be surrounded by quotes!
        private_key: gaKey
    }
});

/**
 *
 * @param contentId
 */
function buildGaRequestSingleContent(contentId) {
    const request = {
        dateRanges: [
            {
                startDate: '7daysAgo',
                endDate: 'today'
            }
        ],
        dimensions: [
            {
                name: 'date'
            },
            {
                name: 'hostName'
            },
            {
                name: 'deviceCategory'
            },
            {
                name: 'city'
            },
            {
                name: 'pagePath'
            }
        ],
        metrics: [
            {
                name: 'screenPageViews'
            }
        ],
        dimensionFilter: {
            filter: {
                fieldName: 'pagePath',
                stringFilter: {
                    matchType: 'CONTAINS',
                    value: contentId
                }
            }
        },
        orderBys: [
            {
                desc: true,
                dimension: {
                    dimensionName: 'date'
                }
            }
        ]
    };
    return request;
}

/**
 *
 * @param contentId
 */
async function getGaSingleContentReport(contentId) {
    const cacheKey = `ga-content-${contentId}`;

    let data = null;
    data = cacheData.get(cacheKey);
    if (data) {
        console.log(`returning cached GA report for ${contentId}`);
        return data;
    }
    const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        ...buildGaRequestSingleContent(contentId)
    });

    if (COMMON_GA_CACHE_ENABLED) {
        cacheData.put(cacheKey, response, COMMON_GA_CONTENT_CACHE_TTL_SECONDS * 1000);
    }
    return response;
}

/**
 *
 * @param contentIds
 */
async function getGaMultiContentReport(contentIds) {
    /**
     *
     * @param array
     * @param page_size
     * @param page_number
     */
    function paginate(array, page_size, page_number) {
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    }

    const reports = {};

    // Checking if some reports are in cache

    let cacheKey = null;
    for (let i = contentIds.length - 1; i >= 0; i--) {
        // Why reverse loop? --> https://stackoverflow.com/questions/9882284/looping-through-array-and-removing-items-without-breaking-for-loop
        cacheKey = `ga-content-${contentIds[i]}`;
        const data = cacheData.get(cacheKey);
        if (data) {
            console.log(`returning cached GA report for ${contentIds[i]}`);
            reports[contentIds[i]] = data;
            contentIds.splice(i, 1);
        }
    }

    let pageIndex = 1;
    let page = paginate(contentIds, 5, pageIndex);
    while (page && page.length) {
        const [response] = await analyticsDataClient.batchRunReports({
            property: `properties/${propertyId}`,
            requests: page.map(id => buildGaRequestSingleContent(id))
        });

        response.reports.forEach((report, i) => {
            cacheKey = `ga-content-${page[i]}`;
            if (COMMON_GA_CACHE_ENABLED) {
                cacheData.put(cacheKey, report, COMMON_GA_CONTENT_CACHE_TTL_SECONDS * 1000);
            }
            reports[page[i]] = report;
        });

        pageIndex++;
        page = paginate(contentIds, 5, pageIndex);
    }
    return reports;
}

/**
 *
 * @param hostname
 */
async function getGaTopContentPagesReport(hostname) {
    const cacheKey = `ga-toppages-${hostname}`;

    let data = null;
    data = cacheData.get(cacheKey);
    if (data) {
        console.log(`returning cached GA top pages report for ${hostname}`);
        return data;
    }
    const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
            {
                startDate: '7daysAgo',
                endDate: 'today'
            }
        ],
        dimensions: [
            {
                name: 'date'
            },
            {
                name: 'pageTitle'
            },
            {
                name: 'pagePath'
            }
        ],
        metrics: [
            {
                name: 'screenPageViews'
            }
        ],
        dimensionFilter: {
            andGroup: {
                expressions: [
                    {
                        filter: {
                            fieldName: 'hostName',
                            stringFilter: {
                                matchType: 'EXACT',
                                value: hostname
                            }
                        }
                    },
                    {
                        filter: {
                            fieldName: 'pagePath',
                            stringFilter: {
                                matchType: 'CONTAINS',
                                value: '/index.html'
                            }
                        }
                    }
                ]
            }
        },
        orderBys: [
            {
                desc: true,
                metric: {
                    metricName: 'screenPageViews'
                }
            }
        ]
    });
    if (COMMON_GA_CACHE_ENABLED) {
        cacheData.put(cacheKey, response, COMMON_GA_CONTENT_CACHE_TTL_SECONDS * 1000);
    }
    return response;
}

/**
 *
 */
async function getGaRealtimeReport() {
    const cacheKey = 'ga-realtime';

    let data = null;
    data = cacheData.get(cacheKey);
    if (data) {
        console.log('returning cached GA realtime report');
        return data;
    }
    const [response] = await analyticsDataClient.runRealtimeReport({
        property: `properties/${propertyId}`,
        dimensions: [
            {
                name: 'unifiedScreenName'
            }
        ],
        metrics: [
            {
                name: 'screenPageViews'
            }
        ],
        orderBys: [
            {
                desc: true,
                metric: {
                    metricName: 'screenPageViews'
                }
            }
        ]
    });
    if (COMMON_GA_CACHE_ENABLED) {
        cacheData.put(cacheKey, response, COMMON_GA_REALTIME_CACHE_TTL_SECONDS * 1000);
    }
    return response;
}

/**
 *
 * @param neonData
 */
export async function getAnalyticsReport(neonData) {
    let report = null;
    switch (neonData.object.data.sys.baseType) {
        case 'liveblog':
        case 'article':
            report = await getContentAnalyticsReport(neonData);
            break;
        case 'section':
        case 'webpage':
            report = await getLandingPageAnalyticsReport(neonData);
            break;
        case 'webpagefragment':
            report = await getSegmentAnalyticsReport(neonData);
            break;
    }
    return report;
}

/**
 *
 * @param neonData
 */
async function getContentAnalyticsReport(neonData) {
    const report = await getGaSingleContentReport(neonData.object.data.id);
    const realtimeReport = await getGaRealtimeReport();
    return {
        contentReport: {
            gaData: report,
            neonData
        },
        realtimeReport
    };
}
/**
 *
 * @param neonData
 */
async function getSegmentAnalyticsReport(neonData) {
    // For a segment, we are retrieving the analytics of all its elements, and compare them with the top pages

    const objects = getDwxLinkedObjects(neonData);

    const reports = await getGaMultiContentReport(objects.map(object => object.object.data.id));

    const linkedObjectsReports = [];

    for (const key in reports) {
        linkedObjectsReports.push({
            gaData: reports[key],
            neonData: objects.find(object => object.object.data.id === key)
        });
    }

    const hostName = getLiveHostname(
        neonData.siteContext.siteStructure?.find(site => site.name === getCurrentLiveSite(neonData))
    );

    const topPages = await getGaTopContentPagesReport(hostName);

    const realtimeReport = await getGaRealtimeReport();

    return {
        contentReport: linkedObjectsReports,
        topContentPagesReport: topPages,
        realtimeReport
    };
}

/**
 *
 * @param neonData
 */
async function getLandingPageAnalyticsReport(neonData) {
    const linkedObjectsReports = [];

    const segments = getDwxLinkedObjects(neonData);

    // For performance reasons, we're not including the content reports

    // for (let i = 0; i < segments.length; i++){
    //     const objects = getDwxLinkedObjects(segments[i]);

    //     const reports = await getGaMultiContentReport(objects.map((object) => object.object.data.id))

    //     for(const key in reports){
    //         linkedObjectsReports.push(
    //             {
    //                 gaData: reports[key],
    //                 neonData: objects.find((object) => object.object.data.id === key)
    //             }
    //         )
    //     }
    // }

    const hostName = getLiveHostname(
        neonData.siteContext.siteStructure?.find(site => site.name === getCurrentLiveSite(neonData))
    );

    const topPages = await getGaTopContentPagesReport(hostName);

    const realtimeReport = await getGaRealtimeReport();

    return {
        contentReport: linkedObjectsReports,
        topContentPagesReport: topPages,
        realtimeReport
    };
}

/**
 *
 * @param neonData
 */
async function getPageAnalyticsReport(neonData) {
    // For pages, we want to query on the full url (including site name)
    let url = null;
    try {
        url = getLiveHostname(
            neonData.siteContext.siteStructure?.find(site => site.name === getCurrentLiveSite(neonData))
        );
    } catch (e) {}

    if (url) {
        url += neonData.pageContext.url;
    }

    const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
            {
                startDate: '7daysAgo',
                endDate: 'today'
            }
        ],
        dimensions: [
            {
                name: 'date'
            },
            {
                name: 'fullPageUrl'
            },
            {
                name: 'hostName'
            },
            {
                name: 'deviceCategory'
            },
            {
                name: 'city'
            }
        ],
        metrics: [
            {
                name: 'screenPageViews'
            }
        ],
        dimensionFilter: {
            filter: {
                fieldName: 'fullPageUrl',
                stringFilter: {
                    matchType: 'EXACT',
                    value: url
                }
            }
        }
    });

    return response;
}

// const [response] = await analyticsDataClient.runRealtimeReport({
//     property: `properties/${propertyId}`,
//     dimensions: [
//         {
//             name: 'unifiedScreenName',
//         },
//     ],
//     metrics: [
//         {
//             name: 'screenPageViews',
//         },
//     ],
//     orderBys: [
//         {
//             desc: true,
//             metric: {
//                 metricName: 'screenPageViews',
//             },
//         }
//     ]
// });

// [END analyticsdata_json_credentials_run_report]
