import { useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Stack,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

//
import theme from "../../../theme";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/SafvanKhWork/InnerCircle">
        InnerCircle
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const VerifyEmail = (props) => {
  const [isSent, setIsSent] = useState(false);
  const email = "test@id.io";

  let isValid = false;
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Verify Email
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {isSent ? (
              <Stack spacing={1}>
                <p>
                  6-digit code is sent to you at <b>{email}</b>.
                </p>
                <TextField required fullWidth name="otp" label="OTP" id="otp" />

                <Button
                  fullWidth
                  onClick={() => {
                    {
                      //Compare Sent OTP & entered OTP
                      isValid = true;
                    }
                    if (isValid) {
                      props.status.setIsValidOTP(true);
                    }
                    if (!isValid) {
                      setIsSent(false);
                    }
                  }}
                  variant="outlined"
                >
                  {"Verify OTP"}
                </Button>
              </Stack>
            ) : (
              <Stack spacing={1}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <Button
                  fullWidth
                  onClick={() => {
                    setIsSent(true);
                  }}
                  variant="outlined"
                >
                  {"Send OTP"}
                </Button>
              </Stack>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default VerifyEmail;
