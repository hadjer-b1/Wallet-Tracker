import React from "react";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { LanguageContext } from "../context/AppContext";

const parseCsv = (text) => {
  const lines = text.trim().split(/\r?\n/);
  const [headerLine, ...rows] = lines;
  const headers = headerLine.split(",").map((h) => h.trim().toLowerCase());
  return rows.filter(Boolean).map((line) => {
    const cols = line.split(",").map((v) => v.trim());
    const record = Object.fromEntries(headers.map((h, i) => [h, cols[i]]));
    return {
      id: crypto.randomUUID(),
      name: record.name || "Item",
      amount: Number(record.amount || 0),
      category: record.category || "Other",
      date: new Date(record.date).toISOString().slice(0, 10),
    };
  });
};

const FileUploader = ({ onData }) => {
  const { language } = React.useContext(LanguageContext);
  const inputRef = React.useRef(null);

  const handlePick = () => inputRef.current?.click();

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    try {
      let items = [];
      if (file.name.endsWith(".json")) {
        const data = JSON.parse(text);
        items = Array.isArray(data) ? data : data.items || [];
        items = items.map((r) => ({
          id: crypto.randomUUID(),
          name: r.name,
          amount: Number(r.amount),
          category: r.category,
          date: new Date(r.date).toISOString().slice(0, 10),
        }));
      } else {
        items = parseCsv(text);
      }
      onData(items);
    } catch (err) {
      console.error("Failed to parse file", err);
      alert(
        language === "ar"
          ? "فشل في تحليل الملف. تأكد من أن CSV يحتوي على الأعمدة name,amount,category,date أو JSON صحيح."
          : language === "fr"
          ? "Échec de l'analyse du fichier. Assurez-vous que le CSV contient les colonnes name,amount,category,date ou un JSON valide."
          : "Failed to parse file. Ensure CSV has name,amount,category,date columns or valid JSON array."
      );
    }
    e.target.value = "";
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,.json"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <Button
        variant="outlined"
        startIcon={<UploadFileIcon />}
        onClick={handlePick}
      >
        {language === "ar"
          ? "إدراج CSV/JSON"
          : language === "fr"
          ? "Insérer CSV/JSON"
          : "Insert CSV/JSON"}
      </Button>
    </>
  );
};

export default FileUploader;
