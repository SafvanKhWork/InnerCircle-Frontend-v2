import { Badge, Container, makeStyles, Typography } from "@material-ui/core";
import {
  Bookmark,
  List,
  ExitToApp,
  Face,
  Home,
  Person,
  PhotoCamera,
  PlayCircleOutline,
  Settings,
  Storefront,
  TabletMac,
  Explore,
} from "@material-ui/icons";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Stack } from "@mui/material";
import userEvent from "@testing-library/user-event";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/User/userSlice";
import { setCurrent } from "../store/Products/productListSlice";
import { getUser } from "../store/User/userSlice";
import Friends from "./Friends";
import { logout as signout } from "../store/ApplicationStates/applicationStateSlice";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    color: "white",
    paddingTop: theme.spacing(10),
    backgroundColor: theme.palette.primary.main,
    position: "sticky",
    top: 0,
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "white",
      color: "#555",
      border: "1px solid #ece7e7",
    },
  },
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
      cursor: "pointer",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: "18px",
    },
  },
  iconbad: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  admin: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  badge: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  text: {
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const Leftbar = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  return (
    <Container className={classes.container}>
      {user.admin ? (
        <Link
          className={classes.admin}
          style={{ color: "inherit", textDecoration: "none" }}
          to={"/admin"}
        >
          <div className={classes.item}>
            <AdminPanelSettingsIcon className={classes.icon} />
            <Typography className={classes.text}>Administrator</Typography>
          </div>
        </Link>
      ) : (
        ""
      )}
      <Link
        style={{ color: "inherit", textDecoration: "none" }}
        to={"/profile"}
      >
        <div className={classes.item}>
          <Face className={classes.icon} />
          <Typography className={classes.text}>Profile</Typography>
        </div>
      </Link>
      <Link style={{ color: "inherit", textDecoration: "none" }} to={"/feed"}>
        <div className={classes.item}>
          <Home className={classes.icon} />
          <Typography className={classes.text}> Feed</Typography>
        </div>
      </Link>
      <Friends>
        <Stack
          direction={"row"}
          display="flex"
          justifyContent={"space-between"}
        >
          <div className={classes.item}>
            <Badge
              color="error"
              showZero={false}
              badgeContent={user.friendRequest.length || 0}
              max={9}
              className={classes.badge}
            >
              <Person className={classes.icon} />
            </Badge>
            <Person className={classes.iconbad} />
            <Typography className={classes.text}>Friends</Typography>
          </div>
          {user.friendRequest.length > 0 ? (
            <Typography
              p={1}
              className={classes.text}
              style={{
                backgroundColor: "GrayText",
                textAlign: "center",
                color: "white",
                borderRadius: "1em",
                maxHeight: 19,
                minWidth: 19,
              }}
            >
              {user.friendRequest.length || 0}
            </Typography>
          ) : (
            ""
          )}
        </Stack>
      </Friends>

      <Link
        style={{ color: "inherit", textDecoration: "none" }}
        to={"/discover"}
      >
        <div className={classes.item}>
          <Explore className={classes.icon} />
          <Typography className={classes.text}>Discover</Typography>
        </div>
      </Link>
      <div
        onClick={() => {
          navigate("/");
          dispatch(signout());
          dispatch(logout());
        }}
        className={classes.item}
      >
        <ExitToApp className={classes.icon} />
        <Typography className={classes.text}>Logout</Typography>
      </div>
    </Container>
  );
};

export default Leftbar;
