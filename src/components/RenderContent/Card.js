import { Box } from "@mui/system";
import { cardsConfig } from "../../../cards.config";

export default function Card({ jsonElement, cobaltData }) {
    console.log(jsonElement)
    let render = null
    let img = null;
    try {
        img = cardsConfig[jsonElement.attributes['emk-data-id']].img
    } catch (e) { }
    if (!img) {
        try {
            img = '/static/img/cards/' + jsonElement.attributes['emk-data-id'] + '.png'
        } catch (e) { }
    }
    if (img) {
        render = (
            <Box display="flex"
                justifyContent="center"
                alignItems="center">
                <img src={img} style={{maxWidth:'100%', height:'auto'}}/>
            </Box>
        )
    }
    return render;
}