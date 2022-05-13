import {
  Container,
  makeStyles,
  Modal,
  Tooltip,
  Box,
  Button,
  TextField,
  MenuItem,
  Input,
  IconButton,
} from "@material-ui/core";

import { Notifications as Notification } from "@material-ui/icons";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import axios from "axios";
import { url, getAuthHeader } from "../config";

import { Scrollbars } from "react-custom-scrollbars";
import {
  getToken,
  logout,
  refetchUser,
  refreshUserField,
} from "../store/User/userSlice";
import { setSpecifiedList } from "../store/Products/productListSlice";
import {
  Avatar,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import UserMinibar from "./Details/Single Items/UserMinibar";
import Confirm from "./Confirm";
import { logout as signout } from "../store/ApplicationStates/applicationStateSlice";
import { useNavigate } from "react-router-dom";
import HistoryPDF from "./pdfGen.jsx";

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

const UpdateProfile = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const account = useSelector((state) => state.user);
  const { token } = account;
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState("");
  const [name, setName] = useState(account.name);
  //   const [email, setEmail] = useState(account.email);
  const [avatar, setAvatar] = useState(account.avatar);
  const [username, setUsername] = useState(account.username);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [deleteColor, setDeleteColor] = useState("#f53f38");
  const navigate = useNavigate();
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const info =
    password.trim() === ""
      ? {
          avatar,
          name,
          username,
        }
      : { name, password, avatar, username };
  return (
    <>
      <Tooltip title="Edit" aria-label="edit" onClick={() => setOpen(true)}>
        {props.children}
      </Tooltip>
      <Modal
        onClose={async () => {
          setOpen(false);
        }}
        open={open}
      >
        <Container className={classes.container}>
          <Box mx={1} pt={1}>
            <Scrollbars
              style={{ height: 480 }}
              autoHide
              autoHideTimeout={0}
              autoHideDuration={200}
            >
              <form className={classes.form} autoComplete="off">
                <Collapse in={false}>
                  <Input
                    onChange={async (event) => {
                      const formData = new FormData();

                      formData.append("avatar", event.target.files[0]);
                      const { data } = await axios.post(
                        `${url}/image`,
                        formData,
                        getAuthHeader(token)
                      );
                      setAvatar(data.url);
                      previewFile(event.target.files[0]);
                    }}
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                  />
                </Collapse>
                <div className={classes.item}>
                  <label htmlFor="icon-button-file">
                    <Box
                      alignSelf={"center"}
                      justifyContent={"center"}
                      display={"flex"}
                    >
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <Avatar
                          src={preview || account.avatar}
                          sx={{ height: 84, width: 84 }}
                        />
                      </IconButton>
                    </Box>
                  </label>
                </div>
                <div className={classes.item}>
                  <TextField
                    id="name"
                    label="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    size="small"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className={classes.item}>
                  <TextField
                    id="username"
                    label="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    size="small"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className={classes.item}>
                  <TextField
                    id="password"
                    label="Password"
                    value={password}
                    type={showPassword ? "text" : "password"}
                    onChange={(event) => setPassword(event.target.value)}
                    size="small"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className={classes.item}>
                  <FormControlLabel
                    value="show-password"
                    control={
                      <Checkbox
                        checked={showPassword}
                        onChange={(event) => {
                          setShowPassword(event.target.checked);
                        }}
                      />
                    }
                    label="Show Password"
                    labelPlacement="end"
                  />
                </div>

                <div className={classes.item}>
                  <Stack spacing={1} direction={"row"}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={async () => {
                        const data = await axios.patch(
                          `${url}/users/me`,
                          info,
                          getAuthHeader(token)
                        );

                        if (data) {
                          dispatch(refetchUser());
                          setName(account.name);
                          setUsername(account.username);
                          setPassword("");
                          setAvatar(account.avatar);
                          setOpen(false);
                          setDeleteColor("#f53f38");
                        }
                      }}
                    >
                      Update
                    </Button>

                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setName(account.name);
                        setUsername(account.username);
                        setPassword("");
                        setAvatar(account.avatar);
                        setDeleteColor("#f53f38");
                        setOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Confirm
                      message={`Are you sure you want to delete your account?`}
                      onConfirm={async () => {
                        const { data } = axios.delete(
                          `${url}/users/me`,
                          getAuthHeader(token)
                        );
                        setOpen(false);
                        navigate("/");
                        dispatch(signout());
                        dispatch(logout());
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="inherit"
                        style={{ color: deleteColor }}
                        onMouseEnter={() => setDeleteColor("#f70b02")}
                        onMouseLeave={() => setDeleteColor("#f53f38")}
                      >
                        Delete
                      </Button>
                    </Confirm>
                    <HistoryPDF user={account} />
                  </Stack>
                </div>
              </form>
            </Scrollbars>
          </Box>
        </Container>
      </Modal>
    </>
  );
};

export default UpdateProfile;
