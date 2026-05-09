import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Paper,
  InputAdornment,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import bgImage from "../assets/Login_bg_chart.jpg";

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

const API_BASE = "http://localhost:8000/api";

// Dark monochrome theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
      contrastText: "#000000",
    },
    background: {
      paper: "#0d0d0d",
      default: "#000000",
    },
    text: {
      primary: "#ffffff",
      secondary: "#888888",
    },
    divider: "#222222",
  },
  shape: {
    borderRadius: 2,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#111111",
            borderRadius: 4,
            "& fieldset": {
              borderColor: "#2a2a2a",
            },
            "&:hover fieldset": {
              borderColor: "#555555",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ffffff",
              borderWidth: 1,
            },
          },
          "& .MuiInputLabel-root": {
            color: "#666666",
            "&.Mui-focused": {
              color: "#ffffff",
            },
          },
          "& .MuiInputBase-input": {
            color: "#ffffff",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: "#ffffff",
          color: "#000000",
          fontWeight: 700,
          letterSpacing: "0.08em",
          fontSize: "0.875rem",
          "&:hover": {
            backgroundColor: "#e0e0e0",
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
  },
});


const CHART_BG_URL = bgImage;

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.username || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        const msgs = Object.values(data).flat().join(" ");
        setError(msgs || "Login failed. Please check your credentials.");
      } else {
        setSuccess(data.message || "Logged in successfully!");
        // navigate("/dashboard");
      }
    } catch {
      setError("Network error. Make sure your Django server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          px: 2,
          backgroundImage: `url(${CHART_BG_URL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Blur + dark tint overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            backgroundColor: "rgba(0,0,0,0.55)",
          }}
        />

        {/* Card */}
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: 400,
            p: { xs: 3, sm: 4 },
            borderRadius: 2,
            bgcolor: "rgba(10, 10, 10, 0.92)",
            border: "1px solid #1e1e1e",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: "0 8px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 3.5 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                bgcolor: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
                boxShadow: "0 0 24px rgba(255,255,255,0.12)",
              }}
            >
              <LockOutlined sx={{ color: "#000000", fontSize: 22 }} />
            </Box>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{
                color: "#ffffff",
                letterSpacing: "-0.02em",
                fontFamily: "'Georgia', serif",
              }}
            >
              Sign in
            </Typography>
            <Typography variant="body2" sx={{ color: "#555555", mt: 0.5, fontSize: "0.8rem" }}>
              Enter your credentials to continue
            </Typography>
          </Box>

          {/* Alerts */}
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2,
                bgcolor: "rgba(255,23,68,0.08)",
                color: "#ff6b6b",
                border: "1px solid rgba(255,23,68,0.2)",
                "& .MuiAlert-icon": { color: "#ff6b6b" },
              }}
            >
              {error}
            </Alert>
          )}
          {success && (
            <Alert
              severity="success"
              sx={{
                mb: 2,
                bgcolor: "rgba(0,230,118,0.08)",
                color: "#00e676",
                border: "1px solid rgba(0,230,118,0.2)",
                "& .MuiAlert-icon": { color: "#00e676" },
              }}
            >
              {success}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Username"
              name="username"
              value={form.username}
              onChange={handle}
              fullWidth
              autoComplete="username"
              sx={{ mb: 2 }}
            />

            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handle}
              fullWidth
              autoComplete="current-password"
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((s) => !s)}
                      edge="end"
                      aria-label="toggle password visibility"
                      sx={{ color: "#555555", "&:hover": { color: "#ffffff" } }}
                    >
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                borderRadius: 1,
                py: 1.25,
                textTransform: "none",
                fontSize: "0.9rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                transition: "all 0.2s ease",
                "&:not(:disabled):hover": {
                  transform: "translateY(-1px)",
                  boxShadow: "0 6px 24px rgba(255,255,255,0.15)",
                },
              }}
            >
              {loading ? <CircularProgress size={20} sx={{ color: "#000" }} /> : "Sign in"}
            </Button>
          </Box>

          <Divider sx={{ my: 3, borderColor: "#1e1e1e" }} />

          <Typography variant="body2" sx={{ color: "#444444", textAlign: "center", fontSize: "0.8rem" }}>
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#888888",
                fontWeight: 600,
                textDecoration: "none",
                borderBottom: "1px solid #444",
              }}
            >
              Create one
            </Link>
          </Typography>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}