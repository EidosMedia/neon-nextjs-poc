import { getChartDataFromContentReport } from "../../lib/ga/ga-reporting-helpers";
import { Chart } from "react-google-charts";

export default function BarChart({ analyticsReport, dimension1, dimension2, metric, chartTitle }) {
    const data = getChartDataFromContentReport(analyticsReport, dimension1, dimension2, metric);

    const options = {
        title: chartTitle,
        chartArea: { width: "50%" },
        isStacked: true,
        hAxis: {
            title: metric,
            minValue: 0,
        },
        vAxis: {
            title: dimension1,
        },
    }

    const render = (
        <Chart
            chartType="BarChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
        />
    )
    return render;
}