// badgeSystem.js - Badge configuration and earning logic
// Inspired by Call of Duty League Play and Garmin running badges

export const BADGE_TYPES = {
  ACHIEVEMENT: 'achievement',    // Auto-earned based on stats
  MONTHLY: 'monthly',           // Top 5 each month
  CUSTOM: 'custom',             // Admin-assigned
  STREAK: 'streak'              // Consecutive performance
};

// Achievement Badges (Auto-earned)
export const ACHIEVEMENT_BADGES = {
  goat: {
    name: 'The GOAT',
    emoji: '👑',
    description: 'Rank #1 trader',
    color: 'bg-yellow-900/50',
    condition: (trader) => trader.rank === 1
  },
  topTier: {
    name: 'Top Tier',
    emoji: '🏆',
    description: 'Top 10 ranked',
    color: 'bg-purple-900/50',
    condition: (trader) => trader.rank <= 10 && trader.rank > 1
  },
  sixFigureClub: {
    name: 'Six Figure Club',
    emoji: '💎',
    description: '$100K+ total profit',
    color: 'bg-cyan-900/50',
    condition: (trader) => trader.totalProfit >= 100000
  },
  hotStreak: {
    name: 'Hot Streak',
    emoji: '🔥',
    description: '70%+ win rate',
    color: 'bg-orange-900/50',
    condition: (trader) => trader.winRate >= 70
  },
  consistent: {
    name: 'Consistent',
    emoji: '📈',
    description: '$10K+ monthly',
    color: 'bg-emerald-900/50',
    condition: (trader) => trader.monthlyProfit >= 10000
  },
  speedDemon: {
    name: 'Speed Demon',
    emoji: '⚡',
    description: 'Under 3 months old',
    color: 'bg-amber-900/50',
    condition: (trader) => {
      const accountAge = new Date() - new Date(trader.accountCreated);
      const threeMonths = 90 * 24 * 60 * 60 * 1000;
      return accountAge < threeMonths;
    }
  },
  veteran: {
    name: 'Veteran',
    emoji: '🎖️',
    description: 'Trading for 1+ year',
    color: 'bg-slate-800/50',
    condition: (trader) => {
      const accountAge = new Date() - new Date(trader.accountCreated);
      const oneYear = 365 * 24 * 60 * 60 * 1000;
      return accountAge >= oneYear;
    }
  },
  profitMachine: {
    name: 'Profit Machine',
    emoji: '🤖',
    description: '$50K+ total profit',
    color: 'bg-indigo-900/50',
    condition: (trader) => trader.totalProfit >= 50000 && trader.totalProfit < 100000
  }
};

// Monthly Top 5 Badges (Auto-assigned based on rankings)
export const generateMonthlyBadge = (month, year, rank) => ({
  name: `${month} ${year} Top 5`,
  emoji: '🏅',
  description: `Ranked #${rank} in ${month} ${year}`,
  color: 'bg-amber-900/50',
  type: BADGE_TYPES.MONTHLY,
  metadata: { month, year, rank }
});

// Streak Badges (Garmin-style)
export const STREAK_BADGES = {
  hotMonth: {
    name: 'Hot Month',
    emoji: '🌟',
    description: '3 profitable months',
    color: 'bg-pink-900/50',
    condition: (streakMonths) => streakMonths >= 3
  },
  onFire: {
    name: 'On Fire',
    emoji: '🔥🔥',
    description: '6 profitable months',
    color: 'bg-orange-900/50',
    condition: (streakMonths) => streakMonths >= 6
  },
  unstoppable: {
    name: 'Unstoppable',
    emoji: '💪',
    description: '12+ profitable months',
    color: 'bg-red-900/50',
    condition: (streakMonths) => streakMonths >= 12
  }
};

// Custom Badges (Admin-assigned via database)
// These are stored in database with structure:
// { traderId, badgeName, emoji, description, color, assignedBy, assignedDate }

// Calculate all earned badges for a trader
export const calculateBadges = (trader, monthlyRankings = {}) => {
  const badges = [];

  // Achievement badges
  Object.entries(ACHIEVEMENT_BADGES).forEach(([key, badge]) => {
    if (badge.condition(trader)) {
      badges.push({
        ...badge,
        type: BADGE_TYPES.ACHIEVEMENT,
        key
      });
    }
  });

  // Monthly badges (if trader has them in their history)
  if (monthlyRankings && Object.keys(monthlyRankings).length > 0) {
    Object.entries(monthlyRankings).forEach(([monthYear, rank]) => {
      if (rank <= 5) {
        const [month, year] = monthYear.split(' ');
        badges.push({
          ...generateMonthlyBadge(month, year, rank),
          key: `monthly-${monthYear}`
        });
      }
    });
  }

  // TODO: Streak badges (need historical data)
  // Would calculate based on monthly profit history

  return badges;
};

// Badge display component props helper
export const getBadgeClasses = (badge) => {
  return `inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${badge.color} text-white shadow-lg`;
};

// Sort badges by priority for display
export const sortBadgesByPriority = (badges) => {
  const priority = {
    [BADGE_TYPES.CUSTOM]: 1,
    [BADGE_TYPES.MONTHLY]: 2,
    [BADGE_TYPES.ACHIEVEMENT]: 3,
    [BADGE_TYPES.STREAK]: 4
  };

  return badges.sort((a, b) => {
    const priorityDiff = priority[a.type] - priority[b.type];
    if (priorityDiff !== 0) return priorityDiff;
    
    // Within same type, sort by specific rules
    if (a.type === BADGE_TYPES.ACHIEVEMENT) {
      // GOAT always first, then by condition value
      if (a.key === 'goat') return -1;
      if (b.key === 'goat') return 1;
    }
    
    return 0;
  });
};

// Example custom badge assignment (you'd call this from admin panel)
export const createCustomBadge = (traderId, badgeData) => {
  return {
    traderId,
    name: badgeData.name,
    emoji: badgeData.emoji,
    description: badgeData.description,
    color: badgeData.color || 'from-gray-500 to-gray-600',
    type: BADGE_TYPES.CUSTOM,
    assignedBy: badgeData.assignedBy || 'admin',
    assignedDate: new Date().toISOString()
  };
};

// Badge presets for easy custom assignment
export const CUSTOM_BADGE_PRESETS = {
  founder: {
    name: 'Founder',
    emoji: '🌟',
    description: 'Original member',
    color: 'bg-yellow-900/50'
  },
  verified: {
    name: 'Verified Pro',
    emoji: '✅',
    description: 'Verified professional trader',
    color: 'bg-blue-900/50'
  },
  moderator: {
    name: 'Moderator',
    emoji: '🛡️',
    description: 'Community moderator',
    color: 'bg-green-900/50'
  },
  partner: {
    name: 'Partner',
    emoji: '🤝',
    description: 'Official partner',
    color: 'bg-purple-900/50'
  },
  legend: {
    name: 'Legend',
    emoji: '⭐',
    description: 'Legendary status',
    color: 'bg-amber-900/50'
  }
};