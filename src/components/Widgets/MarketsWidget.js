import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import { widgetsConfig } from "../../../widgets.config";
 
export default function MarketsWidget({ cobaltData, gridContext }) {
    let render = null;
    if (cobaltData) {
        let type = null;
        let display = null;
        try {
            type = cobaltData.linkContext.linkData.parameters.type;
            display = cobaltData.linkContext.linkData.parameters.display;
        } catch (e) { }

        if (!type) {
            type = widgetsConfig.markets.params.find((param) => param.name === 'type').defaultValue
        }
        if (!display) {
            display = widgetsConfig.markets.params.find((param) => param.name === 'display').defaultValue
        }

        if (type && display) {
            render = (
                <Container sx={{ my: 2, p:2, backgroundColor: 'grey.300'}} maxWidth="lg">
                    <Box sx={{display: 'flex', justifyContent:'flex-start', alignItems:'center'}}>
                        <Typography sx={{mx:3}} variant="h4">Test</Typography>
                        <Typography sx={{mx:3}} variant="h4">Test</Typography>
                        <Typography sx={{mx:3}} variant="h4">Test</Typography>
                    </Box>
                </Container>
            )
        }
    }
    return render;
}