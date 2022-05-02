import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { getToken } from "../store/User/userSlice";
import axios from "axios";
import { getAuthHeader, url } from "../config";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2.5),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

export default function AdminDashboard({ dash }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6} md={3}>
          <Item elevation={0} sx={{ backgroundColor: "#f7c5c1" }}>
            <Typography variant="caption" display="block" gutterBottom>
              Users
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{ color: "#181616" }}
            >
              {dash?.users || 0}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={6} md={3}>
          <Item elevation={0} sx={{ backgroundColor: "#9aaef5" }}>
            <Typography variant="caption" display="block" gutterBottom>
              Posts
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{ color: "#181616" }}
            >
              {dash?.products || 0}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={6} md={3}>
          <Item elevation={0} sx={{ backgroundColor: "#d5c8f7" }}>
            <Typography variant="caption" display="block" gutterBottom>
              Feedbacks
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{ color: "#181616" }}
            >
              {dash?.feedbacks || 0}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={6} md={3}>
          <Item elevation={0} sx={{ backgroundColor: "#c2fcf4" }}>
            <Typography variant="caption" display="block" gutterBottom>
              Catagories
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{ color: "#181616" }}
            >
              {dash?.catagories || 0}
            </Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
