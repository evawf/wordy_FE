import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import LoginForm from "../components/LoginForm";

export default function Login() {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_URL;

  const openHomepage = () => {
    navigate("/");
  };

  const loginUser = async (user) => {
    try {
      const getUser = await axios.post(`${url}/login`, user);
      console.log(getUser);
      alert(getUser.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
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
        <Button variant="text">Log in</Button>
      </Box>
      <LoginForm onSubmit={loginUser} />
    </Box>
  );
}
