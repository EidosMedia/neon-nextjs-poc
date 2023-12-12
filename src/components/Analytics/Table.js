import { getTableDataFromContentReport } from "../../lib/ga/ga-reporting-helpers";
import { Chart } from "react-google-charts";

export default function Table({
  neonData,
  analyticsReport,
  topContentPagesReport,
  dimension1,
  metric,
}) {
  const data = getTableDataFromContentReport(
    neonData,
    analyticsReport,
    topContentPagesReport,
    dimension1,
    metric
  );
  return <Chart chartType="Table" data={data} />;
}
