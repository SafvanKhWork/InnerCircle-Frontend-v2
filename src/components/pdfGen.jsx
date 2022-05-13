import React, { useEffect } from "react";
import jsPDF from "jspdf";
import Button from "@mui/material/Button";
import PrintIcon from "@mui/icons-material/Print";

export default function HistoryPDF({ user }) {
  const pdfGenerate = () => {
    const doc = new jsPDF("l", "mm", "a4", false);

    doc.addImage(user.avatar, "PNG", 5, 10, 32, 32);
    doc.setTextColor("#221E1F");
    doc.setFont("courier", "bold");
    doc.setFontSize(14);
    doc.text("History:", 5, 50);

    user.history.forEach((item, i) => {
      let action = "to/from";
      if (item.act === "sold") {
        action = "to";
      }
      if (item.act === "bought") {
        action = "from";
      }
      doc.setCharSpace(0);
      doc.setFont("monospace", "italic", "");
      doc.setFontSize(12);
      doc.text(
        `${i + 1}. ${user._id}(you) ${item.act} ${item.name} ${action} user ${
          item.user2
        } in Rs.${item.value}/-.`,
        5,
        60 + 8 * i
      );
    });

    doc.save(`${user.username}_history.pdf`);
  };

  return (
    <Button variant="outlined" color="info" onClick={pdfGenerate}>
      <PrintIcon fontSize="small" />
    </Button>
  );
}
