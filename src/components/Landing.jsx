import {
  alpha,
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Icon,
  IconButton,
  makeStyles,
  Paper,
  Toolbar,
} from "@material-ui/core";
import { TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Divider, Stack } from "@mui/material";
import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import traditionalMarket from "../assets/4331336.jpg";
import happyFamily from "../assets/5865.jpg";
import queriesComment from "../assets/2469966.jpg";
import interestedBuyer from "../assets/4706264 (copy).jpg";
import detailedInfo from "../assets/5100169 (copy).jpg";
import barterMobile from "../assets/mobileList.webp";
import { DialogAuth } from "react-mui-auth-page";
import axios from "axios";
import { url } from "../config";
import { useDispatch } from "react-redux";
import { login } from "../store/ApplicationStates/applicationStateSlice";
import { refreshUserField } from "../store/User/userSlice";
import {
  Email,
  Facebook,
  Instagram,
  LinkedIn,
  Phone,
  Reddit,
  Twitter,
} from "@material-ui/icons";
import AuthModel from "./Auth/AuthModel";

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
  const phone = "+910000000000";
  const email = "adminuser@dev.io";
  const facebook = "@adminuser";
  const instagram = "@adminuser";
  const reddit = "u/adminuser";
  const twitter = "@adminuser";
  const linkedIn = "@adminuser";
  const classes = useStyles();

  const [feedbackFocus, setFeedbackFocus] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSignIn = async ({ email, password, setErrorMessage }) => {
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
      setErrorMessage(`Provided Email Address or Password is Invalid`);
    }
  };
  const handleSignUp = async ({ email, name, password, setErrorMessage }) => {
    try {
      const { data } = await axios.post(`${url}/user/register`, {
        email,
        name,
      });
      return data;
    } catch (error) {
      setErrorMessage(`Provided Email Address or Password is Invalid`);
    }
  };
  const handleForget = async ({ email }) => {
    const { data } = await axios.post(`${url}/verify/email`, { email });
    return data;
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
          <AuthModel
            onSignUp={handleSignUp}
            onForget={handleForget}
            onSignIn={handleSignIn}
          >
            <Button
              variant="contained"
              color="secondary"
              style={{ color: "white" }}
            >
              Login
            </Button>
          </AuthModel>
        </Toolbar>
      </AppBar>
      {/* <DialogAuth
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
      /> */}
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
          <Grid item lg={12}>
            <Box px={1} pb={10}>
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
          <Grid item lg={3}>
            <Paper variant="outlined">
              <Box p={1} maxHeight={400} minHeight={400}>
                <Stack direction={"column"} spacing={2}>
                  <img src={interestedBuyer} height="300px" />
                  <Typography
                    color="textPrimary"
                    align="center"
                    variant="subtitle1"
                  >
                    Get your products in front of interested buyers.
                  </Typography>
                </Stack>
              </Box>
            </Paper>
          </Grid>
          <Grid item lg={3}>
            <Paper variant="outlined">
              <Box p={1} maxHeight={400} minHeight={400}>
                <Stack direction={"column"} spacing={2}>
                  <img src={queriesComment} height="300px" />
                  <Typography
                    color="textPrimary"
                    align="center"
                    variant="subtitle1"
                  >
                    Provide fast answers of queries with comments.
                  </Typography>
                </Stack>
              </Box>
            </Paper>
          </Grid>
          <Grid item lg={3}>
            <Paper variant="outlined">
              <Box p={1} maxHeight={400} minHeight={400}>
                <Stack direction={"column"} spacing={2}>
                  <img src={detailedInfo} height="300px" />
                  <Typography
                    color="textPrimary"
                    align="center"
                    variant="subtitle1"
                  >
                    Deliver useful information such as price and product
                    description.
                  </Typography>
                </Stack>
              </Box>
            </Paper>
          </Grid>
          <Grid item lg={3}>
            <Paper variant="outlined">
              <Box p={1} maxHeight={400} minHeight={400}>
                <Stack direction={"column"} spacing={2}>
                  <img src={barterMobile} height="300px" />
                  <Typography
                    color="textPrimary"
                    align="center"
                    variant="subtitle1"
                  >
                    Target buyers on the go with mobile-friendly listings.
                  </Typography>
                </Stack>
              </Box>
            </Paper>
          </Grid>
          <Grid item lg={12}>
            <Box style={{ paddingTop: "10%" }} minHeight={1}></Box>
          </Grid>
        </Grid>
      </Container>
      <Box style={{ backgroundColor: "#202647" }} minHeight={350}>
        <Box p={3}>
          <Grid
            // style={{ display: "flex", justifyContent: "center" }}
            spacing={1}
            container
          >
            <Grid item lg={6}>
              <Box style={{ paddingRight: "15%" }}>
                <Stack direction={"column"} spacing={1}>
                  <Typography
                    style={{ color: "white" }}
                    align="left"
                    variant="subtitle1"
                    fontWeight={"bold"}
                  >
                    {`About Us.`}
                  </Typography>
                  <Divider
                    sx={{ backgroundColor: "white" }}
                    orientation="horizontal"
                  />

                  <Typography
                    style={{ color: "white" }}
                    align="left"
                    variant="caption"
                  >
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old. Richard
                    McClintock, a Latin professor at Hampden-Sydney College in
                    Virginia, looked up one of the more obscure Latin words,
                    consectetur, from a Lorem Ipsum passage, and going through
                    the cites of the word in classical literature, discovered
                    the undoubtable source. Lorem Ipsum comes from sections
                    1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The
                    Extremes of Good and Evil) by Cicero, written in 45 BC. This
                    book is a treatise on the theory of ethics, very popular
                    during the Renaissance. The first line of Lorem Ipsum,
                    "Lorem ipsum dolor sit amet..", comes from a line in section
                    1.10.32.
                  </Typography>
                </Stack>
              </Box>
            </Grid>
            <Grid item lg={6}>
              <Stack direction={"column"} spacing={1}>
                <Typography
                  style={{
                    color: "white",
                    verticalAlign: "middle",
                    display: "flex",
                  }}
                  variant="subtitle1"
                  fontWeight={"bold"}
                >
                  {`Contact Us:`}
                </Typography>
                <Divider
                  sx={{ backgroundColor: "white" }}
                  orientation="horizontal"
                />
                <Stack direction={"row"} spacing={1}>
                  <Phone
                    fontSize={"small"}
                    style={{
                      color: "white",
                      verticalAlign: "middle",
                      display: "flex",
                    }}
                  />
                  <Typography
                    align={"left"}
                    style={{
                      color: "white",
                      verticalAlign: "middle",
                      display: "flex",
                    }}
                    variant="caption"
                  >
                    {phone}
                  </Typography>
                </Stack>
                <Stack direction={"row"} spacing={1}>
                  <Email
                    fontSize={"small"}
                    style={{
                      color: "white",
                      verticalAlign: "middle",
                      display: "flex",
                    }}
                  />
                  <Typography
                    align={"left"}
                    style={{
                      color: "white",
                      verticalAlign: "middle",
                      display: "flex",
                    }}
                    variant="caption"
                  >
                    {email}
                  </Typography>
                </Stack>

                <Stack direction={"row"} spacing={1}>
                  <Twitter
                    fontSize={"small"}
                    style={{
                      color: "white",
                      verticalAlign: "middle",
                      display: "flex",
                    }}
                  />
                  <Typography
                    align={"left"}
                    style={{
                      color: "white",
                      verticalAlign: "middle",
                      display: "flex",
                    }}
                    variant="caption"
                  >
                    {twitter}
                  </Typography>
                </Stack>

                <Stack direction={"row"} spacing={1}>
                  <Facebook
                    fontSize={"small"}
                    style={{
                      color: "white",
                      verticalAlign: "middle",
                      display: "flex",
                    }}
                  />
                  <Typography
                    align={"left"}
                    style={{
                      color: "white",
                      verticalAlign: "middle",
                      display: "flex",
                    }}
                    variant="caption"
                  >
                    {facebook}
                  </Typography>
                </Stack>

                <Stack direction={"row"} spacing={1}>
                  <LinkedIn
                    fontSize={"small"}
                    style={{
                      color: "white",
                      verticalAlign: "middle",
                      display: "flex",
                    }}
                  />
                  <Typography
                    align={"left"}
                    style={{
                      color: "white",
                      verticalAlign: "middle",
                      display: "flex",
                    }}
                    variant="caption"
                  >
                    {linkedIn}
                  </Typography>
                </Stack>

                <Stack direction={"row"} spacing={1}>
                  <Instagram
                    fontSize={"small"}
                    style={{
                      color: "white",
                      verticalAlign: "middle",
                      display: "flex",
                    }}
                  />
                  <Typography
                    align={"left"}
                    style={{
                      color: "white",
                      verticalAlign: "middle",
                      display: "flex",
                    }}
                    variant="caption"
                  >
                    {instagram}
                  </Typography>
                </Stack>
                <Stack direction={"row"} spacing={1}>
                  <Reddit
                    fontSize={"small"}
                    style={{
                      color: "white",
                      verticalAlign: "middle",
                      display: "flex",
                    }}
                  />
                  <Typography
                    align={"left"}
                    style={{
                      color: "white",
                      verticalAlign: "middle",
                      display: "flex",
                    }}
                    variant="caption"
                  >
                    {reddit}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item lg={4}>
              <Stack
                display={"flex"}
                justifyContent={"space-evenly"}
                direction={"row"}
                spacing={1}
              >
                <TextField
                  multiline
                  color=""
                  onChange={(event) => {
                    setFeedback(event.target.value);
                  }}
                  style={{ backgroundColor: "#dbdeff", borderRadius: "0.2em" }}
                  fullWidth
                  value={feedback}
                  size="small"
                  maxRows={3}
                  onFocus={(event) => {
                    setFeedbackFocus(true);
                  }}
                  label={feedbackFocus ? "" : "feedback"}
                />
                <Button
                  onClick={(event) => {
                    try {
                      const { data } = axios.post(`${url}/feedback/new`, {
                        feedback,
                      });
                      setFeedback("");
                      setFeedbackFocus(false);
                    } catch (error) {
                      console.error(error.message);
                    }
                  }}
                  variant="contained"
                  color="secondary"
                >
                  submit
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}
