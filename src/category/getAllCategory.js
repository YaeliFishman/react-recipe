import { useSelector } from "react-redux";
import { Container, Box, Paper, Typography } from "@mui/material";
export default function GetAllCategory() {

    const category = useSelector(state => state?.category);
    return (
        <Container maxWidth="md">
            <Box mt={3} >
                {category.map((x) => (
                    <Paper key={x.Id} elevation={3} sx={{ textAlign: "center", p: 2, mb: 2, display: "flex", alignItems: "center" }}>
                        <Typography variant="body1">
                            {x.Name}
                        </Typography>
                    </Paper>
                ))
                }
            </Box>
        </Container>
    )
};