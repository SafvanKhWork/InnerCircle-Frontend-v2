import { useState } from "react";
import { Box, Button, Typography, Modal, Paper, Card } from "@mui/material";
import Scrollbars from "react-custom-scrollbars";
//
import Authentication from "./Authentication";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 364,
  bgcolor: "background.paper",
  borderRadius: "4px ",
  py: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = useState(true);
  const status = props.status;

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (!status.isLoggedIn) {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Scrollbars
            style={{ height: 430 }}
            autoHide
            autoHideTimeout={0}
            autoHideDuration={200}
          >
            <Authentication status={status} />
          </Scrollbars>
        </Box>
      </Modal>
    </div>
  );
}
