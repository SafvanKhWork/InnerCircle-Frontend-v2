import {
  Link,
  Avatar,
  Container,
  ImageList,
  ImageListItem,
  makeStyles,
  Typography,
  Divider,
} from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrent,
  setSpecifiedList,
} from "../store/Products/productListSlice";
import {
  getUniqueValues,
  removeFirstOneMatching,
  findAllMatching,
} from "array-of-objects-functions";
import { current } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthHeader, url } from "../config";
import Friends from "./Friends";
import { Add, Done } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";
import { Button, IconButton, InputBase, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Scrollbars } from "react-custom-scrollbars";
import { Link as RouteLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    position: "sticky",
    top: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    color: "#555",
  },
  link: {
    marginRight: theme.spacing(2),
    color: "#555",
    fontSize: 16,
  },
}));

const Rightbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { circle, token } = useSelector((state) => state.user);
  const [friends, setFriends] = useState([]);
  const [addCatagory, setAddCatagory] = useState(false);
  const [newCatagory, setNewCatagory] = useState("");
  const { catagories, current, discover } = useSelector(
    (state) => state.products
  );
  useEffect(async () => {
    const promises = circle.map(async (friend) => {
      const { data } = await axios.get(`${url}/user/${friend}`);
      return data;
    });
    const friendList = await Promise.all(promises);
    setFriends(friendList);
  }, [circle]);
  return (
    <Container className={classes.container}>
      <Typography className={classes.title} gutterBottom>
        Friends
      </Typography>
      <Friends>
        <AvatarGroup max={6} style={{ marginBottom: 20 }}>
          {friends.map((friend) => (
            <Avatar key={friend._id} alt={friend.name} src={friend.avatar} />
          ))}
        </AvatarGroup>
      </Friends>
      <Typography className={classes.title} gutterBottom>
        Gallery
      </Typography>
      <ImageList rowHeight={100} style={{ marginBottom: 20 }} cols={2}>
        <ImageListItem>
          <img
            src="https://material-ui.com/static/images/image-list/breakfast.jpg"
            alt=""
          />
        </ImageListItem>
        <ImageListItem>
          <img
            src="https://material-ui.com/static/images/image-list/burgers.jpg"
            alt=""
          />
        </ImageListItem>
        <ImageListItem>
          <img
            src="https://material-ui.com/static/images/image-list/camera.jpg"
            alt=""
          />
        </ImageListItem>
        <ImageListItem>
          <img
            src="https://material-ui.com/static/images/image-list/morning.jpg"
            alt=""
          />
        </ImageListItem>
        <ImageListItem>
          <img
            src="https://material-ui.com/static/images/image-list/hats.jpg"
            alt=""
          />
        </ImageListItem>
        <ImageListItem>
          <img
            src="https://material-ui.com/static/images/image-list/vegetables.jpg"
            alt=""
          />
        </ImageListItem>
      </ImageList>
      <Typography className={classes.title} gutterBottom>
        <Stack
          direction={"row"}
          sx={{
            verticalAlign: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {`Categories `}
          <IconButton
            onClick={() => {
              setAddCatagory(!addCatagory);
              setNewCatagory("");
            }}
          >
            <Add fontSize="small" color="disabled" />
          </IconButton>
        </Stack>
      </Typography>
      {addCatagory ? (
        <Stack my={1} direction={"row"} spacing={1}>
          <TextField
            value={newCatagory}
            onChange={(event) => setNewCatagory(event.target.value)}
            fullWidth
            size="small"
          />
          <Button
            variant="outlined"
            onClick={async () => {
              if (newCatagory) {
                const { data: catagories } = await axios.post(
                  `${url}/catagory/new`,
                  { name: newCatagory },
                  getAuthHeader(token)
                );
                if (catagories) {
                  dispatch(setSpecifiedList({ catagories }));
                  setNewCatagory("");
                }
              }
              setAddCatagory(false);
            }}
          >
            ADD
          </Button>
        </Stack>
      ) : (
        ""
      )}

      <Scrollbars
        style={{ height: 100 }}
        autoHide
        autoHideTimeout={0}
        autoHideDuration={200}
      >
        {catagories?.map((catagory, i) => (
          <Fragment key={catagory._id}>
            <RouteLink
              style={{ color: "inherit", textDecoration: "none" }}
              to={`/catagories/${catagory.name}`}
            >
              <Link
                component={"button"}
                key={catagory.name}
                href="#"
                className={classes.link}
                variant="body2"
              >
                {catagory.name}
              </Link>
            </RouteLink>
            {(i + 1) % 3 === 0 ? (
              <Divider
                key={"divider_" + i}
                flexItem
                style={{ marginBottom: 5 }}
              />
            ) : (
              ""
            )}
          </Fragment>
        ))}
      </Scrollbars>
    </Container>
  );
};

export default Rightbar;
