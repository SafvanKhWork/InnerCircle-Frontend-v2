import axios from "axios";
import { url } from "../../config";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";

import { getAuthHeader } from "../../config";

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  useEffect(async () => {
    const { data } = await axios.get(`${url}/feedbacks`, getAuthHeader(token));
    if (data) {
      const refined = data.map((row, i) => {
        return { ...row, id: i };
      });
      setFeedbacks(refined);
    }
    return () => {};
  }, []);
  if (feedbacks.length === 0 || !feedbacks?.length) {
  }
  const columns = [
    { field: "id", headerName: "id", width: 50 },
    // { field: "_id", headerName: "database id", width: 130 },
    { field: "feedback", headerName: "message", width: 280 },
    { field: "reviewed", headerName: "seen", width: 70 },
  ];
  return (
    <div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={feedbacks}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
}
