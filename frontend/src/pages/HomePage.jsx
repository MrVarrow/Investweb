import { Box, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.100",
        textAlign: "center",
        px: 2,
      }}
    >
      <Box>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Welcome !!!
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          This is a temporary home page. You don’t need to be logged in.
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            component={Link}
            to="/login"
            sx={{ textTransform: "none" }}
          >
            Login
          </Button>

          <Button
            variant="outlined"
            component={Link}
            to="/register"
            sx={{ textTransform: "none" }}
          >
            Register
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}