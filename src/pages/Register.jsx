import { RegisterForm } from "../components/RegisterForm";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ShowMessage from "../components/ShowMessage";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_URL;
  const [message, setMessage] = useState("");

  const openHomepage = () => {
    navigate("/");
  };

  const openLogin = () => {
    navigate("/login");
  };

  const addNewUser = async (newUser) => {
    try {
      const addNewUser = await axios.post(`${url}/register`, newUser);
      if (addNewUser.data.message === "User account registered successfully") {
        alert("You're all set!");
        navigate("/login");
      } else {
        setMessage("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
      setMessage("Something went wrong!");
    }
  };

  return (
    <Box sx={{ marginTop: "50px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button variant="text" onClick={() => openHomepage()}>
          Back
        </Button>
        <Button variant="text" onClick={() => openLogin()}>
          LOG IN
        </Button>
      </Box>
      <RegisterForm onSubmit={addNewUser} />
      {message && <ShowMessage message={message} />}
    </Box>
  );
}
