import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Button,
  Tooltip,
  Drawer,
  ListItem,
  ThemeProvider,
} from "@mui/material";

//
import theme from "../../theme";
import NavMenu from "./HeadItems/NavMenu";
import AccountSettings from "./HeadItems/AccountSettings";
import { Link } from "react-router-dom";
import FriendRequests from "./HeadItems/FriendRequests";

const ResponsiveAppBar = (props) => {
  const pages = ["Discover", "Catagories", "Recommended"];
  const catagory = ["blue", "green", "yellow"];

  return (
    <ThemeProvider theme={theme}>
      <AppBar>
        <Container maxWidth="xl">
          <Toolbar xs={100} disableGutters>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <NavMenu
                products={props.products}
                pages={pages}
                catagory={catagory}
              />
            </Box>
            <Box mx={2}>
              <Typography
                variant="h4"
                noWrap
                component="div"
                sx={{
                  display: { xs: "none", md: "flex", color: "white" },
                }}
              >
                <Link
                  style={{ color: "inherit", textDecoration: "none" }}
                  to="/"
                >
                  InnerCircle
                </Link>
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <div></div>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <NavMenu pages={pages} catagory={catagory} />
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none", color: "white" },
              }}
            >
              <Link style={{ color: "inherit", textDecoration: "none" }} to="/">
                InnerCircle
              </Link>
            </Typography>
            <FriendRequests />
            <AccountSettings status={props.status} />
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default ResponsiveAppBar;
