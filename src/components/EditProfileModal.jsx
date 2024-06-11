import { useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/material/Box";
import Input from "@mui/joy/Input";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import Divider from "@mui/joy/Divider";

export default function EditProfileModal({
  id,
  profile,
  openEdit,
  setOpenEdit,
}) {
  const [udpatedProfile, setUpdatedProfile] = useState({});
  const url = import.meta.env.VITE_BACKEND_URL;

  function handleChange(e) {
    e.preventDefault(e);
    setUpdatedProfile((prev) => {
      let helper = { ...prev };
      helper[`${e.target.id}`] = e.target.value;
      return helper;
    });
  }

  async function handleEditProfile() {
    try {
      const updateProfile = await axios.put(`${url}/users/${id}/edit`, {
        ...profile,
        ...udpatedProfile,
      });
      const returnMsg = updateProfile.data.msg;
      setUpdatedProfile({});
      if (returnMsg === "User updated") {
        alert("word updated!");
      } else {
        alert(returnMsg);
      }
    } catch (err) {
      console.log("msg: ", err);
    }
  }
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={openEdit}
      onClose={() => setOpenEdit(false)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "auto",
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 350,
          maxHeight: 700,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
          overflow: "auto",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          textAlign={"center"}
          mb={1}
        >
          Edit Profile
        </Typography>
        <Divider></Divider>
        <form
          onSubmit={handleEditProfile}
          className="new-word-form"
          sx={{ width: "100%" }}
        >
          <Box
            className="form-row"
            sx={{
              my: 1,
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <InputLabel>Display name: </InputLabel>
            <Input
              type="text"
              name="displayName"
              id="displayName"
              defaultValue={profile.displayName}
              onChange={handleChange}
              sx={{ height: "40px", borderRadius: "10px" }}
            />
            <InputLabel>First name:</InputLabel>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              defaultValue={profile.firstName}
              onChange={handleChange}
              sx={{ height: "40px", borderRadius: "10px" }}
            />
            <InputLabel>Last name:</InputLabel>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              defaultValue={profile.lastName}
              onChange={handleChange}
              sx={{ height: "40px", borderRadius: "10px" }}
            />
            <InputLabel>Email:</InputLabel>
            <Input
              type="email"
              name="email"
              id="email"
              defaultValue={profile.email}
              onChange={handleChange}
              sx={{ height: "40px", borderRadius: "10px" }}
            />
            <InputLabel>Password:</InputLabel>
            <Input
              type="password"
              name="password"
              id="password"
              // defaultValue={profile.password}
              placeholder="**********"
              onChange={handleChange}
              sx={{ height: "40px", borderRadius: "10px" }}
            />

            <button
              className="btn"
              variant="contained"
              style={{
                height: "40px",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            >
              UPDATE
            </button>
          </Box>
        </form>
      </Sheet>
    </Modal>
  );
}
