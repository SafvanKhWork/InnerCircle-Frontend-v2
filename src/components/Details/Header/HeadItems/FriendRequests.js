import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Button,
  Tooltip,
  Drawer,
  Divider,
  ListItem,
  ListItemText,
  ThemeProvider,
  MenuItem,
  Popper,
  Grow,
  ClickAwayListener,
  Paper,
  Menu,
  MenuList,
  Badge,
  Alert,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../../store/User/userSlice";
import { url } from "../../../config";
import { getToken, logout } from "../../../store/User/userSlice";
import SingleFriendRequest from "./SingleFriendRequest";
import Scrollbars from "react-custom-scrollbars";

//

const FriendRequests = (props) => {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const drawerWidth = 240;
  const anchorRef = React.useRef(null);
  const user = useSelector(getUser);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
    }

    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={"friendRequests"}>
        <IconButton
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Badge
            color="error"
            variant="standard"
            invisible={user.friendRequest?.length <= 0}
            badgeContent={user.friendRequest?.length}
          >
            <GroupIcon sx={{ color: "white" }} />
          </Badge>
        </IconButton>
      </Tooltip>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "right bottom" : "right top",
            }}
          >
            <Paper>
              {user.friendRequest.length <= 0 ? (
                <Alert severity="info">No Friend Requests Found</Alert>
              ) : (
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {user.friendRequest?.slice(-3).map((request, i) => (
                    <Box px={1} key={i + "request"}>
                      <SingleFriendRequest user={request} />
                      {i !== 2 && user.friendRequest.length - 1 !== i ? (
                        <Divider />
                      ) : user.friendRequest.length - 1 !== 2 &&
                        user.friendRequest.length > 2 ? (
                        <React.Fragment>
                          <Divider />
                          <Button variant="contained" fullWidth>
                            Veiw All Requests
                          </Button>
                        </React.Fragment>
                      ) : (
                        ""
                      )}
                    </Box>
                  ))}
                </MenuList>
              )}
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default FriendRequests;
