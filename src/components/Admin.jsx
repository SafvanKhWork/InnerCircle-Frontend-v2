import {
  Box,
  Container,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { Stack } from "@mui/material";
import React, { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import Feedbacks from "./Tables/Feedbacks";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    color: "#555",
    paddingTop: theme.spacing(10),
    backgroundColor: "white",
    position: "sticky",
    top: 0,
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "white",
      color: "#555",
      border: "1px solid #ece7e7",
    },
  },
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
      cursor: "pointer",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: "18px",
    },
  },
  iconbad: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  badge: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  text: {
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

export default function Admin() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container className={classes.container}>
      <Stack spacing={1}>
        <Box p={1}>
          <AdminDashboard />
        </Box>
        <Box>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              centered
              variant="fullWidth"
              value={value}
              onChange={handleChange}
              aria-label="Admin"
            >
              <Tab label="Posts" index={0} />
              <Tab label="Users" index={1} />
              <Tab label="Feedbacks" index={2} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={2}>
            <Feedbacks />
          </TabPanel>
        </Box>
      </Stack>
    </Container>
  );
}
