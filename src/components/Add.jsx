import {
  Button,
  Container,
  Fab,
  FormControlLabel,
  FormLabel,
  Input,
  makeStyles,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Tooltip,
  Box,
  ImageList,
  ImageListItem,
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { useEffect, useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import axios from "axios";
import { url, getAuthHeader } from "../config";

import { Scrollbars } from "react-custom-scrollbars";
import { getToken } from "../store/User/userSlice";
import { setSpecifiedList } from "../store/Products/productListSlice";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: 20,
    right: 20,
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
    <ImageListItem key={i + `${Math.random()}`}>
      <img style={{ height: 80 }} src={img} alt="chosen" />
    </ImageListItem>
  ));

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setFiles([...files, file]);
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
        status,
        product: { productId },
        product,
      } = await addProduct(newProduct, token);
      files.forEach(async (singleFile) => {
        try {
          if (singleFile) {
            const formData = new FormData();
            formData.append("image", singleFile);
            await axios.post(
              `${url}/${productId}/add-image`,
              formData,
              getAuthHeader(token)
            );
          }
        } catch (error) {
          console.error(error);
        }
      });
      if (product) {
        discover.push(product);
        dispatch(setSpecifiedList({ discover }));
      }
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
    } catch (error) {}
  };
  const newProduct = { description, name, price, catagory: selectedCatagory };

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
          This is a success message!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Add;
