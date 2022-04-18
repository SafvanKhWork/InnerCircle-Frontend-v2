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
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
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
  const { discover, feed, recommandation } = useSelector(
    (state) => state.products
  );

  return (
    <Container className={classes.container}>
      <div className={classes.item}>
        <Face className={classes.icon} />
        <Typography className={classes.text}>Profile</Typography>
      </div>
      <div
        onClick={(event) => {
          dispatch(setCurrent(feed));
        }}
        className={classes.item}
      >
        <Home className={classes.icon} />
        <Typography className={classes.text}>Feed</Typography>
      </div>
      <Friends>
        <div className={classes.item}>
          <Person className={classes.icon} />
          <Typography className={classes.text}>Friends</Typography>
        </div>
      </Friends>
      <div
        onClick={(event) => {
          dispatch(setCurrent(discover));
        }}
        className={classes.item}
      >
        <Storefront className={classes.icon} />
        <Typography className={classes.text}>Market Place</Typography>
      </div>
      <div className={classes.item}>
        <ExitToApp className={classes.icon} />
        <Typography className={classes.text}>Logout</Typography>
      </div>
    </Container>
  );
};

export default Leftbar;
