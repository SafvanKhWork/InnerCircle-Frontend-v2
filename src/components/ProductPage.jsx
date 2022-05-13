import axios from "axios";

import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { url } from "../config";
import {
  exitProduct,
  refreshProduct,
} from "../store/Products/productInViewSlice";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Post from "./Post";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
}));

export default function ProductPage() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productInView);
  const { id: productID } = useParams();
  const classes = useStyles();
  async function updateProduct(id) {
    const { data, status: responseStatus } = await axios.get(
      `${url}/products/id/${id}`
    );
    dispatch(refreshProduct(data));
  }
  console.log(product);
  useEffect(async () => {
    await updateProduct(productID);
    return () => {
      dispatch(exitProduct());
    };
  }, []);

  return (
    <div className={classes.container}>
      <Post
        product={product}
        key={product?._id}
        title={product?.name}
        description={product?.description}
        imgs={product?.images}
      />
    </div>
  );
}
