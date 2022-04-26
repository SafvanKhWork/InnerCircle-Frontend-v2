import {
  Box,
  Button,
  Container,
  makeStyles,
  Modal,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Stack } from "@mui/material";
import { ar } from "date-fns/locale";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: 20,
    right: 20,
  },
  container: {
    borderRadius: "5px",
    width: 450,
    height: 150,
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

export default function Confirm(props) {
  const [open, setOpen] = useState(false);
  const message = props.message;
  const handleConfirm = props.onConfirm;
  const handleCancal = props.onCancal;
  const classes = useStyles();
  return (
    <>
      <Tooltip
        title="Friends"
        aria-label="friends"
        onClick={() => setOpen(true)}
      >
        {props.children}
      </Tooltip>
      <Modal open={open}>
        <Container className={classes.container}>
          <Stack p={1} spacing={4}>
            <Typography variant="h6">{message}</Typography>
            <Stack
              direction={"row"}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Button
                onClick={handleConfirm}
                variant="text"
                color="inherit"
                style={{ color: "green" }}
              >
                Confirm
              </Button>
              <Button
                onClick={(...args) => {
                  if (handleCancal) {
                    handleCancal(args);
                  }
                  setOpen(false);
                }}
                variant="text"
                color="inherit"
                style={{ color: "red" }}
              >
                Cancal
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Modal>
    </>
  );
}
