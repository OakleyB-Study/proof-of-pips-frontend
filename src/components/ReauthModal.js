import React, { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'https://proof-of-pips-backend-production.up.railway.app';

const ReauthModal = ({ onClose, twitterUsername, authToken, showToast }) => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.target);
    const body = {
      twitterUsername,
      authToken,
      tradovatePassword: formData.get('tradovatePassword'),
    };

    try {
      const response = await fetch(`${API_URL}/api/traders/reauth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (response.ok) {
        showToast('Re-authenticated successfully! Syncing your stats...', 'success');
        onClose();
        setTimeout(() => window.location.reload(), 2000);
      } else {
        showToast(result.error || 'Re-authentication failed', 'error');
      }
    } catch (error) {
      showToast('Network error. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-900 border border-yellow-600/30 rounded-xl p-6 md:p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-white">Re-authenticate</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
          <p className="text-yellow-400 text-sm">
            Your Tradovate access token has expired. Enter your password to generate a new one. Your password is used once and never stored.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white font-semibold mb-2 text-sm">Twitter Username</label>
            <input
              type="text"
              value={twitterUsername}
              readOnly
              className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white cursor-not-allowed"
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
            <p className="text-xs text-gray-500 mt-1">Used once to generate a new access token. Never stored.</p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold rounded-lg transition-all shadow-lg shadow-yellow-500/20 mt-6 ${
              submitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {submitting ? 'Authenticating...' : 'Re-authenticate'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReauthModal;
