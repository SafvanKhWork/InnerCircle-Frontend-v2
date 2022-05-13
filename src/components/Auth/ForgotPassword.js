import { Alert, Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { url } from "../../config";
import {
  createAccount,
  hasPassword,
  setGlobalEmail,
} from "../../store/ApplicationStates/applicationStateSlice";

const ForgotPassword = (props) => {
  const dispatch = useDispatch();
  const gremail = useSelector((state) => state.applicationState.email);
  const [isSent, setIsSent] = useState(false);
  const [email, setEmail] = useState(gremail);
  const [status, setStatus] = useState(false);
  useEffect(() => {
    if (validator.isEmail(email)) {
      dispatch(setGlobalEmail(email));
    }
  }, [email]);

  if (status) {
    return (
      <Fragment>
        <Alert severity="error">
          <p>
            No Account Found with Email Address <b>{email}</b>, Please create
            new Account.
          </p>
        </Alert>
        <Box py={1}>
          <Button
            style={{ paddingTop: 1 }}
            fullWidth
            onClick={() => {
              dispatch(createAccount());
            }}
            variant="outlined"
          >
            {"Okay"}
          </Button>
        </Box>
      </Fragment>
    );
  }

  if (isSent) {
    return (
      <Fragment>
        <Alert severity="info">
          <p>
            Temporary credentials for your InnerCircle account were sent to{" "}
            <b>{email}</b>, Please use them for logging in.
          </p>
        </Alert>
        <Box py={1}>
          <Button
            style={{ paddingTop: 1 }}
            fullWidth
            onClick={() => {
              dispatch(hasPassword());
            }}
            variant="outlined"
          >
            {"Done"}
          </Button>
        </Box>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Grid container display={"flex"} justifyContent={"center"} spacing={1}>
        <Grid item lg={12}>
          <TextField
            fullWidth={true}
            required
            color={validator.isEmail(email) ? "primary" : "error"}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            id="email"
            label="Email Address"
            name="email"
          />
        </Grid>
        <Grid item lg={12}>
          <Button
            fullWidth={true}
            onClick={async () => {
              const { data } = await axios.post(`${url}/verify/email`, {
                email,
              });
              if (data?.me) {
                setStatus(true);
              }
              setIsSent(true);
            }}
            variant="outlined"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ForgotPassword;
