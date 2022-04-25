import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Redirect() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/");
      }}
    >
      <Box display={"flex"} alignSelf={"center"} justifyContent={"center"}>
        <img src="https://cdn.dribbble.com/users/115601/screenshots/2177634/media/3383af64757f1ee23152e1ff4ab55f12.png" />
      </Box>
    </div>
  );
}
