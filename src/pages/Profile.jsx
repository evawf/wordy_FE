import { useState, useEffect } from "react";
import { NewWordForm } from "../components/NewWordForm";
import { WordList } from "../components/WordList";
import axios from "axios";
import BottomNav from "../components/BottomNav";
import Box from "@mui/material/Box";
import { defineWord } from "wordreference";
import Divider from "@mui/material/Divider";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { Margin, Padding, Widgets, WidthFull } from "@mui/icons-material";

export default function Profile() {
  const url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      const getUser = async () => {
        try {
          const getUserData = await axios.get(
            `${url}/users/${currentUser.userId}`
          );
          // console.log(getUserData);
          setProfile(getUserData.data.user);
        } catch (err) {
          console.log(err);
        }
      };

      getUser();
    }
  }, []);

  console.log(profile);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mx: 4,
        marginTop: "50px",
      }}
    >
      <h4>My profile page</h4>
      <Divider sx={{ border: "0.5px solid gray", width: "100%", my: 0.5 }} />

      <Box sx={{ width: "100%" }}>
        <table aria-label="custom pagination table">
          <tbody>
            <tr>
              <td>Display Name: </td>
              <td> {profile.displayName}</td>
            </tr>
            <tr>
              <td>First Name: </td>
              <td>{profile.firstName}</td>
            </tr>
            <tr>
              <td>Last Name: </td>
              <td>{profile.lastName}</td>
            </tr>
            <tr>
              <td>Email: </td>
              <td>{profile.email}</td>
            </tr>
          </tbody>
        </table>
      </Box>
      <BottomNav />
    </Box>
  );
}
