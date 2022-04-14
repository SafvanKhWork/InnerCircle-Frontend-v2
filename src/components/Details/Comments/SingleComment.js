import {
  Box,
  Stack,
  Avatar,
  Typography,
  IconButton,
  Collapse,
  CardHeader,
  Divider,
  Grid,
  Button,
  ThemeProvider,
  TextField,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import axios from "axios";
import { url } from "../../../config";
import { Send, ArrowForward, ArrowBack } from "@mui/icons-material";
import { useState, useEffect, Fragment } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector } from "react-redux";
import { getToken } from "../../../store/User/userSlice";

const Comment = (props) => {
  const token = useSelector(getToken);
  const comment = props.comment;
  const [user, setUser] = useState({});
  const [opt, setOpt] = useState(false);

  useEffect(async () => {
    async function getUser(id) {
      const { data, status: responseStatus } = await axios.get(
        `${url}/user/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(data);
    }
    getUser(comment.user);
  }, []);
  const firstPh =
    comment.value.length > 35
      ? comment.value.split(",")[0] + "..."
      : comment.value;
  const shortcomm =
    firstPh.length > 38
      ? comment.value.split("").slice(0, 25).join("") + "..."
      : firstPh;

  return (
    <div
      onClick={(event) => {
        setOpt(!opt);
      }}
    >
      <Box p={1}>
        <Stack
          display={"flex"}
          alignItems={"center"}
          spacing={1}
          direction="row"
        >
          <Avatar src={user.avatar} sx={{ width: 34, height: 34 }} />
          <Stack>
            <Typography fontFamily={"sans-serif"} variant="title">
              {user.name}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {opt ? user.username : shortcomm}
            </Typography>
          </Stack>
        </Stack>
        <Box py={1} ml={1} pl={"34px"}>
          <Collapse in={opt}>
            <Typography color="text.secondary" variant="body2">
              {comment.value}
            </Typography>
          </Collapse>
        </Box>
      </Box>
    </div>
  );
};

export default Comment;
