import { Avatar, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { getAuthHeader, url } from "../../config";

export default function Users({ users, rug, setRug }) {
  const columns = [
    { field: "id", headerName: "No.", width: 50 },
    {
      field: "avatar",
      headerName: "Images",
      width: 80,
      renderCell: (params) => {
        return <Avatar src={params.value} />;
      },
    },
    { field: "username", headerName: "Username", width: 100 },
    { field: "name", headerName: "Name", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
  ];

  return (
    <div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={users.map((item, i) => {
            return { ...item, id: i + 1 };
          })}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
}
