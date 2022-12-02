import { Container, Dialog, DialogTitle, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CircleIcon from '@mui/icons-material/Circle';

export default function HelpDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };


    const render = (
        <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="sm">
            <DialogTitle>Help</DialogTitle>
            <Container maxWidth="sm" sx={{p:3}}>
                <Typography variant="body1" component="p">The colors indicate the content's perfomance:</Typography>
                <ul>
                <Typography variant="body1" component="li">on the current website, across <b>all</b> sections</Typography>
                <Typography variant="body1" component="li">during the <b>last 30 minutes</b></Typography>
                </ul>
                <Grid container sx={{my:2}} spacing={1}>
                    <Grid item xs={12}>
                        <Box display="flex">
                            <CircleIcon sx={{ color: "#00ff00", mr:1 }} /><Typography variant="body1" component="p"> Ranked in top 10</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex">
                            <CircleIcon sx={{ color: "#ffff00", mr:1 }} /><Typography variant="body1" component="p"> Ranked between 10 and 20</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex">
                            <CircleIcon sx={{ color: "#ff0000", mr:1 }} /><Typography variant="body1" component="p"> Ranked above 20</Typography>
                        </Box>
                    </Grid>
                </Grid>


            </Container>
        </Dialog>
    );


    return render;
}