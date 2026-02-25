import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { Search, Plus, TrendingUp, Award, ExternalLink, ArrowLeft, Share2, AlertCircle, RefreshCw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockTraders, mergeWithRealTraders } from './mockData';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import { calculateBadges, sortBadgesByPriority } from './badgeSystem';
import { BlogListing, BlogPost } from './Blog';

// Components
import Toast from './components/Toast';
import Badge from './components/Badge';
import SkeletonRow from './components/SkeletonRow';
import AdBox, { MobileAdCarousel } from './components/AdBox';
import AddTraderModal from './components/AddTraderModal';
import AdvertiseModal from './components/AdvertiseModal';
import GlobalStyles from './components/GlobalStyles';

// Utils
import { formatCurrency, formatDate, formatTimestamp, getRankEmoji } from './utils/formatters';
import { generateChartData, generateRealisticChartData } from './utils/chartData';

// Hooks
import { useToast } from './hooks/useToast';

const API_URL = process.env.REACT_APP_API_URL || 'https://proof-of-pips-backend-production.up.railway.app';

// ============================================
// MAIN CONTENT COMPONENT
// ============================================
const ProofOfPipsContent = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const { toast, showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('totalProfit');
  const [sortDirection, setSortDirection] = useState('desc');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [displayCount, setDisplayCount] = useState(25);
  const [traders, setTraders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAdvertiseModal, setShowAdvertiseModal] = useState(false);
  const [twitterUsername, setTwitterUsername] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedTraders, setSelectedTraders] = useState([]);
  const [filterFirm, setFilterFirm] = useState('all');
  const [filterProfit, setFilterProfit] = useState('all');

  // Ad rotation every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRotating(true);
      setTimeout(() => {
        setCurrentAdIndex((prev) => (prev + 5) % 16);
        setIsRotating(false);
      }, 600);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Fetch traders from API
  const fetchTraders = () => {
    setLoading(true);
    setError(null);

    fetch(`${API_URL}/api/traders`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch traders');
        return res.json();
      })
      .then(data => {
        const allTraders = mergeWithRealTraders(data, generateChartData);
        setTraders(allTraders);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching traders:', err);
        setError(err.message);
        setLoading(false);
        const tradersWithCharts = mockTraders.map(trader => ({
          ...trader,
          chartData: generateChartData(),
        }));
        setTraders(tradersWithCharts);
      });
  };

  useEffect(() => { fetchTraders(); }, []);

  // Page title
  useEffect(() => {
    if (username) {
      document.title = `@${username} - Proof of Pips`;
    } else {
      document.title = 'Proof of Pips - Verified Prop Trader Leaderboard';
    }
  }, [username]);

  // Handle Twitter OAuth callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('auth_token');
    const user = params.get('twitter_username');
    const err = params.get('error');

    if (err) {
      showToast(`Authentication failed: ${err}`, 'error');
      return;
    }

    if (token && user) {
      setAuthToken(token);
      setTwitterUsername(user);
      setIsVerified(true);
      setShowAddModal(true);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [showToast]);

  const selectedTrader = username ? traders.find(t => t.twitter === username) : null;

  useEffect(() => {
    if (selectedTrader) {
      document.title = `@${selectedTrader.twitter} - ${formatCurrency(selectedTrader.totalProfit)} | Proof of Pips`;
    }
  }, [selectedTrader]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('input[placeholder="Search traders..."]')?.focus();
      }
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        document.querySelector('input[placeholder="Search traders..."]')?.focus();
      }
      if (e.key === 'Escape') {
        setShowAddModal(false);
        setShowAdvertiseModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleShare = async () => {
    const shareUrl = `https://proofofpips.com/profile/${selectedTrader.twitter}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast('Profile link copied to clipboard!', 'success');
    } catch (err) {
      showToast('Failed to copy link', 'error');
    }
  };

  const toggleTraderSelection = (trader) => {
    setSelectedTraders(prev => {
      const isSelected = prev.find(t => t.id === trader.id);
      if (isSelected) return prev.filter(t => t.id !== trader.id);
      if (prev.length < 3) return [...prev, trader];
      showToast('Maximum 3 traders for comparison', 'error');
      return prev;
    });
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
  };

  const filteredAndSortedTraders = traders
    .filter(trader => {
      const matchesSearch = trader.twitter.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFirm = filterFirm === 'all' || trader.propFirm === filterFirm;
      let matchesProfit = true;
      if (filterProfit === '10k') matchesProfit = trader.totalProfit >= 10000;
      else if (filterProfit === '50k') matchesProfit = trader.totalProfit >= 50000;
      else if (filterProfit === '100k') matchesProfit = trader.totalProfit >= 100000;
      return matchesSearch && matchesFirm && matchesProfit;
    })
    .sort((a, b) => {
      const aVal = a[sortBy] || a.totalProfit;
      const bVal = b[sortBy] || b.totalProfit;
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    })
    .slice(0, displayCount)
    .map((trader, index) => ({ ...trader, rank: index + 1 }));

  // Lazy loading
  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
      if (scrollHeight - scrollTop - clientHeight < 500 && !loading) {
        setDisplayCount(prev => Math.min(prev + 25, traders.length));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, traders.length]);

  // ============================================
  // PROFILE VIEW
  // ============================================
  if (selectedTrader) {
    return (
      <div className="min-h-screen bg-black">
        <GlobalStyles />
        <Toast toast={toast} />

        <MobileAdCarousel position="top" />

        <div className="relative pb-20 xl:pb-8">
          <div className="flex justify-between items-start px-2 md:px-4 max-w-[1800px] mx-auto py-4 md:py-8">
            {/* Left Ads */}
            <div className="hidden xl:flex flex-col gap-4 flex-shrink-0 self-start" style={{ position: 'sticky', top: '2rem' }}>
              <div style={{ marginTop: '44px' }}>
                <AdBox index={0} currentAdIndex={currentAdIndex} isRotating={isRotating} />
              </div>
              {[1, 2, 3, 4].map(i => (
                <AdBox key={i} index={i} currentAdIndex={currentAdIndex} isRotating={isRotating} />
              ))}
            </div>

            {/* Center Content - Profile */}
            <div className="flex-1 max-w-5xl w-full mx-0 xl:mx-8">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 mb-6 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Leaderboard
              </button>

              <div className="bg-neutral-900/50 backdrop-blur-sm border border-yellow-600/20 rounded-xl p-4 md:p-8 mb-6">
                <div className="flex flex-col md:flex-row items-start justify-between mb-6 gap-4">
                  <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-neutral-800/50 flex items-center justify-center text-3xl md:text-4xl flex-shrink-0 border border-yellow-600/20">
                      {selectedTrader.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                        <h2 className="text-xl md:text-3xl font-bold text-white truncate">@{selectedTrader.twitter}</h2>
                        <span className="bg-yellow-500/20 text-yellow-500 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold flex items-center gap-1 whitespace-nowrap">
                          &#10003; Verified
                        </span>
                        <span className="bg-neutral-800 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap">
                          #{selectedTrader.rank}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm md:text-base mb-2">
                        {selectedTrader.propFirmDisplay || 'Prop Trader'}
                        {selectedTrader.connectionType && (
                          <span className="text-gray-600 ml-2 text-xs">
                            via {selectedTrader.connectionType === 'tradovate' ? 'Tradovate' : 'TradeSyncer'}
                          </span>
                        )}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {sortBadgesByPriority(calculateBadges(selectedTrader)).map((badge, idx) => (
                          <Badge key={idx} badge={badge} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 md:gap-3 w-full md:w-auto">
                    <a
                      href={`https://twitter.com/${selectedTrader.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 md:flex-none px-3 md:px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors text-sm md:text-base"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="hidden sm:inline">Visit Twitter</span>
                      <span className="sm:hidden">Twitter</span>
                    </a>
                    <button
                      onClick={async () => {
                        showToast('Syncing stats...', 'success');
                        try {
                          const response = await fetch(`${API_URL}/api/sync/trader/${selectedTrader.twitter}`, { method: 'POST' });
                          if (response.ok) {
                            showToast('Stats synced! Refreshing...', 'success');
                            setTimeout(() => window.location.reload(), 1500);
                          } else {
                            showToast('Sync failed. Try again later.', 'error');
                          }
                        } catch { showToast('Network error. Try again.', 'error'); }
                      }}
                      className="flex-1 md:flex-none px-3 md:px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors text-sm md:text-base"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span className="hidden sm:inline">Refresh</span>
                    </button>
                    <button
                      onClick={handleShare}
                      className="flex-1 md:flex-none px-3 md:px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-yellow-500/20 text-sm md:text-base"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  <div className="bg-black p-3 md:p-4 rounded-lg border border-yellow-600/20">
                    <p className="text-gray-400 text-xs md:text-sm mb-1">Total Profit</p>
                    <p className="text-yellow-500 text-lg md:text-2xl font-bold">{formatCurrency(selectedTrader.totalProfit)}</p>
                    <p className="text-gray-600 text-xs mt-1">All-time</p>
                  </div>
                  <div className="bg-black p-3 md:p-4 rounded-lg border border-yellow-600/20">
                    <p className="text-gray-400 text-xs md:text-sm mb-1">Last 30 days</p>
                    <p className="text-white text-lg md:text-2xl font-bold">{formatCurrency(selectedTrader.monthlyProfit)}</p>
                    <p className="text-gray-600 text-xs mt-1">Recent profit</p>
                  </div>
                  <div className="bg-black p-3 md:p-4 rounded-lg border border-yellow-600/20">
                    <p className="text-gray-400 text-xs md:text-sm mb-1">Win Rate</p>
                    <p className="text-white text-lg md:text-2xl font-bold">{selectedTrader.winRate}%</p>
                    <p className="text-gray-600 text-xs mt-1">Success rate</p>
                  </div>
                  <div className="bg-black p-3 md:p-4 rounded-lg border border-yellow-600/20">
                    <p className="text-gray-400 text-xs md:text-sm mb-1">Verified Since</p>
                    <p className="text-white text-base md:text-lg font-bold">{formatDate(selectedTrader.accountCreated)}</p>
                    <p className="text-gray-600 text-xs mt-1">Account creation</p>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900 backdrop-blur-sm border border-yellow-600/30 rounded-xl p-4 md:p-6">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h3 className="text-lg md:text-xl font-bold text-white">Performance</h3>
                  <button className="px-2 md:px-3 py-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-lg text-xs md:text-sm font-semibold">
                    All time
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={generateRealisticChartData(selectedTrader)}>
                    <defs>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EAB308" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#EAB308" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#171717', border: '1px solid #404040', borderRadius: '8px' }}
                      formatter={(value) => formatCurrency(value)}
                    />
                    <Area type="monotone" dataKey="profit" stroke="#EAB308" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
                  </AreaChart>
                </ResponsiveContainer>
                <p className="text-gray-400 text-sm text-center mt-4">
                  &#10003; All profit verified via {selectedTrader.connectionType === 'tradesyncer' ? 'TradeSyncer' : 'Tradovate'} API.
                  Last updated: {formatTimestamp(selectedTrader.updatedAt)}
                </p>
              </div>
            </div>

            {/* Right Ads */}
            <div className="hidden xl:flex flex-col gap-4 flex-shrink-0 self-start" style={{ position: 'sticky', top: '2rem' }}>
              <div style={{ marginTop: '44px' }}>
                <AdBox index={5} currentAdIndex={currentAdIndex} isRotating={isRotating} />
              </div>
              {[6, 7, 8, 9].map(i => (
                <AdBox key={i} index={i} currentAdIndex={currentAdIndex} isRotating={isRotating} />
              ))}
            </div>
          </div>
        </div>

        <MobileAdCarousel position="bottom" />
      </div>
    );
  }

  // ============================================
  // LEADERBOARD VIEW
  // ============================================
  return (
    <div className="min-h-screen bg-black">
      <GlobalStyles />
      <Toast toast={toast} />

      {/* Header */}
      <header className="bg-neutral-950 border-b border-yellow-600/20 sticky top-0 z-50 backdrop-blur-sm">
        <div className="px-2 md:px-4 py-3 md:py-4 max-w-[1800px] mx-auto">
          <div className="flex items-center gap-3 md:gap-4">
            <img src="/proof-of-pips-logo.png" alt="Proof of Pips Logo" className="w-10 h-10 md:w-14 md:h-14 object-contain" />
            <div>
              <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#C5A028] bg-clip-text text-transparent">
                Proof of Pips
              </h1>
              <p className="text-[#D4AF37] text-xs md:text-sm font-medium">Verified Prop Trader Rankings</p>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Ad Carousel - Top */}
      <div className="sticky top-[73px] md:top-[89px] z-40">
        <MobileAdCarousel position="top" />
      </div>

      <div className="relative min-h-screen py-4 md:py-8">
        <div className="flex justify-between items-start px-2 md:px-4 max-w-[1800px] mx-auto">
          {/* Left Ads */}
          <div className="hidden xl:flex flex-col gap-4 flex-shrink-0 sticky top-[100px] self-start">
            {[0, 1, 2, 3, 4].map(i => (
              <AdBox key={i} index={i} currentAdIndex={currentAdIndex} isRotating={isRotating} />
            ))}
          </div>

          {/* Center Content */}
          <div className="flex-1 max-w-5xl w-full mx-0 xl:mx-8">
            <div className="text-center mb-6 md:mb-12 px-2">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">
                The database of verified prop trader earnings
              </h2>
              <p className="text-gray-400 text-sm sm:text-base md:text-lg">
                No more fake screenshots. Only verified profits from Tradovate &amp; TradeSyncer.
              </p>
            </div>

            {/* Search Bar & Actions */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 mb-4 md:mb-8">
              <div className="flex-1 relative min-w-0">
                <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 md:w-5 md:h-5" />
                <input
                  type="text"
                  placeholder="Search traders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 md:pl-12 pr-3 md:pr-4 py-2 md:py-3 bg-neutral-900 border border-yellow-600/30 rounded-lg text-white text-sm md:text-base placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
              <button
                onClick={() => { window.location.href = `${API_URL}/api/auth/twitter/login`; }}
                className="px-3 sm:px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 text-sm md:text-base font-semibold rounded-lg flex items-center justify-center gap-1 md:gap-2 transition-all shadow-lg shadow-yellow-500/20 whitespace-nowrap"
              >
                <Plus className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden xs:inline">Add</span>
              </button>
              <button
                onClick={() => {
                  const csv = ['Rank,Twitter,Total Profit,Win Rate,Monthly Profit,Prop Firm'];
                  filteredAndSortedTraders.forEach(trader => {
                    csv.push(`${trader.rank},@${trader.twitter},${trader.totalProfit},${trader.winRate}%,${trader.monthlyProfit},${trader.propFirmDisplay || ''}`);
                  });
                  const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `proof-of-pips-leaderboard-${new Date().toISOString().split('T')[0]}.csv`;
                  a.click();
                  showToast(`Exported ${filteredAndSortedTraders.length} traders!`, 'success');
                }}
                className="px-3 sm:px-4 md:px-6 py-2 md:py-3 bg-neutral-800 hover:bg-neutral-700 text-white text-sm md:text-base font-semibold rounded-lg flex items-center justify-center gap-1 md:gap-2 transition-colors whitespace-nowrap"
              >
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button
                onClick={() => { setCompareMode(!compareMode); if (compareMode) setSelectedTraders([]); }}
                className={`px-3 sm:px-4 md:px-6 py-2 md:py-3 ${compareMode ? 'bg-yellow-500 text-black' : 'bg-neutral-800 text-white hover:bg-neutral-700'} text-sm md:text-base font-semibold rounded-lg flex items-center justify-center gap-1 md:gap-2 transition-all whitespace-nowrap`}
              >
                <Award className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">{compareMode ? 'Cancel' : 'Compare'}</span>
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-4 px-2">
              <span className="text-gray-400 text-sm flex items-center">Filters:</span>
              <select value={filterProfit} onChange={(e) => setFilterProfit(e.target.value)} className="px-3 py-1.5 bg-neutral-800 border border-yellow-600/30 rounded-lg text-white text-sm focus:outline-none focus:border-yellow-500 transition-colors cursor-pointer">
                <option value="all">All Profits</option>
                <option value="10k">$10K+</option>
                <option value="50k">$50K+</option>
                <option value="100k">$100K+</option>
              </select>
              <select value={filterFirm} onChange={(e) => setFilterFirm(e.target.value)} className="px-3 py-1.5 bg-neutral-800 border border-yellow-600/30 rounded-lg text-white text-sm focus:outline-none focus:border-yellow-500 transition-colors cursor-pointer">
                <option value="all">All Firms</option>
                <option value="topstep">Topstep</option>
                <option value="apex">Apex Trader Funding</option>
                <option value="tradeday">TradeDay</option>
                <option value="bulenox">Bulenox</option>
                <option value="tradeify">Tradeify</option>
              </select>
              {(filterProfit !== 'all' || filterFirm !== 'all') && (
                <button onClick={() => { setFilterProfit('all'); setFilterFirm('all'); }} className="px-3 py-1.5 bg-neutral-700 hover:bg-neutral-600 text-white text-sm rounded-lg transition-colors">Clear</button>
              )}
            </div>

            {/* Leaderboard Table */}
            <div className="bg-neutral-900 backdrop-blur-sm border border-yellow-600/30 rounded-t-lg p-2 md:p-4">
              <h3 className="text-base md:text-xl font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 md:w-6 md:h-6 text-yellow-500" />
                Leaderboard
              </h3>
            </div>

            <div className="bg-neutral-950 backdrop-blur-sm border-x border-b border-yellow-600/30 rounded-b-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-900">
                    <tr>
                      {compareMode && <th className="px-2 sm:px-4 md:px-6 py-2 md:py-4 text-left text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider w-12"><span className="sr-only">Select</span></th>}
                      <th className="px-2 sm:px-4 md:px-6 py-2 md:py-4 text-left text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">#</th>
                      <th className="px-2 sm:px-4 md:px-6 py-2 md:py-4 text-left text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">Trader</th>
                      <th className="px-2 sm:px-4 md:px-6 py-2 md:py-4 text-left text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-emerald-400 transition-colors" onClick={() => handleSort('totalProfit')}>
                        <div className="flex items-center gap-1"><span>Profit</span>{sortBy === 'totalProfit' && <span>{sortDirection === 'asc' ? '\u2191' : '\u2193'}</span>}</div>
                      </th>
                      <th className="hidden sm:table-cell px-2 sm:px-4 md:px-6 py-2 md:py-4 text-left text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-emerald-400 transition-colors" onClick={() => handleSort('winRate')}>
                        <div className="flex items-center gap-1"><span>Win Rate</span>{sortBy === 'winRate' && <span>{sortDirection === 'asc' ? '\u2191' : '\u2193'}</span>}</div>
                      </th>
                      <th className="hidden md:table-cell px-2 sm:px-4 md:px-6 py-2 md:py-4 text-left text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-emerald-400 transition-colors" onClick={() => handleSort('monthlyProfit')}>
                        <div className="flex items-center gap-1"><span>Monthly</span>{sortBy === 'monthlyProfit' && <span>{sortDirection === 'asc' ? '\u2191' : '\u2193'}</span>}</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {loading ? (
                      Array.from({ length: 10 }).map((_, i) => <SkeletonRow key={i} />)
                    ) : error ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-12">
                          <div className="flex flex-col items-center justify-center gap-4">
                            <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center animate-pulse"><AlertCircle className="w-10 h-10 text-red-500" /></div>
                            <div className="text-center max-w-md">
                              <h3 className="text-white font-bold text-xl mb-2">Connection Lost</h3>
                              <p className="text-gray-400 text-sm mb-4">We're having trouble reaching our servers.</p>
                            </div>
                            <button onClick={fetchTraders} className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-yellow-500/20"><RefreshCw className="w-4 h-4" /> Retry Connection</button>
                          </div>
                        </td>
                      </tr>
                    ) : filteredAndSortedTraders.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-12">
                          <div className="flex flex-col items-center justify-center gap-4">
                            <div className="w-20 h-20 rounded-full bg-yellow-500/10 flex items-center justify-center"><Search className="w-10 h-10 text-yellow-500" /></div>
                            <div className="text-center max-w-md">
                              <h3 className="text-white font-bold text-xl mb-2">{searchQuery ? 'No Traders Found' : 'Be a Pioneer'}</h3>
                              <p className="text-gray-400 text-sm mb-3">{searchQuery ? `No one matching "${searchQuery}".` : 'Be the first verified prop trader to join.'}</p>
                            </div>
                            {searchQuery ? (
                              <button onClick={() => setSearchQuery('')} className="px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-sm transition-colors">Clear Search</button>
                            ) : (
                              <button onClick={() => { window.location.href = `${API_URL}/api/auth/twitter/login`; }} className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-yellow-500/20"><Plus className="w-4 h-4" /> Join Leaderboard</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredAndSortedTraders.map((trader) => (
                        <tr key={trader.id || trader.twitter} onClick={compareMode ? undefined : () => navigate(`/profile/${trader.twitter}`)} className={`${compareMode ? '' : 'hover:bg-neutral-900/50 cursor-pointer'} transition-colors`}>
                          {compareMode && (
                            <td className="px-2 sm:px-4 md:px-6 py-3 md:py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                              <input type="checkbox" checked={selectedTraders.some(t => t.id === trader.id)} onChange={(e) => { e.stopPropagation(); toggleTraderSelection(trader); }} className="w-4 h-4 accent-yellow-500 cursor-pointer" />
                            </td>
                          )}
                          <td className="px-2 sm:px-4 md:px-6 py-3 md:py-4 whitespace-nowrap"><span className="text-base sm:text-lg md:text-xl font-bold text-white">{getRankEmoji(trader.rank)}</span></td>
                          <td className="px-2 sm:px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2 md:gap-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-neutral-800 flex items-center justify-center text-lg sm:text-xl md:text-2xl border border-yellow-600/20">{trader.avatar}</div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1 md:gap-2 mb-1">
                                  <span className="text-xs sm:text-sm md:text-base font-semibold text-white truncate">@{trader.twitter}</span>
                                  <span className="text-[10px] sm:text-xs text-yellow-500">&#10003;</span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {sortBadgesByPriority(calculateBadges(trader)).slice(0, 2).map((badge, idx) => (
                                    <Badge key={idx} badge={badge} />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-2 sm:px-4 md:px-6 py-3 md:py-4 whitespace-nowrap"><span className="text-sm sm:text-base md:text-lg font-bold text-yellow-500">{formatCurrency(trader.totalProfit)}</span></td>
                          <td className="hidden sm:table-cell px-2 sm:px-4 md:px-6 py-3 md:py-4 whitespace-nowrap"><span className="text-xs sm:text-sm md:text-base text-white font-semibold">{trader.winRate}%</span></td>
                          <td className="hidden md:table-cell px-2 sm:px-4 md:px-6 py-3 md:py-4 whitespace-nowrap"><span className="text-xs sm:text-sm md:text-base text-gray-400">{formatCurrency(trader.monthlyProfit)}</span></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {!loading && !error && filteredAndSortedTraders.length >= displayCount && (
                <div className="p-4 md:p-6 text-center border-t border-neutral-800">
                  <button onClick={() => setDisplayCount(prev => prev + 25)} className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black text-sm md:text-base font-semibold rounded-lg transition-all shadow-lg shadow-yellow-500/20">Load More</button>
                </div>
              )}
            </div>
          </div>

          {/* Right Ads */}
          <div className="hidden xl:flex flex-col gap-4 flex-shrink-0 sticky top-[100px] self-start">
            {[5, 6, 7, 8, 9].map(i => (
              <AdBox key={i} index={i} currentAdIndex={currentAdIndex} isRotating={isRotating} />
            ))}
          </div>
        </div>
      </div>

      <MobileAdCarousel position="bottom" />

      {/* Footer */}
      <footer className="hidden xl:block bg-neutral-950 border-t border-yellow-600/20 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center gap-6 text-sm text-gray-400">
          <span>&copy; 2025 Proof of Pips</span>
          <span className="text-gray-700">|</span>
          <button onClick={() => navigate('/blog')} className="hover:text-yellow-500 transition-colors">Education</button>
          <span className="text-gray-700">|</span>
          <button onClick={() => navigate('/privacy')} className="hover:text-yellow-500 transition-colors">Privacy Policy</button>
          <span className="text-gray-700">|</span>
          <button onClick={() => navigate('/terms')} className="hover:text-yellow-500 transition-colors">Terms of Service</button>
        </div>
      </footer>

      {/* Floating Compare Button */}
      {compareMode && selectedTraders.length >= 2 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <button onClick={() => setCompareMode(false)} className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold text-lg rounded-full flex items-center gap-3 transition-all shadow-2xl shadow-yellow-500/50 hover:scale-105">
            <Award className="w-6 h-6" /> Compare {selectedTraders.length} Traders
          </button>
        </div>
      )}

      {/* Advertise Button */}
      <button onClick={() => setShowAdvertiseModal(true)} className="fixed top-4 right-4 z-50 px-4 py-2 bg-black/40 backdrop-blur-md hover:bg-black/60 border border-yellow-600/30 hover:border-yellow-500/50 text-yellow-500 font-semibold text-sm rounded-lg transition-all">Advertise</button>

      {/* Modals */}
      {showAddModal && (
        <AddTraderModal onClose={() => setShowAddModal(false)} twitterUsername={twitterUsername} authToken={authToken} isVerified={isVerified} showToast={showToast} />
      )}

      {/* Comparison Modal */}
      {selectedTraders.length >= 2 && !compareMode && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100] p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-yellow-600/30 rounded-xl max-w-6xl w-full my-8">
            <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Award className="w-6 h-6 text-yellow-500" /> Trader Comparison</h2>
              <button onClick={() => setSelectedTraders([])} className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6">
              <div className={`grid ${selectedTraders.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-4`}>
                {selectedTraders.map((trader, index) => (
                  <div key={trader.id} className="bg-black/50 border border-yellow-600/20 rounded-xl p-4">
                    <div className="flex flex-col items-center mb-6 pb-4 border-b border-neutral-800">
                      <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center text-3xl border border-yellow-600/20 mb-3">{trader.avatar}</div>
                      <h3 className="text-xl font-bold text-white mb-1">@{trader.twitter}</h3>
                      <span className="bg-neutral-800 text-white px-3 py-1 rounded-full text-sm font-semibold">Rank #{trader.rank}</span>
                    </div>
                    <div className="space-y-4">
                      <div className="text-center"><p className="text-gray-400 text-xs mb-1">Total Profit</p><p className="text-yellow-500 text-2xl font-bold">{formatCurrency(trader.totalProfit)}</p></div>
                      <div className="text-center"><p className="text-gray-400 text-xs mb-1">Monthly Profit</p><p className="text-white text-xl font-bold">{formatCurrency(trader.monthlyProfit)}</p></div>
                      <div className="text-center"><p className="text-gray-400 text-xs mb-1">Win Rate</p><p className="text-white text-xl font-bold">{trader.winRate}%</p></div>
                    </div>
                    <div className="mt-6">
                      <ResponsiveContainer width="100%" height={150}>
                        <AreaChart data={generateRealisticChartData(trader)}>
                          <defs><linearGradient id={`colorProfit${index}`} x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#EAB308" stopOpacity={0.3} /><stop offset="95%" stopColor="#EAB308" stopOpacity={0} /></linearGradient></defs>
                          <Area type="monotone" dataKey="profit" stroke="#EAB308" strokeWidth={2} fillOpacity={1} fill={`url(#colorProfit${index})`} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <button onClick={() => { setSelectedTraders([]); navigate(`/profile/${trader.twitter}`); }} className="w-full mt-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-sm transition-colors">View Full Profile</button>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-lg">
                <div className="flex items-center justify-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="text-white font-bold">
                    {selectedTraders[0].totalProfit > selectedTraders[1].totalProfit
                      ? `@${selectedTraders[0].twitter} leads by ${formatCurrency(selectedTraders[0].totalProfit - selectedTraders[1].totalProfit)}`
                      : selectedTraders[0].totalProfit < selectedTraders[1].totalProfit
                      ? `@${selectedTraders[1].twitter} leads by ${formatCurrency(selectedTraders[1].totalProfit - selectedTraders[0].totalProfit)}`
                      : 'Tied in total profit!'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAdvertiseModal && <AdvertiseModal onClose={() => setShowAdvertiseModal(false)} />}
    </div>
  );
};

// ============================================
// APP WRAPPER WITH ROUTING
// ============================================
const ProofOfPips = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ProofOfPipsContent />} />
      <Route path="/profile/:username" element={<ProofOfPipsContent />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/blog" element={<BlogListing />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>
  </Router>
);

export default ProofOfPips;
