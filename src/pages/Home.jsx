import { useState } from "react";

import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import BottomNav from "../components/BottomNav";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import WordChart from "../components/WordChart";

export default function Home() {
  const [value, setValue] = useState("recents");

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Dashboard</h2>
      <Link href="/words">Words of the day</Link>
      <Link href="/new">Add new words</Link>
      <Box sx={{ my: 5, textAlign: "center", width: "100%" }}>
        <h4>Combating the Curve of Forgeting</h4>
        <Card sx={{ mt: 2, p: 2 }}>
          <CardActionArea>
            <WordChart sx={{ mt: 10 }} />
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
