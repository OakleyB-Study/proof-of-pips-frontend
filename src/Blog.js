import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

// Mock blog posts - you'll replace this with real data later
const blogPosts = [
  {
    id: 1,
    slug: 'getting-started-prop-trading',
    title: 'Getting Started with Prop Trading',
    excerpt: 'Everything you need to know about starting your prop trading journey in 2024.',
    content: `
# Getting Started with Prop Trading

Prop trading has exploded in popularity over the past few years. Here's what you need to know to get started...

## What is Prop Trading?

Proprietary trading, or "prop trading," is when you trade a firm's capital rather than your own. You pass an evaluation, get funded, and split the profits.

## Key Benefits

- **Limited Risk**: Only risk evaluation fees, not your entire account
- **Large Capital**: Trade with $50K, $100K, or even $200K
- **Keep Profits**: Most firms let you keep 70-90% of profits
- **No PDT Rule**: Trade as much as you want

## How to Get Started

1. Choose a reputable prop firm (see our verified leaderboard)
2. Purchase an evaluation account
3. Pass the evaluation by hitting profit targets
4. Get funded and start trading real capital
5. Withdraw your profits

Ready to see who the top prop traders are? Check out our leaderboard!
    `,
    thumbnail: '📚',
    date: '2024-11-24',
    readTime: '5 min read',
    category: 'Beginner'
  },
  {
    id: 2,
    slug: 'risk-management-essentials',
    title: 'Risk Management Essentials',
    excerpt: 'The #1 skill that separates profitable traders from everyone else.',
    content: `
# Risk Management Essentials

Risk management is THE most important skill in trading. Here's why...

## The 1% Rule

Never risk more than 1-2% of your account on a single trade. This is non-negotiable.

## Position Sizing

Calculate your position size based on:
- Account size
- Stop loss distance
- Risk percentage

Formula: Position Size = (Account Size × Risk %) / Stop Loss Distance

## Stop Losses

Always use stop losses. No exceptions. Ever.

## Win Rate vs Risk:Reward

You don't need a 90% win rate. A 40% win rate with 2:1 risk:reward is profitable.

Example:
- 10 trades at 40% win rate = 4 wins, 6 losses
- Wins: 4 × $200 = $800
- Losses: 6 × $100 = -$600
- Net: +$200

Protect your capital and the profits will follow.
    `,
    thumbnail: '⚠️',
    date: '2024-11-20',
    readTime: '4 min read',
    category: 'Strategy'
  },
  {
    id: 3,
    slug: 'auction-market-theory',
    title: 'Auction Market Theory: A Complete Guide',
    excerpt: 'Master the framework that reveals how markets truly work through supply and demand auctions.',
    content: `
# Auction Market Theory: A Complete Guide

This comprehensive two-part guide covers everything you need to know about Auction Market Theory - from foundational concepts to real-time execution strategies.

## Download the Full Guide

📥 [Download Part 1: Understanding the Framework (PDF)](/amt-part1.pdf)

📥 [Download Part 2: Real-Time Trading & Advanced Techniques (PDF)](/amt-part2.pdf)

---

Ready to put AMT into practice? Check out our verified prop trader leaderboard to see who's mastering these concepts in real markets.
    `,
    thumbnail: '📊',
    date: '2024-11-30',
    readTime: '15 min read',
    category: 'Strategy'
  },
  ,
{
  id: 5,
  slug: 'chart-patterns-complete-guide',
  title: 'The Complete Chart Patterns Guide',
  excerpt: 'Master every essential chart pattern with visual examples and trading strategies for each setup.',
  content: `
# The Complete Chart Patterns Guide

Chart patterns are the language of price action. They reveal the psychology of market participants and provide high-probability trade setups when you know how to read them. This comprehensive guide covers every pattern you need to know.

---

## Trend Continuation Patterns

These patterns signal that the current trend will likely continue after a brief consolidation.

### Ascending Triangle

\`\`\`
        Breakout ↑
           /
    ------●------  ← Resistance (flat top)
    /    /  /
   /   /  /
  /  /  /  ← Higher lows
 / /  /
●─────────────────
\`\`\`

**What It Tells You:** Buyers are getting more aggressive with each pullback, pushing lows higher while sellers consistently defend a key resistance level.

**How to Trade:**
- Entry: Breakout above resistance with volume
- Stop Loss: Below the last higher low
- Target: Measure the height of the triangle, project upward from breakout

**Psychology:** This is bulls building pressure against a ceiling. When it breaks, trapped sellers scramble to cover, fueling the rally.

---

### Descending Triangle

\`\`\`
●─────────────────
 ╲  ╲  ╲  ← Lower highs
  ╲  ╲  ╲
   ╲   ╲  ╲
    ╲────●─────  ← Support (flat bottom)
           ╲
        Breakdown ↓
\`\`\`

**What It Tells You:** Sellers are gaining control, making lower highs while buyers consistently defend a support level. Eventually, support breaks.

**How to Trade:**
- Entry: Break below support with volume
- Stop Loss: Above the last lower high
- Target: Height of triangle projected downward

**Psychology:** Bears methodically breaking down buyer conviction. The breakdown traps hopeful longs.

---

### Bull Flag

\`\`\`
         │
         │ ← Flagpole (strong move up)
         │
         ╱●╲
        ╱   ╲  ← Flag (consolidation)
       ╱     ╲
      ●───────●
           ╱
      Breakout ↑
\`\`\`

**What It Tells You:** After a strong rally (flagpole), price consolidates in a tight downward channel. This is bulls catching their breath before the next leg up.

**How to Trade:**
- Entry: Break above flag resistance
- Stop Loss: Below flag support
- Target: Length of flagpole projected from breakout

**Key Detail:** Flags should form quickly (5-20 bars) with declining volume. If consolidation takes too long, pattern loses reliability.

---

### Bear Flag

\`\`\`
      ●───────●
       ╲     ╱  ← Flag (consolidation)
        ╲   ╱
         ╲●╱
         │
         │ ← Flagpole (strong move down)
         │
      Breakdown ↓
\`\`\`

**What It Tells You:** After a sharp decline, price consolidates upward briefly. This is bears pausing before the next sell-off.

**How to Trade:**
- Entry: Break below flag support
- Stop Loss: Above flag resistance  
- Target: Length of flagpole projected from breakdown

**Warning Sign:** If the flag tilts up too steeply or volume increases during consolidation, the pattern may fail.

---

### Rising Wedge (Bearish)

\`\`\`
      ╱●  ← Higher highs (weakening)
     ╱ ╱
    ╱ ╱
   ╱ ╱  ← Higher lows (weakening)
  ╱●╱
  │
Breakdown ↓
\`\`\`

**What It Tells You:** Both highs and lows are rising, but the range is narrowing. This shows buyers losing momentum—a warning sign before reversal.

**How to Trade:**
- Entry: Break below wedge support
- Stop Loss: Above wedge high
- Target: Beginning of the wedge

**Psychology:** Bulls are exhausted. Each rally gets weaker. When support breaks, longs panic exit.

---

### Falling Wedge (Bullish)

\`\`\`
  ●╲
   ╲ ╲  ← Lower highs (weakening)
    ╲ ╲
     ╲ ╲  ← Lower lows (weakening)
      ●╲
        ╲
     Breakout ↑
\`\`\`

**What It Tells You:** Both highs and lows falling, but range narrowing. Sellers losing steam—bullish reversal incoming.

**How to Trade:**
- Entry: Break above wedge resistance
- Stop Loss: Below wedge low
- Target: Beginning of the wedge

**Key Sign:** Look for volume drying up as wedge forms, then surging on breakout.

---

## Reversal Patterns

These patterns signal the current trend is ending and a new trend is beginning.

### Head and Shoulders (Bearish)

\`\`\`
            HEAD
             ●
            ╱ ╲
   SHOULDER╱   ╲SHOULDER
       ●──╱     ╲──●
      ╱               ╲
─────●─────────────────●───── Neckline
          ╲
       Breakdown ↓
\`\`\`

**What It Tells You:** The most reliable reversal pattern. After an uptrend, buyers make one final push (head) but can't sustain. Breakdown of neckline confirms reversal.

**How to Trade:**
- Entry: Break below neckline with volume
- Stop Loss: Above right shoulder
- Target: Distance from head to neckline, projected down

**Critical:** Left and right shoulders should be roughly equal height. Head should clearly exceed both shoulders.

---

### Inverse Head and Shoulders (Bullish)

\`\`\`
─────●─────────────────●───── Neckline
      ╲               ╱
       ●──╲     ╱──●
   SHOULDER╲   ╱SHOULDER
            ╲ ╱
             ●
            HEAD
             │
       Breakout ↑
\`\`\`

**What It Tells You:** Mirror of head and shoulders. After downtrend, sellers make final push (head) but buyers take control. Neckline break confirms uptrend.

**How to Trade:**
- Entry: Break above neckline
- Stop Loss: Below right shoulder
- Target: Distance from head to neckline, projected up

**Volume Key:** Volume should increase on each successive low, showing buying pressure building.

---

### Double Top (Bearish)

\`\`\`
      ●           ●  ← Two peaks at same level
     ╱ ╲         ╱ ╲
    ╱   ╲       ╱   ╲
   ╱     ╲     ╱     ╲
  ╱       ╲●─●╱       ╲
 ╱         Support      ╲
●───────────────────────●
          ╲
       Breakdown ↓
\`\`\`

**What It Tells You:** Price tests resistance twice and fails. Buyers can't push higher—sellers take over.

**How to Trade:**
- Entry: Break below support between the peaks
- Stop Loss: Above the peaks
- Target: Height of pattern projected down

**Timing:** Second peak should form within weeks of first. If months apart, treat as separate resistance tests.

---

### Double Bottom (Bullish)

\`\`\`
●───────────────────────●
 ╲         Resistance    ╱
  ╲       ╱●─●╲       ╱
   ╲     ╱     ╲     ╱
    ╲   ╱       ╲   ╱
     ╲ ╱         ╲ ╱
      ●           ●  ← Two bottoms at same level
          │
     Breakout ↑
\`\`\`

**What It Tells You:** Price tests support twice and holds. Sellers exhausted—buyers step in strong.

**How to Trade:**
- Entry: Break above resistance between bottoms
- Stop Loss: Below the bottoms
- Target: Height of pattern projected up

**Confirmation:** Volume should be higher on second bottom (absorption) and surge on breakout.

---

### Triple Top (Bearish)

\`\`\`
    ●       ●       ●  ← Three peaks
   ╱╲      ╱╲      ╱╲
  ╱  ╲    ╱  ╲    ╱  ╲
 ╱    ●──╱    ●──╱    ╲
●─────────────────────●
          ╲
       Breakdown ↓
\`\`\`

**What It Tells You:** Three failed attempts to break resistance = extreme weakness. Major reversal.

**How to Trade:**
- Entry: Break of support after third rejection
- Stop Loss: Above highest peak
- Target: Pattern height projected down

**Rare But Powerful:** Less common than double top, but more reliable when it forms.

---

### Triple Bottom (Bullish)

\`\`\`
●─────────────────────●
 ╲    ●──╲    ●──╲    ╱
  ╲  ╱    ╲  ╱    ╲  ╱
   ╲╱      ╲╱      ╲╱
    ●       ●       ●  ← Three bottoms
          │
     Breakout ↑
\`\`\`

**What It Tells You:** Three tests of support that hold = extreme strength. Major reversal imminent.

**How to Trade:**
- Entry: Break of resistance after third bounce
- Stop Loss: Below lowest bottom
- Target: Pattern height projected up

**Psychology:** Each bounce shows more buyers willing to defend the level. Sellers give up.

---

### Rounding Bottom (Cup)

\`\`\`
●╲                    ╱●
  ╲                  ╱
   ╲                ╱
    ╲              ╱
     ●──────────●
         │
    Breakout ↑
\`\`\`

**What It Tells You:** Gradual, smooth transition from downtrend to uptrend. Shows slow but steady shift from bearish to bullish sentiment.

**How to Trade:**
- Entry: Break above resistance (rim of cup)
- Stop Loss: Mid-point of the cup
- Target: Depth of cup projected up

**Timeframe:** This is a longer-term pattern (weeks to months). Patience required.

---

### Rounding Top (Inverted Cup)

\`\`\`
     ●──────────●
    ╱              ╲
   ╱                ╲
  ╱                  ╲
●╱                    ╲●
          ╲
       Breakdown ↓
\`\`\`

**What It Tells You:** Gradual transition from uptrend to downtrend. Buying pressure slowly fades, then accelerates down.

**How to Trade:**
- Entry: Break below support
- Stop Loss: Mid-point of the dome
- Target: Height of pattern projected down

**Warning:** These form slowly. Don't jump in early—wait for the breakdown confirmation.

---

## Bilateral Patterns (Can Break Either Way)

These patterns show indecision. Price can break in either direction—your job is to trade the breakout.

### Symmetrical Triangle

\`\`\`
    ●╲        ╱●
      ╲      ╱
       ●╲  ╱●
         ╲╱
         │
    Breakout (?)
\`\`\`

**What It Tells You:** Bulls and bears fighting for control. Range tightens until one side wins explosively.

**How to Trade:**
- Entry: Whichever direction breaks first (with volume)
- Stop Loss: Opposite side of triangle
- Target: Width of triangle base projected from breakout

**Critical Rule:** Don't guess the direction. Wait for the break, then go with it.

---

### Rectangle (Range)

\`\`\`
●───────────────●  Resistance
│ ╱╲    ╱╲    ╱ │
│╱  ╲  ╱  ╲  ╱  │
●────●╲╱────●───●  Support
      │
  Breakout (?)
\`\`\`

**What It Tells You:** Price oscillates between clear support and resistance. Consolidation before the next move.

**How to Trade:**
- Inside: Fade the range (buy support, sell resistance)
- Breakout: Trade the direction of the break
- Stop Loss: Opposite side of range

**Volume:** Declining volume inside range is normal. Breakout should have strong volume.

---

### Ascending Broadening Wedge

\`\`\`
        ╱●
       ╱ ╱╲
      ╱ ╱  ╲
     ╱●╱    ╲
    ╱ ╱      ●
   ●╱
\`\`\`

**What It Tells You:** Volatility expanding, range widening. Market losing structure—dangerous and unpredictable.

**How to Trade:**
- Generally avoid trading inside
- Only trade confirmed breakout with strong volume
- Use wider stops

**Warning:** These are messy. High probability of false breakouts. Tread carefully.

---

### Descending Broadening Wedge

\`\`\`
   ●╲
    ╲ ╲      ●
     ╲●╲    ╱
      ╲ ╲  ╱
       ╲ ╲╱
        ╲●
\`\`\`

**What It Tells You:** Same as ascending version—chaos and expanding volatility.

**How to Trade:**
- Wait for clear breakout
- Confirm with volume
- Expect whipsaws

**Better Strategy:** Often better to sit out these patterns entirely. They're messy and unreliable.

---

### Diamond Pattern

\`\`\`
      ╱●╲
     ╱ ╱╲ ╲
    ╱●╱  ╲●╲
   ╱ ╱    ╲ ╲
  ●╱      ╲●
      │
  Breakout (?)
\`\`\`

**What It Tells You:** Rare pattern that combines broadening formation followed by narrowing. Shows extreme indecision before explosive move.

**How to Trade:**
- Entry: Break in either direction
- Stop Loss: Opposite side of diamond
- Target: Height of diamond projected from breakout

**Rarity:** You won't see many of these, but when you do, they can be very powerful.

---

## Advanced Patterns

### Cup and Handle

\`\`\`
●╲                 ╱●╲  Handle
  ╲               ╱   ╲╱●
   ╲             ╱      │
    ●─────────●    Breakout ↑
       Cup
\`\`\`

**What It Tells You:** After a rounding bottom (cup), price pulls back slightly (handle) before breaking out. Very bullish continuation.

**How to Trade:**
- Entry: Break above handle
- Stop Loss: Below handle low
- Target: Depth of cup projected up

**Ideal Setup:** Cup should take several weeks to form. Handle should be short (1-2 weeks) and shallow.

---

### Dead Cat Bounce

\`\`\`
●╲
  ╲
   ╲    ╱●╲  ← Weak bounce
    ╲  ╱   ╲
     ╲╱     ╲
      ●      ╲
              ●  Continued decline
\`\`\`

**What It Tells You:** After sharp decline, price bounces briefly before continuing down. It's a trap for buyers.

**How to Trade:**
- Don't trade it—it's a trap
- If shorting, wait for bounce to fail and continuation down
- Never try to "catch the falling knife"

**Warning:** Many traders lose money trying to pick bottoms. Wait for confirmed reversal.

---

### Bump and Run

\`\`\`
        ●  Run (parabolic)
       ╱│
      ╱ │  
     ╱  │ Bump
    ●───●
   ╱     ╲
  ╱       ╲  Reversal
●──────────●
\`\`\`

**What It Tells You:** Gradual uptrend (bump) followed by parabolic move (run), then sharp reversal. Classic euphoria top.

**How to Trade:**
- Don't chase the parabolic move
- Wait for reversal confirmation
- Short after breakdown with volume

**Psychology:** This is retail FOMO at its peak. Smart money exits, leaving retail holding the bag.

---

### Dragon (Momentum Continuation)

\`\`\`
        ╱●  Breakout
   ●───●    
  ╱      ← Tight consolidation
 ╱
●  ← Strong initial move
\`\`\`

**What It Tells You:** After explosive move, price consolidates tightly in small range then breaks out again. Very strong momentum.

**How to Trade:**
- Entry: Breakout from tight consolidation
- Stop Loss: Below consolidation low
- Target: Equal move to initial impulse

**Key:** Consolidation must be tight and short (3-5 bars max). The tighter, the better the continuation.

---

## Retest Patterns

After a breakout, price often returns to test the broken level. These retests provide lower-risk entries.

### Ascending Triangle Retest

\`\`\`
           ╱●  ← Entry on retest
    ------●------  
    ╱    ╱  ╱  ← Broken resistance becomes support
   ╱   ╱  ╱
  ╱  ╱  ╱
●─────────────────
\`\`\`

**How to Trade:**
- Wait for price to break resistance
- Price pulls back to test broken level
- Enter long when support holds
- Stop loss below retest low

---

### Descending Triangle Retest

\`\`\`
●─────────────────
 ╲  ╲  ╲  ← Broken support becomes resistance
  ╲  ╲  ╲
   ╲───●────── 
      ●  ← Entry on retest
       ╲
\`\`\`

**How to Trade:**
- Wait for breakdown below support
- Price rallies to test broken level
- Enter short when resistance holds
- Stop loss above retest high

---

### Falling Wedge Retest

\`\`\`
      ●──────●  ← Entry on retest
      │╲    ╱  
      │ ╲  ╱   Broken resistance
      │  ╲╱    becomes support
      ●╲
\`\`\`

**How to Trade:**
- Breakout occurs from wedge
- Price pulls back to wedge resistance (now support)
- Enter long on bounce
- Target: Height of wedge projected up

---

### Rising Wedge Retest

\`\`\`
      ╱●  Broken support
     ╱ ╱  becomes resistance
    ╱●╱
    │ ╲
    │  ●──────●  ← Entry on retest
    ╲
\`\`\`

**How to Trade:**
- Breakdown from wedge
- Price rallies to test wedge support (now resistance)
- Enter short on rejection
- Target: Beginning of wedge

---

### Symmetrical Triangle Retest (Bullish)

\`\`\`
           ╱●  ← Entry
    ●╲   ●╱  
      ╲ ╱│  Broken resistance
       ●╱   becomes support
\`\`\`

**How to Trade:**
- Upside breakout from triangle
- Pullback to apex
- Enter long on bounce
- Stop below retest low

---

### Symmetrical Triangle Retest (Bearish)

\`\`\`
       ●╲
      ╱│ ╲  Broken support
    ●╱  ●  becomes resistance
    │   ╲●  ← Entry
    ╲
\`\`\`

**How to Trade:**
- Downside breakdown from triangle
- Rally to apex
- Enter short on rejection
- Stop above retest high

---

### Bullish Flag Retest

\`\`\`
         │
         │  Flagpole
         ●───●  ← Broken resistance
        ╱    │    becomes support
       ╱     ●  ← Entry on retest
      ●      │
          Continuation ↑
\`\`\`

**How to Trade:**
- Flag breaks to upside
- Price tests flag high
- Enter on bounce
- Target: Flagpole height

---

### Bearish Flag Retest

\`\`\`
      ●      │
       ╲     ●  ← Entry on retest
        ╲    │    Broken support
         ●───●    becomes resistance
         │
         │  Flagpole
      Continuation ↓
\`\`\`

**How to Trade:**
- Flag breaks to downside
- Price tests flag low
- Enter on rejection
- Target: Flagpole height

---

## Key Principles for All Patterns

**Volume Confirmation:**
- Breakouts need volume. Low volume breakouts often fail.
- Consolidation should have declining volume (coiling)
- Reversal patterns need volume surge on confirmation

**Timeframe Matters:**
- Patterns on daily charts more reliable than 5-minute charts
- Longer patterns = bigger moves
- Don't mix timeframes (pattern on 1H chart = 1H targets)

**Context Is King:**
- Bullish patterns work best in uptrends
- Bearish patterns work best in downtrends
- Bilateral patterns best at major turning points

**Risk Management:**
- Never risk more than 2% of account on any trade
- Patterns provide clear stop loss levels—use them
- If pattern fails, exit immediately

**False Breakouts:**
- First breakout often fails (stop hunt)
- Wait for retest when possible
- Close above/below pattern more reliable than wick

**Practice Makes Perfect:**
- Mark patterns on your charts every day
- Track success rate by pattern type
- Journal every pattern trade (setup, execution, result)

---

## Your Pattern Trading Roadmap

**Week 1-2:** Master the three most reliable patterns:
1. Bull/Bear Flags
2. Head and Shoulders
3. Ascending/Descending Triangles

**Week 3-4:** Add continuation patterns:
- Rising/Falling Wedges
- Rectangles

**Month 2:** Study reversal patterns:
- Double/Triple Tops and Bottoms
- Rounding patterns

**Month 3+:** Advanced patterns and combinations
- Pattern confluence (multiple patterns confirming)
- Multi-timeframe pattern analysis

The market is always telling you where it wants to go. Chart patterns are how you learn to listen. Master these, and you'll never be guessing again.
  `,
  thumbnail: '📈',
  date: '2024-11-30',
  readTime: '25 min read',
  category: 'Education'
},
  {
    id: 4,
    slug: 'choosing-the-right-prop-firm',
    title: 'Choosing the Right Prop Firm',
    excerpt: 'Not all prop firms are created equal. Here\'s how to choose wisely.',
    content: `
# Choosing the Right Prop Firm

With 100+ prop firms out there, how do you choose? Here's my framework...

## Red Flags to Avoid

- Firms with no verified payouts
- Unrealistic profit targets
- Hidden fees and rules
- Poor customer support
- No social proof

## What to Look For

- **Verified Payouts**: Check our leaderboard for real trader earnings
- **Reasonable Rules**: Max loss limits, profit targets, trading days
- **Multiple Platforms**: Should offer various platforms (MT4, MT5, cTrader, etc.)
- **Good Support**: Fast response times, active community

## Top Firms (Based on Our Data)

Check out our verified leaderboard to see which firms have the most successful traders. The data doesn't lie!

## Platform Matters

- **Futures**: Topstep, Apex, TradeDay
- **Forex**: FTMO, MyForexFunds, The5ers
- **Multiple Markets**: Choose firms offering both

Do your research, start small, and scale up once you're consistently profitable.
    `,
    thumbnail: '🎯',
    date: '2024-11-15',
    readTime: '6 min read',
    category: 'Education'
  }
];

