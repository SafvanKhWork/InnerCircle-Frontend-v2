import {
  alpha,
  AppBar,
  Box,
  Container,
  Grid,
  Icon,
  IconButton,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import LoginIcon from "@mui/icons-material/Login";
import { Divider, Stack } from "@mui/material";
import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import traditionalMarket from "../assets/4331336.jpg";
import happyFamily from "../assets/5865.jpg";
import { DialogAuth } from "react-mui-auth-page";
import axios from "axios";
import { url } from "../config";
import { useDispatch } from "react-redux";
import { login } from "../store/ApplicationStates/applicationStateSlice";
import { refreshUserField } from "../store/User/userSlice";

const useStyles = makeStyles((theme) => ({
  rotateIcon: {
    animation: "$spin 2s linear infinite",
  },
  "@keyframes spin": {
    "0%": {
      transform: "rotate(360deg)",
    },
    "100%": {
      transform: "rotate(0deg)",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  logoLg: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  logoSm: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  container: {
    paddingTop: theme.spacing(10),
  },
  search: {
    display: "flex",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      display: (props) => (props.open ? "flex" : "none"),
      width: "70%",
    },
  },
  input: {
    color: "white",
    marginLeft: theme.spacing(1),
  },
  cancel: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  sideImage: {
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  aboveImage: {
    fontWeight: 500,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  searchButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  icons: {
    alignItems: "center",
    display: (props) => (props.open ? "none" : "flex"),
  },
  badge: {
    marginRight: theme.spacing(2),
  },
}));

export default function Landing() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleSignIn = async ({ email, password }) => {
    try {
      const response = await axios.post(`${url}/user/login`, {
        email,
        password,
      });
      const { data } = response;
      if (data) {
        window.localStorage.setItem(
          "inner-circle-token",
          JSON.stringify(data.token)
        );
        dispatch(refreshUserField({ token: data.token }));
        dispatch(login());
        return data;
      }
    } catch (error) {
      console.log(`Provided Email Address or Password is Invalid`);
    }
  };
  const handleSignUp = async ({ email, name, password }) => {
    try {
      const { data } = await axios.post(`${url}/user/register`, {
        email,
        name,
        password,
        username: name.split(" ").join("") + String(Date.now()),
      });
      if (data) {
        window.localStorage.setItem(
          "inner-circle-token",
          JSON.stringify(data.token)
        );
        dispatch(refreshUserField({ token: data.token }));
        dispatch(login());
        return data;
      }
    } catch (error) {
      console.log(`Provided Email Address or Password is Invalid`);
    }
  };
  const handleForget = ({ email }) => {
    console.log({ email });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSocial = {};

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h4" className={classes.logoLg}>
            InnerCircle
          </Typography>
          <Typography variant="h5" className={classes.logoSm}>
            InnerCircle
          </Typography>
          <IconButton
            onClick={() => {
              setOpen(true);
            }}
          >
            <LoginIcon sx={{ color: "white" }} className={classes.icons} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogAuth
        open={open}
        textFieldVariant="outlined"
        logoComponent={
          <>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Cortana-vector-logo.png"
              alt="InnerCircle"
              height="100px"
            />
          </>
        }
        logoName={"InnerCircle"}
        onClose={handleClose}
        handleSignUp={handleSignUp}
        handleForget={handleForget}
        handleSignIn={handleSignIn}
        handleSocial={handleSocial}
      />
      <Container className={classes.container}>
        <Grid
          style={{ display: "flex", justifyContent: "center" }}
          spacing={1}
          container
        >
          {/* <img src={happyFamily} className={classes.aboveImage} height={300} /> */}
          <Grid item lg={6}>
            <Box
              minHeight={500}
              style={{
                paddingTop: "25%",
                display: "flex",
                verticalAlign: "middle",
              }}
            >
              <Stack direction={"column"} spacing={0.5}>
                <Typography color="primary" align="left" variant="h6">
                  InnerCircle
                </Typography>
                <Typography align="left" variant="h3">
                  {`Connect your products to your local community.`}
                </Typography>
                <Box
                  style={{
                    paddingRight: "20%",
                  }}
                >
                  <Typography
                    color="secondary"
                    align="left"
                    variant="subtitle1"
                  >
                    Buy, sell or discover new and used items easily on
                    InnerCircle, locally or from businesses. Find great deals on
                    new items shipped from stores to your door.
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>

          <Grid className={classes.sideImage} item lg={6}>
            <Box
              minHeight={500}
              maxHeight={500}
              style={{
                paddingTop: "25%",
                display: "flex",
                verticalAlign: "middle",
              }}
            >
              <img src={traditionalMarket} height={450} />
            </Box>
          </Grid>
          <Divider variant="fullWidth" orientation="horizontal" />
          <Grid className={classes.sideImage} item lg={12}>
            <Box px={25} pb={15}>
              <Stack direction={"column"} spacing={0.5}>
                <Typography align="center" variant="h4">
                  Get your products in front of interested buyers.
                </Typography>
                <Typography color="secondary" align="center" variant="body1">
                  Marketplace is a place for people and businesses to discover,
                  buy and sell items listed on Facebook within their local
                  community. Here are some of the benefits of selling on
                  Marketplace:
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Divider orientation="horizontal" />
          <Grid className={classes.sideImage} item lg={3}>
            <Box minHeight={300}>
              <Stack direction={"column"} spacing={0.5}>
                <Typography align="center" variant="h5">
                  Get your products in front of interested buyers.
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid className={classes.sideImage} item lg={3}>
            <Box minHeight={300}>
              <Stack direction={"column"} spacing={0.5}>
                <Typography align="center" variant="h5">
                  Provide fast answers of queries with real-time comments.
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid className={classes.sideImage} item lg={3}>
            <Box minHeight={300}>
              <Stack direction={"column"} spacing={0.5}>
                <Typography align="center" variant="h5">
                  Deliver useful information such as price and product
                  description.
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid className={classes.sideImage} item lg={3}>
            <Box minHeight={300}>
              <Stack direction={"column"} spacing={0.5}>
                <Typography align="center" variant="h5">
                  Target buyers on the go with mobile-friendly listings.
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
