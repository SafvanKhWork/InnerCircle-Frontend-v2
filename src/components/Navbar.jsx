import {
  alpha,
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  makeStyles,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  Cancel,
  ShoppingCart,
  Notifications,
  Search,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrent } from "../store/Products/productListSlice";
import { getUser } from "../store/User/userSlice";
import AccountSettings from "./Details/Header/HeadItems/AccountSettings";

const useStyles = makeStyles((theme) => ({
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
  const dispatch = useDispatch();
  const discover = useSelector((state) => state.products.discover);
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
    dispatch(setCurrent(productFinder(searchQuery, discover)));
  }, [searchQuery]);
  const classes = useStyles({ open });
  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.logoLg}>
          Inner Circle
        </Typography>
        <Typography variant="h6" className={classes.logoSm}>
          InnerCircle
        </Typography>
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
          <Badge badgeContent={4} color="secondary" className={classes.badge}>
            <ShoppingCart />
          </Badge>
          <Badge badgeContent={2} color="secondary" className={classes.badge}>
            <Notifications />
          </Badge>
          <Tooltip title={user.name}>
            {/* <AccountSettings /> */}
            <Avatar alt={user.name} src={user.avatar} />
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
