import React from 'react';

const GlobalStyles = () => (
  <style>{`
    @keyframes scroll-seamless {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-scroll-seamless {
      animation: scroll-seamless 8s linear infinite;
    }
    @keyframes cube-rotate {
      0% { transform: rotateY(0deg); }
      50% { transform: rotateY(90deg); }
      100% { transform: rotateY(0deg); }
    }
    .animate-cube-rotate {
      animation: cube-rotate 0.6s ease-in-out;
    }
    .perspective-1000 {
      perspective: 1000px;
    }
    @keyframes toast-slide-in {
      0% { transform: translateY(-100%); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    @keyframes toast-slide-out {
      0% { transform: translateY(0); opacity: 1; }
      100% { transform: translateY(-100%); opacity: 0; }
    }
    .animate-toast-in {
      animation: toast-slide-in 0.3s ease-out forwards;
    }
    .animate-toast-out {
      animation: toast-slide-out 0.3s ease-in forwards;
    }
  `}</style>
);

export default GlobalStyles;
