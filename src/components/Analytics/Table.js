import { render } from "react-dom";
import { getTableDataFromContentReport } from "../../lib/ga/ga-reporting-helpers";
import { Chart } from "react-google-charts";


export default function Table({ cobaltData, analyticsReport, topContentPagesReport, dimension1, metric }) {
    const data = getTableDataFromContentReport(cobaltData, analyticsReport, topContentPagesReport, dimension1, metric);
    render = <Chart
        chartType="Table"
        width="100%"
        data={data}
    />

    return render;
}