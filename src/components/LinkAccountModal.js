import React, { useState } from 'react';
import { Shield } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'https://proof-of-pips-backend-production.up.railway.app';

const PROP_FIRMS = [
  { value: 'topstep', label: 'Topstep' },
  { value: 'apex', label: 'Apex Trader Funding' },
  { value: 'tradeday', label: 'TradeDay' },
  { value: 'take-profit-trader', label: 'Take Profit Trader' },
  { value: 'my-funded-futures', label: 'My Funded Futures' },
  { value: 'elite-trader-funding', label: 'Elite Trader Funding' },
  { value: 'bulenox', label: 'Bulenox' },
  { value: 'tradeify', label: 'Tradeify' },
  { value: 'fundednext-futures', label: 'FundedNext Futures' },
  { value: 'oneup-trader', label: 'OneUp Trader' },
  { value: 'blusky-trading', label: 'BluSky Trading' },
  { value: 'fxify-futures', label: 'FXIFY Futures' },
  { value: 'the-trading-pit', label: 'The Trading Pit' },
  { value: 'leeloo-trading', label: 'Leeloo Trading' },
  { value: 'other', label: 'Other' },
];

const LinkAccountModal = ({ onClose, twitterUsername, showToast }) => {
  const [connectionType, setConnectionType] = useState('tradovate');
  const [propFirm, setPropFirm] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.target);
    const body = {
      propFirm: formData.get('propFirm'),
      connectionType,
    };

    if (connectionType === 'tradovate') {
      body.tradovateUsername = formData.get('tradovateUsername');
      body.tradovatePassword = formData.get('tradovatePassword');
      body.tradovateClientId = formData.get('tradovateClientId') || '';
      body.tradovateSecretKey = formData.get('tradovateSecretKey') || '';
    } else {
      body.tradeSyncerApiKey = formData.get('tradeSyncerApiKey');
    }

    try {
      const response = await fetch(`${API_URL}/api/traders/link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (response.ok) {
        showToast('Account linked successfully! Syncing your stats...', 'success');
        onClose();
        setTimeout(() => window.location.reload(), 2000);
      } else {
        showToast(result.error || 'Failed to link account', 'error');
      }
    } catch (error) {
      showToast('Network error. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-900 border border-yellow-600/30 rounded-xl p-6 md:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-white">Link Trading Account</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
          <p className="text-yellow-400 text-sm flex items-center gap-2">
            <Shield className="w-4 h-4 flex-shrink-0" />
            Linking as @{twitterUsername}
          </p>
        </div>

        <p className="text-gray-400 mb-6 text-sm">
          Connect your Tradovate account or TradeSyncer API to verify your stats and appear on the ranked leaderboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Prop Firm */}
          <div>
            <label className="block text-white font-semibold mb-2 text-sm">Prop Firm</label>
            <select
              name="propFirm"
              required
              value={propFirm}
              onChange={(e) => setPropFirm(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
            >
              <option value="">Select your prop firm</option>
              {PROP_FIRMS.map(firm => (
                <option key={firm.value} value={firm.value}>{firm.label}</option>
              ))}
            </select>
          </div>

          {/* Connection Type Toggle */}
          <div>
            <label className="block text-white font-semibold mb-3 text-sm">Connection Method</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setConnectionType('tradovate')}
                className={`p-3 rounded-lg border-2 transition-all text-center ${
                  connectionType === 'tradovate'
                    ? 'border-yellow-500 bg-yellow-500/10 text-white'
                    : 'border-neutral-700 hover:border-neutral-600 text-gray-400'
                }`}
              >
                <div className="font-bold text-sm">Tradovate</div>
                <div className="text-xs text-gray-500 mt-1">Direct API</div>
              </button>
              <button
                type="button"
                onClick={() => setConnectionType('tradesyncer')}
                className={`p-3 rounded-lg border-2 transition-all text-center ${
                  connectionType === 'tradesyncer'
                    ? 'border-yellow-500 bg-yellow-500/10 text-white'
                    : 'border-neutral-700 hover:border-neutral-600 text-gray-400'
                }`}
              >
                <div className="font-bold text-sm">TradeSyncer</div>
                <div className="text-xs text-gray-500 mt-1">API Key</div>
              </button>
            </div>
          </div>

          {/* Tradovate Fields */}
          {connectionType === 'tradovate' && (
            <>
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">Tradovate Username</label>
                <input
                  type="text"
                  name="tradovateUsername"
                  placeholder="Your Tradovate username"
                  required
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">Tradovate Password</label>
                <input
                  type="password"
                  name="tradovatePassword"
                  placeholder="Your Tradovate password"
                  required
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Used once to generate an access token. Your password is never stored.</p>
              </div>
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">API Client ID <span className="text-gray-500">(optional)</span></label>
                <input
                  type="text"
                  name="tradovateClientId"
                  placeholder="Tradovate API client ID (cid)"
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">API Secret Key <span className="text-gray-500">(optional)</span></label>
                <input
                  type="password"
                  name="tradovateSecretKey"
                  placeholder="Tradovate API secret key (sec)"
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>
            </>
          )}

          {/* TradeSyncer Fields */}
          {connectionType === 'tradesyncer' && (
            <div>
              <label className="block text-white font-semibold mb-2 text-sm">TradeSyncer API Key</label>
              <input
                type="password"
                name="tradeSyncerApiKey"
                placeholder="Your TradeSyncer API key"
                required
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
              />
              <p className="text-xs text-gray-500 mt-1">
                Find this in your TradeSyncer dashboard under API settings
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className={`w-full px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold rounded-lg transition-all shadow-lg shadow-yellow-500/20 mt-6 ${
              submitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {submitting ? 'Connecting...' : 'Link Account & Sync Stats'}
          </button>
          <p className="text-center mt-3">
            <a href="/guide" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-yellow-500 transition-colors">
              Need help? Read the setup guide →
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LinkAccountModal;
