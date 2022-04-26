import * as React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Alert,
  Grid,
  Box,
  Typography,
  Container,
  Stack,
  Avatar,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import { ThemeProvider, styled } from "@mui/material/styles";
import axios from "axios";
import { url } from "../../../config";
//
import theme from "../../../theme";
import { useDispatch } from "react-redux";
import { initUser, refreshUser } from "../../../store/User/userSlice";

const Input = styled("input")({
  display: "none",
});

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 68,
      height: 68,
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function SignUp(props) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rePassword, setRePassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const { isLoggedIn, setIsLoggedIn } = props.status;
  const [inProgress, setInProgress] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(undefined);
  const dispatch = useDispatch();
  let user, token;
  const signUp = async (
    credentials,
    setErrorMessage,
    setIsLoggedIn,
    setInProgress
  ) => {
    try {
      setInProgress(true);
      const response = await axios.post(`${url}/user/register`, credentials);
      const { data } = response;
      if (data) {
        await window.localStorage.setItem(
          "inner-circle-token",
          JSON.stringify(data.token)
        );
        dispatch(initUser("value"));
        // dispatch(refreshUser());
        console.log(data);
        user = data.user;
        token = data.token;

        const validat = setTimeout(() => {
          setInProgress(false);
          setIsLoggedIn(true);
          return () => {
            clearTimeout(validat);
          };
        }, 1000);
      }
    } catch (error) {
      const validat = setTimeout(() => {
        setInProgress(false);
        return () => {
          clearTimeout(validat);
        };
      }, 500);
      setErrorMessage(`Provided Data is Invalid`);
      console.log(error.message);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
  };
  if (!user) {
    dispatch(refreshUser(user));
  }
  const userInfo = {
    name: firstName + "" + lastName,
    email,
    password,
    username,
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {inProgress ? (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                py: 4,
              }}
            >
              <CircularProgress
                size={56}
                variant="indeterminate"
                sx={{ color: "#4db6ac" }}
              />
            </Box>
          ) : (
            ""
          )}
          {!inProgress ? (
            <React.Fragment>
              <Typography component="h1" variant="h5">
                SignUp
              </Typography>
              <Divider />
              {errorMessage ? (
                <Alert severity="error">{errorMessage}</Alert>
              ) : (
                ""
              )}
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <Grid container spacing={1}>
                  <Grid item align={"center"} xs={12}>
                    {/* <label htmlFor="icon-button-file">
                      <Input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                      />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <Avatar {...stringAvatar("Un Known")} />
                      </IconButton>
                    </label> */}
                    {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      id="username"
                      label="Username"
                      name="username"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      value={rePassword}
                      onChange={(event) => setRePassword(event.target.value)}
                      name="repassword"
                      label="Re-Password"
                      type="password"
                      id="repassword"
                      autoComplete="new-password"
                    />
                  </Grid>
                </Grid>

                <Stack spacing={1}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={async () => {
                      await signUp(
                        userInfo,
                        setErrorMessage,
                        setIsLoggedIn,
                        setInProgress
                      );
                    }}
                  >
                    Sign Up
                  </Button>
                  <Button
                    onClick={() => {
                      props.status.setIsUser(!props.status.isUser);
                    }}
                    variant="outlined"
                    fullWidth
                  >
                    {`Already have an account? Sign in`}
                  </Button>
                </Stack>
              </Box>{" "}
            </React.Fragment>
          ) : (
            ""
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
