import {
  alpha,
  Card,
  deprecatedPropType,
  Grid,
  makeStyles,
  Paper,
  Tab,
  Tabs,
} from "@material-ui/core";
// import { TabPanel } from "@material-ui/lab";
import { Avatar, Box, Pagination, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector } from "react-redux";
import queriesComment from "../assets/2469966.jpg";
import { getAuthHeader, url } from "../config";
import UserMinibar from "./Details/Single Items/UserMinibar";
import Post from "./Post";
import { findFirstOneMatching } from "array-of-objects-functions";
import { Edit } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";

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
  card: {
    marginBottom: theme.spacing(5),
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
  container: {
    paddingTop: theme.spacing(10),
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
  home: {
    backgroundImage: `url(https://www.teahub.io/photos/full/51-513680_facebook-cover-wallpaper.jpg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 50%",
    objectFit: "none",
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
  sideImage: {
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  aboveImage: {
    fontWeight: 500,
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Profile(props) {
  const classes = useStyles();
  const account = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [start, setStart] = useState(0);
  const [value, setValue] = React.useState(0);
  const [user, setUser] = useState({});
  const [offers, setOffers] = useState([]);
  const [edit, setEdit] = useState(false);
  const { id } = useParams();

  useEffect(async () => {
    if (props.profile) {
      setUser(account);
    }
    if (id) {
      const { data } = await axios.get(
        `${url}/user/id/${id}`,
        getAuthHeader(account.token)
      );
      if (data) {
        setUser(data);
      }
    }
  }, [account, id]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPage(1);
    setStart(0);
  };

  useEffect(async () => {
    if (user._id) {
      const { data } = await axios.get(`${url}/products/owner/${user._id}`);

      if (data) {
        setPosts(data);
      }
    }
  }, [user]);
  useEffect(async () => {
    if (user._id) {
      const { data: data1 } = await axios.get(`${url}/offers/${user._id}`);
      if (data1) {
        setOffers(data1);
      }
    }
  }, [user]);

  const products = posts.slice(start, start + 5);
  return (
    <div className={classes.container}>
      <Box py={2} p={1}>
        <Card
          onMouseEnter={() => {
            setEdit(true);
          }}
          onMouseLeave={() => {
            setEdit(false);
          }}
          className={classes.home}
          elevation={4}
        >
          <Box minHeight={"2vh"} maxHeight={"2vh"} p={1}>
            {props.profile && edit ? (
              <Stack direction={"row-reverse"}>
                <UpdateProfile>
                  <Edit color="inherit" style={{ color: "white" }} />
                </UpdateProfile>
              </Stack>
            ) : (
              ""
            )}
          </Box>
          <Box
            minHeight={"48vh"}
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Stack pt={12} display={"flex"} alignSelf={"center"}>
              <Box display={"flex"} alignSelf={"center"}>
                <Avatar
                  src={user.avatar}
                  variant="circular"
                  sx={{
                    width: 128,
                    height: 128,
                    borderStyle: "solid",
                    borderColor: "white",
                    borderWidth: "4px",
                  }}
                />
              </Box>
              <Typography align="center" variant="h5">
                {user.name}
              </Typography>
              <div>
                <Typography
                  color={"GrayText"}
                  align="center"
                  variant="subtitle2"
                >
                  @{user.username}
                </Typography>
              </div>
            </Stack>
          </Box>
          <Box sx={{ borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="view"
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Posts" value={0} {...a11yProps(0)} />
              <Tab label="Friends" value={1} {...a11yProps(1)} />
              <Tab label="Offers" value={2} {...a11yProps(2)} />
            </Tabs>
          </Box>
        </Card>
      </Box>
      <TabPanel value={value} index={0}>
        <Box p={1}>
          {products?.map((product) => (
            <Post
              product={product}
              key={product._id}
              title={product.name}
              description={product.description}
              imgs={product.images}
            />
          ))}
        </Box>
        <Box display={"flex"} justifyContent={"center"} mb={2} p={1}>
          <Pagination
            shape="rounded"
            page={page}
            variant="outlined"
            // defaultPage={1}
            onChange={(event, value) => {
              setPage(value);
              setStart((value - 1) * 5);

              document.body.scrollTop = 0; // For Safari
              document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            }}
            //count={10}
            count={Math.ceil((posts?.length || 1) / 5)}
            color="primary"
          />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box p={1}>
          <Scrollbars
            style={{ height: 200 }}
            autoHide
            autoHideTimeout={0}
            autoHideDuration={200}
          >
            {user.circle?.map((friend) => (
              <UserMinibar key={friend} user={friend} />
            ))}
          </Scrollbars>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Scrollbars
          style={{ height: 400 }}
          autoHide
          autoHideTimeout={0}
          autoHideDuration={200}
        >
          {offers?.map((offer) => {
            const offerObj = findFirstOneMatching(offer.bids, "user", user._id);
            return (
              <div key={user._id + " " + offer._id}>
                <Stack
                  px={2}
                  py={1}
                  spacing={1}
                  justifyContent="space-between"
                  alignItems="center"
                  direction="row"
                >
                  <Grid
                    spacing={1}
                    container
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item key={`${offer.modal}3`} pl={1} pr={1}>
                      {
                        <Avatar
                          variant="square"
                          src={url + offer.images[0]}
                          sx={{ width: 128, height: 64, borderRadius: "0.1em" }}
                        />
                      }
                    </Grid>
                    <Grid key={`${offer.modal}4`} item xs={true}>
                      <Stack
                        direction={"column"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        spacing={1}
                      >
                        <Typography fontFamily={"sans-serif"} variant="title">
                          {offer.name}
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                          {offer.catagory}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Typography
                    variant="h5"
                    color="primary"
                    style={{
                      display: "flex",
                      verticalAlign: "center",
                      fontSize: 22,
                    }}
                    gutterBottom
                  >
                    {"₹" + offerObj.bid}
                  </Typography>
                </Stack>
              </div>
            );
          })}
        </Scrollbars>
      </TabPanel>
    </div>
  );
}
