import { useState, useEffect } from "react";
import { NewWordForm } from "../components/NewWordForm";
import { WordList } from "../components/WordList";
import axios from "axios";
import BottomNav from "../components/BottomNav";
import Box from "@mui/material/Box";
import { defineWord } from "wordreference";
import Divider from "@mui/material/Divider";
import Loader from "../components/Loader";

export default function UserProfile() {
  const [user, setUser] = useState({});
  const url = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const getUser = async () => {
      try {
        const getUserData = await axios.get(`${url}/user/`);
      } catch (err) {
        console.log(err);
      }
    };
  }, []);

  return <>My profile page</>;
}
