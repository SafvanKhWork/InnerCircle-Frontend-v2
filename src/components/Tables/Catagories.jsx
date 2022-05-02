import { Button, Stack, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthHeader, url } from "../../config";
import { setSpecifiedList } from "../../store/Products/productListSlice";

function Delete({ name, setRug }) {
  const token = useSelector((state) => state.user.token);
  return (
    <Button
      size="small"
      variant="text"
      color="error"
      onClick={async (event) => {
        const { data } = await axios.delete(
          `${url}/catagory/${name}`,
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

export default function Catagories({ catagories, rug, setRug }) {
  const [newCatagory, setNewCatagory] = useState("");
  const { token } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const columns = [
    { field: "id", headerName: "No.", width: 50 },
    { field: "name", headerName: "Catagory", width: 500 },
    {
      field: "did",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => <Delete name={params.value} setRug={setRug} />,
    },
  ];
  return (
    <div>
      <Stack my={1} direction={"row"} spacing={1}>
        <TextField
          value={newCatagory}
          onChange={(event) => setNewCatagory(event.target.value)}
          fullWidth
          size="small"
        />
        <Button
          variant="outlined"
          onClick={async () => {
            if (newCatagory) {
              const { data: catagories } = await axios.post(
                `${url}/catagory/new`,
                { name: newCatagory },
                getAuthHeader(token)
              );
              if (catagories) {
                dispatch(setSpecifiedList({ catagories }));
                setRug((prev) => !prev);
                setNewCatagory("");
              }
            }
          }}
        >
          ADD
        </Button>
      </Stack>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={catagories.map((item, i) => {
            return { ...item, id: i + 1, did: item.name };
          })}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
}
