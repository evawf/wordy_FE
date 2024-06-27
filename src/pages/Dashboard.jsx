import Box from "@mui/material/Box";
import BottomNav from "../components/BottomNav";
import WordChart from "../components/WordChart";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
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
      </Box>
      <BottomNav />
    </Box>
  );
}
