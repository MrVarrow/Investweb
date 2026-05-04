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

const API_BASE = "http://localhost:8000/api";

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

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
      date_of_birth: form.date_of_birth
        ? form.date_of_birth.format("YYYY-MM-DD")
        : "",
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
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.100",
        px: 2,
        py: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              bgcolor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 1.5,
            }}
          >
            <PersonAddOutlined sx={{ color: "white", fontSize: 26 }} />
          </Box>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Create account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fill in your details to get started
          </Typography>
        </Box>

        {/* Alerts */}
        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
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
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
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
                        onClick={() => setShowPassword2((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword2 ? <VisibilityOff /> : <Visibility />}
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
                onChange={(newValue) =>
                  setForm({ ...form, date_of_birth: newValue })
                }
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: { mb: 2 },
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
            fullWidth
            size="large"
            disabled={loading}
            sx={{
              mt: 2,
              borderRadius: 2,
              py: 1.25,
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            {loading ? <CircularProgress size={22} color="inherit" /> : "Create account"}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" color="text.secondary" textAlign="center">
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "inherit", fontWeight: 600, textDecoration: "underline" }}
          >
            Sign in
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}