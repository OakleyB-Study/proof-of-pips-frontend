import React from 'react';
import { sponsorAds } from '../data/ads';

const AdBox = ({ index, currentAdIndex, isRotating, small = false }) => {
  const style = small ? 'min-w-[200px]' : 'w-64';
  const displayIndex = (currentAdIndex + index) % sponsorAds.length;
  const ad = sponsorAds[displayIndex];

  return (
    <div className={`${style} perspective-1000`} style={{ perspective: '1000px' }}>
      <a
        href={ad.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block h-32 ${ad.color} backdrop-blur-sm border border-yellow-600/20 rounded-xl p-4 hover:border-yellow-500/40 transition-all duration-300 shadow-lg hover:shadow-yellow-500/10 transform-gpu ${isRotating ? 'animate-cube-rotate' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{ad.logo}</span>
            <span className="text-yellow-500 font-bold text-sm">{ad.name}</span>
          </div>
          <p className="text-gray-300 text-xs leading-relaxed flex-1">{ad.description}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-yellow-500 text-xs font-semibold">Learn More &rarr;</span>
          </div>
        </div>
      </a>
    </div>
  );
};

export const MobileAdCarousel = ({ position = 'top' }) => {
  const direction = position === 'bottom' ? { animationDirection: 'reverse' } : {};
  const positionClasses = position === 'bottom'
    ? 'fixed bottom-0 left-0 right-0 border-t'
    : 'border-b';

  return (
    <div className={`xl:hidden bg-neutral-950 ${positionClasses} border-yellow-600/20 overflow-hidden z-40`}>
      <div className="flex gap-3 py-3 animate-scroll-seamless" style={direction}>
        {[...sponsorAds, ...sponsorAds, ...sponsorAds].map((ad, index) => (
          <a
            key={index}
            href={ad.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`min-w-[120px] h-16 ${ad.color} backdrop-blur-sm border border-yellow-600/20 rounded-xl p-2 flex-shrink-0`}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-1 mb-0.5">
                <span className="text-lg">{ad.logo}</span>
                <span className="text-yellow-500 font-bold text-[10px]">{ad.name}</span>
              </div>
              <p className="text-gray-300 text-[9px] leading-tight flex-1 line-clamp-2">{ad.description}</p>
              <span className="text-yellow-500 text-[9px] font-semibold mt-0.5">Learn More &rarr;</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default AdBox;
