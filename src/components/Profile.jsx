import { alpha, Card, Grid, makeStyles, Paper } from "@material-ui/core";
import { Avatar, Box, Pagination, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import queriesComment from "../assets/2469966.jpg";
import { url } from "../config";
import Post from "./Post";

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
export default function Profile() {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [start, setStart] = useState(0);

  useEffect(async () => {
    const { data } = await axios.get(`${url}/products/owner/${user._id}`);
    if (data) {
      setPosts(data);
    }
  }, [user]);
  const products = posts.slice(start, start + 5);
  return (
    <div className={classes.container}>
      <Box py={2} p={1}>
        <Card elevation={4} className={classes.home}>
          <Box minHeight={300} display={"flex"} justifyContent={"center"}>
            <Box display={"flex"} alignSelf={"center"}>
              <Avatar
                src={user.avatar}
                sx={{
                  width: 128,
                  height: 128,
                  borderStyle: "solid",
                  borderColor: "white",
                  borderWidth: "4px",
                }}
              />
            </Box>
          </Box>
        </Card>
      </Box>
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
    </div>
  );
}
