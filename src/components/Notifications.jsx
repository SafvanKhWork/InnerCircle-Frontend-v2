import { Container, makeStyles, Modal, Tooltip, Box } from "@material-ui/core";

import { Notifications as Notification } from "@material-ui/icons";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { url, getAuthHeader } from "../config";

import { Scrollbars } from "react-custom-scrollbars";
import { refreshUserField } from "../store/User/userSlice";
import { Divider, Stack, Typography } from "@mui/material";

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

const Notifications = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { notifications, token } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  const [isLandscape, setIsLandscape] = useState(
    window.matchMedia("(orientation: landscape").matches
  );
  window.addEventListener("resize", () => {
    setIsLandscape(window.matchMedia("(orientation: landscape").matches);
  });

  return (
    <>
      <Tooltip
        title="Notifications"
        aria-label="friends"
        onClick={() => setOpen(true)}
      >
        {props.children}
      </Tooltip>
      <Modal
        onClose={async () => {
          const { data: notifications } = await axios.patch(
            `${url}/user/notifications/seen`,
            "",
            getAuthHeader(token)
          );
          if (notifications) {
            dispatch(refreshUserField({ notifications }));
          }
          setOpen(false);
        }}
        open={open}
      >
        <Container className={classes.container}>
          <Box display={"flex"} style={{ verticalAlign: "center" }} pt={2}>
            <div
              onClick={async () => {
                const { data: notifications } = await axios.patch(
                  `${url}/user/notifications/seen`,
                  "",
                  getAuthHeader(token)
                );
                if (notifications) {
                  dispatch(refreshUserField({ notifications }));
                }
                setOpen(false);
              }}
            >
              <Stack direction={"row"}>
                <Notification
                  style={{
                    alignSelf: "center",
                    verticalAlign: "center",
                    display: "flex",
                  }}
                />

                <Typography
                  px={1}
                  style={{
                    alignSelf: "center",
                    verticalAlign: "center",
                    display: "flex",
                  }}
                  fontSize={18}
                  fontWeight={"bold"}
                  fontFamily={"sans-serif"}
                  textAlign={"center"}
                >
                  Notifications
                </Typography>
              </Stack>
            </div>
          </Box>
          <Box mx={1} pt={1}>
            <Scrollbars
              style={{ height: isLandscape ? 480 : 600 }}
              autoHide
              autoHideTimeout={0}
              autoHideDuration={200}
            >
              <Stack direction={"column-reverse"} spacing={1}>
                {notifications.map((notification) => {
                  const newNotification = !notification.seen;
                  return (
                    <Fragment key={notification._id}>
                      <Divider orientation="horizontal" />
                      <Stack direction={"row"} spacing={1}>
                        <Typography
                          color={newNotification ? "HighlightText" : "GrayText"}
                        >
                          {notification.message}
                        </Typography>
                      </Stack>
                    </Fragment>
                  );
                })}
              </Stack>
            </Scrollbars>
          </Box>
        </Container>
      </Modal>
    </>
  );
};

export default Notifications;
