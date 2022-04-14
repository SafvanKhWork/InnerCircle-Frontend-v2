import { Box, Container, Divider, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { url } from "../config";
import Notfound from "./Notfound";
import Post from "./Post";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
}));

const Feed = () => {
  const [page, setPage] = useState(1);
  const [start, setStart] = useState(0);
  const current = useSelector((state) => state.products.current);
  const products = current.slice(start, start + 5);
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      {!current || current.length === 0 ? (
        <Notfound />
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
              img={url + product.images[0]}
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
