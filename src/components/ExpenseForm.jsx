import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { LanguageContext } from "../context/AppContext";

const categories = [
  "Food",
  "Transport",
  "Rent",
  "Phone Recharge",
  "Utilities",
  "Health",
  "Entertainment",
];
const categoryLabel = (lang, name) => {
  if (lang === "fr") {
    switch (name) {
      case "Food":
        return "Nourriture";
      case "Transport":
        return "Transport";
      case "Rent":
        return "Loyer";
      case "Phone Recharge":
        return "Recharge Téléphone";
      case "Utilities":
        return "Services publics";
      case "Health":
        return "Santé";
      case "Entertainment":
        return "Divertissement";
      default:
        return name;
    }
  }
  if (lang === "ar") {
    switch (name) {
      case "Food":
        return "طعام";
      case "Transport":
        return "نقل";
      case "Rent":
        return "إيجار";
      case "Phone Recharge":
        return "شحن الهاتف";
      case "Utilities":
        return "مرافق";
      case "Health":
        return "صحة";
      case "Entertainment":
        return "ترفيه";
      default:
        return name;
    }
  }
  return name;
};

const ExpenseForm = ({ onAdd }) => {
  const { language } = React.useContext(LanguageContext);
  const [form, setForm] = useState({
    name: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.amount || !form.category || !form.date) return;
    const expense = {
      id: crypto.randomUUID(),
      name: form.name,
      amount: Number(form.amount),
      category: form.category,
      date: new Date(form.date).toISOString().slice(0, 10),
    };
    onAdd(expense);
    setForm({ name: "", amount: "", category: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            label={
              language === "ar"
                ? "العنصر"
                : language === "fr"
                ? "Article"
                : "Item"
            }
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ShoppingCartIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label={
              language === "ar"
                ? "المبلغ (DA)"
                : language === "fr"
                ? "Montant (DA)"
                : "Amount (DA)"
            }
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            select
            label={
              language === "ar"
                ? "الفئة"
                : language === "fr"
                ? "Catégorie"
                : "Category"
            }
            name="category"
            value={form.category}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CategoryIcon />
                </InputAdornment>
              ),
            }}
          >
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {categoryLabel(language, c)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            label={
              language === "ar"
                ? "التاريخ"
                : language === "fr"
                ? "Date"
                : "Date"
            }
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonthIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit">
            {language === "ar"
              ? "أضف مصروف"
              : language === "fr"
              ? "Ajouter dépense"
              : "Add Expense"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ExpenseForm;
