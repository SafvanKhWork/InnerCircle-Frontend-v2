import {
  Container,
  Fab,
  FormControlLabel,
  FormLabel,
  Input,
  makeStyles,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Tooltip,
  Box,
  ImageList,
  ImageListItem,
} from "@material-ui/core";
import { Alert, Button, IconButton } from "@mui/material";
import { Add as AddIcon, Cancel, Close } from "@material-ui/icons";
import { Fragment, useEffect, useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import axios from "axios";
import { url, getAuthHeader } from "../config";

import { Scrollbars } from "react-custom-scrollbars";
import { getToken, refetchUser } from "../store/User/userSlice";
import { setSpecifiedList } from "../store/Products/productListSlice";
import { Divider, Stack, Typography } from "@mui/material";
import UserMinibar from "./Details/Single Items/UserMinibar";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: 20,
    right: 20,
  },
  container: {
    borderRadius: "5px",
    width: 500,
    height: 550,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      height: "100vh",
    },
  },
  form: {
    padding: theme.spacing(2),
  },
  item: {
    marginBottom: theme.spacing(3),
  },
}));

const Friends = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const account = useSelector((state) => state.user);
  const { circle, username: you, token } = account;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [foundFriend, setFoundFriend] = useState(circle);
  const [foundUser, setFoundUser] = useState([]);
  const getMatchedUsers = async (currSearchQuery) => {
    if (!currSearchQuery) {
      return [];
    }
    const { data } = await axios.get(`${url}/search/user/${currSearchQuery}`);
    return data || [];
  };
  useEffect(async () => {
    if (token && token !== "") {
      const reloader = setInterval(() => {
        dispatch(refetchUser);
        return () => {
          clearInterval(reloader);
        };
      }, 10000);
    }
  }, [token]);
  useEffect(async () => {
    let friendTemp = [];
    let userTemp = [];
    const allFound = await getMatchedUsers(query);
    allFound.forEach((person) => {
      if (circle.includes(person)) {
        friendTemp.push(person);
      } else {
        if (you !== person) {
          userTemp.push(person);
        }
      }
    });
    if (query !== "") {
      setFoundFriend(friendTemp);
    }
    setFoundUser(userTemp);
  }, [query.trim(), account]);

  return (
    <>
      <Tooltip
        title="Friends"
        aria-label="friends"
        onClick={() => setOpen(true)}
      >
        {props.children}
      </Tooltip>
      <Modal
        onClose={() => {
          setOpen(false);
          setSearch(false);
        }}
        open={open}
      >
        <Container className={classes.container}>
          <Box py={2}>
            <Box m={1}>
              <Stack spacing={1} direction={"row"}>
                <TextField
                  variant="outlined"
                  size="small"
                  onFocus={() => {
                    setSearch(true);
                  }}
                  fullWidth
                  onChange={(event) => setQuery(event.target.value)}
                  label={"search"}
                  value={query}
                />
                <Button
                  onClick={() => {
                    if (search) {
                      setSearch(false);
                      setQuery("");
                    } else {
                      setOpen(false);
                    }
                  }}
                  color="primary"
                  size="small"
                  variant="outlined"
                >
                  {!search ? "Close" : "Clear"}
                </Button>
              </Stack>
            </Box>

            <Scrollbars
              style={{ height: 520 }}
              autoHide
              autoHideTimeout={0}
              autoHideDuration={200}
            >
              {/* <Typography color={"GrayText"} fontWeight={"bold"}>
                  Friends
                </Typography> 
                 <Divider orientation="horizontal" sx={{ color: "GrayText" }} />*/}
              <Box m={1}>
                {!search || query === "" ? (
                  <Stack spacing={1}>
                    {circle.map((friend) => (
                      <UserMinibar key={friend} user={friend} />
                    ))}
                  </Stack>
                ) : (
                  <Fragment>
                    <Box my={1}>
                      <Typography color={"GrayText"} fontWeight={"bold"}>
                        Friends
                      </Typography>
                      <Divider
                        orientation="horizontal"
                        sx={{ color: "GrayText" }}
                      />
                      {foundFriend.length === 0 ? (
                        <Alert severity="warning"> no such user found! </Alert>
                      ) : (
                        <Fragment>
                          <Stack mt={1} spacing={1}>
                            {foundFriend.map((friend) => (
                              <UserMinibar key={friend} user={friend} />
                            ))}
                          </Stack>
                        </Fragment>
                      )}
                    </Box>
                    <Box my={1}>
                      <Typography color={"GrayText"} fontWeight={"bold"}>
                        Other Users
                      </Typography>
                      <Divider
                        orientation="horizontal"
                        sx={{ color: "GrayText" }}
                      />
                      {foundUser.length === 0 ? (
                        <Alert severity="warning"> no such user found! </Alert>
                      ) : (
                        <Fragment>
                          <Stack mt={1} spacing={1}>
                            {foundUser.map((user) => (
                              <UserMinibar key={user} user={user} />
                            ))}
                          </Stack>
                        </Fragment>
                      )}
                    </Box>
                  </Fragment>
                )}
              </Box>
            </Scrollbars>
          </Box>
        </Container>
      </Modal>
    </>
  );
};

export default Friends;
