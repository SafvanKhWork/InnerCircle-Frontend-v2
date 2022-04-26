import { Box, Stack } from "@mui/material";
import React, { Fragment } from "react";
import Notfound from "./Notfound";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { Home, Refresh } from "@material-ui/icons";

export default function Redirect() {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Box
        minHeight={"80vh"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Stack spacing={10}>
          <Notfound is404={true} />

          <Stack
            direction={"row"}
            sx={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              <Stack spacing={1} direction={"row"}>
                <Home
                  style={{
                    display: "flex",
                    alignSelf: "center",
                    verticalAlign: "middle",
                  }}
                />
                <Typography
                  style={{
                    display: "flex",
                    alignSelf: "center",
                    verticalAlign: "middle",
                  }}
                  align="center"
                >
                  Home
                </Typography>
              </Stack>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                window.location.reload();
              }}
            >
              <Stack spacing={1} direction={"row"}>
                <Refresh
                  style={{
                    display: "flex",
                    alignSelf: "center",
                    verticalAlign: "middle",
                  }}
                />
                <Typography
                  style={{
                    display: "flex",
                    alignSelf: "center",
                    verticalAlign: "middle",
                  }}
                  align="center"
                >
                  Refresh
                </Typography>
              </Stack>
            </div>
          </Stack>
        </Stack>
      </Box>
    </Fragment>
  );
}
