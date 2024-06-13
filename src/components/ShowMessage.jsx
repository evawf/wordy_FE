import { orange } from "@mui/material/colors";
import { useState, useEffect } from "react";

export default function ShowMessage({ message }) {
  const [showMsg, setShowMsg] = useState(true);

  useEffect(() => {
    const timeoutEvent = setTimeout(() => {
      setShowMsg(false);
    }, 2000);

    return () => clearTimeout(timeoutEvent);
  }, []);

  return (
    <>
      {showMsg && (
        <p style={{ color: "red", textAlign: "center" }}>{message} !</p>
      )}
    </>
  );
}
