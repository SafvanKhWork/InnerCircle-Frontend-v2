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
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";

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

const Post = ({ img, title, description, product }) => {
  const classes = useStyles();

  //State
  const user = useSelector((state) => state.user);
  const [expandedDesc, setExpandedDesc] = useState(false);
  const [expandedBid, setExpandedBid] = useState(false);
  const [expandedRecc, setExpandedRecc] = useState(false);
  const [expandedComment, setExpandedComment] = useState(false);
  const [liked, setLiked] = useState(product.like.includes(user._id) || false);

  //Handlers

  const handleLike = () => {
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
        <CardHeader
          avatar={<Avatar src={product.owner.avatar} aria-label="recipe" />}
          title={`${product.owner.username}`}
          subheader={
            product.new ||
            `${formatDistance(new Date(product.createdAt), new Date(), {
              addSuffix: true,
            })}`
          }
        />
        <CardMedia className={classes.media} image={img} title="My Post" />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {title}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions p={1} disableSpacing>
        <IconButton aria-label="like" onClick={handleLike}>
          {liked ? <Favorite style={{ color: red[500] }} /> : <Favorite />}
        </IconButton>
        {liked ? (
          <Typography style={{ color: red[500] }}>
            {product.likes || 1}
          </Typography>
        ) : (
          <Typography style={{ color: "gray" }}>
            {product.likes || 0}
          </Typography>
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

        <ExpandMoreFun expand={expandedRecc} onClick={handleExpandRecc}>
          {expandedRecc ? <Share style={{ color: yellow[700] }} /> : <Share />}
        </ExpandMoreFun>
        <Divider />
        <ExpandMoreFun expand={expandedDesc} onClick={handleExpandDesc}>
          <ExpandMore />
        </ExpandMoreFun>
      </CardActions>
    </Card>
  );
};

export default Post;
