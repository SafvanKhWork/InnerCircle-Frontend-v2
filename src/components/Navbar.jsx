import {
  alpha,
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  makeStyles,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  Cancel,
  ShoppingCart,
  Notifications as Notification,
  Search,
  Refresh,
  Sync,
} from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { url } from "../config";
import { createStyles } from "@material-ui/styles";
import {
  setCurrent,
  setSpecifiedList,
} from "../store/Products/productListSlice";
import { getUser, refetchUser } from "../store/User/userSlice";
import AccountSettings from "./Details/Header/HeadItems/AccountSettings";
import Notifications from "./Notifications";
import { Link } from "react-router-dom";

// const useStyles = makeStyles(() =>
//   createStyles({
//     rotateIcon: {
//       animation: "$spin 2s linear infinite",
//     },
//     "@keyframes spin": {
//       "0%": {
//         transform: "rotate(360deg)",
//       },
//       "100%": {
//         transform: "rotate(0deg)",
//       },
//     },
//   })
// );
const useStyles = makeStyles((theme) => ({
  rotateIcon: {
    animation: "$spin 2s linear infinite",
  },
  "@keyframes spin": {
    "0%": {
      transform: "rotate(360deg)",
    },
    "100%": {
      transform: "rotate(0deg)",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  logoLg: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  logoSm: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  search: {
    display: "flex",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      display: (props) => (props.open ? "flex" : "none"),
      width: "70%",
    },
  },
  input: {
    color: "white",
    marginLeft: theme.spacing(1),
  },
  cancel: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  searchButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  icons: {
    alignItems: "center",
    display: (props) => (props.open ? "none" : "flex"),
  },
  badge: {
    marginRight: theme.spacing(2),
  },
}));

const Navbar = () => {
  const user = useSelector(getUser);
  const { token } = user;
  const dispatch = useDispatch();
  const discover = useSelector((state) => state.products.discover);
  const [unseen, setUnseen] = useState(0);
  const [inSync, setInSync] = useState(0);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const productFinder = (isubstring, data) => {
    const substring = isubstring.split(" ").join("").toLowerCase();
    if (!substring) {
      return data;
    }
    if (!data) {
      return [];
    }

    const matches = data.filter((obj) => {
      if (
        obj.name.split(" ").join("").toLowerCase().includes(substring) ||
        obj.product_name
          .split(" ")
          .join("")
          .toLowerCase()
          .includes(substring) ||
        obj.model.split(" ").join("").toLowerCase().includes(substring)
      ) {
        return true;
      } else {
        return false;
      }
    });
    return matches;
  };
  useEffect(() => {
    let tempUnseen = 0;
    user.notifications.forEach((notification) => {
      if (!notification.seen) {
        tempUnseen += 1;
      }
    });
    setUnseen(tempUnseen);
  }, [user]);

  useEffect(() => {
    dispatch(setCurrent(productFinder(searchQuery, discover)));
  }, [searchQuery]);
  const classes = useStyles({ open });
  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <Link style={{ color: "inherit", textDecoration: "none" }} to={"/"}>
          <Typography variant="h6" className={classes.logoLg}>
            Inner Circle
          </Typography>
          <Typography variant="h6" className={classes.logoSm}>
            InnerCircle
          </Typography>
        </Link>
        <div className={classes.search}>
          <Box
            p={1}
            px={1}
            display={"flex"}
            style={{ verticalAlign: "center" }}
          >
            <Search />
          </Box>
          <InputBase
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
            }}
            className={classes.input}
          />
          <Cancel className={classes.cancel} onClick={() => setOpen(false)} />
        </div>
        <div className={classes.icons}>
          <Search
            className={classes.searchButton}
            onClick={() => setOpen(true)}
          />
          <IconButton
            onClick={async () => {
              setInSync(true);
              dispatch(refetchUser());
              const loader = setTimeout(() => {
                setInSync(false);
                return () => {
                  clearTimeout(loader);
                };
              }, 1000);
              try {
                const { data: discover } = await axios.get(`${url}/products`);
                const { data: catagories } = await axios.get(
                  `${url}/catagories`
                );
                if (token === "") {
                  dispatch(
                    setSpecifiedList({
                      current: discover,
                      discover,
                      catagories,
                    })
                  );
                  return;
                }
                const { data: feed } = await axios.get(`${url}/feed`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                const {
                  data: [recommanded, recommandors],
                } = await axios.get(`${url}/recommanded`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                dispatch(
                  setSpecifiedList({
                    recommandors,
                    discover,
                    feed,
                    catagories,
                    recommandation: recommanded,
                  })
                );
              } catch (error) {
                console.log({ ...error });
              }
            }}
          >
            <Sync
              style={{ color: "white" }}
              className={inSync ? classes.rotateIcon : classes.icons}
            />
          </IconButton>
          <Badge
            badgeContent={unseen > 0 ? unseen : 0}
            color="secondary"
            className={classes.badge}
          >
            <Notifications>
              <Notification />
            </Notifications>
          </Badge>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={"/profile"}
          >
            <Tooltip title={user.name}>
              <Avatar alt={user.name} src={user.avatar} />
            </Tooltip>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
