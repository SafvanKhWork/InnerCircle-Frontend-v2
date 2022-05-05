import { Container, makeStyles } from "@material-ui/core";
import {
  Button,
  Divider,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Tooltip } from "chart.js";
import Post from "./Post";
import React, { useEffect, useState } from "react";
import { Close } from "@material-ui/icons";
import axios from "axios";
import { getAuthHeader, url } from "../config";
import PreviewIcon from "@mui/icons-material/Preview";
import validator from "validator";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { getToken } from "../store/User/userSlice";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: 20,
    right: 20,
  },
  container: {
    borderRadius: "5px",
    width: 400,
    height: 250,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
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

export default function EditEmail({ email0, id, setRug, children }) {
  const classes = useStyles();
  const token = useSelector(getToken);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(email0);
  const [validEmail, setValidEmail] = useState(true);
  return (
    <>
      <div title="Edit" onClick={() => setOpen(true)}>
        {children}
      </div>
      <Modal
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <Container
          style={{ display: "flex", justifyContent: "center" }}
          className={classes.container}
        >
          <Box p={2}>
            <Stack direction={"column"} display={"flex"} spacing={2}>
              <div onClick={(event) => setOpen(false)}>
                <Typography
                  color={"primary"}
                  component={"div"}
                  variant="h6"
                  align="center"
                >
                  Edit Email Address
                </Typography>
              </div>
              <Divider
                style={{ paddingBottom: 5 }}
                fullWidth
                orientation="horizontal"
              />
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
              <Button
                fullWidth
                onClick={async (event) => {
                  setOpen(false);
                  const { data } = await axios.post(
                    `${url}/admin/query/${id}`,
                    {
                      email,
                    },
                    getAuthHeader(token)
                  );
                  if (data) {
                    setRug((prev) => !prev);
                  }
                }}
                color="error"
                variant="contained"
              >
                Save
              </Button>
            </Stack>
          </Box>
        </Container>
      </Modal>
    </>
  );
}
