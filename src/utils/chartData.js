export const generateChartData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, i) => ({
    month,
    profit: Math.floor(Math.random() * 5000) + (i * 1000) + 2000,
  }));
};

export const generateRealisticChartData = (trader) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  const accountAge = new Date() - new Date(trader.accountCreated);
  const monthsActive = Math.min(Math.ceil(accountAge / (30 * 24 * 60 * 60 * 1000)), 12);

  const startMonth = Math.max(0, currentMonth - monthsActive + 1);
  const finalProfit = trader.totalProfit;
  const winRate = trader.winRate / 100;

  const data = [];

  for (let i = 0; i < 12; i++) {
    if (i < startMonth) {
      data.push({ month: months[i], profit: 0 });
    } else if (i <= currentMonth) {
      const monthIndex = i - startMonth;
      const progress = monthIndex / (currentMonth - startMonth || 1);
      const growthFactor = Math.pow(progress, 0.7);
      const cumulativeProfit = finalProfit * growthFactor;
      const variance = (1 - winRate) * 0.3;
      const randomFactor = 1 + (Math.random() - 0.5) * variance;

      data.push({
        month: months[i],
        profit: Math.max(0, Math.floor(cumulativeProfit * randomFactor)),
      });
    } else {
      data.push({ month: months[i], profit: null });
    }
  }

  if (data[currentMonth]) {
    data[currentMonth].profit = finalProfit;
  }

  return data.filter(d => d.profit !== null);
};
