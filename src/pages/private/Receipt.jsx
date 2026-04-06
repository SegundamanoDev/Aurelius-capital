import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import toast from "react-hot-toast";
import { getSymbol } from "../public/Register";

const Receipt = () => {
  const receiptRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [tx, setTx] = useState(null);

  // ---------------- GET TRANSACTION FROM LOCALSTORAGE ----------------

  useEffect(() => {
    const storedTx = localStorage.getItem("receipt_tx");

    if (storedTx) {
      setTx(JSON.parse(storedTx));
    }
  }, []);

  // ---------------- SAFETY ----------------

  if (!tx) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No receipt data found</p>
      </div>
    );
  }

  const currencySymbol = getSymbol(tx?.currency || "USD");

  // ---------------- PNG DOWNLOAD ----------------

  const downloadPNG = async () => {
    try {
      setIsExporting(true);

      await new Promise((resolve) => setTimeout(resolve, 300));

      const canvas = await html2canvas(receiptRef.current, {
        scale: 3,
        backgroundColor: "#ffffff",
        useCORS: true,

        onclone: (clonedDoc) => {
          const receipt = clonedDoc.getElementById("receipt-container");

          if (receipt) {
            receipt.style.backgroundColor = "#ffffff";
            receipt.style.color = "#000000";
            receipt.style.boxShadow = "none";
          }
        },
      });

      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = `receipt-${tx._id.slice(-6)}.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("PNG downloaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to download PNG");
    } finally {
      setIsExporting(false);
    }
  };

  // ---------------- PDF DOWNLOAD ----------------

  const downloadPDF = async () => {
    try {
      setIsExporting(true);

      await new Promise((resolve) => setTimeout(resolve, 300));

      const canvas = await html2canvas(receiptRef.current, {
        scale: 3,
        backgroundColor: "#ffffff",
        useCORS: true,

        onclone: (clonedDoc) => {
          const receipt = clonedDoc.getElementById("receipt-container");

          if (receipt) {
            receipt.style.backgroundColor = "#ffffff";
            receipt.style.color = "#000000";
            receipt.style.boxShadow = "none";
          }
        },
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 180;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 15, 20, imgWidth, imgHeight);

      pdf.save(`receipt-${tx._id.slice(-6)}.pdf`);

      toast.success("PDF downloaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to download PDF");
    } finally {
      setIsExporting(false);
    }
  };

  // ---------------- UI ----------------

  return (
    <div
      className="min-h-screen flex flex-col items-center py-20"
      style={{ backgroundColor: "#f3f4f6" }}
    >
      {/* Receipt */}

      <div
        id="receipt-container"
        ref={receiptRef}
        className="w-[420px] p-10 rounded-2xl"
        style={{
          backgroundColor: "#ffffff",
          color: "#000000",
        }}
      >
        <h1
          className="text-2xl font-bold text-center mb-6"
          style={{ color: "#000" }}
        >
          Aurelius Capital
        </h1>

        <div className="text-center mb-6">
          <p style={{ color: "#000" }}>Transaction Amount</p>

          <h2 className="text-3xl font-bold" style={{ color: "#000" }}>
            {currencySymbol}
            {tx.amount}
          </h2>
        </div>

        <div className="space-y-3 text-sm">
          <Row label="Transaction ID" value={tx._id} />
          <Row label="Type" value={tx.type} />
          <Row label="Status" value={tx.status} />
          <Row label="Date" value={new Date(tx.createdAt).toLocaleString()} />
        </div>
      </div>

      {/* Buttons */}

      <div className="flex gap-4 mt-6">
        <button
          onClick={downloadPNG}
          disabled={isExporting}
          style={{
            padding: "12px 20px",
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: "8px",
          }}
        >
          {isExporting ? "Generating..." : "Download PNG"}
        </button>

        <button
          onClick={downloadPDF}
          disabled={isExporting}
          style={{
            padding: "12px 20px",
            border: "1px solid #000",
            borderRadius: "8px",
            backgroundColor: "#fff",
          }}
        >
          {isExporting ? "Generating..." : "Download PDF"}
        </button>
      </div>
    </div>
  );
};

const Row = ({ label, value }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "1px solid #ddd",
      paddingBottom: "8px",
      color: "#000",
    }}
  >
    <span>{label}</span>
    <span style={{ fontWeight: "500" }}>{value}</span>
  </div>
);

export default Receipt;
