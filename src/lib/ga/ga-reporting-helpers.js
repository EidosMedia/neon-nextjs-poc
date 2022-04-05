export function getChartDataFromContentReport(analyticsReport, dimension1, dimension2, metric){
    
   
    // getting the index of the dimensions & metrics columns
    const dimension1Index = analyticsReport.dimensionHeaders.findIndex((header) => header.name === dimension1)
    const dimension2Index = analyticsReport.dimensionHeaders.findIndex((header) => header.name === dimension2)

    const metricIndex = analyticsReport.metricHeaders.findIndex((header) => header.name == metric)

    // getting the list of available dimension1 values from analytics report

    const dimension1Values = analyticsReport.rows.reduce((acc, row, i) => {
        const dimension1Value = row.dimensionValues[dimension1Index].value
        if (!acc.includes(dimension1Value)) {
            return [...acc, dimension1Value]
        } else {
            return [...acc]
        }
    }, [])

    // getting the list of available dimensione2 values from analytics report

    const dimension2Values = analyticsReport.rows.reduce((acc,row,i) => {
        const dimension2Value = row.dimensionValues[dimension2Index].value
        if (!acc.includes(dimension2Value)) {
            return [...acc, dimension2Value]
        } else {
            return [...acc]
        }
    }, [])

    let data = []
    // setting the table headlers
    data.push([dimension1, ...dimension2Values])


    // aggregate the dimension2 data for each dimension1 value in one single row (set to null if site not present)

    const rowData = dimension1Values.reduce((acc, dimension1Value, i) => {
        const reportRowsForDimension1 = analyticsReport.rows.filter((row) => row.dimensionValues[dimension1Index].value === dimension1Value)
        let row = []
        row[0] = dimension1Value;
        // aggregating the dimension2 values
        dimension2Values.forEach((dimension2Value, hi) => {
            const reportsForDimensions1and2 = reportRowsForDimension1.filter((r) => r.dimensionValues[dimension2Index].value === dimension2Value)
            if (reportsForDimensions1and2) {
                const dimension1and2AggregateValue = reportsForDimensions1and2.reduce((acc,report) => acc + parseInt(report.metricValues[metricIndex].value), 0)
                row[hi + 1] = parseInt(dimension1and2AggregateValue)
            } else {
                row[hi + 1] = 0
            }
        })
        return [...acc, row]
    }, [])
    data = [...data, ...rowData]
    return data
}

export function getTableDataFromContentReport(cobaltData, contentReport, topContentPagesReport, dimension1, metric){
     // getting the index of the dimensions & metrics columns
     const contentDimension1Index = contentReport.dimensionHeaders.findIndex((header) => header.name === dimension1)
     const topPagesDimension1Index = topContentPagesReport.dimensionHeaders.findIndex((header) => header.name === dimension1)
 
     const contentMetricIndex = contentReport.metricHeaders.findIndex((header) => header.name == metric)

     // getting the pagePath value (to link between content and topPages reports)

     const topPagesPagePathIndex = topContentPagesReport.dimensionHeaders.findIndex((header) => header.name === 'pagePath')
 
     // getting the list of available dimension1 values from content report
 
     const dimension1Values = contentReport.rows.reduce((acc, row, i) => {
         const dimension1Value = row.dimensionValues[contentDimension1Index].value
         if (!acc.includes(dimension1Value)) {
             return [...acc, dimension1Value]
         } else {
             return [...acc]
         }
     }, [])
  
     let data = []
     // setting the table headlers
     data.push([dimension1, metric, 'rank'])
  
     const rowData = dimension1Values.reduce((acc, dimension1Value, i) => {
         const contentRowsForDimension1 = contentReport.rows.filter((row) => row.dimensionValues[contentDimension1Index].value === dimension1Value)
         const topPageRowsForDimension1 = topContentPagesReport.rows.filter((row) => row.dimensionValues[topPagesDimension1Index].value === dimension1Value)
         
         let row = []
         row[0] = dimension1Value;
         if(contentRowsForDimension1){
            row[1] = contentRowsForDimension1.reduce((acc,report) => acc + parseInt(report.metricValues[contentMetricIndex].value),0)    
         } else {
             row[1] = 0
         }
         if(topPageRowsForDimension1){
             const rank = topPageRowsForDimension1.findIndex((row) => row.dimensionValues[topPagesPagePathIndex].value.includes(cobaltData.object.data.id))
             row[2] = (rank > 0?rank:0)
         } else {
             row[2] = 0
         }
         return [...acc, row]
     }, [])
     data = [...data, ...rowData]
     return data
}