import { useState } from "react";
import {
  Stack,
  Grid,
  Button,
  IconButton,
  Avatar,
  Typography,
} from "@mui/material";
import { Done, Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { url } from "../../config";

const ResultItem = (props) => {
  const [isSent, setIsSent] = useState(false);
  const user = props.user;
  return (
    <Link
      style={{ color: "inherit", textDecoration: "none" }}
      to={`/product/${user._id}`}
    >
      <div onClick={props.handleCloseNavMenu}>
        <Stack
          px={2}
          py={1}
          spacing={1}
          justifyContent="left"
          alignItems="center"
          direction="row"
        >
          <Grid container justifyContent="center" alignItems="center">
            <Grid item key={`${user.modal}3`} pl={1} pr={1}>
              {
                <Avatar
                  variant="square"
                  src={url + user.images[0]}
                  sx={{ width: 52, height: 34, borderRadius: "0.1em" }}
                />
              }
            </Grid>
            <Grid key={`${user.modal}4`} item xs={true}>
              <Typography fontFamily={"sans-serif"} variant="title">
                {user.name}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {user.model}
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </div>
    </Link>
  );
};

export default ResultItem;
