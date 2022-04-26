import { Box } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { url } from "../../../config";
import CommentScroll from "./CommentScroll";
import NewComment from "./NewComment";

const Comments = (props) => {
  const { product } = props;
  const [comments, setComments] = useState(product.comments);
  const updateComments = async () => {
    const { data, status: responseStatus } = await axios.get(
      `${url}/comments/${product._id}`
    );
    if (responseStatus == 200) {
      setComments(data);
    }
  };
  return (
    <Box p={1} justifyContent="center">
      <NewComment
        update={updateComments}
        product={product}
        mb={props.desk ? 2 : 0}
      />
      <CommentScroll comments={comments} />
    </Box>
  );
};

export default Comments;
