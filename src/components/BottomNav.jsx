import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import Box from "@mui/material/Box";

export default function BottomNav() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "50px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        backgroundColor: "white",
        paddingLeft: "20px",
        paddingRight: "20px",
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
