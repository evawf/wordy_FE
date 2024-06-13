import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const openRegisterPage = () => {
    navigate("/register");
  };

  const openLoginPage = () => {
    navigate("/login");
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ position: "fixed", top: 100, textAlign: "center" }}>
        <h1 id="logo">Wordy</h1>
        <h2 id="subtext">Flash Fluent French </h2>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          position: "fixed",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "50px",
          bottom: 20,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          fullWidth
          onClick={() => openRegisterPage()}
        >
          Sign up
        </Button>
        <br></br>
        <Button variant="outlined" fullWidth onClick={() => openLoginPage()}>
          Already have an account? Log in
        </Button>
      </Box>
    </Box>
  );
}
