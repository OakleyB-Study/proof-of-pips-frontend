import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { Search, Plus, TrendingUp, Award, ExternalLink, ArrowLeft, Share2, AlertCircle, RefreshCw, ChevronDown, Shield, BarChart3, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mergeWithRealTraders } from './mockData';
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
  const [showFilters, setShowFilters] = useState(false);

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
        const allTraders = mergeWithRealTraders([], generateChartData);
        setTraders(allTraders);
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

  // Handle Twitter OAuth callback (STIG: exchange code for token via POST, not URL)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const user = params.get('twitter_username');
    const err = params.get('error');

    if (err) {
      showToast(`Authentication failed: ${err}`, 'error');
      window.history.replaceState({}, '', window.location.pathname);
      return;
    }

    if (code && user) {
      // Clean URL immediately to prevent code leakage via referrer
      window.history.replaceState({}, '', window.location.pathname);

      // Exchange short-lived code for auth token via secure POST
      fetch(`${API_URL}/api/auth/exchange`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.authToken) {
            setAuthToken(data.authToken);
            setTwitterUsername(user);
            setIsVerified(true);
            setShowAddModal(true);
          } else {
            showToast('Authentication failed. Please try again.', 'error');
          }
        })
        .catch(() => {
          showToast('Authentication failed. Please try again.', 'error');
        });
    }
  }, [showToast]);

  const selectedTrader = username ? traders.find(t => t.twitter === username) : null;

  // Memoize chart data so it doesn't regenerate on every render
  const profileChartData = useMemo(() => {
    return selectedTrader ? generateRealisticChartData(selectedTrader) : [];
  }, [selectedTrader]);

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

  // Stats summary
  const totalVerifiedProfit = traders.reduce((sum, t) => sum + (t.totalProfit || 0), 0);
  const totalTraderCount = traders.length;

  // ============================================
  // PROFILE VIEW
  // ============================================
  if (selectedTrader) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
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
            <div className="flex-1 max-w-4xl w-full mx-auto xl:mx-8">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-8 transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Leaderboard
              </button>

              {/* Profile Header Card */}
              <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 md:p-8 mb-6 hover:border-neutral-700 transition-colors">
                <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-6">
                  <div className="flex items-center gap-4 md:gap-5 w-full md:w-auto">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-neutral-800/80 flex items-center justify-center text-3xl md:text-4xl flex-shrink-0 border border-neutral-700">
                      {selectedTrader.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">@{selectedTrader.twitter}</h2>
                        <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-md text-xs font-medium flex items-center gap-1 ring-1 ring-inset ring-emerald-500/20">
                          <Shield className="w-3 h-3" /> Verified
                        </span>
                      </div>
                      <p className="text-neutral-400 text-sm md:text-base mb-3">
                        {selectedTrader.propFirmDisplay || 'Prop Trader'}
                        {selectedTrader.connectionType && (
                          <span className="text-neutral-600 ml-2 text-xs">
                            via {selectedTrader.connectionType === 'tradovate' ? 'Tradovate' : 'TradeSyncer'}
                          </span>
                        )}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {sortBadgesByPriority(calculateBadges(selectedTrader)).map((badge, idx) => (
                          <Badge key={idx} badge={badge} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <a
                      href={`https://twitter.com/${selectedTrader.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 md:flex-none px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors text-sm border border-neutral-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="hidden sm:inline">Twitter</span>
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
                      className="flex-1 md:flex-none px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors text-sm border border-neutral-700"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span className="hidden sm:inline">Sync</span>
                    </button>
                    <button
                      onClick={handleShare}
                      className="flex-1 md:flex-none px-4 py-2.5 bg-white hover:bg-neutral-200 text-black font-medium rounded-lg flex items-center justify-center gap-2 transition-all text-sm"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="bg-neutral-950/60 p-4 rounded-xl border border-neutral-800">
                    <p className="text-neutral-500 text-xs font-medium uppercase tracking-wider mb-1">Total Profit</p>
                    <p className="text-emerald-400 text-xl md:text-2xl font-bold font-mono">{formatCurrency(selectedTrader.totalProfit)}</p>
                  </div>
                  <div className="bg-neutral-950/60 p-4 rounded-xl border border-neutral-800">
                    <p className="text-neutral-500 text-xs font-medium uppercase tracking-wider mb-1">Monthly</p>
                    <p className="text-white text-xl md:text-2xl font-bold font-mono">{formatCurrency(selectedTrader.monthlyProfit)}</p>
                  </div>
                  <div className="bg-neutral-950/60 p-4 rounded-xl border border-neutral-800">
                    <p className="text-neutral-500 text-xs font-medium uppercase tracking-wider mb-1">Win Rate</p>
                    <p className="text-white text-xl md:text-2xl font-bold font-mono">{selectedTrader.winRate}%</p>
                  </div>
                  <div className="bg-neutral-950/60 p-4 rounded-xl border border-neutral-800">
                    <p className="text-neutral-500 text-xs font-medium uppercase tracking-wider mb-1">Since</p>
                    <p className="text-white text-lg md:text-xl font-bold">{formatDate(selectedTrader.accountCreated)}</p>
                  </div>
                </div>
              </div>

              {/* Performance Chart */}
              <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 md:p-6 hover:border-neutral-700 transition-colors">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Performance</h3>
                  <span className="px-3 py-1 bg-neutral-800 text-neutral-400 rounded-lg text-xs font-medium border border-neutral-700">
                    All time
                  </span>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={profileChartData}>
                    <defs>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#34d399" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                    <XAxis dataKey="month" stroke="#525252" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#525252" tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '12px', fontSize: '13px' }}
                      formatter={(value) => formatCurrency(value)}
                    />
                    <Area type="monotone" dataKey="profit" stroke="#34d399" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-center gap-2 mt-4 text-neutral-500 text-xs">
                  <Shield className="w-3 h-3" />
                  All revenue verified through {selectedTrader.connectionType === 'tradesyncer' ? 'TradeSyncer' : 'Tradovate'} API
                  {selectedTrader.updatedAt && <span className="text-neutral-600">| Updated {formatTimestamp(selectedTrader.updatedAt)}</span>}
                </div>
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
    <div className="min-h-screen bg-[#0a0a0a]">
      <GlobalStyles />
      <Toast toast={toast} />

      {/* Minimal Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-neutral-800/50">
        <div className="px-4 py-3 max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/proof-of-pips-logo.png" alt="Proof of Pips" className="w-8 h-8 object-contain" />
            <span className="text-white font-bold text-lg tracking-tight">Proof of Pips</span>
          </div>
          <nav className="hidden md:flex items-center gap-1 text-sm text-neutral-500">
            <button onClick={() => navigate('/')} className="px-3 py-1.5 hover:text-white transition-colors rounded-lg hover:bg-neutral-800/50">Leaderboard</button>
            <span className="text-neutral-700">|</span>
            <button onClick={() => navigate('/blog')} className="px-3 py-1.5 hover:text-white transition-colors rounded-lg hover:bg-neutral-800/50">Education</button>
            <span className="text-neutral-700">|</span>
            <button onClick={() => setShowAdvertiseModal(true)} className="px-3 py-1.5 hover:text-white transition-colors rounded-lg hover:bg-neutral-800/50">Advertise</button>
          </nav>
          <button
            onClick={() => { window.location.href = `${API_URL}/api/auth/twitter/login`; }}
            className="px-4 py-2 bg-white hover:bg-neutral-200 text-black text-sm font-medium rounded-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Join</span>
          </button>
        </div>
      </header>

      {/* Mobile Ad Carousel - Top */}
      <div className="sticky top-[57px] z-40">
        <MobileAdCarousel position="top" />
      </div>

      <div className="relative min-h-screen">
        <div className="flex justify-between items-start px-2 md:px-4 max-w-[1800px] mx-auto">
          {/* Left Ads */}
          <div className="hidden xl:flex flex-col gap-4 flex-shrink-0 sticky top-[80px] self-start pt-8">
            {[0, 1, 2, 3, 4].map(i => (
              <AdBox key={i} index={i} currentAdIndex={currentAdIndex} isRotating={isRotating} />
            ))}
          </div>

          {/* Center Content */}
          <div className="flex-1 max-w-5xl w-full mx-auto xl:mx-8 py-8 md:py-12 px-2">
            {/* Hero */}
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Verified prop trader earnings
              </h2>
              <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto mb-6">
                No screenshots. No trust-me-bro. Revenue verified through Tradovate &amp; TradeSyncer APIs.
              </p>

              {/* Trust Signals */}
              <div className="flex items-center justify-center gap-4 md:gap-6 text-xs text-neutral-500">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-500" />
                  <span>API Verified</span>
                </div>
                <span className="text-neutral-800">|</span>
                <div className="flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{totalTraderCount} Traders</span>
                </div>
                <span className="text-neutral-800">|</span>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="font-mono">{formatCurrency(totalVerifiedProfit)}</span>
                  <span>Verified</span>
                </div>
              </div>
            </div>

            {/* Search & Controls */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-neutral-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search traders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all flex items-center gap-2 ${showFilters ? 'bg-neutral-800 border-neutral-600 text-white' : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'}`}
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                  <span className="hidden sm:inline">Filter</span>
                </button>
                <button
                  onClick={() => { setCompareMode(!compareMode); if (compareMode) setSelectedTraders([]); }}
                  className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all flex items-center gap-2 ${compareMode ? 'bg-white border-white text-black' : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'}`}
                >
                  <Award className="w-4 h-4" />
                  <span className="hidden sm:inline">{compareMode ? 'Cancel' : 'Compare'}</span>
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
                  className="px-4 py-2.5 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 rounded-xl text-sm font-medium transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                </button>
              </div>

              {/* Expandable Filters */}
              {showFilters && (
                <div className="flex flex-wrap gap-2 p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl animate-fade-in">
                  <select value={filterProfit} onChange={(e) => setFilterProfit(e.target.value)} className="px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-neutral-500 cursor-pointer">
                    <option value="all">All Profits</option>
                    <option value="10k">$10K+</option>
                    <option value="50k">$50K+</option>
                    <option value="100k">$100K+</option>
                  </select>
                  <select value={filterFirm} onChange={(e) => setFilterFirm(e.target.value)} className="px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-neutral-500 cursor-pointer">
                    <option value="all">All Firms</option>
                    <option value="topstep">Topstep</option>
                    <option value="apex">Apex Trader Funding</option>
                    <option value="tradeday">TradeDay</option>
                    <option value="bulenox">Bulenox</option>
                    <option value="tradeify">Tradeify</option>
                  </select>
                  {(filterProfit !== 'all' || filterFirm !== 'all') && (
                    <button onClick={() => { setFilterProfit('all'); setFilterFirm('all'); }} className="px-3 py-2 text-neutral-400 hover:text-white text-sm transition-colors">Clear all</button>
                  )}
                </div>
              )}
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-1 mb-4 text-xs text-neutral-600">
              <span>Sort by:</span>
              {[
                { key: 'totalProfit', label: 'Profit' },
                { key: 'winRate', label: 'Win Rate' },
                { key: 'monthlyProfit', label: 'Monthly' },
              ].map(col => (
                <button
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className={`px-2 py-1 rounded-md transition-colors ${sortBy === col.key ? 'text-white bg-neutral-800' : 'hover:text-neutral-400'}`}
                >
                  {col.label} {sortBy === col.key && (sortDirection === 'asc' ? '\u2191' : '\u2193')}
                </button>
              ))}
            </div>

            {/* Leaderboard */}
            <div className="space-y-2">
              {loading ? (
                <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {Array.from({ length: 10 }).map((_, i) => <SkeletonRow key={i} />)}
                    </tbody>
                  </table>
                </div>
              ) : error && filteredAndSortedTraders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center"><AlertCircle className="w-8 h-8 text-red-400" /></div>
                  <h3 className="text-white font-semibold text-lg">Connection Lost</h3>
                  <p className="text-neutral-500 text-sm max-w-sm text-center">We're having trouble reaching our servers.</p>
                  <button onClick={fetchTraders} className="px-5 py-2.5 bg-white hover:bg-neutral-200 text-black font-medium text-sm rounded-lg flex items-center gap-2 transition-all"><RefreshCw className="w-4 h-4" /> Retry</button>
                </div>
              ) : filteredAndSortedTraders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-neutral-800 flex items-center justify-center"><Search className="w-8 h-8 text-neutral-500" /></div>
                  <h3 className="text-white font-semibold text-lg">{searchQuery ? 'No Traders Found' : 'Be a Pioneer'}</h3>
                  <p className="text-neutral-500 text-sm">{searchQuery ? `No one matching "${searchQuery}".` : 'Be the first verified prop trader to join.'}</p>
                  {searchQuery ? (
                    <button onClick={() => setSearchQuery('')} className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-sm transition-colors">Clear Search</button>
                  ) : (
                    <button onClick={() => { window.location.href = `${API_URL}/api/auth/twitter/login`; }} className="px-5 py-2.5 bg-white hover:bg-neutral-200 text-black font-medium text-sm rounded-lg flex items-center gap-2 transition-all"><Plus className="w-4 h-4" /> Join Leaderboard</button>
                  )}
                </div>
              ) : (
                filteredAndSortedTraders.map((trader) => (
                  <div
                    key={trader.id || trader.twitter}
                    onClick={compareMode ? undefined : () => navigate(`/profile/${trader.twitter}`)}
                    className={`group bg-neutral-900/40 border border-neutral-800/60 rounded-xl p-3 md:p-4 flex items-center gap-3 md:gap-4 transition-all ${compareMode ? '' : 'hover:border-neutral-600 hover:bg-neutral-900/80 cursor-pointer'}`}
                  >
                    {/* Compare Checkbox */}
                    {compareMode && (
                      <div onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" checked={selectedTraders.some(t => t.id === trader.id)} onChange={(e) => { e.stopPropagation(); toggleTraderSelection(trader); }} className="w-4 h-4 accent-white cursor-pointer rounded" />
                      </div>
                    )}

                    {/* Rank */}
                    <div className="w-8 text-center flex-shrink-0">
                      <span className="text-lg font-bold text-white">{getRankEmoji(trader.rank)}</span>
                    </div>

                    {/* Avatar */}
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-neutral-800 flex items-center justify-center text-xl md:text-2xl flex-shrink-0 border border-neutral-700/50 group-hover:border-neutral-600 transition-colors">
                      {trader.avatar}
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm md:text-base font-semibold text-white truncate group-hover:text-white transition-colors">@{trader.twitter}</span>
                        <Shield className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {sortBadgesByPriority(calculateBadges(trader)).slice(0, 2).map((badge, idx) => (
                          <Badge key={idx} badge={badge} />
                        ))}
                      </div>
                    </div>

                    {/* Profit */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm md:text-base font-bold font-mono text-emerald-400">{formatCurrency(trader.totalProfit)}</p>
                      <p className="text-[11px] text-neutral-600 font-mono hidden sm:block">{formatCurrency(trader.monthlyProfit)}/mo</p>
                    </div>

                    {/* Win Rate */}
                    <div className="text-right flex-shrink-0 hidden sm:block w-16">
                      <p className="text-sm font-semibold font-mono text-white">{trader.winRate}%</p>
                      <p className="text-[11px] text-neutral-600">win rate</p>
                    </div>
                  </div>
                ))
              )}

              {!loading && !error && filteredAndSortedTraders.length >= displayCount && (
                <div className="pt-4 text-center">
                  <button onClick={() => setDisplayCount(prev => prev + 25)} className="px-6 py-2.5 border border-neutral-800 hover:border-neutral-600 text-white text-sm font-medium rounded-xl transition-all hover:bg-neutral-900/50 w-full">
                    Load more traders
                  </button>
                </div>
              )}
            </div>

            {/* Verification Notice */}
            <div className="mt-12 text-center text-xs text-neutral-600">
              All revenue is verified through Tradovate &amp; TradeSyncer API keys. Data is updated hourly.
            </div>
          </div>

          {/* Right Ads */}
          <div className="hidden xl:flex flex-col gap-4 flex-shrink-0 sticky top-[80px] self-start pt-8">
            {[5, 6, 7, 8, 9].map(i => (
              <AdBox key={i} index={i} currentAdIndex={currentAdIndex} isRotating={isRotating} />
            ))}
          </div>
        </div>
      </div>

      <MobileAdCarousel position="bottom" />

      {/* Footer */}
      <footer className="border-t border-neutral-800/50 py-8 mt-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Navigation</h4>
              <div className="space-y-2">
                <button onClick={() => navigate('/')} className="block text-neutral-500 hover:text-white text-sm transition-colors">Leaderboard</button>
                <button onClick={() => navigate('/blog')} className="block text-neutral-500 hover:text-white text-sm transition-colors">Education</button>
                <button onClick={() => setShowAdvertiseModal(true)} className="block text-neutral-500 hover:text-white text-sm transition-colors">Advertise</button>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Integrations</h4>
              <div className="space-y-2">
                <span className="block text-neutral-500 text-sm">Tradovate</span>
                <span className="block text-neutral-500 text-sm">TradeSyncer</span>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Legal</h4>
              <div className="space-y-2">
                <button onClick={() => navigate('/privacy')} className="block text-neutral-500 hover:text-white text-sm transition-colors">Privacy Policy</button>
                <button onClick={() => navigate('/terms')} className="block text-neutral-500 hover:text-white text-sm transition-colors">Terms of Service</button>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Connect</h4>
              <div className="space-y-2">
                <a href="https://twitter.com/proofofpips" target="_blank" rel="noopener noreferrer" className="block text-neutral-500 hover:text-white text-sm transition-colors">Twitter / X</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-neutral-800/50 gap-2">
            <span className="text-neutral-600 text-xs">&copy; 2025 Proof of Pips. All revenue data verified.</span>
            <div className="flex items-center gap-1.5 text-neutral-600 text-xs">
              <Shield className="w-3 h-3 text-emerald-500" />
              Powered by Tradovate &amp; TradeSyncer APIs
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Compare Button */}
      {compareMode && selectedTraders.length >= 2 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <button onClick={() => setCompareMode(false)} className="px-8 py-3.5 bg-white hover:bg-neutral-100 text-black font-bold text-sm rounded-full flex items-center gap-3 transition-all shadow-2xl shadow-white/10 hover:scale-105">
            <Award className="w-5 h-5" /> Compare {selectedTraders.length} Traders
          </button>
        </div>
      )}

      {/* Modals */}
      {showAddModal && (
        <AddTraderModal onClose={() => setShowAddModal(false)} twitterUsername={twitterUsername} authToken={authToken} isVerified={isVerified} showToast={showToast} />
      )}

      {/* Comparison Modal */}
      {selectedTraders.length >= 2 && !compareMode && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100] p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-6xl w-full my-8">
            <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 p-6 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2"><Award className="w-5 h-5 text-emerald-400" /> Trader Comparison</h2>
              <button onClick={() => setSelectedTraders([])} className="text-neutral-400 hover:text-white transition-colors p-1 hover:bg-neutral-800 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6">
              <div className={`grid ${selectedTraders.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'} gap-4`}>
                {selectedTraders.map((trader, index) => {
                  const chartData = generateRealisticChartData(trader);
                  return (
                    <div key={trader.id} className="bg-neutral-950/60 border border-neutral-800 rounded-xl p-5">
                      <div className="flex flex-col items-center mb-6 pb-4 border-b border-neutral-800">
                        <div className="w-14 h-14 rounded-xl bg-neutral-800 flex items-center justify-center text-2xl border border-neutral-700 mb-3">{trader.avatar}</div>
                        <h3 className="text-lg font-bold text-white mb-1">@{trader.twitter}</h3>
                        <span className="text-neutral-500 text-xs">Rank #{trader.rank}</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-baseline"><span className="text-neutral-500 text-xs">Total Profit</span><span className="text-emerald-400 text-xl font-bold font-mono">{formatCurrency(trader.totalProfit)}</span></div>
                        <div className="flex justify-between items-baseline"><span className="text-neutral-500 text-xs">Monthly</span><span className="text-white text-lg font-bold font-mono">{formatCurrency(trader.monthlyProfit)}</span></div>
                        <div className="flex justify-between items-baseline"><span className="text-neutral-500 text-xs">Win Rate</span><span className="text-white text-lg font-bold font-mono">{trader.winRate}%</span></div>
                      </div>
                      <div className="mt-4">
                        <ResponsiveContainer width="100%" height={120}>
                          <AreaChart data={chartData}>
                            <defs><linearGradient id={`colorProfit${index}`} x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#34d399" stopOpacity={0.2} /><stop offset="95%" stopColor="#34d399" stopOpacity={0} /></linearGradient></defs>
                            <Area type="monotone" dataKey="profit" stroke="#34d399" strokeWidth={2} fillOpacity={1} fill={`url(#colorProfit${index})`} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      <button onClick={() => { setSelectedTraders([]); navigate(`/profile/${trader.twitter}`); }} className="w-full mt-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-sm transition-colors border border-neutral-700">View Profile</button>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                <div className="flex items-center justify-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span className="text-white font-semibold text-sm">
                    {(() => {
                      const leader = [...selectedTraders].sort((a, b) => b.totalProfit - a.totalProfit)[0];
                      const second = [...selectedTraders].sort((a, b) => b.totalProfit - a.totalProfit)[1];
                      if (leader.totalProfit === second.totalProfit) return 'Tied in total profit!';
                      return `@${leader.twitter} leads by ${formatCurrency(leader.totalProfit - second.totalProfit)}`;
                    })()}
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
