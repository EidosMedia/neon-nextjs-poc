import WeatherWidget from "./WeatherWidget";

export default function GenericWidget({ cobaltData, gridContext }){
    let render = null;
    render = <WeatherWidget cobaltData={cobaltData} gridContext={gridContext}/>
    return render
}