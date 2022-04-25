import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  makeStyles,
  styled,
  Typography,
  Box,
  Tooltip,
  Collapse,
} from "@material-ui/core";
import { red, blue, green, yellow } from "@material-ui/core/colors";
import {
  Share,
  AttachMoney,
  TextSnippet,
  Favorite,
  ExpandMore,
  MoreVert,
  Remove,
  Add,
  MonetizationOn,
  SpokeIcon,
  Comment,
} from "@material-ui/icons";
import Carousel from "react-material-ui-carousel";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { url } from "../config";
import { Stack } from "@mui/material";
import Comments from "./Details/Comments/Comments";
import Bids from "./Details/Bids/Bids";
import NewBid from "./Details/Bids/NewBid";
import SearchBar from "./Details/Search/Search";
import axios from "axios";
import Confirm from "./Confirm";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(5),
  },
  media: {
    height: 250,
    [theme.breakpoints.down("sm")]: {
      height: 150,
    },
  },
}));

const ExpandMoreFun = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Post = ({ imgs, title, description, product }) => {
  const classes = useStyles();

  //State
  const user = useSelector((state) => state.user);
  const [expandedDesc, setExpandedDesc] = useState(false);
  const [expandedBid, setExpandedBid] = useState(false);
  const [expandedRecc, setExpandedRecc] = useState(false);
  const [expandedComment, setExpandedComment] = useState(false);
  const [likes, setLikes] = useState(product.likes);
  const [liked, setLiked] = useState(product.like.includes(user._id) || false);
  const [isFocused, setIsFocused] = useState(false);
  const [inFocus, setInFocus] = useState(false);
  const [confirm, setConfirm] = useState(false);

  //Handlers

  const handleLike = async () => {
    const { data } = await axios.patch(`${url}/like/${product._id}`, "", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (data) {
      setLikes(data.length);
    }
    setLiked(!liked);
  };

  const handleExpandDesc = () => {
    setExpandedDesc(!expandedDesc);
  };
  const handleExpandBid = () => {
    setExpandedComment(false);
    setExpandedRecc(false);
    setExpandedBid(!expandedBid);
  };
  const handleExpandComment = () => {
    setExpandedBid(false);
    setExpandedComment(!expandedComment);
    setExpandedRecc(false);
  };
  const handleExpandRecc = () => {
    setExpandedBid(false);
    setExpandedComment(false);
    setExpandedRecc(!expandedRecc);
  };

  //UI

  return (
    <Card variant="elevation" elevation={4} className={classes.card}>
      <CardActionArea>
        <div
          onMouseEnter={() => {
            setInFocus(true);
          }}
          onMouseLeave={() => {
            setInFocus(false);
          }}
        >
          <CardHeader
            avatar={<Avatar src={product.owner.avatar} aria-label="recipe" />}
            title={`${product.owner.username}`}
            subheader={
              product.new ||
              `${formatDistance(new Date(product.createdAt), new Date(), {
                addSuffix: true,
              })}`
            }
            action={
              String(user._id) === String(product.owner._id) && inFocus ? (
                <Confirm message={"Are you sure you want to delete this post"}>
                  <MoreVert />
                </Confirm>
              ) : (
                ""
              )
            }
          />
        </div>
        <div
          onMouseEnter={() => setIsFocused(true)}
          onMouseLeave={() => setIsFocused(false)}
        >
          <Carousel
            indicators={false}
            autoPlay={isFocused}
            interval={3000}
            stopAutoPlayOnHover={false}
            navButtonsAlwaysInvisible
            cycleNavigation={true}
            duration={1000}
            animation="fade"
          >
            {imgs.map((img) => (
              <a key={img} href={url + img} target="_blank">
                <CardMedia
                  className={classes.media}
                  image={url + img}
                  title={title}
                />
              </a>
            ))}
          </Carousel>
        </div>
        <CardContent>
          <Stack
            style={{
              display: "flex",
              verticalAlign: "center",
              justifyContent: "space-between",
            }}
            direction={"row"}
          >
            <Typography
              style={{ display: "flex", verticalAlign: "center" }}
              gutterBottom
              variant="h5"
            >
              {title}
            </Typography>
            <Typography
              variant="h5"
              color="primary"
              style={{ display: "flex", verticalAlign: "center", fontSize: 22 }}
              gutterBottom
            >
              {"₹" + product.price}
            </Typography>
          </Stack>

          <Collapse in={expandedDesc} timeout="auto" unmountOnExit>
            <Typography variant="body2">{description}</Typography>
          </Collapse>
        </CardContent>
      </CardActionArea>
      <CardActions p={1} disableSpacing>
        <IconButton aria-label="like" onClick={handleLike}>
          {liked ? <Favorite style={{ color: red[500] }} /> : <Favorite />}
        </IconButton>
        {liked ? (
          <Typography style={{ color: red[500] }}>{likes || 1}</Typography>
        ) : (
          <Typography style={{ color: "gray" }}>{likes || 0}</Typography>
        )}

        <ExpandMoreFun expand={expandedComment} onClick={handleExpandComment}>
          {expandedComment ? (
            <Comment style={{ color: blue[500] }} />
          ) : (
            <Comment />
          )}
        </ExpandMoreFun>
        {expandedComment ? (
          <Typography style={{ color: blue[500] }}>
            {product.comments.length || 0}
          </Typography>
        ) : (
          <Typography style={{ color: "gray" }}>
            {product.comments.length || 0}
          </Typography>
        )}

        <ExpandMoreFun expand={expandedBid} onClick={handleExpandBid}>
          {expandedBid ? (
            <MonetizationOn style={{ color: green[500] }} />
          ) : (
            <MonetizationOn />
          )}
        </ExpandMoreFun>
        {expandedBid ? (
          <Typography style={{ color: green[500] }}>
            {product.bids.length || 0}
          </Typography>
        ) : (
          <Typography style={{ color: "gray" }}>
            {product.bids.length || 0}
          </Typography>
        )}

        <ExpandMoreFun expand={expandedRecc} onClick={handleExpandRecc}>
          {expandedRecc ? <Share style={{ color: yellow[700] }} /> : <Share />}
        </ExpandMoreFun>
        <Divider />
        <ExpandMoreFun expand={expandedDesc} onClick={handleExpandDesc}>
          <ExpandMore />
        </ExpandMoreFun>
      </CardActions>
      <Stack direction={"column-reverse"}>
        <Collapse in={expandedBid} timeout="auto" unmountOnExit>
          <Box px={1}>
            <Bids product={product} bids={product.bids} />
          </Box>
        </Collapse>
        <Collapse in={expandedRecc} timeout="auto" unmountOnExit>
          <Box justifyContent="center" p={1}>
            <SearchBar users={user.circle} />
          </Box>
        </Collapse>
        <Collapse in={expandedComment} timeout="auto" unmountOnExit>
          <Box textAlign={"justify"}>
            <Comments product={product} comments={product.comments} />
          </Box>
        </Collapse>
      </Stack>
    </Card>
  );
};

export default Post;
