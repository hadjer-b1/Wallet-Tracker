import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  groupByDateTotals,
  categoryBreakdown,
  savingsVsExpenses,
  movingAverage,
  detectAnomalies,
  histogram,
  categoryTimeSeries,
  cumulativeSpend,
  incomeVsExpensesData
} from "../operations/analytics";
import { LanguageContext } from "../context/AppContext";
import { t } from "../i18n";
import { useTheme } from "@mui/material/styles";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#9C27B0",
  "#e91e63",
  "#00ACC1",
];

const Statistics = ({ expenses, incomes }) => {
  const { language } = React.useContext(LanguageContext);
  const theme = useTheme();
  const lineData = groupByDateTotals(expenses);
  const ma3 = movingAverage(lineData, 3);
  const anomalies = detectAnomalies(lineData, 2);
  const catData = categoryBreakdown(expenses);
  const comp = savingsVsExpenses(expenses);
  const compData = [
    { name: "Expenses", value: comp.expenses },
    { name: "Savings", value: comp.savings },
  ];
  const incomeVsExp = incomeVsExpensesData(expenses, incomes);

   const { data: stacked, categories } = categoryTimeSeries(expenses);
  const cumulative = cumulativeSpend(lineData);

  const fmtDA = (v) => `${(v ?? 0).toLocaleString("fr-DZ")} DA`;
  const tooltipFmt = (value, name) => [fmtDA(value), name];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ justifyContent: "center", alignItems: "center" }}>
        <Paper sx={{ p: 2, justifyContent: "center", alignItems: "center" }}>
          <Typography variant="h6" gutterBottom>
            {language === "ar"
              ? "الاتجاه مع المتوسطات والحالات الشاذة"
              : language === "fr"
              ? "Tendance avec moyenne mobile et anomalies"
              : "Trend with Moving Average & Anomalies"}
          </Typography>
          <ResponsiveContainer width="100%" minWidth={370} height={360}>
            <LineChart
              data={lineData}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={fmtDA} />
              <Tooltip formatter={tooltipFmt} />
              <Line
                type="monotone"
                dataKey="total"
                stroke={theme.palette.primary.main}
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                data={ma3}
                dataKey="ma"
                stroke={theme.palette.secondary.main}
                strokeWidth={2}
                dot={false}
              />
              {anomalies.map((a) => (
                <Line
                  key={a.date}
                  type="monotone"
                  data={[a]}
                  dataKey="total"
                  stroke="#e91e63"
                  dot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid item xs={18} md={6} sx={{ justifyContent: "center", alignItems: "center" }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {language === "ar"
              ? "تفصيل الفئات"
              : language === "fr"
              ? "Répartition par catégorie"
              : "Category Breakdown"}
          </Typography>
          <ResponsiveContainer width="100%" minWidth={300} height={360}>
            <BarChart
              data={catData}
              barSize={28}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={fmtDA} />
              <Tooltip formatter={tooltipFmt} />
              <Bar
                dataKey="value"
                fill={theme.palette.secondary.main}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {language === "ar"
              ? "الادخار مقابل المصروفات"
              : language === "fr"
              ? "Économies vs Dépenses"
              : "Savings vs Expenses"}
          </Typography>
          <ResponsiveContainer width="100%" minWidth={340} height={360}>
            <PieChart>
              <Pie
                data={compData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {compData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
  <Paper sx={{ p: 2 }}>
    <Typography variant="h6" gutterBottom>
      {language === "ar"
        ? "الإيرادات مقابل المصروفات"
        : language === "fr"
        ? "Revenus vs Dépenses"
        : "Income vs Expenses"}
    </Typography>
    <ResponsiveContainer width="100%" minWidth={370} height={400}>
      <PieChart>
        <Pie
          data={incomeVsExp}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {incomeVsExp.map((entry, index) => (
            <Cell
              key={`cell-inc-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip formatter={tooltipFmt} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </Paper>
</Grid>


      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {language === "ar"
              ? "الإنفاق التراكمي"
              : language === "fr"
              ? "Dépenses cumulées"
              : "Cumulative Spend"}
          </Typography>
          <ResponsiveContainer width="100%" minWidth={300} height={400}>
            <AreaChart data={cumulative}>
              <defs>
                <linearGradient id="colorCum" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0088FE" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#0088FE" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={fmtDA} />
              <Tooltip formatter={tooltipFmt} />
              <Area
                type="monotone"
                dataKey="cumulative"
                stroke="#0088FE"
                fillOpacity={1}
                fill="url(#colorCum)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {language === "ar"
              ? "الفئات مكدسة بمرور الوقت"
              : language === "fr"
              ? "Catégories empilées dans le temps"
              : "Category Stacked Over Time"}
          </Typography>
          <Box height="100%" minHeight={400}>
            <ResponsiveContainer width="100%" minWidth={340} height={360}>
              <BarChart
                data={stacked}
                barSize={15}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={fmtDA} />
                <Tooltip formatter={tooltipFmt} />
                <Legend verticalAlign="bottom" height={16} />
                {categories.map((c, i) => (
                  <Bar
                    key={c}
                    dataKey={c}
                    stackId="a"
                    fill={COLORS[i % COLORS.length]}
                    radius={[4, 4, 0, 0]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Statistics;
