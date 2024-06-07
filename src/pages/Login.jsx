import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import LoginForm from "../components/LoginForm";
import useGlobalUserContext from "../globalContext/UserContext";
import { UserContext } from "../globalContext/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_URL;
  const { updateUserName } = useGlobalUserContext();

  const openHomepage = () => {
    navigate("/");
  };

  const loginUser = async (user) => {
    try {
      const getUser = await axios.post(`${url}/login`, user);
      const userInfo = getUser.data;
      // alert(getUser.data.message);

      if (userInfo) {
        // updateUserName(userInfo.userName);
        const user = {
          userName: userInfo.userName,
          userId: userInfo.userId,
        };
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/new");
      } else {
        navigate("/register");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        marginTop: "50px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
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
