import { useState, useEffect } from "react";
import axios from "axios";

import { Stack, Grid, Button, Avatar, Typography, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getToken, refreshUser } from "../../../store/User/userSlice";
import { url } from "../../../config";

const SingleFriendRequest = (props) => {
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  const [status, setStatus] = useState("pending");
  const token = useSelector(getToken);
  let authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(async () => {
    async function getUser(uname) {
      try {
        const { data } = await axios.get(`${url}/user/${uname}`, authHeader);
        return data;
      } catch (error) {
        console.log(error.message);
      }
    }
    setUser(await getUser(props.user));
  }, []);
  if (status === "Accepted") {
    return (
      <Stack minWidth={350}>
        <Alert severity="success">{status}</Alert>
      </Stack>
    );
  }
  if (status === "Rejected") {
    return (
      <Stack minWidth={350}>
        <Alert severity="error">{status}</Alert>
      </Stack>
    );
  }
  return (
    <Stack
      py={1}
      spacing={1}
      display="flex"
      justifyContent="space-between"
      alignItems="stretch"
      direction="row"
      minWidth={350}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item key={`${user?.username}3`} pl={1} pr={1}>
          {<Avatar src={user?.avatar} sx={{ width: 34, height: 34 }} />}
        </Grid>
        <Grid key={`${user?.username}4`} item xs={true}>
          <Typography fontFamily={"sans-serif"} variant="title">
            {user?.name || "[Deleted User]"}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {user?.username || "[Deleted User]"}
          </Typography>
        </Grid>
      </Grid>
      <Stack direction={"row"}>
        <Button
          onClick={async (event) => {
            const { data } = await axios.get(`${url}/user/me`, authHeader);
            if (data) {
              dispatch(refreshUser(data));
            }
            setStatus("Accepted");
          }}
          variant="text"
          sx={{ color: "green" }}
        >
          Accept
        </Button>
        <Button
          onClick={async (event) => {
            const { data } = await axios.get(`${url}/user/me`, authHeader);
            if (data) {
              dispatch(refreshUser(data));
            }

            setStatus("Accepted");
          }}
          variant="text"
          sx={{ color: "red" }}
        >
          Reject
        </Button>
      </Stack>
    </Stack>
  );
};

export default SingleFriendRequest;
