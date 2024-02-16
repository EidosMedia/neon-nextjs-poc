import { getTableDataFromContentReport } from '../../lib/ga/ga-reporting-helpers';
import { Chart } from 'react-google-charts';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.analyticsReport
 * @param root0.topContentPagesReport
 * @param root0.dimension1
 * @param root0.metric
 */
export default function Table({ neonData, analyticsReport, topContentPagesReport, dimension1, metric }) {
    const data = getTableDataFromContentReport(neonData, analyticsReport, topContentPagesReport, dimension1, metric);
    return <Chart chartType="Table" data={data} />;
}
