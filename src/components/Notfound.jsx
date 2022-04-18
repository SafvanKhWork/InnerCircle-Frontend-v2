import { Fragment } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import {
  Box,
  Button,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Container } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
}));
export default function Notfound({ is404, alone }) {
  const classes = useStyles();
  let msg;
  if (is404) {
    msg = {
      severity: "error",
      title: "404: Page not Found!",
      describe:
        "Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?   Let's go home and try from there.",
    };
  } else if (alone) {
    msg = {
      severity: "info",
      title: "Feed is Empty!",
      describe:
        "Please Add Some Friends to in order to view their posts in your feed.",
    };
  } else {
    msg = {
      severity: "warning",
      title: "No Such Item Found!",
      describe:
        "The Product you are looking does not exist or has already been sold.",
    };
  }
  return (
    <Container className={is404 ? classes.container : ""}>
      <Alert variant="standard" severity={msg.severity}>
        <AlertTitle>
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: 18,
              fontFamily: "monospace",
            }}
          >
            {msg.title}
          </Typography>
        </AlertTitle>
        <Typography style={{ fontFamily: "monospace" }}>
          {msg.describe}
        </Typography>
      </Alert>
      {/* <Divider flexItem style={{ marginBottom: 5 }} />
      <Box
        fontSize={18}
        p={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button fullWidth>
          <Typography
            style={{

              fontSize: 18,
            }}
          >
            Home
          </Typography>
        </Button>
      </Box> */}
    </Container>
  );
}
