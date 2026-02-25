import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  // Set page title
  React.useEffect(() => {
    document.title = 'Privacy Policy - Proof of Pips';
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

        <div className="bg-neutral-900/50 backdrop-blur-sm border border-yellow-600/20 rounded-xl p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-400 mb-8">Last Updated: November 21, 2024</p>

          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Introduction</h2>
              <p className="leading-relaxed">
                Proof of Pips ("we," "our," or "us") operates proofofpips.com. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-yellow-500 mb-2 mt-4">Information You Provide</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Twitter Account Information:</strong> When you authenticate via Twitter OAuth, we collect your Twitter username and profile information</li>
                <li><strong>Trading Platform Credentials:</strong> Your platform username and encrypted API key from your prop trading firm</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our website</li>
              </ul>

              <h3 className="text-xl font-semibold text-yellow-500 mb-2 mt-4">Automatically Collected Information</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Log Data:</strong> IP address, browser type, pages visited, time spent on pages</li>
                <li><strong>Cookies:</strong> We use cookies to maintain your session and improve user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">How We Use Your Information</h2>
              <p className="mb-2">We use the collected information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Verify your identity via Twitter OAuth</li>
                <li>Sync your trading statistics from your prop firm's API</li>
                <li>Display your verified trading performance on the leaderboard</li>
                <li>Improve and maintain our services</li>
                <li>Communicate with you about your account</li>
                <li>Prevent fraud and abuse</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">API Key Security</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All API keys are <strong className="text-yellow-500">encrypted</strong> before being stored in our database</li>
                <li>API keys are <strong className="text-yellow-500">never shared</strong> with third parties</li>
                <li>API keys are only used to fetch your trading statistics from your prop firm</li>
                <li>You can request deletion of your API key at any time by contacting us</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Data Sharing</h2>
              <p className="mb-4">
                We do <strong className="text-yellow-500">NOT</strong> sell your personal information. We may share information in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share information</li>
                <li><strong>Service Providers:</strong> With trusted third-party services that help us operate (hosting, analytics, authentication)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              </ul>

              <h3 className="text-xl font-semibold text-yellow-500 mb-2 mt-4">Third-Party Services We Use</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Supabase:</strong> Database hosting (encrypted data storage)</li>
                <li><strong>Railway:</strong> Backend API hosting</li>
                <li><strong>Twitter:</strong> OAuth authentication</li>
                <li><strong>NameCheap:</strong> Website hosting</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Your Trading Statistics</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Statistics displayed on the leaderboard are <strong className="text-yellow-500">public</strong> and visible to all users</li>
                <li>Your Twitter username, avatar, and trading performance metrics are publicly visible</li>
                <li>Your API keys and personal credentials are <strong className="text-yellow-500">never</strong> publicly displayed</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Your Rights</h2>
              <p className="mb-2">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access:</strong> Request a copy of your data</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                <li><strong>Opt-Out:</strong> Stop syncing your trading statistics at any time</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at: <a href="mailto:oakley@proofofpips.com" className="text-yellow-500 hover:text-yellow-400 underline">oakley@proofofpips.com</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Data Retention</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We retain your account information for as long as your account is active</li>
                <li>You may request deletion at any time</li>
                <li>API keys are permanently deleted upon account deletion</li>
                <li>Public leaderboard statistics may be retained for historical records</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Cookies</h2>
              <p className="mb-2">We use cookies to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Maintain your login session</li>
                <li>Remember your preferences</li>
                <li>Analyze website traffic</li>
              </ul>
              <p className="mt-4">
                You can disable cookies in your browser settings, but this may limit functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Children's Privacy</h2>
              <p className="leading-relaxed">
                Proof of Pips is not intended for users under 18 years old. We do not knowingly collect information from children under 18.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Changes to This Policy</h2>
              <p className="mb-2">We may update this Privacy Policy from time to time. We will notify you of any changes by:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Posting the new policy on this page</li>
                <li>Updating the "Last Updated" date</li>
                <li>Sending an email notification for significant changes (if we have your email)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Data Breach Notification</h2>
              <p className="mb-2">In the event of a data breach affecting your personal information, we will:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Notify affected users within 72 hours</li>
                <li>Provide details about the breach and steps being taken</li>
                <li>Offer guidance on protecting your accounts</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Contact Us</h2>
              <p className="leading-relaxed">
                If you have questions about this Privacy Policy or our data practices:
              </p>
              <div className="mt-4 bg-black/50 p-4 rounded-lg border border-yellow-600/20">
                <p><strong>Email:</strong> <a href="mailto:oakley@proofofpips.com" className="text-yellow-500 hover:text-yellow-400 underline">oakley@proofofpips.com</a></p>
                <p><strong>Website:</strong> <a href="https://proofofpips.com" className="text-yellow-500 hover:text-yellow-400 underline">https://proofofpips.com</a></p>
              </div>
            </section>

            <section className="border-t border-yellow-600/20 pt-6">
              <h2 className="text-2xl font-bold text-white mb-3">Summary (TL;DR)</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We collect your Twitter info and trading platform API keys</li>
                <li>API keys are <strong className="text-yellow-500">encrypted</strong> and <strong className="text-yellow-500">never shared</strong></li>
                <li>Your trading stats are <strong className="text-yellow-500">public</strong> on the leaderboard</li>
                <li>You can request deletion anytime</li>
                <li>We don't sell your data</li>
                <li>We use Supabase, Railway, and Twitter OAuth</li>
              </ul>
            </section>

            <p className="text-center text-gray-500 text-sm mt-8 pt-6 border-t border-neutral-800">
              By using Proof of Pips, you agree to this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;