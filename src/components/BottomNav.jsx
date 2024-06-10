import Link from "@mui/material/Link";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";

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
        height: "70px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        backgroundColor: "lightGray",
        paddingLeft: "35px",
        paddingRight: "35px",
        paddingBottom: "10px",
      }}
    >
      <Link
        href="/dashboard"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DashboardIcon sx={{ fontSize: "35px" }} />
      </Link>
      <Link
        href="/words"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ViewHeadlineIcon sx={{ fontSize: "35px" }} />
      </Link>
      <Link
        href="/new"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <AddCircleIcon sx={{ fontSize: "35px" }} />
      </Link>

      <button
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "25px",
          border: "1px solid darkGray",
          backgroundColor: "black",
          color: "white",
          fontSize: "small",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => showUserProfile()}
      >
        {currentUser ? currentUser.userName : ""}
      </button>
    </Box>
  );
}
