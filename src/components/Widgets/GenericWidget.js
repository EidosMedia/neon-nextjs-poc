import FootballUclWidget from "./FootballUclWidget";
import WeatherWidget from "./WeatherWidget";

export default function GenericWidget({ cobaltData, gridContext }){
    let render = null;
    render = <FootballUclWidget cobaltData={cobaltData} gridContext={gridContext}/>
    return render
}