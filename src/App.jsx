import { Grid, makeStyles } from "@material-ui/core";
import Add from "./components/Add";
import Feed from "./components/Feed";
import Leftbar from "./components/Leftbar";
import Navbar from "./components/Navbar";
import Rightbar from "./components/Rightbar";
import { Fragment, useEffect } from "react";
import axios from "axios";
import { getAuthHeader, url } from "./config";
import { useDispatch, useSelector } from "react-redux";
import { getToken, getUser, refreshUser } from "./store/User/userSlice";
import {
  setCurrent,
  setSpecifiedList,
} from "./store/Products/productListSlice";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import Notfound from "./components/Notfound";

import { refetchUser } from "./store/User/userSlice";
import { login } from "./store/ApplicationStates/applicationStateSlice";
import Landing from "./components/Landing";
import Redirect from "./components/Redirect";
import Profile from "./components/Profile";

const useStyles = makeStyles((theme) => ({
  right: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const App = () => {
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.applicationState);
  // console.log(loggedIn, token);
  if (token && token !== "" && !loggedIn) {
    dispatch(login());
  }
  //Get User By Token in Local Storage
  useEffect(() => {
    (async () => {
      if (!token || token === "") {
        return;
      }
      const { data } = await axios.get(`${url}/user/me`, getAuthHeader(token));
      if (data) {
        dispatch(refreshUser(data));
      }
    })();
  }, [token]);

  useEffect(async () => {
    if (token && token !== "") {
      const reloader = setInterval(() => {
        dispatch(refetchUser);
        return () => {
          clearInterval(reloader);
        };
      }, 10000);
    }
  }, [token]);
  //Get Products
  useEffect(async () => {
    try {
      const { data: discover } = await axios.get(`${url}/products`);
      const { data: catagories } = await axios.get(`${url}/catagories`);
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
  }, [token]);

  const classes = useStyles();
  return (
    <div>
      <Router>
        {loggedIn ? (
          <div>
            <Navbar />
            <Grid container>
              <Grid item sm={2} xs={2}>
                <Leftbar />
              </Grid>
              <Grid item sm={7} xs={10}>
                <Routes>
                  <Route path="/catagories/:catagory" element={<Feed />} />
                  <Route path="/feed" element={<Feed feed />} />
                  <Route path="/discover" element={<Feed discover />} />
                  <Route
                    path="/profile/:id"
                    element={<Profile profile={false} />}
                  />
                  <Route path="/profile" element={<Profile profile />} />
                  <Route path="/" element={<Feed />} />
                  <Route path="*" element={<Notfound is404 />} />
                </Routes>
              </Grid>
              <Grid item sm={3} className={classes.right}>
                <Rightbar />
              </Grid>
            </Grid>
            <Add />
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<Redirect />} />
          </Routes>
        )}
      </Router>
    </div>
  );
};

export default App;
