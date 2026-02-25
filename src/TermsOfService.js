import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
  const navigate = useNavigate();

  // Set page title
  React.useEffect(() => {
    document.title = 'Terms of Service - Proof of Pips';
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-gray-400 mb-8">Last Updated: November 21, 2024</p>

          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Agreement to Terms</h2>
              <p className="leading-relaxed">
                By accessing or using Proof of Pips ("Service," "we," "our," or "us"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Description of Service</h2>
              <p className="leading-relaxed mb-4">
                Proof of Pips is a verified prop trader leaderboard platform that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Displays publicly verified trading statistics from prop trading firms</li>
                <li>Connects to trading platform APIs to sync real-time performance data</li>
                <li>Provides a leaderboard ranking system based on trading performance</li>
                <li>Authenticates users via Twitter OAuth</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">User Accounts</h2>
              
              <h3 className="text-xl font-semibold text-yellow-500 mb-2 mt-4">Account Creation</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You must authenticate via Twitter OAuth to create an account</li>
                <li>You must provide accurate and complete information</li>
                <li>You must be at least 18 years old to use this Service</li>
                <li>You are responsible for maintaining the security of your API keys</li>
              </ul>

              <h3 className="text-xl font-semibold text-yellow-500 mb-2 mt-4">Account Responsibilities</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You are responsible for all activity under your account</li>
                <li>You must not share your API keys with others</li>
                <li>You must notify us immediately of any unauthorized access</li>
                <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">API Keys and Data Access</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You grant us permission to access your trading platform API using your provided credentials</li>
                <li>We will only use your API keys to fetch trading statistics for display on the leaderboard</li>
                <li>API keys are encrypted and stored securely</li>
                <li>You can revoke access at any time by deleting your account</li>
                <li>You are responsible for ensuring your API keys are valid and active</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Public Information</h2>
              <p className="leading-relaxed mb-4">
                By creating an account, you understand and agree that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your Twitter username will be publicly displayed</li>
                <li>Your trading statistics (profit, win rate, etc.) will be publicly visible</li>
                <li>Your leaderboard ranking will be publicly visible</li>
                <li>Anyone can view your profile page</li>
                <li>You can request removal of your data at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Prohibited Conduct</h2>
              <p className="leading-relaxed mb-4">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide false or misleading information</li>
                <li>Attempt to manipulate leaderboard rankings through fraudulent means</li>
                <li>Use the Service for any illegal purpose</li>
                <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
                <li>Attempt to gain unauthorized access to other users' accounts or data</li>
                <li>Use automated scripts or bots to interact with the Service</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Accuracy of Information</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We display trading statistics as provided by trading platform APIs</li>
                <li>We make reasonable efforts to ensure data accuracy but cannot guarantee it</li>
                <li>Statistics are synced automatically (every hour)</li>
                <li>Delays or discrepancies may occur due to API limitations</li>
                <li>We are not responsible for errors in data provided by third-party APIs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Intellectual Property</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All content, features, and functionality of Proof of Pips are owned by us</li>
                <li>You may not copy, modify, or distribute our content without permission</li>
                <li>User-submitted data (trading statistics) remains your property</li>
                <li>You grant us a license to display your trading statistics publicly</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Third-Party Services</h2>
              <p className="leading-relaxed mb-4">
                We integrate with third-party services including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Twitter OAuth:</strong> For authentication</li>
                <li><strong>Trading Platform APIs:</strong> For statistics (ProjectX, CQG, Rithmic)</li>
                <li><strong>Prop Trading Firms:</strong> Various prop firms supported</li>
              </ul>
              <p className="mt-4 leading-relaxed">
                We are not responsible for the practices or policies of these third-party services. Your use of these services is subject to their own terms and policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Disclaimers</h2>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-4">
                <p className="font-semibold text-yellow-500 mb-2">IMPORTANT:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>The Service is provided "AS IS" without warranties of any kind</li>
                  <li>We do not guarantee uninterrupted or error-free service</li>
                  <li>Trading statistics are for informational purposes only</li>
                  <li>We are not a financial advisor and do not provide trading advice</li>
                  <li>Past performance does not guarantee future results</li>
                  <li>You should not rely solely on leaderboard data for trading decisions</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Limitation of Liability</h2>
              <p className="leading-relaxed mb-4">
                To the maximum extent permitted by law:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We are not liable for any indirect, incidental, or consequential damages</li>
                <li>We are not liable for any losses resulting from your use of the Service</li>
                <li>We are not liable for data breaches or unauthorized access beyond our control</li>
                <li>Our total liability shall not exceed $100 or the amount you paid us (whichever is greater)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Indemnification</h2>
              <p className="leading-relaxed">
                You agree to indemnify and hold harmless Proof of Pips from any claims, damages, or expenses arising from:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>Your use of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights</li>
                <li>Any fraudulent or illegal activity conducted through your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Account Termination</h2>
              
              <h3 className="text-xl font-semibold text-yellow-500 mb-2 mt-4">By You</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You may delete your account at any time by contacting us</li>
                <li>Upon deletion, your API keys will be permanently removed</li>
                <li>Your public trading statistics may be retained for historical records</li>
              </ul>

              <h3 className="text-xl font-semibold text-yellow-500 mb-2 mt-4">By Us</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We may suspend or terminate your account for violating these Terms</li>
                <li>We may terminate accounts for fraudulent activity</li>
                <li>We may terminate accounts for extended inactivity (with notice)</li>
                <li>We reserve the right to refuse service to anyone</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Changes to Terms</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We reserve the right to modify these Terms at any time</li>
                <li>Changes will be posted on this page with an updated date</li>
                <li>Continued use of the Service after changes constitutes acceptance</li>
                <li>We will notify users of significant changes via email or website notice</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Governing Law</h2>
              <p className="leading-relaxed">
                These Terms shall be governed by the laws of the United States and the State of Missouri, without regard to conflict of law provisions. Any disputes shall be resolved in the courts of Missouri.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Severability</h2>
              <p className="leading-relaxed">
                If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Contact Information</h2>
              <p className="leading-relaxed mb-4">
                For questions about these Terms of Service:
              </p>
              <div className="bg-black/50 p-4 rounded-lg border border-yellow-600/20">
                <p><strong>Email:</strong> <a href="mailto:oakley@proofofpips.com" className="text-yellow-500 hover:text-yellow-400 underline">oakley@proofofpips.com</a></p>
                <p><strong>Website:</strong> <a href="https://proofofpips.com" className="text-yellow-500 hover:text-yellow-400 underline">https://proofofpips.com</a></p>
              </div>
            </section>

            <section className="border-t border-yellow-600/20 pt-6">
              <h2 className="text-2xl font-bold text-white mb-3">Summary (TL;DR)</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You must be 18+ and use Twitter OAuth to register</li>
                <li>Your trading stats will be publicly displayed on the leaderboard</li>
                <li>Don't manipulate rankings or provide false information</li>
                <li>We're not financial advisors - don't rely solely on our data</li>
                <li>We can terminate accounts for Terms violations</li>
                <li>You can delete your account anytime</li>
                <li>We're not liable for trading losses or data inaccuracies</li>
              </ul>
            </section>

            <p className="text-center text-gray-500 text-sm mt-8 pt-6 border-t border-neutral-800">
              By using Proof of Pips, you agree to these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;