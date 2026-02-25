import React from 'react';

const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="px-2 sm:px-4 md:px-6 py-3 md:py-4">
      <div className="w-8 h-8 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 rounded animate-shimmer bg-[length:200%_100%]"></div>
    </td>
    <td className="px-2 sm:px-4 md:px-6 py-3 md:py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 rounded-full animate-shimmer bg-[length:200%_100%]"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 rounded w-24 animate-shimmer bg-[length:200%_100%]"></div>
          <div className="h-3 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 rounded w-16 animate-shimmer bg-[length:200%_100%]"></div>
        </div>
      </div>
    </td>
    <td className="px-2 sm:px-4 md:px-6 py-3 md:py-4">
      <div className="h-5 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 rounded w-20 animate-shimmer bg-[length:200%_100%]"></div>
    </td>
    <td className="hidden sm:table-cell px-2 sm:px-4 md:px-6 py-3 md:py-4">
      <div className="h-4 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 rounded w-16 animate-shimmer bg-[length:200%_100%]"></div>
    </td>
    <td className="hidden md:table-cell px-2 sm:px-4 md:px-6 py-3 md:py-4">
      <div className="h-4 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 rounded w-20 animate-shimmer bg-[length:200%_100%]"></div>
    </td>
  </tr>
);

export default SkeletonRow;
