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

export default function BottomNav() {
  return (
    <Box
      sx={{
        width: "80%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        bottom: 20,
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
    </Box>
  );
}
