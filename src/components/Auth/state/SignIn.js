import { useState, useEffect, Fragment } from "react";
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

import axios from "axios";
import { getToken } from "../../../store/User/userSlice";
import {
  createAccount,
  forgotPassword,
  setGlobalEmail,
} from "../../../store/ApplicationStates/applicationStateSlice";

const SignIn = (props) => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  let temail;
  const { loggedIn: isLoggedIn } = useSelector(
    (state) => state.applicationState
  );
  const gremail = useSelector((state) => state.applicationState.email);
  const [inProgress, setInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [email, setEmail] = useState(temail || gremail);
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [strongPassword, setStrongPassword] = useState(true);
  let user;

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
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (validEmail) {
      dispatch(setGlobalEmail(email));
    }
  }, [email]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!checkErrors()) {
        setInProgress(true);
        await props.onSignIn({ email, password, setErrorMessage });
      }
    } catch (error) {
      console.log(error.message);
    }
    setInProgress(false);
  };

  return (
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
            sx={{ color: "primary" }}
          />
        </Box>
      ) : (
        ""
      )}
      {!inProgress ? (
        <Fragment>
          {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : ""}
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
                setStrongPassword(validator.isStrongPassword(e.target.value));
              }}
              name="password"
              label="Password"
              type="password"
              id="password"
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
                onClick={(event) => {
                  event.preventDefault();
                  dispatch(createAccount());
                }}
                variant="outlined"
                fullWidth
              >
                {"Don't have an account? Sign Up"}
              </Button>
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  dispatch(forgotPassword());
                }}
                variant="outlined"
                fullWidth
              >
                {"Forgot Password?"}
              </Button>
            </Stack>
          </Box>
        </Fragment>
      ) : (
        ""
      )}
    </Box>
  );
};

export default SignIn;
