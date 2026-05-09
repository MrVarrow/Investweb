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
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff, PersonAddOutlined } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import bgImage from "../assets/Login_bg_chart.jpg";

const API_BASE = "http://localhost:8000/api";

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

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
  shape: { borderRadius: 2 },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#111111",
            borderRadius: 4,
            "& fieldset": { borderColor: "#2a2a2a" },
            "&:hover fieldset": { borderColor: "#555555" },
            "&.Mui-focused fieldset": { borderColor: "#ffffff", borderWidth: 1 },
          },
          "& .MuiInputLabel-root": {
            color: "#666666",
            "&.Mui-focused": { color: "#ffffff" },
          },
          "& .MuiInputBase-input": { color: "#ffffff" },

          "& .MuiSelect-icon": { color: "#666666" },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: "#111111",
          color: "#ffffff",
          "&:hover": { backgroundColor: "#1e1e1e" },
          "&.Mui-selected": { backgroundColor: "#222222" },
          "&.Mui-selected:hover": { backgroundColor: "#2a2a2a" },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#111111",
          border: "1px solid #2a2a2a",
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
          "&:hover": { backgroundColor: "#e0e0e0" },
        },
      },
    },
    MuiAlert: {
      styleOverrides: { root: { borderRadius: 4 } },
    },
    // DatePicker popover dark styling
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          "&.Mui-selected": { backgroundColor: "#ffffff", color: "#000000" },
        },
      },
    },
  },
});

const CHART_BG_URL = bgImage;

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    date_of_birth: null,
    gender: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const required = ["username", "email", "password", "password2", "first_name", "last_name", "date_of_birth", "gender"];
    if (required.some((k) => !form[k])) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password !== form.password2) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        username: form.username,
        email: form.email,
        password: form.password,
        first_name: form.first_name,
        last_name: form.last_name,
        gender: form.gender,
        date_of_birth: form.date_of_birth ? form.date_of_birth.format("YYYY-MM-DD") : "",
      };

      const res = await fetch(`${API_BASE}/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        const msgs = Object.values(data).flat().join(" ");
        setError(msgs || "Registration failed. Please try again.");
      } else {
        setSuccess(data.message || "Account created! Redirecting to login…");
        setTimeout(() => navigate("/login"), 1800);
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
          py: 4,
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
          <Box sx={{ textAlign: "center", mb: 3 }}>
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
              <PersonAddOutlined sx={{ color: "#000000", fontSize: 22 }} />
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
              Create account
            </Typography>
            <Typography variant="body2" sx={{ color: "#555555", mt: 0.5, fontSize: "0.8rem" }}>
              Fill in your details to get started
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
              sx={{ mb: 2 }}
            />

            <TextField
              label="First name"
              name="first_name"
              value={form.first_name}
              onChange={handle}
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              label="Last name"
              name="last_name"
              value={form.last_name}
              onChange={handle}
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handle}
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handle}
              fullWidth
              sx={{ mb: 2 }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((p) => !p)}
                        edge="end"
                        sx={{ color: "#555555", "&:hover": { color: "#ffffff" } }}
                      >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Confirm password"
              name="password2"
              type={showPassword2 ? "text" : "password"}
              value={form.password2}
              onChange={handle}
              fullWidth
              sx={{ mb: 2 }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword2((p) => !p)}
                        edge="end"
                        sx={{ color: "#555555", "&:hover": { color: "#ffffff" } }}
                      >
                        {showPassword2 ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of birth"
                value={form.date_of_birth}
                onChange={(newValue) => setForm({ ...form, date_of_birth: newValue })}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: { mb: 2 },
                  },
                  openPickerIcon: {
                    sx: { color: "#666666" },
                  },
                }}
              />
            </LocalizationProvider>

            <TextField
              label="Gender"
              name="gender"
              select
              value={form.gender}
              onChange={handle}
              fullWidth
              sx={{ mb: 2 }}
            >
              {GENDER_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                mt: 1,
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
              {loading ? <CircularProgress size={20} sx={{ color: "#000" }} /> : "Create account"}
            </Button>
          </Box>

          <Divider sx={{ my: 3, borderColor: "#1e1e1e" }} />

          <Typography variant="body2" sx={{ color: "#444444", textAlign: "center", fontSize: "0.8rem" }}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#888888",
                fontWeight: 600,
                textDecoration: "none",
                borderBottom: "1px solid #444",
              }}
            >
              Sign in
            </Link>
          </Typography>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}