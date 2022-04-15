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
import { setCurrent } from "../store/Products/productListSlice";
import {
  getUniqueValues,
  removeFirstOneMatching,
  findAllMatching,
} from "array-of-objects-functions";
import { current } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../config";

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
  const circle = useSelector((state) => state.user.circle);
  const [friends, setFriends] = useState([]);
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
      <AvatarGroup max={6} style={{ marginBottom: 20 }}>
        {friends.map((friend) => (
          <Avatar key={friend._id} alt={friend.name} src={friend.avatar} />
        ))}
      </AvatarGroup>
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
        Categories
      </Typography>
      {catagories?.map((catagory, i) => (
        <Fragment key={catagory._id}>
          <Link
            component={"button"}
            onClick={(event) => {
              const matching = findAllMatching(
                discover,
                "catagory",
                String(catagory.name)
              );
              dispatch(setCurrent(matching));
            }}
            key={catagory.name}
            href="#"
            className={classes.link}
            variant="body2"
          >
            {catagory.name}
          </Link>
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
    </Container>
  );
};

export default Rightbar;
