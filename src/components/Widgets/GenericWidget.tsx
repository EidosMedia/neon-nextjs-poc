import FootballUclWidget from './FootballUclWidget';
import MarketsWidget from './MarketsWidget';
import SmartQueryWidget from './SmartQueryWidget';
import WeatherWidget from './WeatherWidget';
import { GenericPageProps } from 'src/types/commonTypes';

type GenericWidgetProps = GenericPageProps & {
    gridContext?: any;
};

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.semanticSearchData
 * @param root0.gridContext
 */
const GenericWidget: React.FC<GenericWidgetProps> = ({ neonData, semanticSearchData, gridContext }) => {
    let render = null;
    switch (neonData.object.data.title) {
        case 'markets':
            render = <MarketsWidget neonData={neonData} gridContext={gridContext} />;
            break;
        case 'champions-league':
            render = <FootballUclWidget neonData={neonData} gridContext={gridContext} />;
            break;
        case 'weather-widget':
            render = <WeatherWidget neonData={neonData} gridContext={gridContext} />;
            break;
        case 'smart-query':
            render = (
                <SmartQueryWidget
                    neonData={neonData}
                    semanticSearchData={semanticSearchData}
                    gridContext={gridContext}
                />
            );
            break;
    }
    return render;
};

export default GenericWidget;
