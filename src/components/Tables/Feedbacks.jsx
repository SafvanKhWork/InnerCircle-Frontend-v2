import axios from "axios";
import { url } from "../../config";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";

import { getAuthHeader } from "../../config";
import { Button, IconButton, Typography } from "@mui/material";
import { set } from "date-fns";
import { Visibility } from "@material-ui/icons";
// import { Button } from "@mui/material";

function Delete({ id, setRug }) {
  const token = useSelector((state) => state.user.token);
  return (
    <Button
      size="small"
      variant="text"
      color="error"
      onClick={async (event) => {
        const { data } = await axios.delete(
          `${url}/feedback/${id}`,
          getAuthHeader(token)
        );
        if (data) {
          setRug((prev) => !prev);
        }
      }}
    >
      Delete
    </Button>
  );
}

function Seen({ id, setRug, rug }) {
  const token = useSelector((state) => state.user.token);
  const [feedback, setFeedback] = useState({});
  useEffect(async () => {
    const { data } = await axios.get(
      `${url}/feedback/${id}`,
      getAuthHeader(token)
    );
    if (data) {
      setFeedback(data);
    }
    return () => {};
  }, [rug]);

  return (
    <Button
      size="small"
      variant="text"
      color={feedback.reviewed ? "primary" : "secondary"}
      onClick={async (event) => {
        const { data } = await axios.patch(
          `${url}/feedbacks/${id}`,
          undefined,
          getAuthHeader(token)
        );
        if (data) {
          setRug((prev) => !prev);
        }
      }}
    >
      {feedback.reviewed ? "reviewed" : "pending"}
    </Button>
  );
}

export default function Feedbacks({ feedbacks, rug, setRug }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "No.", width: 50 },
    { field: "feedback", headerName: "Feedback", width: 500 },
    {
      field: "_id",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <Seen id={params.value} setRug={setRug} rug={rug} />
      ),
    },

    {
      field: "did",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => <Delete id={params.value} setRug={setRug} />,
    },
  ];
  return (
    <div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={feedbacks.map((item, i) => {
            return { ...item, id: i + 1, did: item._id };
          })}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
}
