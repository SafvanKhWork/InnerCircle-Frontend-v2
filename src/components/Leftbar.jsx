import { Container, makeStyles, Typography } from "@material-ui/core";
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
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCurrent } from "../store/Products/productListSlice";
import Friends from "./Friends";

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
  text: {
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const Leftbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Container className={classes.container}>
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
          <Typography className={classes.text}>Feed</Typography>
        </div>
      </Link>
      <Friends>
        <div className={classes.item}>
          <Person className={classes.icon} />
          <Typography className={classes.text}>Friends</Typography>
        </div>
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
      <div className={classes.item}>
        <ExitToApp className={classes.icon} />
        <Typography className={classes.text}>Logout</Typography>
      </div>
    </Container>
  );
};

export default Leftbar;
