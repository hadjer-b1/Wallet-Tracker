import React, { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import AddExpense from "./pages/AddExpense";
import Statistics from "./pages/Statistics";
import Investments from "./pages/Investments";
import { initialExpenses, initialIncomes } from "./data";

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [incomes, setIncomes] = useState(initialIncomes);
  const addExpense = (expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };
  const addIncome = (income) => {
    setIncomes((prev) => [income, ...prev]);
  };
  const addManyIncomes = (newItems) => {
    setIncomes((prev) => [...newItems, ...prev]);
  };
  const stateIncomesApi = useMemo(
    () => ({ incomes, addIncome, addManyIncomes }),
    [incomes]
  );

  const addManyExpenses = (newItems) => {
    setExpenses((prev) => [...newItems, ...prev]);
  };

  const stateApi = useMemo(
    () => ({ expenses, addExpense, addManyExpenses }),
    [expenses]
  );

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <NavBar />
      <Container maxWidth="lg" sx={{ pt: 3, pb: 5 }}>
        <Routes>
         <Route
            path="/Wallet-Tracker"
            element={<Home expenses={expenses} incomes={incomes} />}
          />
          <Route
            path="/"
            element={<Home expenses={expenses} incomes={incomes} />}
          />
          <Route
            path="/add"
            element={
              <AddExpense
                stateApi={stateApi}
                stateIncomesApi={stateIncomesApi}
              />
            }
          />
          <Route
            path="/stats"
            element={<Statistics expenses={expenses} incomes={incomes} />}
          />
          <Route path="/invest" element={<Investments />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
