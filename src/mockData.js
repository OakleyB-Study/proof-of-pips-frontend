// mockData.js - Mock traders for populating the leaderboard
// Import this file into trustprop.js: import { mockTraders, mergeWithRealTraders } from './mockData';

const generateChartData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, i) => ({
    month,
    profit: Math.floor(Math.random() * 5000) + (i * 1000) + 2000
  }));
};

export const mockTraders = [
  {
    rank: 2,
    twitter: 'thetradingchamp',
    avatar: '🎯',
    totalProfit: 98300,
    verifiedPayouts: 12,
    monthlyProfit: 15100,
    winRate: 71.2,
    accountCreated: 'January 2023',
    chartData: generateChartData()
  },
  {
    rank: 3,
    twitter: 'bullishbritt',
    avatar: '👑',
    totalProfit: 84750,
    verifiedPayouts: 6,
    monthlyProfit: 14100,
    winRate: 68.5,
    accountCreated: 'March 2023',
    chartData: generateChartData()
  },
  {
    rank: 4,
    twitter: 'daytrader_jen',
    avatar: '💎',
    totalProfit: 76200,
    verifiedPayouts: 9,
    monthlyProfit: 12800,
    winRate: 64.8,
    accountCreated: 'June 2023',
    chartData: generateChartData()
  },
  {
    rank: 5,
    twitter: 'prop_master',
    avatar: '⚡',
    totalProfit: 69400,
    verifiedPayouts: 7,
    monthlyProfit: 11500,
    winRate: 69.3,
    accountCreated: 'February 2023',
    chartData: generateChartData()
  },
  {
    rank: 6,
    twitter: '_TJRTrades',
    avatar: '🥷',
    totalProfit: 61800,
    verifiedPayouts: 5,
    monthlyProfit: 10300,
    winRate: 63.7,
    accountCreated: 'May 2023',
    chartData: generateChartData()
  },
  {
    rank: 7,
    twitter: 'Jadecap_',
    avatar: '🧙',
    totalProfit: 58900,
    verifiedPayouts: 8,
    monthlyProfit: 9800,
    winRate: 67.4,
    accountCreated: 'July 2023',
    chartData: generateChartData()
  },
  {
    rank: 8,
    twitter: 'scalp_king',
    avatar: '👨‍💼',
    totalProfit: 54300,
    verifiedPayouts: 10,
    monthlyProfit: 9100,
    winRate: 70.2,
    accountCreated: 'August 2023',
    chartData: generateChartData()
  },
  {
    rank: 9,
    twitter: 'momentum_beast',
    avatar: '🦁',
    totalProfit: 48700,
    verifiedPayouts: 4,
    monthlyProfit: 8400,
    winRate: 62.9,
    accountCreated: 'September 2023',
    chartData: generateChartData()
  },
  {
    rank: 10,
    twitter: 'swing_goddess',
    avatar: '🎨',
    totalProfit: 45200,
    verifiedPayouts: 11,
    monthlyProfit: 7900,
    winRate: 65.7,
    accountCreated: 'October 2023',
    chartData: generateChartData()
  },
  {
    rank: 11,
    twitter: 'breakout_trader',
    avatar: '🚀',
    totalProfit: 42100,
    verifiedPayouts: 6,
    monthlyProfit: 7200,
    winRate: 66.8,
    accountCreated: 'November 2023',
    chartData: generateChartData()
  },
  {
    rank: 12,
    twitter: 'options_wizard',
    avatar: '🔮',
    totalProfit: 39800,
    verifiedPayouts: 9,
    monthlyProfit: 6900,
    winRate: 68.1,
    accountCreated: 'December 2023',
    chartData: generateChartData()
  },
  {
    rank: 13,
    twitter: 'range_master',
    avatar: '📊',
    totalProfit: 37500,
    verifiedPayouts: 5,
    monthlyProfit: 6500,
    winRate: 64.3,
    accountCreated: 'January 2024',
    chartData: generateChartData()
  },
  {
    rank: 14,
    twitter: 'trend_follower',
    avatar: '📈',
    totalProfit: 35200,
    verifiedPayouts: 8,
    monthlyProfit: 6200,
    winRate: 69.7,
    accountCreated: 'February 2024',
    chartData: generateChartData()
  },
  {
    rank: 15,
    twitter: 'reversal_pro',
    avatar: '🔄',
    totalProfit: 33100,
    verifiedPayouts: 7,
    monthlyProfit: 5900,
    winRate: 63.5,
    accountCreated: 'March 2024',
    chartData: generateChartData()
  },
  {
    rank: 16,
    twitter: 'volume_king',
    avatar: '📢',
    totalProfit: 31000,
    verifiedPayouts: 10,
    monthlyProfit: 5600,
    winRate: 67.9,
    accountCreated: 'April 2024',
    chartData: generateChartData()
  },
  {
    rank: 17,
    twitter: 'pattern_hunter',
    avatar: '🎯',
    totalProfit: 29200,
    verifiedPayouts: 4,
    monthlyProfit: 5300,
    winRate: 62.1,
    accountCreated: 'May 2024',
    chartData: generateChartData()
  },
  {
    rank: 18,
    twitter: 'algo_trader',
    avatar: '🤖',
    totalProfit: 27500,
    verifiedPayouts: 12,
    monthlyProfit: 5100,
    winRate: 71.4,
    accountCreated: 'June 2024',
    chartData: generateChartData()
  },
  {
    rank: 19,
    twitter: 'support_resist',
    avatar: '⚖️',
    totalProfit: 25800,
    verifiedPayouts: 6,
    monthlyProfit: 4800,
    winRate: 65.6,
    accountCreated: 'July 2024',
    chartData: generateChartData()
  },
  {
    rank: 20,
    twitter: 'fibonacci_master',
    avatar: '🌀',
    totalProfit: 24100,
    verifiedPayouts: 9,
    monthlyProfit: 4600,
    winRate: 68.3,
    accountCreated: 'August 2024',
    chartData: generateChartData()
  },
  {
    rank: 21,
    twitter: 'candlestick_pro',
    avatar: '🕯️',
    totalProfit: 22600,
    verifiedPayouts: 5,
    monthlyProfit: 4400,
    winRate: 63.9,
    accountCreated: 'September 2024',
    chartData: generateChartData()
  },
  {
    rank: 22,
    twitter: 'market_maker',
    avatar: '💰',
    totalProfit: 21200,
    verifiedPayouts: 8,
    monthlyProfit: 4200,
    winRate: 67.2,
    accountCreated: 'October 2024',
    chartData: generateChartData()
  },
  {
    rank: 23,
    twitter: 'gap_trader',
    avatar: '📉',
    totalProfit: 19900,
    verifiedPayouts: 7,
    monthlyProfit: 4000,
    winRate: 64.7,
    accountCreated: 'November 2024',
    chartData: generateChartData()
  },
  {
    rank: 24,
    twitter: 'moving_avg_ninja',
    avatar: '📏',
    totalProfit: 18700,
    verifiedPayouts: 10,
    monthlyProfit: 3800,
    winRate: 69.1,
    accountCreated: 'December 2024',
    chartData: generateChartData()
  },
  {
    rank: 25,
    twitter: 'volatility_hunter',
    avatar: '🐍',
    totalProfit: 17500,
    verifiedPayouts: 4,
    monthlyProfit: 3600,
    winRate: 62.4,
    accountCreated: 'January 2025',
    chartData: generateChartData()
  },
  {
    rank: 26,
    twitter: 'orderflow_expert',
    avatar: '🌊',
    totalProfit: 16400,
    verifiedPayouts: 11,
    monthlyProfit: 3400,
    winRate: 70.8,
    accountCreated: 'February 2025',
    chartData: generateChartData()
  },
  {
    rank: 27,
    twitter: 'rsi_divergence',
    avatar: '📐',
    totalProfit: 15300,
    verifiedPayouts: 6,
    monthlyProfit: 3200,
    winRate: 66.5,
    accountCreated: 'March 2025',
    chartData: generateChartData()
  },
  {
    rank: 28,
    twitter: 'macd_master',
    avatar: '⚡',
    totalProfit: 14200,
    verifiedPayouts: 9,
    monthlyProfit: 3000,
    winRate: 68.9,
    accountCreated: 'April 2025',
    chartData: generateChartData()
  },
  {
    rank: 29,
    twitter: 'bollinger_bands',
    avatar: '🎸',
    totalProfit: 13100,
    verifiedPayouts: 5,
    monthlyProfit: 2800,
    winRate: 63.2,
    accountCreated: 'May 2025',
    chartData: generateChartData()
  },
  {
    rank: 30,
    twitter: 'elliott_wave',
    avatar: '🌊',
    totalProfit: 12100,
    verifiedPayouts: 8,
    monthlyProfit: 2600,
    winRate: 67.6,
    accountCreated: 'June 2025',
    chartData: generateChartData()
  },
  {
    rank: 31,
    twitter: 'ichimoku_cloud',
    avatar: '☁️',
    totalProfit: 11200,
    verifiedPayouts: 7,
    monthlyProfit: 2400,
    winRate: 65.1,
    accountCreated: 'July 2025',
    chartData: generateChartData()
  }
];

// Helper function to merge real traders with mock traders
export const mergeWithRealTraders = (realTraders, generateChartDataFunc) => {
  // Add chart data to real traders
  const tradersWithCharts = realTraders.map(trader => ({
    ...trader,
    chartData: generateChartDataFunc()
  }));
  
  // Add unique IDs and derived fields to mock traders
  const mockWithIds = mockTraders.map((trader, index) => ({
    ...trader,
    id: `mock-${index}`,
    // Simulate realistic account counts: higher earners tend to have more accounts
    totalAccountsLinked: Math.max(1, Math.floor(trader.totalProfit / 8000) + Math.floor(Math.random() * 3)),
    chartData: generateChartDataFunc()
  }));
  
  // Combine real and mock traders
  const allTraders = [...tradersWithCharts, ...mockWithIds];
  
  // Sort by total profit and re-rank
  allTraders.sort((a, b) => b.totalProfit - a.totalProfit);
  allTraders.forEach((trader, index) => {
    trader.rank = index + 1;
  });
  
  return allTraders;
};