import React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import IncomeForm from "../components/IncomeForm";
import IncomeList from "../components/IncomeList";
import FileUploader from "../components/FileUploader";
import { LanguageContext } from "../context/AppContext";

const AddExpense = ({ stateApi, stateIncomesApi }) => {
  const { language } = React.useContext(LanguageContext);
  const { expenses, addExpense, addManyExpenses } = stateApi;
  const { incomes, addIncome, addManyIncomes } = stateIncomesApi;
  return (
    <Stack spacing={2}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          {language === "ar"
            ? "إضافة مصروف"
            : language === "fr"
            ? "Ajouter dépense"
            : "Add Expense"}
        </Typography>
        <ExpenseForm onAdd={addExpense} />
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          {language === "ar"
            ? "إضافة الدخل"
            : language === "fr"
            ? "Ajouter le revenu"
            : "Add Income"}
        </Typography>
        <IncomeForm onAdd={addIncome} />
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">
            {language === "ar"
              ? "المصروفات"
              : language === "fr"
              ? "Dépenses"
              : "Expenses"}
          </Typography>
          <FileUploader onData={addManyExpenses} />
        </Stack>
        <ExpenseList items={expenses} />
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          {language === "ar"
            ? "الدخل"
            : language === "fr"
            ? "Revenu"
            : "Income"}
        </Typography>
        <IncomeList items={incomes} />
      </Paper>
    </Stack>
  );
};

export default AddExpense;
