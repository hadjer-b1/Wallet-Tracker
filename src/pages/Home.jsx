import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import InsightsIcon from "@mui/icons-material/Insights";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Button from "@mui/material/Button";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  computeTotalExpenses,
  groupByDateTotals,
  categoryBreakdown,
  savingsVsExpenses,
} from "../operations/analytics";
import { LanguageContext } from "../context/AppContext";
import { t } from "../i18n";
import { useNavigate } from "react-router-dom";

const COLORS = [
  "#22b3a6",
  "#0e8a7b",
  "#5ee0d1",
  "#00897b",
  "#80cbc4",
  "#00695c",
];

const KpiCard = ({ title, value, icon, footer }) => (
  <Paper sx={{ p: 2, height: "100%" }}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>
      <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}>
        {icon}
      </Avatar>
    </Box>
    <Typography variant="h5" sx={{ mt: 1 }}>
      {value}
    </Typography>
    {footer}
  </Paper>
);

const Home = ({ expenses: initialExpenses = [], incomes: initialIncomes = [] }) => {
  const { language } = React.useContext(LanguageContext);
  const navigate = useNavigate();

  // FIX: wrap props in state so UI reacts
  const [expenses, setExpenses] = React.useState(initialExpenses);
  const [incomes, setIncomes] = React.useState(initialIncomes);

  const resetData = () => {
    setExpenses([]);
    setIncomes([]);
  };

  const addFakeData = () => {
    setExpenses(initialExpenses);
    setIncomes(initialIncomes);
  };

  // totals
  const totalExpenses = computeTotalExpenses(expenses);
  const totalIncome = computeTotalExpenses(incomes);

  // analytics
  const lineData = groupByDateTotals(expenses);
  const cats = categoryBreakdown(expenses).slice(0, 5);
  const incomeCats = categoryBreakdown(incomes).slice(0, 5);
  const incomeLineData = groupByDateTotals(incomes);
  const comp = savingsVsExpenses(expenses);

  const compareData = [
    { name: "Income", value: totalIncome },
    { name: "Expenses", value: totalExpenses },
  ];

  return (
    <Box sx={{ mb: 5, justifyContent: "center", alignItems: "center" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 600,
          mb: 5,
          textAlign: "center",
          color: "primary.main",
          fontSize: "3rem",
        }}
      >
        {t(language, "overview")}
      </Typography>

      <Grid
        container
        spacing={4

        }
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        {/* KPI Cards */}
        <Grid item xs={12} md={3}>
          <Stack spacing={2}>
            <KpiCard
              title={t(language, "savings Estimate")}
              value={`${comp.savings.toLocaleString("fr-DZ")} DA`}
              icon={<ShowChartIcon fontSize="small" />}
              footer={
                <Typography variant="caption" color="text.secondary">
                  Based on monthly income {totalIncome.toLocaleString("fr-DZ")}{" "}
                  DA
                </Typography>
              }
            />
            <KpiCard
              title={t(language, "daily Avg")}
              value={`${Math.round(
                totalExpenses / Math.max(lineData.length, 1) || 0
              ).toLocaleString("fr-DZ")} DA`}
              icon={<TimelineIcon fontSize="small" />}
              footer={
                <Typography variant="caption" color="text.secondary">
                  Average spend per recorded day
                </Typography>
              }
            />
          </Stack>
        </Grid>

        {/* Center - Pie Chart (category breakdown) */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardContent sx={{ textAlign: "center", p: 4 }}>
              <Typography variant="h6" color="text.secondary"  gutterBottom>
                {t(language, "Total Expenses")}
              </Typography>
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <ResponsiveContainer width={280} height={280}>
                  <PieChart>
                    <Pie
                      data={cats}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={2}
                    >
                      {cats.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [
                        `${value.toLocaleString("fr-DZ")} DA`,
                        "Amount",
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: "primary.main" }}
                  >
                    {totalExpenses.toLocaleString("fr-DZ")} DA
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {expenses.length} transactions
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right - top categories */}
        <Grid item xs={12} md={3}>
          <Stack spacing={2}>
            {cats.slice(0, 3).map((cat, index) => (
              <Card key={cat.name} sx={{ p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: COLORS[index % COLORS.length],
                      width: 40,
                      height: 40,
                    }}
                  >
                    <AccountBalanceIcon fontSize="small" />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {cat.name}
                    </Typography>
                    <Typography variant="h6" color="primary.main">
                      {cat.value.toLocaleString("fr-DZ")} DA
                    </Typography>
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>

        {/* Trend chart */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <TrendingUpIcon />
                {t(language, "Trend")}
              </Typography>
              <Box sx={{ height: 250 }}>
                <ResponsiveContainer width="100%" minwidth={300} height="100%">
                  <LineChart data={lineData}>
                    <XAxis dataKey="date" hide />
                    <YAxis hide />
                    <Tooltip
                      formatter={(value) => [
                        `${value.toLocaleString("fr-DZ")} DA`,
                        "Total",
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#22b3a6"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Income vs Expenses chart */}
        <Grid item xs={12}  md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t(language, "income Vs Expenses")}
              </Typography>
              <Box sx={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={compareData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#1976d2" name="Amount (DA)" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {/* Income  chart */}

        <Grid item xs={12} md={6} sx={{ ml: 6 }}>
          <Card
          
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent",
              boxShadow: "none"
            }}
          >
            <CardContent sx={{ textAlign: "center", p: 4 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {t(language, "Total Incomes")}
              </Typography>
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <ResponsiveContainer width={280} height={280}>
                  <PieChart>
                    <Pie
                      data={incomeCats}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={2}
                    >
                      {incomeCats.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [
                        `${value.toLocaleString("fr-DZ")} DA`,
                        "Amount",
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: "primary.main" }}
                  >
                    {totalIncome.toLocaleString("fr-DZ")} DA
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {incomes.length} transactions
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Investments card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t(language, "Investments")}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Track returns alongside spending with broker APIs and CSV
                imports.
              </Typography>
              <Chip
                icon={<InsightsIcon />}
                clickable
                color="primary"
                variant="outlined"
                label={t(language, "viewDetails")}
                onClick={() => navigate("/invest")}
                sx={{ width: "100%" }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
     {/* Buttons */}
     <Stack spacing={2} sx={{ mt: 3 }}>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="error" onClick={resetData}>
            {language === "ar"
              ? "إعادة ضبط"
              : language === "fr"
              ? "Réinitialiser"
              : "Reset"}
          </Button>
          <Button variant="contained" color="primary" onClick={addFakeData}>
            {language === "ar"
              ? "إضافة بيانات تجريبية"
              : language === "fr"
              ? "Ajouter des données fictives"
              : "Add Fake Data"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Home;
