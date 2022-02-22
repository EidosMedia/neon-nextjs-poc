export const widgetsConfig = {
    weather: {
        params: [
            {
                name: 'location',
                acceptedValues: ['Milan','Paris','London','Madrid'],
                defaultValue: 'Milan'
            },
            {
                name: 'type',
                acceptedValues: ['Today','Weekly'],
                defaultValue: 'Today'
            }
        ]
    }
}