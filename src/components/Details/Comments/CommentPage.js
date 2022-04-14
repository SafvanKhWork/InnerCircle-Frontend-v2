import {
  Box,
  Stack,
  Avatar,
  Typography,
  IconButton,
  CardHeader,
  Divider,
  Grid,
  Button,
  ThemeProvider,
  TextField,
  ButtonGroup,
} from "@mui/material";
import { Send, ArrowForward, ArrowBack } from "@mui/icons-material";
import { useState, Fragment } from "react";
import { Scrollbars } from "react-custom-scrollbars";

//
import theme from "../../../../theme";
import Comment from "./SingleComment";

let changed = false;

const CommentPage = (props) => {
  const [page, setPage] = useState(0);

  const size = props.size || 3;

  let start = -size - page;
  let end = page > 0 ? 0 - page : undefined;
  let forward = false;
  let back = true;

  let comments = props.comments.slice(start, end).reverse();

  if (changed) {
    forward = end < 0;
    back = 0 - start < props.comments.length;
    if (!back) {
      back = false;
      forward = true;
    } else if (!forward) {
      back = true;
      forward = false;
    } else {
      back = forward = true;
    }
  }

  changed = false;

  return (
    <Fragment>
      <Fragment>
        {comments.map((comment, i) => {
          return <Comment key={i} comment={comment} />;
        })}
      </Fragment>
      <Box mt={1} px={2}>
        <Stack
          direction={"row"}
          display="flex"
          justifyContent={"space-between"}
        >
          <Button
            disabled={!back ? true : false}
            onClick={() => {
              if (back) {
                changed = true;
                setPage(page + 2);
              }
            }}
            fullWidth
          >
            <ArrowBack />
          </Button>

          <Button
            disabled={!forward ? true : false}
            onClick={() => {
              if (forward) {
                changed = true;
                setPage(page - 2);
              }
            }}
            fullWidth
          >
            <ArrowForward />
          </Button>
        </Stack>
      </Box>
    </Fragment>
  );
};

export default CommentPage;
