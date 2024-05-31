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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function Home() {
  const [value, setValue] = useState("recents");

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Homepage</h2>
      <Link href="/words">Words of the day</Link>
      <Link href="/new">Add new words</Link>
      <Box sx={{ my: 5, textAlign: "center" }}>
        <h4>Combating the Curve of Forgeting</h4>
        <Card sx={{ maxWidth: 345, mt: 1 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image="https://simonbaddeley64.wordpress.com/wp-content/uploads/2021/06/ebbinghaus-forgetting-curve.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Combating the Curve of Forgeting
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
      <BottomNav />
    </Box>
  );
}
