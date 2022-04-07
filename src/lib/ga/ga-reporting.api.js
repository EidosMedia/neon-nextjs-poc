import { getDwxLinkedObjects } from '../cobalt-cms/cobalt-helpers';

const propertyId = '308647898';
const credentialsJsonPath = './tmp/HeadlessPoC-191facb738e2.json';
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
let gaKey = ''
try {
    gaKey = JSON.parse(process.env.GA_KEY) // WARNING: on Heroku config vars, the GA_KEY MUST be surrounded by double quotes!  Local var must also have single quotes, ie. '"key"'
}catch(e){
    console.log("Error parsing GA key")
    console.log(e)
}
const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: {
        client_email: process.env.GA_ID, // WARNING: on Heroku config vars, the GA_ID must NOT be surrounded by quotes!
        private_key:  gaKey
    }
});

function buildGaRequestSingleContent(contentId) {
    const request = {
        dateRanges: [
            {
                startDate: '7daysAgo',
                endDate: 'today',
            },
        ],
        dimensions: [
            {
                name: 'date',
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
                name: 'screenPageViews',
            },
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
    }
    return request;
}

async function getGaSingleContentReport(contentId) {
    const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        ...buildGaRequestSingleContent(contentId)
    });
    return response;
}

async function getGaMultiContentReport(contentIds) {

    function paginate(array, page_size, page_number) {
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    }

    let reports = []

    let pageIndex = 1
    let page = paginate(contentIds, 5, pageIndex)
    while (page && page.length) {
        const [response] = await analyticsDataClient.batchRunReports({
            property: `properties/${propertyId}`,
            requests: page.map((id) => buildGaRequestSingleContent(id))
        });
        reports = reports.concat(response.reports)
        pageIndex++
        page = paginate(contentIds, 5, pageIndex)
    }
    return reports;
}

async function getGaTopContentPagesReport(hostname) {

    const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
            {
                startDate: '7daysAgo',
                endDate: 'today',
            },
        ],
        dimensions: [
            {
                name: 'date',
            },
            {
                name: 'pageTitle'
            },
            {
                name: 'pagePath'
            },
        ],
        metrics: [
            {
                name: 'screenPageViews',
            },
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
                    metricName: 'screenPageViews',
                },
            }
        ]
    });
    return response;
}

async function getGaRealtimeReport() {

    const [response] = await analyticsDataClient.runRealtimeReport({
        property: `properties/${propertyId}`,
        dimensions: [
            {
                name: 'unifiedScreenName'
            },
        ],
        metrics: [
            {
                name: 'screenPageViews',
            },
        ],
        orderBys: [
            {
                desc: true,
                metric: {
                    metricName: 'screenPageViews',
                },
            }
        ]
    });
    return response;
}

export async function getAnalyticsReport(cobaltData) {
    let report = null;
    switch (cobaltData.object.data.sys.baseType) {
        case 'liveblog':
        case 'article':
            report = await getContentAnalyticsReport(cobaltData);
            break;
        case 'section':
        case 'webpage':
            report = await getPageAnalyticsReport(cobaltData);
            break;
        case 'webpagefragment':
            report = await getSegmentAnalyticsReport(cobaltData);
            break;
    }
    return report;
}

async function getContentAnalyticsReport(cobaltData) {
    const report = await getGaSingleContentReport(cobaltData.object.data.id);
    const realtimeReport = await getGaRealtimeReport();
    return {
        contentReport: {
            gaData: report,
            cobaltData: cobaltData
        },
        realtimeReport
    }
}
async function getSegmentAnalyticsReport(cobaltData) {
    // For a segment, we are retrieving the analytics of all its elements, and compare them with the top pages

    const objects = getDwxLinkedObjects(cobaltData);

    const reports = await getGaMultiContentReport(objects.map((object) => object.object.data.id))

    const linkedObjectsReports = reports.map((report, i) => {
        return {
            gaData: report,
            cobaltData: objects[i]
        }
    })

    const hostName = cobaltData.siteContext.siteStructure.find((site) => site.name === cobaltData.siteContext.site).customAttributes.frontendHostname

    const topPages = await getGaTopContentPagesReport(hostName);
    
    const realtimeReport = await getGaRealtimeReport();

    return {
        contentReport: linkedObjectsReports,
        topContentPagesReport: topPages,
        realtimeReport
    };
}


async function getPageAnalyticsReport(cobaltData) {
    // For pages, we want to query on the full url (including site name)
    let url = null;
    try {
        url = cobaltData.siteContext.siteStructure.find((site) => site.name === cobaltData.siteContext.site).customAttributes.frontendHostname
    } catch (e) { }

    if (url) {
        url = url + cobaltData.pageContext.url
    }

    const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
            {
                startDate: '7daysAgo',
                endDate: 'today',
            },
        ],
        dimensions: [
            {
                name: 'date',
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
            },
        ],
        metrics: [
            {
                name: 'screenPageViews',
            },
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
