import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Home() {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const url = import.meta.env?.VITE_BACKEND_URL;
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");

  const openRegisterPage = () => {
    navigate("/register");
  };

  const openLoginPage = () => {
    navigate("/login");
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setToken(codeResponse.access_token);
    },
    onError: (err) => console.log("Login Failed: ", err),
  });

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      async function getUserData() {
        try {
          const getUser = await axios.post(`${url}/auth/google`, {
            token: token,
          });
          const userInfo = getUser?.data;

          if (userInfo.userId) {
            const user = {
              userName: userInfo?.userName,
              userId: userInfo?.userId,
            };
            localStorage.setItem("user", JSON.stringify(user));
            setUserName(user.userName);
          } else {
            setMessage(getUser.data.msg);
          }
        } catch (err) {
          console.log(err);
          alert("Something went wrong!");
          navigate("/");
        }
      }

      getUserData();
    }
  }, [token]);

  useEffect(() => {
    if (!userName) {
      navigate("/");
    } else {
      navigate("/words");
    }
  }, [userName]);

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
      {message && <ShowMessage message={message} />}

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

        <br />
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => login()}
        >
          Login with Google
        </Button>

        <br />
        <Button variant="outlined" fullWidth onClick={() => openLoginPage()}>
          Already have an account? Log in
        </Button>
      </Box>
    </Box>
  );
}
