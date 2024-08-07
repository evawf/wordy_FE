import Link from "@mui/material/Link";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";

export default function BottomNav() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const showUserProfile = async () => {
    navigate("/profile");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "60px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        backgroundColor: "lightGray",
        paddingLeft: "35px",
        paddingRight: "35px",
      }}
    >
      <Link
        href="/dashboard"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <DashboardIcon sx={{ fontSize: "35px" }} />
        <p style={{ fontSize: "10px" }}>Dashboard</p>
      </Link>
      <Link
        href="/words"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <ViewHeadlineIcon sx={{ fontSize: "35px" }} />
        <p style={{ fontSize: "10px" }}>Words</p>
      </Link>
      <Link
        href="/new"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <AddCircleIcon sx={{ fontSize: "35px" }} />
        <p style={{ fontSize: "10px" }}>New</p>
      </Link>
      <Link
        href="/profile"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <SettingsIcon sx={{ fontSize: "35px" }} />
        <p style={{ fontSize: "10px" }}>Settings</p>
      </Link>
    </Box>
  );
}
