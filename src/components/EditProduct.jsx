import {
  Container,
  makeStyles,
  Modal,
  Tooltip,
  Box,
  Button,
  TextField,
  MenuItem,
  Input,
  IconButton,
} from "@material-ui/core";

import { Notifications as Notification } from "@material-ui/icons";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import axios from "axios";
import Confirm from "./Confirm";
import { url, getAuthHeader } from "../config";

import { Scrollbars } from "react-custom-scrollbars";
import {
  getToken,
  refetchUser,
  refreshUserField,
} from "../store/User/userSlice";
import { setSpecifiedList } from "../store/Products/productListSlice";
import {
  Alert,
  Avatar,
  Checkbox,
  Collapse,
  Divider,
  Fab,
  FormControlLabel,
  ImageList,
  ImageListItem,
  Snackbar,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import UserMinibar from "./Details/Single Items/UserMinibar";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: 20,
    right: 20,
  },
  container: {
    borderRadius: "5px",
    width: 500,
    height: 550,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      height: "100vh",
    },
  },
  form: {
    padding: theme.spacing(2),
  },
  item: {
    marginBottom: theme.spacing(3),
  },
}));

const EditProduct = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const product = props.product;
  const account = useSelector((state) => state.user);
  const { token } = account;
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [files, setFiles] = useState(product.images);
  const [previewSource, setPreviewSource] = useState(product.images);
  const [price, setPrice] = useState(Number(product.price));
  const [deleteColor, setDeleteColor] = useState("#f53f38");
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource([reader.result, ...previewSource]);
    };
  };

  const addProduct = async (productInfo) => {
    try {
      const response = await axios.patch(
        `${url}/products/${product._id}`,
        productInfo,
        getAuthHeader(token)
      );
      return { status: true, product: response.data };
    } catch (error) {
      return { status: false, productId: undefined };
    }
  };
  // useEffect(() => {
  //   return () => {
  //     setPreviewSource([]);
  //     setFiles([]);
  //     setPrice(0);
  //   };
  // }, []);
  const previewImage = previewSource.map((img, i) => (
    <ImageListItem key={i + `${Math.random()}`}>
      <div
        onClick={async (event) => {
          const previews = previewSource.filter(
            (image) => image !== event.target.src
          );
          const filez = files.filter((image) => image !== event.target.src);
          setPreviewSource(previews);
          setFiles(filez);
        }}
      >
        <img style={{ height: 80 }} src={img} alt="chosen" />
      </div>
    </ImageListItem>
  ));

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();

    formData.append("avatar", event.target.files[0]);
    const { data } = await axios.post(
      `${url}/image`,
      formData,
      getAuthHeader(token)
    );
    if (data) {
      setFiles([...files, data.url]);
    }
    previewFile(file);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  const handleCreate = async (event) => {
    try {
      const {
        product: { _id: productId },
      } = await addProduct(newProduct, token);
      if (productId) {
        setPreviewSource(product.images);
        setDescription(product.description);
        setFiles(product.images);
        setPrice(Number(product.price));
        setName(product.name);
        setDeleteColor("#f53f38");
        setOpen(false);
        setOpenAlert(true);
      }
      if (productId) {
        try {
          const { data: discover } = await axios.get(`${url}/products`);
          const { data: catagories } = await axios.get(`${url}/catagories`);
          if (token === "") {
            dispatch(
              setSpecifiedList({
                current: discover,
                discover,
                catagories,
              })
            );
            return;
          }
          const { data: feed } = await axios.get(`${url}/feed`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const {
            data: [recommanded, recommandors],
          } = await axios.get(`${url}/recommanded`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch(
            setSpecifiedList({
              recommandors,
              discover,
              feed,
              catagories,
              recommandation: recommanded,
            })
          );
        } catch (error) {
          console.log({ ...error });
        }
      }
    } catch (error) {}
  };
  const newProduct = { description, name, price, images: files };

  return (
    <>
      <Tooltip title="Add" aria-label="add" onClick={() => setOpen(true)}>
        {props.children}
      </Tooltip>
      <Modal onClose={() => setOpen(false)} open={open}>
        <Container className={classes.container}>
          <Box py={2}>
            <Scrollbars
              style={{ height: 520 }}
              autoHide
              autoHideTimeout={0}
              autoHideDuration={200}
            >
              <form className={classes.form} autoComplete="off">
                <div className={classes.item}>
                  <TextField
                    id="standard-basic"
                    label="Title"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    size="small"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className={classes.item}>
                  <Input
                    fullWidth
                    accept="image/*"
                    multiple
                    name="image"
                    onChange={handleFileInputChange}
                    id="product-image-button-file"
                    type="file"
                  />
                </div>
                <div className={classes.item}>
                  <ImageList
                    rowHeight={100}
                    style={{ marginBottom: 20 }}
                    cols={3}
                  >
                    {previewImage}
                  </ImageList>
                </div>
                <div className={classes.item}>
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    minRows={4}
                    maxRows={4}
                    onChange={(event) => setDescription(event.target.value)}
                    value={description}
                    variant="outlined"
                    label="Description"
                    size="small"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className={classes.item}>
                  <TextField
                    id="standard-basic"
                    size="small"
                    style={{ width: "100%" }}
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    type={"number"}
                    label={"Price"}
                  />
                </div>
                <div className={classes.item}>
                  <Stack direction={"row"} spacing={1}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleCreate}
                    >
                      Update
                    </Button>

                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        setPreviewSource(product.images);
                        setDescription(product.description);
                        setFiles(product.images);
                        setPrice(Number(product.price));
                        setName(product.name);
                        setDeleteColor("#f53f38");
                        setOpen(false);
                      }}
                    >
                      Cancel
                    </Button>

                    <Confirm
                      message={`Are you sure you want to delete this product?`}
                      onConfirm={async () => {
                        const { data } = axios.delete(
                          `${url}/products/${product._id}`,
                          getAuthHeader(token)
                        );
                        try {
                          const { data: discover } = await axios.get(
                            `${url}/products`
                          );
                          dispatch(
                            setSpecifiedList({
                              current: discover,
                              discover,
                            })
                          );
                        } catch (error) {
                          console.log({ ...error });
                        }
                        setOpen(false);
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="inherit"
                        style={{ color: deleteColor }}
                        onMouseEnter={() => setDeleteColor("#f70b02")}
                        onMouseLeave={() => setDeleteColor("#f53f38")}
                      >
                        Delete
                      </Button>
                    </Confirm>
                  </Stack>
                </div>
              </form>
            </Scrollbars>
          </Box>
        </Container>
      </Modal>
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleClose} severity="success">
          Changes were were successfully.
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditProduct;
