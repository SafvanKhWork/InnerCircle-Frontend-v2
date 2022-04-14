import {
  Box,
  Stack,
  Typography,
  Button,
  Collapse,
  Avatar,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

//

import { url } from "../../../config";
import { refetchUser, getToken } from "../../../store/User/userSlice";
import { useSelector } from "react-redux";

const Bid = (props) => {
  const [opt, setOpt] = useState(false);
  const dispatch = useDispatch();
  const [user, setUser] = useState(false);
  const token = useSelector(getToken);
  let authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };
  useEffect(() => {
    async function getUser(id) {
      const { data, status: responseStatus } = await axios.get(
        `${url}/user/id/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(data);
    }
    getUser(bid.user);
  }, []);

  const bid = props.bid;

  return (
    <div
      onClick={(event) => {
        if (
          !event.target.className.includes("MuiButton-root") &&
          props.isOwner
        ) {
          setOpt(!opt);
        }
      }}
    >
      <Stack spacing={1} justifyContent="space-between" direction="row">
        {
          <Stack
            display={"flex"}
            alignContent={"flex-start"}
            spacing={1}
            direction="row"
          >
            <Avatar src={user.avatar} sx={{ width: 34, height: 34 }} />

            <Stack>
              <Typography fontFamily={"sans-serif"} variant="title">
                {user.name || "[Deleted User]"}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {user.username || "[Deleted User]"}
              </Typography>
            </Stack>
          </Stack>
        }

        <Box justifyContent={"center"}>
          <Typography
            fontSize={18}
            fontFamily={"monospace"}
            color="h4"
            variant="body2"
          >
            {"₹" + bid.bid}
          </Typography>
        </Box>
      </Stack>
      <Box pt={1}>
        <Collapse in={opt}>
          <Stack spacing={1} direction="row">
            <Button
              color="inherit"
              onClick={async () => {
                const { state } = await axios.patch(
                  `${url}/products/sold/${props.product._id}`,
                  { soldTo: user._id, value: bid.bid },
                  authHeader
                );
                dispatch(refetchUser());
              }}
              variant="outlined"
              fullWidth
              sx={{ color: green[500] }}
            >
              Sell
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              fullWidth
              sx={{ color: red[500] }}
            >
              Decline
            </Button>
          </Stack>
        </Collapse>
      </Box>
    </div>
  );
};

export default Bid;
