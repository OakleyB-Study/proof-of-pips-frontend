import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Shield, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'https://proof-of-pips-backend-production.up.railway.app';

const StepCard = ({ number, title, children }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center">
      <span className="text-yellow-500 font-bold text-sm">{number}</span>
    </div>
    <div className="flex-1 pb-6">
      <h4 className="text-white font-semibold mb-2">{title}</h4>
      <div className="text-gray-400 text-sm leading-relaxed space-y-2">{children}</div>
    </div>
  </div>
);

const InfoBox = ({ type = 'info', children }) => {
  const styles = {
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
    security: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300',
  };

  const icons = {
    info: <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />,
    security: <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />,
    warning: <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />,
  };

  return (
    <div className={`flex gap-3 rounded-lg border p-4 text-sm ${styles[type]}`}>
      {icons[type]}
      <div>{children}</div>
    </div>
  );
};

const Guide = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tradovate');

  React.useEffect(() => {
    document.title = 'How to Join - Proof of Pips';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Leaderboard
        </button>

        {/* Hero */}
        <div className="bg-neutral-900/50 backdrop-blur-sm border border-yellow-600/20 rounded-xl p-6 md:p-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">How to Join Proof of Pips</h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Get your verified trading stats on the leaderboard in under 2 minutes. Choose your platform below and follow the steps.
          </p>
        </div>

        {/* Overview */}
        <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Quick Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 bg-neutral-800/50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-500 font-bold text-sm">1</span>
              </div>
              <div>
                <p className="text-white font-medium text-sm">Verify with Twitter</p>
                <p className="text-gray-500 text-xs mt-1">Proves your identity</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-neutral-800/50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-500 font-bold text-sm">2</span>
              </div>
              <div>
                <p className="text-white font-medium text-sm">Link Your Platform</p>
                <p className="text-gray-500 text-xs mt-1">Tradovate or TradeSyncer</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-neutral-800/50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-500 font-bold text-sm">3</span>
              </div>
              <div>
                <p className="text-white font-medium text-sm">Stats Sync Automatically</p>
                <p className="text-gray-500 text-xs mt-1">Updated every hour</p>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('tradovate')}
            className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'tradovate'
                ? 'bg-yellow-500 text-black'
                : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'
            }`}
          >
            Tradovate
          </button>
          <button
            onClick={() => setActiveTab('tradesyncer')}
            className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'tradesyncer'
                ? 'bg-yellow-500 text-black'
                : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'
            }`}
          >
            TradeSyncer
          </button>
        </div>

        {/* Tradovate Guide */}
        {activeTab === 'tradovate' && (
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Linking Tradovate</h2>
            <p className="text-gray-400 mb-6">Connect your Tradovate account to pull verified trade data directly from the platform.</p>

            {/* What You Need */}
            <div className="bg-neutral-800/50 rounded-lg p-5 mb-8">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                What You Need
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-0.5">•</span>
                  <span><strong className="text-white">Tradovate Username</strong> — your login username</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-0.5">•</span>
                  <span><strong className="text-white">Tradovate Password</strong> — used once to generate an access token, then discarded</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 mt-0.5">•</span>
                  <span><strong className="text-gray-400">Client ID</strong> <span className="text-gray-600">(optional)</span> — for API-enabled accounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 mt-0.5">•</span>
                  <span><strong className="text-gray-400">Secret Key</strong> <span className="text-gray-600">(optional)</span> — for API-enabled accounts</span>
                </li>
              </ul>
            </div>

            {/* Steps */}
            <h3 className="text-lg font-bold text-white mb-4">Step-by-Step</h3>
            <div className="space-y-0 border-l-2 border-neutral-800 ml-4 pl-6">
              <StepCard number="1" title='Click "+Join" on the leaderboard'>
                <p>This redirects you to Twitter/X for identity verification. We never see your Twitter password — it goes through Twitter's official OAuth.</p>
              </StepCard>
              <StepCard number="2" title="Authorize the app on Twitter">
                <p>Grant read-only access so we can verify your Twitter username. We only read your username and profile picture — nothing else.</p>
              </StepCard>
              <StepCard number="3" title="Select your prop firm and choose Tradovate">
                <p>Pick your prop firm from the dropdown (Topstep, Apex, TradeDay, etc.), then select <strong className="text-white">Tradovate</strong> as your connection method.</p>
              </StepCard>
              <StepCard number="4" title="Enter your Tradovate credentials">
                <p>Type in your Tradovate username and password. If you have a Client ID and Secret Key for API access, enter those too — otherwise you can leave them blank.</p>
              </StepCard>
              <StepCard number="5" title='Hit "Add Profile & Sync Stats"'>
                <p>We authenticate with Tradovate, grab an access token, and immediately discard your password. Your trade data starts syncing right away.</p>
              </StepCard>
            </div>

            <div className="mt-6 space-y-3">
              <InfoBox type="security">
                <strong>Your password is never stored.</strong> We use it once to generate a short-lived access token from Tradovate's API. The token is encrypted with AES-256-GCM and used for future syncs. If the token expires, you'll be asked to re-enter your password.
              </InfoBox>
              <InfoBox type="info">
                <strong>Where do I find my Client ID / Secret Key?</strong> These are only needed if you've enabled API access on your Tradovate account. Most users can leave these blank. If you have them, they're in Tradovate under Settings → API Access.
              </InfoBox>
            </div>
          </div>
        )}

        {/* TradeSyncer Guide */}
        {activeTab === 'tradesyncer' && (
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Linking TradeSyncer</h2>
            <p className="text-gray-400 mb-6">Connect via TradeSyncer to import your trade data using an API key.</p>

            {/* What You Need */}
            <div className="bg-neutral-800/50 rounded-lg p-5 mb-8">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                What You Need
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-0.5">•</span>
                  <span><strong className="text-white">TradeSyncer API Key</strong> — found in your TradeSyncer dashboard</span>
                </li>
              </ul>
            </div>

            {/* Where to Find API Key */}
            <div className="bg-neutral-800/50 rounded-lg p-5 mb-8">
              <h3 className="text-white font-semibold mb-3">Finding Your API Key</h3>
              <ol className="space-y-2 text-gray-300 text-sm list-decimal list-inside">
                <li>Log into your <a href="https://tradesyncer.com" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-400 inline-flex items-center gap-1">TradeSyncer account <ExternalLink className="w-3 h-3" /></a></li>
                <li>Navigate to <strong className="text-white">Settings</strong> or <strong className="text-white">API</strong> section</li>
                <li>Generate a new API key or copy your existing one</li>
                <li>Keep this key private — don't share it with anyone</li>
              </ol>
            </div>

            {/* Steps */}
            <h3 className="text-lg font-bold text-white mb-4">Step-by-Step</h3>
            <div className="space-y-0 border-l-2 border-neutral-800 ml-4 pl-6">
              <StepCard number="1" title='Click "+Join" on the leaderboard'>
                <p>This redirects you to Twitter/X for identity verification.</p>
              </StepCard>
              <StepCard number="2" title="Authorize the app on Twitter">
                <p>Grant read-only access so we can verify your Twitter username.</p>
              </StepCard>
              <StepCard number="3" title="Select your prop firm and choose TradeSyncer">
                <p>Pick your prop firm, then select <strong className="text-white">TradeSyncer</strong> as your connection method.</p>
              </StepCard>
              <StepCard number="4" title="Paste your API key">
                <p>Paste the API key you copied from TradeSyncer. It will be encrypted before storage.</p>
              </StepCard>
              <StepCard number="5" title='Hit "Add Profile & Sync Stats"'>
                <p>We validate the key, sync your trade data, and you're on the leaderboard!</p>
              </StepCard>
            </div>

            <div className="mt-6">
              <InfoBox type="security">
                <strong>Your API key is encrypted at rest</strong> with AES-256-GCM and only decrypted server-side during hourly syncs. It's never exposed in API responses or logs.
              </InfoBox>
            </div>
          </div>
        )}

        {/* FAQ */}
        <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FAQItem question="How often does my data sync?">
              Your trade data syncs automatically every hour. You can also manually trigger a sync from your profile page.
            </FAQItem>
            <FAQItem question="Can I remove my account?">
              Yes. Reach out to us on Twitter and we'll remove your profile and all associated data.
            </FAQItem>
            <FAQItem question="What happens if my token expires?">
              You'll see a notification when you log in. Just click Join again with your Twitter, and you'll be prompted to re-enter your Tradovate password to generate a new token. Your other settings are preserved.
            </FAQItem>
            <FAQItem question="Is my data secure?">
              All credentials are encrypted with AES-256-GCM at rest. Passwords are never stored. Our backend follows STIG and CJIS security compliance standards. All API communications use HTTPS/TLS.
            </FAQItem>
            <FAQItem question="Which prop firms are supported?">
              We support any prop firm that uses Tradovate or TradeSyncer — including Topstep, Apex, TradeDay, Bulenox, The Trading Pit, and many more.
            </FAQItem>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to join?</h2>
          <p className="text-gray-400 mb-6">Get your verified trading stats on the leaderboard.</p>
          <button
            onClick={() => { window.location.href = `${API_URL}/api/auth/twitter/login`; }}
            className="px-8 py-3.5 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold rounded-lg transition-all shadow-lg shadow-yellow-500/20 hover:scale-105 text-sm"
          >
            Join Proof of Pips
          </button>
        </div>
      </div>
    </div>
  );
};

const FAQItem = ({ question, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-neutral-800 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-neutral-800/50 transition-colors"
      >
        <span className="text-white font-medium text-sm">{question}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 text-gray-400 text-sm leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
};

export default Guide;
