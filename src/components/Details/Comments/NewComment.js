import { Box, Stack, Button, TextField } from "@mui/material";
import axios from "axios";
import { useState, Fragment } from "react";
import { useSelector } from "react-redux";

//

import { url } from "../../../config";
import { getToken, getUser } from "../../../store/User/userSlice";

const addComment = async (msg, id, token) => {
  const comments = await axios.patch(
    `${url}/comment/${id}`,
    {
      value: msg,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

const NewComment = (props) => {
  const token = useSelector(getToken);
  const [comment, setComment] = useState("");
  const { product } = props;
  return (
    <Box mt={props.mt}>
      <Stack spacing={1} direction="row">
        <TextField
          fullWidth
          onChange={(e) => {
            if (e.target.value !== comment) {
              setComment(e.target.value);
            }
          }}
          id="comment"
          label="comment"
          value={comment}
          size="small"
        />
        <Button
          onClick={async (e) => {
            await addComment(comment, product._id, token);
            setComment("");
            props.update();
          }}
          disabled={comment === ""}
          variant="outlined"
          size="small"
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
};

export default NewComment;
