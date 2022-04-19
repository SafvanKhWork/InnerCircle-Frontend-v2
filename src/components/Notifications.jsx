import {
  Container,
  Fab,
  FormControlLabel,
  FormLabel,
  Input,
  makeStyles,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Tooltip,
  Box,
  ImageList,
  ImageListItem,
  Badge,
} from "@material-ui/core";
import { Alert, Button, IconButton } from "@mui/material";
import {
  Add as AddIcon,
  Cancel,
  Close,
  FiberManualRecord,
  Notifications as Notification,
} from "@material-ui/icons";
import { Fragment, useEffect, useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import axios from "axios";
import { url, getAuthHeader } from "../config";

import { Scrollbars } from "react-custom-scrollbars";
import {
  getToken,
  refetchUser,
  refreshUserField,
} from "../store/User/userSlice";
import { setSpecifiedList } from "../store/Products/productListSlice";
import { Divider, Stack, Typography } from "@mui/material";
import UserMinibar from "./Details/Single Items/UserMinibar";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: 20,
    right: 20,
  },
  container: {
    borderRadius: "5px",
    width: 450,
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
            <Notification
              style={{ verticalAlign: "center", display: "flex" }}
              color="disabled"
            />
            <Typography
              px={1}
              style={{ verticalAlign: "center", display: "flex" }}
              fontSize={18}
              sx={{ color: "GrayText" }}
              fontFamily={"sans-serif"}
              textAlign={"center"}
            >
              Notifications
            </Typography>
          </Box>
          <Box mx={1} pt={1}>
            <Scrollbars
              style={{ height: 480 }}
              autoHide
              autoHideTimeout={0}
              autoHideDuration={200}
            >
              <Stack direction={"column-reverse"} spacing={1}>
                {notifications.map((notification) => {
                  const newNotification = !notification.seen;
                  return (
                    <Fragment key={notification._id}>
                      <Stack direction={"row"} spacing={1}>
                        {/* {newNotification ? (
                          <FiberManualRecord color="error" />
                        ) : (
                          ""
                        )} */}
                        <Typography
                          color={newNotification ? "HighlightText" : "GrayText"}
                        >
                          {notification.message}
                        </Typography>
                      </Stack>
                      <Divider orientation="horizontal" />
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
