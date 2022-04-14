import {
  Box,
  Stack,
  Typography,
  Button,
  Divider,
  Grid,
  ButtonGroup,
  Card,
  IconButton,
  Avatar,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  ArrowForward,
  ArrowBack,
} from "@mui/icons-material";
import { Scrollbars } from "react-custom-scrollbars";
import { useState, Fragment } from "react";
import { green, red } from "@mui/material/colors";

import Bid from "./SingleBid";
import { useSelector } from "react-redux";
import { getToken, getUser } from "../../../store/User/userSlice";
import NewBid from "./NewBid";

const Bids = (props) => {
  const account = useSelector(getUser);
  const [bids, SetBids] = useState(props.bids);
  return (
    <Box m={1}>
      <Scrollbars
        style={{ height: 200 }}
        autoHide
        autoHideTimeout={0}
        autoHideDuration={200}
      >
        <Box mx={1}>
          <Stack spacing={1}>
            {bids.map((bid) => {
              return (
                <Box key={bid._id} p={1}>
                  <Bid
                    bid={bid}
                    product={props.product}
                    isOwner={account.username === props.product.owner.username}
                  />
                </Box>
              );
            })}
          </Stack>
        </Box>
      </Scrollbars>
      <NewBid product={props.product} update={SetBids} />
    </Box>
  );
};

export default Bids;
