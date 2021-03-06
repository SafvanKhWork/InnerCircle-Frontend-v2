import {
  Button,
  Container,
  Fab,
  Input,
  makeStyles,
  MenuItem,
  Modal,
  Snackbar,
  TextField,
  Tooltip,
  Box,
  ImageList,
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { useEffect, useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import axios from "axios";
import { url, getAuthHeader } from "../config";

import { Scrollbars } from "react-custom-scrollbars";
import { getToken, refetchUser } from "../store/User/userSlice";
import { setSpecifiedList } from "../store/Products/productListSlice";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  container: {
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Add = () => {
  const token = useSelector(getToken);
  const catagories = useSelector((state) => state.products.catagories);
  const classes = useStyles();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCatagory, setSelectedCatagory] = useState("");
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [files, setFiles] = useState([]);
  const [previewSource, setPreviewSource] = useState([]);
  const [price, setPrice] = useState(0);

  const dispatch = useDispatch();
  const discover = useSelector((state) => state.products.discover);
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource([reader.result, ...previewSource]);
    };
  };

  const addProduct = async (productInfo) => {
    try {
      const response = await axios.post(
        `${url}/product/new`,
        productInfo,
        getAuthHeader(token)
      );
      return { status: true, product: response.data };
    } catch (error) {
      return { status: false, productId: undefined };
    }
  };
  useEffect(() => {
    return () => {
      setPreviewSource([]);
      setFiles([]);
      setSelectedCatagory(undefined);
      setPrice(0);
    };
  }, []);
  const previewImage = previewSource.map((img, i) => (
    <div
      key={img}
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
        product,
      } = await addProduct(newProduct, token);

      if (productId) {
        setOpenAlert(true);
        setPreviewSource([]);
        setDescription("");
        setFiles([]);
        setSelectedCatagory("");
        setPrice(0);
        setName("");
        setOpen(false);
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
  const newProduct = {
    description,
    name,
    price,
    catagory: selectedCatagory,
    images: files,
  };

  return (
    <>
      <Tooltip title="Add" aria-label="add" onClick={() => setOpen(true)}>
        <Fab color="primary" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal open={open}>
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
                    fullWidth
                    select
                    onChange={(event) => {
                      setSelectedCatagory(event.target.value);
                    }}
                    value={selectedCatagory || "Select Catagory"}
                    label="Catagory"
                  >
                    {catagories.map((catagory) => (
                      <MenuItem key={catagory._id} value={catagory.name}>
                        {catagory.name}
                      </MenuItem>
                    ))}
                  </TextField>
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
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ marginRight: 20 }}
                    onClick={handleCreate}
                  >
                    Create
                  </Button>

                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      setPreviewSource([]);
                      setDescription("");
                      setFiles([]);
                      setSelectedCatagory("");
                      setPrice(0);
                      setName("");
                      setOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
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
          Product was successfully Added!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Add;
