// Operations layer: pure functions for calculations

export const computeTotalExpenses = (items) => {
  return items.reduce((sum, e) => sum + Number(e.amount || 0), 0);
};


export const groupByDateTotals = (items) => {
  const map = new Map();
  items.forEach((e) => {
    const d = (e.date || "").slice(0, 10);
    map.set(d, (map.get(d) || 0) + Number(e.amount || 0));
  });
  return Array.from(map.entries())
    .sort(([a], [b]) => (a > b ? 1 : -1))
    .map(([date, total]) => ({ date, total }));
};

// Income vs Expenses comparison
export const incomeVsExpensesData = (expenses, incomes) => {
  const totalExpenses = computeTotalExpenses(expenses);
  const totalIncomes = computeTotalExpenses(incomes); // reuse same helper
  return [
    { name: "Expenses", value: totalExpenses },
    { name: "Incomes", value: totalIncomes },
  ];
};


export const categoryBreakdown = (items) => {
  const map = new Map();
  items.forEach((e) => {
    const cat = e.category || "Other";
    map.set(cat, (map.get(cat) || 0) + Number(e.amount || 0));
  });
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }));
};

export const savingsVsExpenses = (items, monthlyIncome = 120000) => {
  // Simple comparison within the observed period
  const total = computeTotalExpenses(items);
  const savings = Math.max(monthlyIncome - total, 0);
  return { expenses: total, savings };
};

// Moving average over grouped daily totals
export const movingAverage = (series, window = 3) => {
  if (!Array.isArray(series) || series.length === 0) return [];
  const values = series.map((d) => d.total);
  const result = [];
  for (let i = 0; i < values.length; i++) {
    const start = Math.max(0, i - window + 1);
    const slice = values.slice(start, i + 1);
    const avg = slice.reduce((a, b) => a + b, 0) / slice.length;
    result.push({ date: series[i].date, ma: Number(avg.toFixed(2)) });
  }
  return result;
};

// Z-score anomaly detection on daily totals
export const detectAnomalies = (series, threshold = 2) => {
  const vals = series.map((d) => d.total);
  if (vals.length === 0) return [];
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
  const variance =
    vals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / vals.length;
  const std = Math.sqrt(variance) || 1;
  return series
    .map((d) => ({
      ...d,
      z: (d.total - mean) / std,
      isAnomaly: Math.abs((d.total - mean) / std) >= threshold,
    }))
    .filter((d) => d.isAnomaly);
};

// Histogram buckets for expense amounts
export const histogram = (items, binSize = 1000) => {
  const bins = new Map();
  items.forEach((e) => {
    const amt = Number(e.amount || 0);
    const bin = Math.floor(amt / binSize) * binSize;
    const label = `${bin}-${bin + binSize - 1}`;
    bins.set(label, (bins.get(label) || 0) + 1);
  });
  return Array.from(bins.entries())
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
    .map(([range, count]) => ({ range, count }));
};

// Stacked series by category over time
export const categoryTimeSeries = (items) => {
  const dates = Array.from(
    new Set(items.map((e) => (e.date || "").slice(0, 10)))
  ).sort();
  const cats = Array.from(new Set(items.map((e) => e.category || "Other")));
  const rows = dates.map((d) => {
    const row = { date: d };
    cats.forEach((c) => (row[c] = 0));
    return row;
  });
  items.forEach((e) => {
    const d = (e.date || "").slice(0, 10);
    const c = e.category || "Other";
    const row = rows.find((r) => r.date === d);
    if (row) row[c] += Number(e.amount || 0);
  });
  return { data: rows, categories: cats };
};

// Cumulative spend over time
export const cumulativeSpend = (series) => {
  let acc = 0;
  return series.map((d) => {
    acc += d.total;
    return { date: d.date, cumulative: acc };
  });
};

// Investment analytics
export const computeInvestmentSummary = (positions) => {
  const totals = positions.reduce(
    (acc, p) => {
      acc.invested += Number(p.amountInvested || 0);
      acc.current += Number(p.currentValue || 0);
      return acc;
    },
    { invested: 0, current: 0 }
  );
  const profit = totals.current - totals.invested;
  const roi = totals.invested > 0 ? profit / totals.invested : 0;
  return { ...totals, profit, roi };
};

export const allocationByAsset = (positions) => {
  const total =
    positions.reduce((s, p) => s + Number(p.currentValue || 0), 0) || 1;
  return positions.map((p) => ({
    name: p.symbol,
    value: Math.round((Number(p.currentValue || 0) / total) * 100),
  }));
};

export const buildCumulativeInvestment = (positions) => {
  const byDate = positions
    .slice()
    .sort((a, b) => (a.buyDate > b.buyDate ? 1 : -1))
    .map((p) => ({
      date: p.buyDate,
      invested: Number(p.amountInvested || 0),
      current: Number(p.currentValue || 0),
    }));
  let inv = 0;
  let cur = 0;
  return byDate.map((d) => {
    inv += d.invested;
    cur += d.current;
    return { date: d.date, invested: inv, current: cur };
  });
};
