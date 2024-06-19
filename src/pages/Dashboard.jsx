import Box from "@mui/material/Box";
import BottomNav from "../components/BottomNav";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import WordChart from "../components/WordChart";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [totalWords, setTotalWords] = useState(0);
  const [masteredWords, setMasteredWords] = useState(0);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }

    const getData = async () => {
      await axios.get(`url/`);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <h2>Dashboard</h2>
      <Box sx={{ my: 2, textAlign: "center", width: "100%" }}>
        <WordChart />
        {/* <Card sx={{ mt: 0.5, p: 2 }}>
          <CardActionArea>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Combating the Curve of Forgeting
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card> */}
      </Box>
      <BottomNav />
    </Box>
  );
}
