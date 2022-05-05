import { Avatar, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthHeader, url } from "../../config";
import PostPreview from "../EditEmail";

function Delete({ id, setRug }) {
  const token = useSelector((state) => state.user.token);
  return (
    <Button
      size="small"
      variant="text"
      color="error"
      onClick={async (event) => {
        const { data } = await axios.delete(
          `${url}/admin/products/${id}`,
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

const PostImage = ({ id }) => {
  const [product, setProduct] = useState({});
  const [current, setCurrent] = useState(0);
  useEffect(async () => {
    const { data } = await axios.get(`${url}/products/id/${id}`);
    if (data) {
      setProduct(data);
    }
    return () => {};
  }, []);
  const limit = product?.images?.length - 1 || 0;
  return (
    <div
      onClick={() => {
        if (current === limit) {
          setCurrent(0);
        } else {
          setCurrent((prev) => prev + 1);
        }
      }}
    >
      {product?.images ? (
        <Avatar
          variant="square"
          src={product?.images[current]}
          sx={{ width: 52, height: 34, borderRadius: "0.1em" }}
        />
      ) : (
        <Avatar
          variant="square"
          src={""}
          sx={{ width: 52, height: 34, borderRadius: "0.1em" }}
        />
      )}
    </div>
  );
};

export default function Products({ products, rug, setRug }) {
  const columns = [
    { field: "id", headerName: "No.", width: 50 },
    {
      field: "_id",
      headerName: "Images",
      width: 100,
      renderCell: (params) => <PostImage id={params.value} />,
    },
    { field: "name", headerName: "Name", width: 150 },
    { field: "catagory", headerName: "Catagory", width: 100 },
    { field: "description", headerName: "Description", width: 300 },
    {
      field: "owner",
      headerName: "Owner",
      width: 100,
      renderCell: (params) => {
        return <Typography fontSize={14}>@{params.value.username}</Typography>;
      },
    },
    { field: "price", headerName: "Price (₹)", width: 100 },

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
          rows={products.map((item, i) => {
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
