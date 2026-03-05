import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] p-4 animate-slideUp">
      <div className="max-w-2xl mx-auto bg-neutral-900 border border-neutral-700 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 shadow-2xl shadow-black/50">
        <p className="text-neutral-300 text-sm flex-1">
          We use essential cookies for authentication. No tracking or analytics cookies are used.{' '}
          <a href="/privacy" className="text-yellow-500 hover:text-yellow-400 underline">Privacy Policy</a>
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-neutral-400 hover:text-white text-sm rounded-lg transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-white hover:bg-neutral-200 text-black text-sm font-medium rounded-lg transition-all"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
