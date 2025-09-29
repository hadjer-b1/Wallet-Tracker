// components/IncomeForm.jsx
import React, { useState } from "react";
import { TextField, Button, Stack, MenuItem } from "@mui/material";

const IncomeForm = ({ onAdd }) => {
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("salary");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;
    onAdd({ amount: parseFloat(amount), source, date: new Date().toISOString() });
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} container direction="row">
        
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          required
        />
        <TextField
          select
          label="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          fullWidth
        >
          <MenuItem value="salary">Salary</MenuItem>
          <MenuItem value="freelance">Freelance</MenuItem>
          <MenuItem value="gift">Gift</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" color="primary">
          Add Income
        </Button>
      </Stack>
    </form>
  );
};

export default IncomeForm;
