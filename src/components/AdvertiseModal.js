import React, { useState } from 'react';

const AdvertiseModal = ({ onClose }) => {
  const [selectedMonth, setSelectedMonth] = useState('');

  const availableSpots = 20;
  const filledSpots = 6;
  const pricePerMonth = 100;

  const months = [
    'March 2026', 'April 2026', 'May 2026',
    'June 2026', 'July 2026', 'August 2026',
  ];

  const handleLockSpot = () => {
    if (!selectedMonth) {
      alert('Please select a month');
      return;
    }
    window.open('https://buy.stripe.com/YOUR_PAYMENT_LINK', '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-neutral-900 border border-yellow-600/30 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Advertise on Proof of Pips</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-gray-300 text-sm leading-relaxed">
            Reach thousands of verified prop traders and entrepreneurs daily
          </div>

          <div>
            <h3 className="text-white font-bold mb-3">How it works</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your brand appears in rotating sponsor slots on desktop sidebars and mobile banners
              across all Proof of Pips pages. Sponsors rotate every 8 seconds to ensure fair visibility.
            </p>
          </div>

          <div className="bg-black/50 rounded-lg p-4 space-y-2">
            <h3 className="text-white font-bold">Availability</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Maximum spots:</span>
                <span className="text-white font-semibold">{availableSpots}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Current status:</span>
                <span className="text-yellow-500 font-semibold">{availableSpots - filledSpots} spots available</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-white font-bold mb-3">Select your month</label>
            <div className="space-y-2">
              {months.map((month) => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    selectedMonth === month
                      ? 'border-yellow-500 bg-yellow-500/10 text-white'
                      : 'border-neutral-700 hover:border-neutral-600 text-gray-300'
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-neutral-800 rounded-lg p-4 border border-yellow-600/20">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold text-white">${pricePerMonth}</span>
              <span className="text-gray-400">/month</span>
            </div>
            <p className="text-xs text-gray-500">Monthly payment &bull; Cancel anytime</p>
          </div>

          <button
            onClick={handleLockSpot}
            disabled={!selectedMonth}
            className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
              selectedMonth
                ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black shadow-lg shadow-yellow-500/20'
                : 'bg-neutral-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {selectedMonth ? `Lock spot for ${selectedMonth}` : 'Select a month to continue'}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Payment secured by Stripe &bull; 24-48 hour ad approval
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdvertiseModal;
