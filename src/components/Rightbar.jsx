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
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrent } from "../store/Products/productListSlice";
import {
  getUniqueValues,
  removeFirstOneMatching,
  findAllMatching,
} from "array-of-objects-functions";
import { current } from "@reduxjs/toolkit";

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
  const { catagories, current, discover } = useSelector(
    (state) => state.products
  );
  return (
    <Container className={classes.container}>
      <Typography className={classes.title} gutterBottom>
        Friends
      </Typography>
      <AvatarGroup max={6} style={{ marginBottom: 20 }}>
        <Avatar
          alt="Remy Sharp"
          src="https://material-ui.com/static/images/avatar/1.jpg"
        />
        <Avatar
          alt="Travis Howard"
          src="https://material-ui.com/static/images/avatar/2.jpg"
        />
        <Avatar
          alt="Cindy Baker"
          src="https://material-ui.com/static/images/avatar/3.jpg"
        />
        <Avatar alt="Agnes Walker" src="" />
        <Avatar
          alt="Trevor Henderson"
          src="https://material-ui.com/static/images/avatar/6.jpg"
        />
        <Avatar
          alt="Trevor Henderson"
          src="https://material-ui.com/static/images/avatar/7.jpg"
        />
        <Avatar
          alt="Trevor Henderson"
          src="https://material-ui.com/static/images/avatar/8.jpg"
        />
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
