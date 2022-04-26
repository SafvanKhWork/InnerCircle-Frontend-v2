import {
  Box,
  Container,
  Divider,
  LinearProgress,
  makeStyles,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { url } from "../config";
import Notfound from "./Notfound";
import { useNavigate } from "react-router-dom";
import Post from "./Post";
import {
  getUniqueValues,
  removeFirstOneMatching,
  findAllMatching,
} from "array-of-objects-functions";
import { setCurrent } from "../store/Products/productListSlice";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
}));

const Feed = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [start, setStart] = useState(0);
  const { current, discover, feed } = useSelector((state) => state.products);
  const products = current.slice(start, start + 5);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { catagory } = useParams();

  useEffect(() => {
    if (catagory) {
      const matching = findAllMatching(discover, "catagory", String(catagory));
      dispatch(setCurrent(matching));
    }
    if (props.feed) {
      dispatch(setCurrent(feed));
    }
    if (props.discover) {
      dispatch(setCurrent(discover));
    }
    if (!props.feed && !props.discover && !catagory) {
      if (feed.length === 0) {
        navigate("/discover");
      } else {
        navigate("/feed");
      }
    }
  }, [catagory, discover, props]);
  useEffect(() => {
    setPage(1);
    setStart(0);
  }, [current]);
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      return () => {
        clearTimeout(timer);
      };
    }, 1000);
  }, [current]);

  return (
    <Container className={classes.container}>
      {!current || current.length === 0 ? (
        <Fragment>{loading ? <LinearProgress /> : <Notfound />}</Fragment>
      ) : (
        <Fragment>
          <Box py={1} pb={5} display={"flex"} justifyContent={"space-between"}>
            <div>{""}</div>
            <div></div>
          </Box>

          {products?.map((product) => (
            <Post
              product={product}
              key={product._id}
              title={product.name}
              description={product.description}
              imgs={product.images}
            />
          ))}

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
              count={Math.ceil(current.length / 5)}
              color="primary"
            />
          </Box>
        </Fragment>
      )}
    </Container>
  );
};

export default Feed;
