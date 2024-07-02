import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginForm from "../components/LoginForm";
import useGlobalUserContext from "../globalContext/UserContext";
import { useState } from "react";
import ShowMessage from "../components/ShowMessage";
import Loader from "../components/Loader";

export default function Login() {
  const navigate = useNavigate();
  const url = import.meta.env?.VITE_BACKEND_URL;
  const { updateUserName } = useGlobalUserContext();
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");

  const openHomepage = () => {
    navigate("/");
  };

  const openRegister = () => {
    navigate("/register");
  };

  const loginUser = async (user) => {
    try {
      const getUser = await axios.post(`${url}/login`, user);
      const userInfo = getUser?.data;

      if (userInfo.userId) {
        // updateUserName(userInfo.userName);
        const user = {
          userName: userInfo?.userName,
          userId: userInfo?.userId,
        };
        localStorage.setItem("user", JSON.stringify(user));
        setUserName(user.userName);
        navigate("/words");
      } else {
        setMessage(getUser.data.msg);
      }
    } catch (err) {
      console.log(err);
      setMessage("Something went wrong!");
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
        <Button variant="text" onClick={() => openRegister()}>
          SIGN UP
        </Button>
      </Box>
      <LoginForm onSubmit={loginUser} />
      {message && <ShowMessage message={message} />}
      {userName ? <Loader /> : <></>}
    </Box>
  );
}
