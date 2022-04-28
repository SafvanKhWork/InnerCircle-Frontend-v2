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
import { styled } from "@mui/material/styles";
import axios from "axios";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import {
  accountCreated,
  setGlobalEmail,
} from "../../../store/ApplicationStates/applicationStateSlice";
import { url } from "../../../config";
import gravatar from "gravatar";

const Input = styled("input")({
  display: "none",
});

export default function SignUp(props) {
  const gremail = useSelector((state) => state.applicationState.email);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState(gremail);
  const [sent, setSent] = React.useState(false);
  const [inProgress, setInProgress] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(undefined);
  const [image, setImage] = React.useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setInProgress(true);
    try {
      await axios.post(`${url}/user/register`, userInfo);
      // dispatch(accountCreated());
      setSent(true);
    } catch (error) {
      setErrorMessage(
        `Provided email ${email} is already associated with an other existing account.`
      );
    }
    setInProgress(false);
  };
  React.useEffect(() => {
    if (validator.isEmail(email)) {
      dispatch(setGlobalEmail(email));
      const avatar =
        "https://" +
        gravatar
          ?.url(email, {
            s: 400,
            r: "pg",
            d: "mm",
          })
          ?.slice(2);
      setImage(avatar);
    }
  }, [email]);

  if (sent) {
    return (
      <React.Fragment>
        <Alert severity="info">
          <p>
            Temporary credentials for your new InnerCircle account were sent to{" "}
            <b>{email}</b>, Please use them for logging in.
          </p>
        </Alert>
        <Box py={1}>
          <Button
            style={{ paddingTop: 1 }}
            fullWidth
            onClick={() => {
              dispatch(accountCreated());
            }}
            variant="outlined"
          >
            {"Done"}
          </Button>
        </Box>
      </React.Fragment>
    );
  }

  const userInfo = {
    name: firstName + "" + lastName,
    email,
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
        <React.Fragment>
          {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : ""}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={1}>
              <Grid item align={"center"} xs={12}>
                <Avatar sx={{ height: 64, width: 64 }} src={image} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
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
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  color={validator.isEmail(email) ? "primary" : "error"}
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  id="email"
                  label="Email Address"
                  name="email"
                />
              </Grid>
            </Grid>

            <Stack spacing={1}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
              >
                Sign Up
              </Button>
              <Button
                onClick={() => {
                  dispatch(accountCreated());
                }}
                variant="outlined"
                fullWidth
              >
                {`Already have an account? Sign in`}
              </Button>
            </Stack>
          </Box>
        </React.Fragment>
      ) : (
        ""
      )}
    </Box>
  );
}
