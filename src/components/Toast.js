import React from 'react';

const Toast = ({ toast }) => {
  if (!toast.show) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] animate-toast-in">
      <div className={`px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 ${
        toast.type === 'success'
          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
          : 'bg-gradient-to-r from-red-500 to-rose-600 text-white'
      }`}>
        {toast.type === 'success' ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        <span className="font-semibold">{toast.message}</span>
      </div>
    </div>
  );
};

export default Toast;
