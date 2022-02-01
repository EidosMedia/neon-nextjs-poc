import { Box, Container } from "@mui/material";
import Copyright from "../Furnitures/Copyright";
import MenuDrawer from "./MenuDrawer";

export default function Layout(props) {
    const layout = (
        <Container maxWidth="false">
            <MenuDrawer {...props} />
            
            {props.children}
            
            <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                    <Copyright />
                </Box>
            </Container>
        </Container>
    )
    return layout;
}