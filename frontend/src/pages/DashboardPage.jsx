import { Box, Typography, Chip, Paper } from "@mui/material";
import {
  PieChartOutlined,
  SearchOutlined,
  BookmarkBorderOutlined,
} from "@mui/icons-material";
import SidebarNav from "../navbars/LoggedNavbar.jsx";

// Mock data — swap with real API data
const PORTFOLIO_ITEMS = []; // empty = shows empty state
const WATCHLIST_ITEMS = []; // empty = shows empty state

const username = "Alex"; // replace with real username from auth context / store

export default function DashboardPage() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#0f1117" }}>

      {/* ── Sidebar (imported, reusable) ── */}
      <SidebarNav username={username} />

      {/* ── Main content ── */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2.5, md: 3.5 },
          minHeight: "100vh",
          overflow: "auto",
        }}
      >
        {/* Greeting */}
        <Box
          sx={{
            mb: 3.5,
            display: "inline-flex",
            alignItems: "center",
            gap: 1.5,
            px: 3,
            py: 1.5,
            borderRadius: "14px",
            border: "1px solid rgba(110,231,183,0.2)",
            background:
              "linear-gradient(120deg, rgba(110,231,183,0.07) 0%, rgba(59,130,246,0.07) 100%)",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: { xs: "1.1rem", md: "1.35rem" },
              color: "#fff",
              letterSpacing: "0.01em",
            }}
          >
            Hello,{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(90deg, #6ee7b7, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {username}
            </Box>{" "}
          </Typography>
          <Chip
            label="Dashboard"
            size="small"
            sx={{
              bgcolor: "rgba(110,231,183,0.15)",
              color: "#6ee7b7",
              fontSize: "0.68rem",
              fontWeight: 600,
              height: 22,
              border: "1px solid rgba(110,231,183,0.25)",
            }}
          />
        </Box>

        {/* ── Portfolio card (full width) ── */}
        <DashCard
          title="Your Portfolio"
          icon={<PieChartOutlined sx={{ fontSize: 18, color: "#6ee7b7" }} />}
          sx={{ mb: 2.5 }}
        >
          {PORTFOLIO_ITEMS.length === 0 ? (
            <EmptyState
              emoji="📭"
              message="You don't have anything in the portfolio yet :("
              sub="Use Portfolio Creator to build your first portfolio."
            />
          ) : (
            <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>
              {/* Portfolio table / chart goes here */}
              Portfolio content
            </Typography>
          )}
        </DashCard>

        {/* ── Bottom two cards ── */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2.5,
          }}
        >
          {/* Scan for stocks */}
          <DashCard
            title="Scan for Stocks"
            icon={<SearchOutlined sx={{ fontSize: 18, color: "#3b82f6" }} />}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 3,
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0.04) 100%)",
                  border: "1.5px solid rgba(59,130,246,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <SearchOutlined sx={{ fontSize: 34, color: "#3b82f6" }} />
                <Box
                  sx={{
                    position: "absolute",
                    inset: -6,
                    borderRadius: "50%",
                    border: "1px dashed rgba(59,130,246,0.2)",
                  }}
                />
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    color: "#fff",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    mb: 0.5,
                  }}
                >
                  Scan for stocks
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.4)",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.78rem",
                    maxWidth: 200,
                  }}
                >
                  Discover opportunities matching your strategy
                </Typography>
              </Box>
            </Box>
          </DashCard>

          {/* Watch list */}
          <DashCard
            title="Your Watch List"
            icon={<BookmarkBorderOutlined sx={{ fontSize: 18, color: "#a78bfa" }} />}
          >
            {WATCHLIST_ITEMS.length === 0 ? (
              <EmptyState
                emoji="🔖"
                message="You don't have any stocks in your watch list right now :("
                sub="Browse Stocks to add tickers to watch."
              />
            ) : (
              <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>
                Watchlist content
              </Typography>
            )}
          </DashCard>
        </Box>
      </Box>
    </Box>
  );
}

/* ── Shared card components ── */

function DashCard({ title, icon, children, sx = {} }) {
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "#1a1f2e",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px",
        overflow: "hidden",
        ...sx,
      }}
    >
      <Box
        sx={{
          px: 2.5,
          py: 1.75,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        {icon}
        <Typography
          sx={{
            color: "#fff",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: "0.88rem",
            letterSpacing: "0.01em",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box sx={{ p: 2.5, minHeight: 180 }}>{children}</Box>
    </Paper>
  );
}

function EmptyState({ emoji, message, sub }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 140,
        gap: 1,
        textAlign: "center",
      }}
    >
      <Typography sx={{ fontSize: "2rem", lineHeight: 1 }}>{emoji}</Typography>
      <Typography
        sx={{
          color: "rgba(255,255,255,0.55)",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.85rem",
          fontWeight: 500,
          maxWidth: 300,
        }}
      >
        {message}
      </Typography>
      {sub && (
        <Typography
          sx={{
            color: "rgba(255,255,255,0.28)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem",
          }}
        >
          {sub}
        </Typography>
      )}
    </Box>
  );
}