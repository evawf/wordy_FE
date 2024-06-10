import { useState } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/joy/Input";

export function RegisterForm({ onSubmit }) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (email === "" || password === "")
      return alert("Please enter email and password!");
    console.log(email, password);
    const newUser = {
      display_name: displayName,
      email: email.toLowerCase().trim(),
      password: password,
    };
    onSubmit(newUser);
    setDisplayName("");
    setEmail("");
    setPassword("");
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        my: 2,
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="new-word-form"
        sx={{ width: "100%" }}
      >
        <Box
          className="form-row"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Input
            placeholder="Display Name"
            type="text"
            name="displayName"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            sx={{ height: "40px" }}
          />
          <Input
            placeholder="Email"
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ height: "40px", my: 1 }}
            required
          />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ height: "40px" }}
            required
          />
          <button className="btn addnewUserBtn" variant="contained" sx={{}}>
            SIGN UP
          </button>
        </Box>
      </form>
    </Box>
  );
}
