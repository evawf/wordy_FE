import { useState, useEffect } from "react";

import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BottomNav from "../components/BottomNav";

export default function Home() {
  const [value, setValue] = useState("recents");

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Welcome to homepage!</h1>
      <BottomNav />
    </Box>
  );
}
