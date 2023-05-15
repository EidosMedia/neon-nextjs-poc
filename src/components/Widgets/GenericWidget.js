import { BreakfastDiningSharp } from "@mui/icons-material";
import FootballUclWidget from "./FootballUclWidget";
import MarketsWidget from "./MarketsWidget";
import SmartQueryWidget from "./SmartQueryWidget";
import WeatherWidget from "./WeatherWidget";

export default function GenericWidget({ cobaltData, gridContext }){
    let render = null;
    switch(cobaltData.object.data.title){
        case 'markets':
            render = <MarketsWidget cobaltData={cobaltData} gridContext={gridContext}/>;
            break;
        case 'champions-league':
            render = <FootballUclWidget cobaltData={cobaltData} gridContext={gridContext}/>;
            break;
        case 'weather-widget':
            render = <WeatherWidget cobaltData={cobaltData} gridContext={gridContext}/>;
            break;
        case 'smart-query':
            render = <SmartQueryWidget cobaltData={cobaltData} gridContext={gridContext}/>;
            break;
    }
    return render
}