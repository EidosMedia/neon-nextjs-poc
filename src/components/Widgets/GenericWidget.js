import FootballUclWidget from "./FootballUclWidget";
import MarketsWidget from "./MarketsWidget";
import WeatherWidget from "./WeatherWidget";

export default function GenericWidget({ cobaltData, gridContext }){
    let render = null;
    render = <MarketsWidget cobaltData={cobaltData} gridContext={gridContext}/>
    return render
}