// Blog Listing Page
const BlogListing = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Beginner', 'Strategy', 'Education'];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-neutral-950 border-b border-yellow-600/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center text-xl">
              📊
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#C5A028] bg-clip-text text-transparent">
                Proof of Pips
              </h1>
              <p className="text-[#D4AF37] text-xs font-medium">Education</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg flex items-center gap-2 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Leaderboard
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trading Education
          </h1>
          <p className="text-gray-400 text-lg">
            Learn from verified prop traders and level up your trading game
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black'
                  : 'bg-neutral-800 text-white hover:bg-neutral-700'
              }`}
            >
              {cat === 'all' ? 'All Posts' : cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <div
              key={post.id}
              onClick={() => navigate(`/blog/${post.slug}`)}
              className="bg-neutral-900 border border-yellow-600/20 rounded-xl overflow-hidden hover:border-yellow-500/50 transition-all cursor-pointer group"
            >
              {/* Thumbnail */}
              <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 h-48 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                {post.thumbnail}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 text-xs font-semibold rounded">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Individual Blog Post Page
const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <button
            onClick={() => navigate('/blog')}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-neutral-950 border-b border-yellow-600/20 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Blog</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-sm transition-colors"
          >
            View Leaderboard
          </button>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 text-sm font-semibold rounded">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-gray-400">
            {post.excerpt}
          </p>
        </div>

        {/* Thumbnail */}
        <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-xl h-64 flex items-center justify-center text-8xl mb-12 border border-yellow-600/20">
          {post.thumbnail}
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-yellow max-w-none">
          <div className="text-gray-300 leading-relaxed space-y-6 blog-content">
            {post.content.split('\n').map((line, idx) => {
              if (line.startsWith('# ')) {
                return <h1 key={idx} className="text-3xl font-bold text-white mt-8 mb-4">{line.substring(2)}</h1>;
              } else if (line.startsWith('## ')) {
                return <h2 key={idx} className="text-2xl font-bold text-white mt-6 mb-3">{line.substring(3)}</h2>;
              } else if (line.startsWith('- ')) {
                return <li key={idx} className="text-gray-300 ml-6">{line.substring(2)}</li>;
              } else if (line.trim() === '') {
                return <br key={idx} />;
              } else {
                return <p key={idx} className="text-gray-300 text-lg">{line}</p>;
              }
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 p-6 bg-gradient-to-r from-yellow-900/20 to-amber-900/20 border border-yellow-600/30 rounded-xl">
          <h3 className="text-2xl font-bold text-white mb-2">Ready to Start Trading?</h3>
          <p className="text-gray-400 mb-4">
            Check out our verified leaderboard to see which prop firms have the most successful traders.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold rounded-lg transition-all"
          >
            View Leaderboard
          </button>
        </div>
      </article>
    </div>
  );
};

export { BlogListing, BlogPost, blogPosts };