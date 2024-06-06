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

export default function UserProfile() {
  const url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      const getUser = async () => {
        try {
          const getUserData = await axios.get(
            `${url}/users/${currentUser.userId}`
          );
          console.log(getUserData);
        } catch (err) {
          console.log(err);
        }
      };

      getUser();
    }
  }, []);

  return <>My profile page</>;
}
