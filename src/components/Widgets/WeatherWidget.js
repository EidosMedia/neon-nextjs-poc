import { Box, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import weatherImage from "../../../public/img/weather.png"

export default function WeatherWidget({ cobaltData, gridContext }) {

    let render = null;
    if (cobaltData) {
        const params = cobaltData.object.data.files.content.data
        const cityParamPos = params.indexOf('/location:') + 10
        const city = params.substring(cityParamPos, params.indexOf('/', cityParamPos))

        render = (
            <Card square elevation={0} >
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Image src={weatherImage} height={100} width={100} />
                </Box>
                <CardContent sx={{ py: 1, px: 0, '&:last-child': { pb: 1 }, display: 'flex', justifyContent: 'center' }}>
                    <Typography gutterBottom variant="h4" component="div">
                        {city}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
    return render;
}