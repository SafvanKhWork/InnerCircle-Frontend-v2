import { Stack, Grid, Avatar, Typography } from "@mui/material";

const ResultItem = (props) => {
  const user = props.user;
  return (
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
                src={user.images[0]}
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
  );
};

export default ResultItem;
