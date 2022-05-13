import { useState, useEffect, Fragment } from "react";
import axios from "axios";

import {
  Stack,
  Grid,
  IconButton,
  Box,
  Avatar,
  Typography,
  Paper,
  LinearProgress,
} from "@mui/material";
import {
  Done,
  Close,
  PersonRemove,
  PersonAdd,
  HowToReg,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { url } from "../../../config";
import { getToken, getUser, refreshUser } from "../../../store/User/userSlice";
import { Link } from "react-router-dom";

const UserMinibar = (props) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const token = useSelector(getToken);
  const dispatch = useDispatch();

  let authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const account = useSelector(getUser);
  const acceptRequest = async (uname, authHeader) => {
    await axios.patch(
      `${url}/accept-friend-request/${uname}`,
      undefined,
      authHeader
    );
  };
  const rejectRequest = async (uname, authHeader) => {
    await axios.delete(`${url}/reject-friend-request/${uname}`, authHeader);
  };
  useEffect(async () => {
    async function getUserOn(uname) {
      try {
        const { data, status: responseStatus } = await axios.get(
          `${url}/user/${uname}`,
          authHeader
        );
        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    }
    setUser(await getUserOn(props.user));
  }, []);
  const isYou = String(user._id) === String(account._id);
  const [inFriend, setInFriend] = useState(false);
  const [hasSentRequestTo, setHasSentRequestTo] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);
  useEffect(() => {
    setInFriend(account.circle.includes(user?.username));
    setHasSentRequestTo(account.sentFriendRequest.includes(user?.username));
    setHasRequested(account.friendRequest.includes(user?.username));

    return () => {};
  }, [user]);

  return (
    <Paper variant="outlined">
      <Box minHeight={50}>
        {loading ? (
          <LinearProgress />
        ) : (
          <Stack
            py={1}
            spacing={1}
            display="flex"
            justifyContent="space-between"
            alignItems="stretch"
            direction="row"
          >
            <Link
              style={{ color: "inherit", textDecoration: "none" }}
              to={`/profile/${user?._id}`}
            >
              <Box
                style={{
                  display: "flex",
                  alignSelf: "center",
                }}
              >
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item key={`${user?.username}3`} pl={1} pr={1}>
                    {
                      <Avatar
                        src={user?.avatar}
                        sx={{ width: 34, height: 34 }}
                      />
                    }
                  </Grid>
                  <Grid key={`${user?.username}4`} item xs={true}>
                    <Typography fontFamily={"sans-serif"} variant="title">
                      {isYou ? "you" : user?.name}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {isYou ? "you" : user?.username}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Link>
            {props.other ? (
              ""
            ) : (
              <Fragment>
                {isYou ? (
                  ""
                ) : hasRequested ? (
                  <Box
                    style={{
                      display: "flex",
                      alignSelf: "center",
                    }}
                  >
                    <Stack direction={"row"}>
                      <IconButton
                        onClick={async (event) => {
                          await acceptRequest(user?.username, authHeader);
                          const { data } = await axios.get(
                            `${url}/user/me`,
                            authHeader
                          );
                          if (data) {
                            dispatch(refreshUser(data));
                          }
                        }}
                        variant="text"
                        sx={{ color: "green" }}
                      >
                        <Done sx={{ color: "green" }} />
                      </IconButton>
                      <IconButton
                        onClick={async (event) => {
                          await rejectRequest(props.user, authHeader);
                          const { data } = await axios.get(
                            `${url}/user/me`,
                            authHeader
                          );
                          if (data) {
                            dispatch(refreshUser(data));
                          }
                        }}
                        variant="text"
                        sx={{ color: "red" }}
                      >
                        <Close sx={{ color: "red" }} />
                      </IconButton>
                    </Stack>
                  </Box>
                ) : (
                  <Box
                    style={{
                      display: "flex",
                      alignSelf: "center",
                    }}
                  >
                    {inFriend ? (
                      <IconButton
                        onClick={async (event) => {
                          const { status } = await axios.delete(
                            `${url}/unfriend/${props.user}`,
                            authHeader
                          );
                          const { data } = await axios.get(
                            `${url}/user/me`,
                            authHeader
                          );
                          if (data) {
                            dispatch(refreshUser(data));
                          }
                          setInFriend(false);
                        }}
                        variant="text"
                        sx={{ color: "red" }}
                      >
                        <PersonRemove sx={{ color: "red" }} />
                      </IconButton>
                    ) : hasSentRequestTo ? (
                      <IconButton
                        disabled={true}
                        variant="text"
                        sx={{ color: "grey" }}
                      >
                        <HowToReg sx={{ color: "grey" }} />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={async (event) => {
                          const { status } = await axios.post(
                            `${url}/add-friend/${props.user}`,
                            undefined,
                            authHeader
                          );
                          const { data } = await axios.get(
                            `${url}/user/me`,
                            authHeader
                          );
                          if (data) {
                            dispatch(refreshUser(data));
                          }
                          setHasSentRequestTo(true);
                        }}
                        variant="text"
                        sx={{ color: "green" }}
                      >
                        <PersonAdd sx={{ color: "green" }} />
                      </IconButton>
                    )}
                  </Box>
                )}
              </Fragment>
            )}
          </Stack>
        )}
      </Box>
    </Paper>
  );
};

export default UserMinibar;
