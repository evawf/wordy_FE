import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BottomNav() {
  const url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const logoutUser = async () => {
    await axios.post(`${url}/logout`);
    navigate("/login");
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
        href="/"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <HomeIcon sx={{ fontSize: "35px" }} />
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

      {/* <Link
          href=""
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FavoriteIcon sx={{ fontSize: "35px" }} />
        </Link> */}
      <Button onClick={() => logoutUser()}>
        <LogoutIcon sx={{ fontSize: "30px" }} />
      </Button>
    </Box>
  );
}
