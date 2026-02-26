import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';

const PostAuthModal = ({ onClose, twitterUsername, onChooseLinkNow, onChooseJoinOnly, submitting }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-900 border border-yellow-600/30 rounded-xl p-6 md:p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-white">Welcome, @{twitterUsername}!</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-gray-400 mb-6 text-sm">
          Choose how you'd like to join the leaderboard:
        </p>

        <div className="space-y-3">
          <button
            onClick={onChooseLinkNow}
            className="w-full p-4 rounded-lg border-2 border-yellow-500 bg-yellow-500/10 text-left hover:bg-yellow-500/20 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-yellow-500" />
                  Link Trading Account
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Connect Tradovate or TradeSyncer to verify your stats and appear on the ranked leaderboard.
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-3" />
            </div>
          </button>

          <button
            onClick={onChooseJoinOnly}
            disabled={submitting}
            className={`w-full p-4 rounded-lg border-2 border-neutral-700 text-left hover:border-neutral-600 hover:bg-neutral-800/50 transition-all ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="font-bold text-white">
              {submitting ? 'Creating account...' : 'Join Without Linking'}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Create your profile now and link a trading platform later.
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAuthModal;
