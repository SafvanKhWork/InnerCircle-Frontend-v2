import {
  Box,
  Container,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { Stack } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getAuthHeader, url } from "../config";
import { getToken } from "../store/User/userSlice";
import AdminDashboard from "./AdminDashboard";
import Catagories from "./Tables/Catagories";
import Feedbacks from "./Tables/Feedbacks";
import Products from "./Tables/Products";
import Users from "./Tables/Users";

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
  const [meta, setMeta] = useState({});
  const [rug, setRug] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const token = useSelector(getToken);
  React.useEffect(async () => {
    const { data } = await axios.get(`${url}/admin/dash`, getAuthHeader(token));
    if (data) {
      setMeta(data);
    }
    return () => {};
  }, [token, rug]);

  return (
    <Container className={classes.container}>
      <Stack spacing={1}>
        <Box p={1}>
          <AdminDashboard dash={meta.counts} />
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
              <Tab label="Feedbacks" index={0} />
              <Tab label="Posts" index={1} />
              <Tab label="Catagories" index={2} />
              <Tab label="Users" index={3} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Feedbacks
              rug={rug}
              setRug={setRug}
              feedbacks={meta.feedbacks || []}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Products
              rug={rug}
              setRug={setRug}
              products={meta.products || []}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Catagories
              rug={rug}
              setRug={setRug}
              catagories={meta.catagories || []}
            />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Users rug={rug} setRug={setRug} users={meta.users || []} />
          </TabPanel>
        </Box>
      </Stack>
    </Container>
  );
}
