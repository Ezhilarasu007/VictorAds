// Official Google AdMob Demo Ad Unit IDs and Format Configurations for VictorADS

export const ADMOB_UNITS = {
  APP_OPEN: {
    id: 'ca-app-pub-3940256099942544/9257395921',
    format: 'App Open',
    key: 'app_open',
    description: 'Displays when users launch or switch back to the application.',
    rewardCash: 1.00,
    rewardCoins: 10,
    badge: 'App Launch Stream'
  },
  ANCHORED_ADAPTIVE_BANNER: {
    id: 'ca-app-pub-3940256099942544/9214589741',
    format: 'Anchored Adaptive Banner',
    key: 'anchored_adaptive_banner',
    description: 'Sticky banner fixed at the screen edge (bottom/top) adapting to device width.',
    width: '100%',
    height: '50px',
    rewardCash: 0.50,
    rewardCoins: 5,
    badge: 'Sticky Banner'
  },
  INLINE_ADAPTIVE_BANNER: {
    id: 'ca-app-pub-3940256099942544/9214589741',
    format: 'Inline Adaptive Banner',
    key: 'inline_adaptive_banner',
    description: 'Embedded responsive banner placed within scrollable content feeds.',
    width: '100%',
    height: '90px',
    rewardCash: 0.75,
    rewardCoins: 8,
    badge: 'Inline Feed Banner'
  },
  FIXED_SIZE_BANNER: {
    id: 'ca-app-pub-3940256099942544/6300978111',
    format: 'Fixed Size Banner',
    key: 'fixed_size_banner',
    description: 'Standard 320x50 or 300x250 leaderboard fixed rectangular banner unit.',
    width: '320px',
    height: '50px',
    rewardCash: 0.50,
    rewardCoins: 5,
    badge: 'Standard 320x50'
  },
  INTERSTITIAL: {
    id: 'ca-app-pub-3940256099942544/1033173712',
    format: 'Interstitial',
    key: 'interstitial',
    description: 'Full-screen transition ad covering the user interface during key flow steps.',
    duration: 5,
    rewardCash: 2.50,
    rewardCoins: 25,
    badge: 'Full Screen'
  },
  REWARDED: {
    id: 'ca-app-pub-3940256099942544/5224354917',
    format: 'Rewarded Ads',
    key: 'rewarded',
    description: 'Full video ad experience where users opt-in to earn ₹3.50 + 35 Coins per view.',
    duration: 15,
    rewardCash: 3.50,
    rewardCoins: 35,
    badge: 'High Yield Stream'
  },
  REWARDED_INTERSTITIAL: {
    id: 'ca-app-pub-3940256099942544/5354046379',
    format: 'Rewarded Interstitial',
    key: 'rewarded_interstitial',
    description: 'Non-opt-in full screen interstitial giving users instant cash rewards upon completion.',
    duration: 10,
    rewardCash: 3.00,
    rewardCoins: 30,
    badge: 'Instant Reward'
  },
  NATIVE: {
    id: 'ca-app-pub-3940256099942544/2247696110',
    format: 'Native',
    key: 'native',
    description: 'Customizable ad matched seamlessly to app look & feel, headers, and buttons.',
    rewardCash: 1.50,
    rewardCoins: 15,
    badge: 'Native Card'
  },
  NATIVE_VIDEO: {
    id: 'ca-app-pub-3940256099942544/1044960115',
    format: 'Native Video',
    key: 'native_video',
    description: 'Rich media native card featuring autoplaying video assets and action CTAs.',
    rewardCash: 2.00,
    rewardCoins: 20,
    badge: 'Native Media'
  },
  PICTURE_IN_PICTURE: {
    id: 'ca-app-pub-3940256099942544/9657123429',
    format: 'Picture-in-picture',
    key: 'picture_in_picture',
    description: 'Floating PiP widget staying pinned at corner while user browses other tools.',
    rewardCash: 1.25,
    rewardCoins: 12,
    badge: 'Floating PiP'
  }
};

export function getAdMobList() {
  return Object.values(ADMOB_UNITS);
}
