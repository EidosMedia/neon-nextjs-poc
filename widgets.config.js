export const widgetsConfig = {
    weather: {
        params: [
            {
                name: 'location',
                acceptedValues: ['Milan', 'Paris', 'London', 'Madrid'],
                defaultValue: 'Milan'
            },
            {
                name: 'type',
                acceptedValues: ['Today', 'Weekly'],
                defaultValue: 'Today'
            }
        ]
    },
    ucl: {
        params: [
            {
                name: 'match',
                acceptedValues: ['Liverpool-Inter', 'Bayern-Salzburg', 'Madrid-Paris', 'ManCity-SportingCP'],
                defaultValue: 'Liverpool-Inter'
            },
            {
                name: 'type',
                acceptedValues: ['Simple', 'Detailed'],
                defaultValue: 'Simple'
            }
        ]
    },
    markets: {
        params: [
            {
                name: 'type',
                acceptedValues: ['indexes', 'top-gainers', 'top-losers', 'bonds', 'currencies'],
                defaultValue: 'indexes'
            },
            {
                name: 'display',
                acceptedValues: ['simple', 'detailed'],
                defaultValue: 'simple'
            }
        ]
    },
    "smart-query":{
        params: [
            {
                name: 'topic',
                displayName: "Topic"
            },
            {
                name: "semanticDeduplication",
                displayName: "Variety",
                acceptedValues: ['high','medium','low'],
                defaultValue: 'low'
            }
        ]
    }
}