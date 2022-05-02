import { makeStyles } from "@material-ui/core";
import { Container, Modal, TextField } from "@mui/material";
import { Tooltip } from "chart.js";
import Post from "./Post";
import React, { useEffect, useState } from "react";
import { Close } from "@material-ui/icons";
import axios from "axios";
import { url } from "../config";
import PreviewIcon from "@mui/icons-material/Preview";
import validator from "validator";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: 20,
    right: 20,
  },
  container: {
    borderRadius: "5px",
    width: 500,
    height: 550,
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

export default function PostPreview({ id, setRug }) {
  const [user, setUser] = useState({});
  useEffect(async () => {
    const { data } = await axios.get(`${url}/products/id/${id}`);
    if (data) {
      setUser(data);
    }
    return () => {};
  }, []);

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [strongPassword, setStrongPassword] = useState(true);
  return (
    <>
      <div title="Friends" aria-label="friends" onClick={() => setOpen(true)}>
        <PreviewIcon />
      </div>
      <Modal
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <Container className={classes.container}>
          <div onClick={(event) => setOpen(false)}>
            <Close />
          </div>
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
              !validPassword ? "error" : !strongPassword ? "warning" : "primary"
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
        </Container>
      </Modal>
    </>
  );
}
