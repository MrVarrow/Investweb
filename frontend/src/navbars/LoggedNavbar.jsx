import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
} from "@mui/material";
import {
  PieChartOutlined,
  SearchOutlined,
  AddchartOutlined,
  ShowChartOutlined,
  TuneOutlined,
  PersonOutlined,
  SettingsOutlined,
  ContactSupportOutlined,
  StarOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import logo from "/InvestWeb_Logo.png";

export const DRAWER_WIDTH = 220;

const NAV_TOP = [
  { label: "Portfolio", icon: <PieChartOutlined />, path: "/dashboard" },
  { label: "Scanner", icon: <SearchOutlined />, path: "/scanner" },
  { label: "Portfolio Creator", icon: <AddchartOutlined />, path: "/portfolio-creator" },
  { label: "Stocks", icon: <ShowChartOutlined />, path: "/stocks" },
  { label: "Investing Preferences", icon: <TuneOutlined />, path: "/preferences" },
];

const NAV_BOTTOM = [
  { label: "Profile", icon: <PersonOutlined />, path: "/profile" },
  { label: "Settings", icon: <SettingsOutlined />, path: "/settings" },
  { label: "Contact", icon: <ContactSupportOutlined />, path: "/contact" },
  { label: "Credits", icon: <StarOutlined />, path: "/credits" },
];

function NavItem({ item }) {
  const location = useLocation();
  const active = location.pathname === item.path;

  return (
    <ListItemButton
      component={Link}
      to={item.path}
      sx={{
        mx: 1,
        mb: 0.25,
        borderRadius: "10px",
        py: 1,
        color: active ? "#fff" : "rgba(255,255,255,0.55)",
        bgcolor: active ? "rgba(255,255,255,0.1)" : "transparent",
        "&:hover": {
          bgcolor: "rgba(255,255,255,0.07)",
          color: "#fff",
        },
        transition: "all 0.18s ease",
      }}
    >
      <ListItemIcon sx={{ minWidth: 34, color: "inherit", "& svg": { fontSize: 19 } }}>
        {item.icon}
      </ListItemIcon>
      <ListItemText
        primary={item.label}
        primaryTypographyProps={{
          fontSize: "0.82rem",
          fontWeight: active ? 600 : 400,
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.01em",
        }}
      />
      {active && (
        <Box
          sx={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            bgcolor: "#6ee7b7",
            flexShrink: 0,
          }}
        />
      )}
    </ListItemButton>
  );
}

/**
 * SidebarNav
 *
 * Props:
 *   username {string} – display name shown in the user badge (default: "User")
 *   plan     {string} – plan label shown below username      (default: "Free plan")
 *
 * Usage:
 *   import SidebarNav, { DRAWER_WIDTH } from "../components/SidebarNav";
 *   <SidebarNav username="Alex" plan="Free plan" />
 */
export default function SidebarNav({ username = "User", plan = "Free plan" }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session / tokens here before navigating
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          bgcolor: "#161a25",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        },
      }}
    >
      {/* ── Logo ── */}
    <Box sx={{ px: 2.5, py: 2.5, display: "flex", alignItems: "center", gap: 1.2 }}>
      <Box
        component="img"
        src={logo}
        alt="Investweb Logo"
        sx={{
          width: 34,
          height: 34,
          objectFit: "contain",
          borderRadius: "8px",
        }}
      />

      <Typography
        sx={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          fontSize: "1rem",
          color: "#fff",
          letterSpacing: "0.02em",
        }}
      >
        InvestWeb
      </Typography>
    </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mx: 2 }} />

      {/* ── Top navigation ── */}
      <List sx={{ pt: 1.5, pb: 0, flexGrow: 0 }}>
        {NAV_TOP.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}
      </List>

      {/* ── Spacer ── */}
      <Box sx={{ flexGrow: 1 }} />

      <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mx: 2, mb: 1 }} />

      {/* ── Bottom navigation ── */}
      <List sx={{ pb: 0.5 }}>
        {NAV_BOTTOM.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}

        {/* Logout button */}
        <ListItemButton
          onClick={handleLogout}
          sx={{
            mx: 1,
            mb: 0.25,
            borderRadius: "10px",
            py: 1,
            color: "#e05555",
            "&:hover": { bgcolor: "rgba(224,85,85,0.12)" },
            transition: "all 0.18s ease",
          }}
        >
          <ListItemIcon sx={{ minWidth: 34, color: "inherit", "& svg": { fontSize: 19 } }}>
            <LogoutOutlined />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontSize: "0.82rem",
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
            }}
          />
        </ListItemButton>
      </List>

      {/* ── User badge ── */}
      <Box
        sx={{
          mx: 1.5,
          mb: 2,
          mt: 1,
          p: 1.5,
          borderRadius: "12px",
          bgcolor: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          gap: 1.2,
        }}
      >
        <Avatar
          sx={{
            width: 30,
            height: 30,
            fontSize: "0.75rem",
            fontWeight: 700,
            background: "linear-gradient(135deg, #6ee7b7, #3b82f6)",
            color: "#fff",
          }}
        >
          {username[0].toUpperCase()}
        </Avatar>
        <Box sx={{ overflow: "hidden" }}>
          <Typography
            sx={{
              color: "#fff",
              fontSize: "0.78rem",
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {username}
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.68rem",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {plan}
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}