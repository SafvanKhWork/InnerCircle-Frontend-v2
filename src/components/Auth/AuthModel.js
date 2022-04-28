import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Paper,
  Card,
  Tab,
  Stack,
  IconButton,
} from "@mui/material";
import Scrollbars from "react-custom-scrollbars";
//

import { useDispatch, useSelector } from "react-redux";

import SignIn from "./state/SignIn";
import SignUp from "./state/SignUp";
import ForgotPassword from "./ForgotPassword";
import { Container, makeStyles, Tabs, Tooltip } from "@material-ui/core";
import {
  accountCreated,
  createAccount,
  hasAccount,
  reset,
} from "../../store/ApplicationStates/applicationStateSlice";
import { Cancel, Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: 20,
    right: 20,
  },
  container: {
    borderRadius: "5px",
    width: 400,
    height: 550,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function BasicModal(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const { onSignUp, onForget, onSignIn } = props;
  const {
    loggedIn: isLoggedIn,
    existingUser: isUser,
    forgotPassword: forgotPasswd,
  } = useSelector((state) => state.applicationState);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    dispatch(reset());
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      dispatch(accountCreated());
    }
    if (newValue === 1) {
      dispatch(createAccount());
    }
    setValue(newValue);
  };

  if (isUser && value != 0) {
    setValue(0);
  }
  if (!isUser && value != 1) {
    setValue(1);
  }

  return (
    <>
      <Tooltip onClick={handleOpen} title="Login">
        {props.children}
      </Tooltip>
      <Modal onClose={handleClose} open={open}>
        <Container className={classes.container}>
          <Stack spacing={1}>
            <Stack direction={"row-reverse"} display={"flex"}>
              <Box pt={1}>
                <IconButton size="small" onClick={handleClose}>
                  <Close
                    color="error"
                    style={{ fontSize: 18, color: "GrayText" }}
                  />
                </IconButton>
              </Box>
            </Stack>
            <Typography align="center" color={"primary"} variant={"h3"}>
              InnerCircle
            </Typography>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                centered
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="LogIn" index={0} />
                <Tab label="Register" index={1} />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              {!forgotPasswd ? (
                <SignIn onSignIn={onSignIn} />
              ) : (
                <ForgotPassword onForget={onForget} />
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SignUp onSignUp={onSignUp} />
            </TabPanel>
          </Stack>
        </Container>
      </Modal>
    </>
  );
}
