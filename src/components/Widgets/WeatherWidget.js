import { Box, Card, CardContent, Typography } from '@mui/material';
import Image from 'next/image';
import weatherImage from '../../../public/static/img/weather.png';
import { widgetsConfig } from '../../../widgets.config';

/**
 *
 * @param root0
 * @param root0.neonData
 * @param root0.gridContext
 */
export default function WeatherWidget({ neonData, gridContext }) {
    let render = null;
    if (neonData) {
        let location = null;
        let type = null;
        try {
            location = neonData.linkContext.linkData.parameters.location;
            type = neonData.linkContext.linkData.parameters.type;
        } catch (e) {}

        if (!location) {
            location = widgetsConfig.weather.params.find(param => param.name === 'location').defaultValue;
        }
        if (!type) {
            type = widgetsConfig.weather.params.find(param => param.name === 'type').defaultValue;
        }

        if (location && type) {
            render = (
                <Card square elevation={0}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Image src={weatherImage} height={100} width={100} />
                    </Box>
                    <CardContent
                        sx={{
                            py: 1,
                            px: 0,
                            '&:last-child': { pb: 1 },
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Typography gutterBottom variant="h4" component="div">
                            {location}
                        </Typography>
                    </CardContent>
                </Card>
            );
        }
    }
    return render;
}
