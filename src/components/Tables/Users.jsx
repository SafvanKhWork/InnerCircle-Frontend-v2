import { Avatar, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { getAuthHeader, url } from "../../config";
import Confirm from "../Confirm";
import EditEmail from "../EditEmail";

function Delete({ id, setRug }) {
  const token = useSelector((state) => state.user.token);
  return (
    <Button
      size="small"
      variant="text"
      color="error"
      onClick={async (event) => {
        const { data } = await axios.delete(
          `${url}/admin/users/${id}`,
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

export default function Users({ users, rug, setRug }) {
  const token = useSelector((state) => state.user.token);
  const columns = [
    { field: "id", headerName: "No.", width: 50 },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 55,
      renderCell: (params) => {
        return <Avatar src={params.value} />;
      },
    },
    { field: "username", headerName: "Username", width: 125 },
    { field: "name", headerName: "Name", width: 100 },
    {
      field: "eid",
      headerName: "Email",
      width: 200,
      renderCell: (params) => (
        <EditEmail
          email0={params.value.email}
          id={params.value.id}
          setRug={setRug}
        >
          {params.value.email}
        </EditEmail>
      ),
    },
    {
      field: "aid",
      headerName: "Privilege",
      width: 100,
      renderCell: (params) => {
        return (
          <Confirm
            title={`Click to make ${!params.value.admin ? "admin" : "user"}`}
            message={`Do you want to ${
              params.value.admin ? "revoke" : "grant"
            } admin privileges ${params.value.admin ? "from" : "to"} this ${
              params.value.admin ? "admin" : "user"
            }?`}
            onConfirm={async () => {
              const { data } = await axios.patch(
                `${url}/admin/type/${params.value.id}`,
                { admin: !params.value.admin },
                getAuthHeader(token)
              );
              if (data) {
                setRug((prev) => !prev);
              }
            }}
          >
            <Typography
              color={params.value.admin ? "secondary" : "primary"}
              fontSize={14}
            >
              {params.value.admin ? "admin" : "user"}
            </Typography>
          </Confirm>
        );
      },
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
          rows={users.map((item, i) => {
            return {
              ...item,
              id: i + 1,
              did: item._id,
              eid: { id: item._id, email: item.email },
              aid: { id: item._id, admin: item.admin },
            };
          })}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
}
