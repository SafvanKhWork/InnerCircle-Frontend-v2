import { useState, useEffect, Fragment } from "react";
import { url } from "../../../config";
import validator from "validator";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Stack,
  Box,
  Typography,
  Container,
  Grid,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme";
import {
  getToken,
  initUser,
  refreshUser,
  signIn,
} from "../../../store/User/userSlice";
import axios from "axios";

const SignIn = (props) => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  let temail;
  const { isLoggedIn, setIsLoggedIn } = props.status;
  const [inProgress, setInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [email, setEmail] = useState(temail || "");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [strongPassword, setStrongPassword] = useState(true);
  let user;

  const sendLoginRequest = async (payload) => {
    const { credentials, setErrorMessage, setIsLoggedIn, setInProgress } =
      payload;
    try {
      setInProgress(true);
      const response = await axios.post(`${url}/user/login`, credentials);
      const { data } = response;
      if (data) {
        window.localStorage.setItem(
          "inner-circle-token",
          JSON.stringify(data.token)
        );
        setInProgress(false);
        setIsLoggedIn(true);
        return data;
      }
    } catch (error) {
      setInProgress(false);
      setErrorMessage(`Provided Email Address or Password is Invalid`);
    }
  };

  const checkErrors = () => {
    if (email.trim() === "" || password.trim() === "") {
      let component = email.trim() === "" ? "Email" : "";
      component = password.trim() === "" ? "Password" : component;
      component =
        password.trim() === "" && email === "" ? "Email & Password" : component;
      setErrorMessage(`Please Enter ${component}`);
    } else if (!validEmail || !validPassword) {
      let component = !validEmail ? "Email" : "";
      component = !validPassword ? "Password" : component;
      component =
        !validEmail && !validPassword ? "Email & Password" : component;
      setErrorMessage(`Please Enter Valid ${component}`);
    } else if (validEmail && validPassword) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const isValid = checkErrors();
      if (isValid) {
        const credentials = { email, password };
        // await dispatch(
        //   signIn({
        //     credentials,
        //     setErrorMessage,
        //     setIsLoggedIn,
        //     setInProgress,
        //   })
        // );
        const responseData = await sendLoginRequest({
          credentials,
          setErrorMessage,
          setIsLoggedIn,
          setInProgress,
        });
        user = responseData.user;
        dispatch(initUser());
      }
      temail = email;
      setPassword("");
      setValidPassword(false);
    } catch (error) {
      console.log(error);
    }
  };
  // if (!user) {
  //   dispatch(refreshUser(!user));
  // }
  // let user;
  // useEffect(async () => {
  //   const { data } = await axios.get(`${url}/user/me`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   user = data;
  // }, [token]);

  // if (user) {
  //   dispatch(refreshUser(user));
  // }
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
            <Fragment>
              {" "}
              <Typography component="h1" variant="h5">
                SignIn
              </Typography>
              {errorMessage ? (
                <Alert severity="error">{errorMessage}</Alert>
              ) : (
                ""
              )}
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setValidEmail(validator.isEmail(e.target.value));
                  }}
                  color={!validEmail ? "error" : "primary"}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  value={password}
                  color={
                    !validPassword
                      ? "error"
                      : !strongPassword
                      ? "warning"
                      : "primary"
                  }
                  fullWidth
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setValidPassword(validator.isLength(e.target.value, 6, 18));
                    setStrongPassword(
                      validator.isStrongPassword(e.target.value)
                    );
                  }}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
                {/* <Grid container>
                  <Grid item xs>
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => {
                        props.status.setHasPasswd(false);
                      }}
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid> */}
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Stack spacing={1}>
                  <Button
                    onClick={() => {
                      props.status.setIsUser(!props.status.isUser);
                    }}
                    variant="outlined"
                    fullWidth
                  >
                    {"Don't have an account? Sign Up"}
                  </Button>
                </Stack>
              </Box>
            </Fragment>
          ) : (
            ""
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
