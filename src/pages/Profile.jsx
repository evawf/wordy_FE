import { useState, useEffect } from "react";
import axios from "axios";
import BottomNav from "../components/BottomNav";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import EditProfileModal from "../components/EditProfileModal";

export default function Profile() {
  const url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [profile, setProfile] = useState({});
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      const getUser = async () => {
        try {
          const getUserData = await axios.get(
            `${url}/users/${currentUser.userId}`
          );
          if (!getUserData.data) {
            navigate("/");
          } else {
            setProfile(getUserData.data.user);
          }
        } catch (err) {
          console.log(err);
          localStorage.clear();
          navigate("/");
        }
      };

      getUser();
    }
  }, []);

  const handleToggleUserStatus = async () => {
    const isActive = profile.isActive;
    const updateUserStatus = await axios.put(
      `${url}/users/${currentUser.userId}/status`,
      { is_active: !isActive }
    );
    setProfile({ ...profile, isActive: !profile.isActive });
  };

  const logoutUser = async () => {
    await axios.post(`${url}/logout`);
    navigate("/login");
    localStorage.clear();
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mx: 4,
        marginTop: "50px",
      }}
    >
      <AccountCircleIcon sx={{ fontSize: 60, marginBottom: "10px" }} />
      {/* <Button variant="outlined" onClick={() => logoutUser()}>
        Logout
      </Button> */}
      <Divider sx={{ width: "100%", my: 2 }} />

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          height: "200px",
        }}
      >
        <Box
          sx={{
            width: "35%",
            height: "40px",
            my: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ minHeight: "20px", my: 1 }}>Display Name:</Box>
          <Box sx={{ minHeight: "20px", my: 1 }}>First Name:</Box>
          <Box sx={{ minHeight: "20px", my: 1 }}>Last Name: </Box>
          <Box sx={{ minHeight: "20px", my: 1 }}>Email:</Box>
        </Box>
        <Box
          sx={{
            width: "65%",
            height: "40px",
            my: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              minHeight: "20px",
              m: 1,
              borderBottom: "1px solid gray",
              px: 2,
            }}
          >
            {profile?.displayName}
          </Box>
          <Box
            sx={{
              minHeight: "20px",
              m: 1,
              borderBottom: "1px solid gray",
              px: 2,
            }}
          >
            {profile?.firstName}
          </Box>
          <Box
            sx={{
              minHeight: "20px",
              m: 1,
              borderBottom: "1px solid gray",
              px: 2,
            }}
          >
            {profile?.lastName}
          </Box>
          <Box
            sx={{
              minHeight: "20px",
              m: 1,
              borderBottom: "1px solid gray",
              px: 2,
            }}
          >
            {profile?.email}
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
        {/* <Button
          variant="contained"
          fullWidth
          sx={{ mx: 1 }}
          color="error"
          onClick={() => handleToggleUserStatus()}
        >
          {profile.isActive ? "Deactivate" : "Activate"}
        </Button> */}
        <Button
          variant="contained"
          fullWidth
          sx={{ mx: 1 }}
          color="secondary"
          onClick={() => logoutUser()}
        >
          Logout
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{ mx: 1 }}
          color="primary"
          onClick={() => setOpenEdit(true)}
        >
          Edit
        </Button>
      </Box>
      {/********************** Edit Word Modal **********************/}
      {currentUser && (
        <EditProfileModal
          id={currentUser.userId}
          profile={profile}
          setProfile={setProfile}
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
        />
      )}
      <BottomNav />
    </Box>
  );
}
