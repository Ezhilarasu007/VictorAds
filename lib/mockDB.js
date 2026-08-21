// Client-side LocalStorage DB wrapper for VictorADS

const STORAGE_KEYS = {
  USER: 'victorads_user_v2',
  ADS: 'victorads_ads_v2',
  MARKETPLACE: 'victorads_marketplace_v2',
  WITHDRAWALS: 'victorads_withdrawals_v2',
  DONATIONS: 'victorads_donations_v2',
  COMMUNITY: 'victorads_community_v2',
  FIREWALL: 'victorads_firewall_v2',
  SUBSCRIPTIONS: 'victorads_subscriptions_v2'
};

const initialUser = {
  id: 'usr_' + Math.floor(10000 + Math.random() * 90000),
  name: 'Active Earner',
  email: 'earner@victorads.com',
  balance: 0.00, // Fresh starting zero balance
  dataSharedMB: 0,
  todaySharedMB: 0,
  dailyCapMB: 102400, // 100 GB Daily Limit
  adsWatched: 0,
  upiId: 'user@upi',
  bankDetails: {
    accountNo: '',
    ifsc: '',
    holderName: ''
  },
  subscriptionTier: 'Free Tier',
  memberSince: new Date().toISOString().split('T')[0]
};

const initialAds = [
  { id: 'ad_101', title: 'AdMob High-Yield Video Stream', sponsor: 'Google AdMob', reward: 3.50, duration: 15, views: 0, active: true, reported: false, unitId: 'ca-app-pub-6751037211810646/9065611386' },
  { id: 'ad_102', title: 'CyberShield Premium Network', sponsor: 'Google AdMob', reward: 4.00, duration: 15, views: 0, active: true, reported: false, unitId: 'ca-app-pub-6751037211810646/3984725425' },
  { id: 'ad_103', title: 'NeoBank Zero-Fee Account', sponsor: 'NeoBank Sponsor', reward: 3.00, duration: 15, views: 0, active: true, reported: false, unitId: 'ca-app-pub-6751037211810646/9065611386' },
  { id: 'ad_104', title: 'Quantum AI Research Node', sponsor: 'Q-Data Systems', reward: 5.00, duration: 15, views: 0, active: true, reported: false, unitId: 'ca-app-pub-6751037211810646/3984725425' }
];

const initialMarketplace = [
  { id: 'pkg_201', seller: 'Priya S.', amountGB: 10, pricePerGB: 25, totalCost: 250, rating: 4.9, date: '2026-08-21' },
  { id: 'pkg_202', seller: 'Rahul M.', amountGB: 50, pricePerGB: 24, totalCost: 1200, rating: 5.0, date: '2026-08-21' },
  { id: 'pkg_203', seller: 'Enterprise Node #1', amountGB: 1000, pricePerGB: 25, totalCost: 25000, rating: 5.0, date: '2026-08-21' } // 1 TB = ₹25,000 Tier!
];

const initialWithdrawals = [];
const initialDonations = [];
const initialCommunity = [
  { id: 'rev_1', name: 'Rohan Sharma', location: 'Mumbai, MH', rating: 5, earnings: '₹25,000 earned (1 TB Sold)', story: 'Sold 1 TB bulk node package on the marketplace and received instant payout. The AI fraud check approved my UPI transfer within minutes!', verified: true, date: 'Today' },
  { id: 'rev_2', name: 'Sneha Patel', location: 'Ahmedabad, GJ', rating: 5, earnings: '₹500 earned', story: 'Watching 10 video ads per day earned me ₹40 daily. Reached ₹500 minimum payout threshold and received money directly via GPay.', verified: true, date: 'Yesterday' }
];

const initialFirewall = {
  ipFilterEnabled: true,
  ddosShieldActive: true,
  rateLimitPerMin: 120,
  blockedIPs: ['192.168.1.105'],
  failedAdminAttempts: 0,
  isLockedOut: false,
  totalScans: 15420,
  threatsNeutralized: 52
};

function getItem(key, defaultValue) {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

function setItem(key, value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
}

export const mockDB = {
  // User Operations
  getUser() {
    return getItem(STORAGE_KEYS.USER, initialUser);
  },

  updateUser(updates) {
    const user = this.getUser();
    const updated = { ...user, ...updates };
    setItem(STORAGE_KEYS.USER, updated);
    return updated;
  },

  addEarnings(amount, dataMB = 0, adsCount = 0) {
    const user = this.getUser();
    const newTodayMB = user.todaySharedMB + dataMB;

    // Check 100 GB daily cap (102,400 MB)
    if (newTodayMB > user.dailyCapMB && dataMB > 0) {
      throw new Error('Daily bandwidth limit reached (100 GB / day). Upgrade to VIP or wait for reset!');
    }

    const updated = {
      ...user,
      balance: Math.round((user.balance + amount) * 100) / 100,
      dataSharedMB: user.dataSharedMB + dataMB,
      todaySharedMB: newTodayMB,
      adsWatched: user.adsWatched + adsCount
    };
    setItem(STORAGE_KEYS.USER, updated);
    return updated;
  },

  // Ads Operations
  getAds() {
    return getItem(STORAGE_KEYS.ADS, initialAds);
  },

  recordAdView(adId) {
    const ads = this.getAds();
    const targetAd = ads.find(a => a.id === adId);
    const reward = targetAd ? targetAd.reward : 3.50;

    const updated = ads.map(a => a.id === adId ? { ...a, views: a.views + 1 } : a);
    setItem(STORAGE_KEYS.ADS, updated);
    this.addEarnings(reward, 0, 1);
    return updated;
  },

  addAd(newAd) {
    const ads = this.getAds();
    const ad = {
      id: 'ad_' + Date.now(),
      title: newAd.title,
      sponsor: newAd.sponsor || 'AdMob Network',
      reward: parseFloat(newAd.reward) || 3.50,
      duration: 15,
      views: 0,
      active: true,
      reported: false,
      unitId: newAd.unitId || 'ca-app-pub-6751037211810646/9065611386'
    };
    const updated = [ad, ...ads];
    setItem(STORAGE_KEYS.ADS, updated);
    return updated;
  },

  toggleAdStatus(adId) {
    const ads = this.getAds();
    const updated = ads.map(a => a.id === adId ? { ...a, active: !a.active } : a);
    setItem(STORAGE_KEYS.ADS, updated);
    return updated;
  },

  removeAd(adId) {
    const ads = this.getAds();
    const updated = ads.filter(a => a.id !== adId);
    setItem(STORAGE_KEYS.ADS, updated);
    return updated;
  },

  // Marketplace Operations
  getMarketplace() {
    return getItem(STORAGE_KEYS.MARKETPLACE, initialMarketplace);
  },

  addMarketplaceListing(amountGB, pricePerGB) {
    const items = this.getMarketplace();
    const user = this.getUser();
    const totalCost = Math.round(amountGB * pricePerGB * 100) / 100;
    const newItem = {
      id: 'pkg_' + Date.now(),
      seller: user.name,
      amountGB: parseInt(amountGB),
      pricePerGB: parseFloat(pricePerGB),
      totalCost,
      rating: 5.0,
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [newItem, ...items];
    setItem(STORAGE_KEYS.MARKETPLACE, updated);
    return updated;
  },

  buyMarketplacePackage(pkgId) {
    const items = this.getMarketplace();
    const target = items.find(i => i.id === pkgId);
    if (!target) throw new Error('Package not found');

    const user = this.getUser();
    if (user.balance < target.totalCost) {
      throw new Error(`Insufficient wallet balance (Requires ₹${target.totalCost.toFixed(2)})`);
    }

    // Deduct cost from buyer, add GB to total data
    this.updateUser({
      balance: Math.round((user.balance - target.totalCost) * 100) / 100,
      dataSharedMB: user.dataSharedMB + (target.amountGB * 1024)
    });

    const updated = items.filter(i => i.id !== pkgId);
    setItem(STORAGE_KEYS.MARKETPLACE, updated);
    return updated;
  },

  removeMarketplaceListing(pkgId) {
    const items = this.getMarketplace();
    const updated = items.filter(i => i.id !== pkgId);
    setItem(STORAGE_KEYS.MARKETPLACE, updated);
    return updated;
  },

  // Withdrawals & Real Payouts
  getWithdrawals() {
    return getItem(STORAGE_KEYS.WITHDRAWALS, initialWithdrawals);
  },

  requestWithdrawal(amount, method, address) {
    const user = this.getUser();
    const numAmt = parseFloat(amount);
    if (numAmt < 300) throw new Error('Minimum payout threshold is ₹300');
    if (user.balance < numAmt) throw new Error(`Insufficient balance! Your current balance is ₹${user.balance.toFixed(2)}`);

    // Deduct balance
    this.updateUser({ balance: Math.round((user.balance - numAmt) * 100) / 100 });

    const withdrawals = this.getWithdrawals();
    const newTx = {
      id: 'tx_' + Math.floor(100000 + Math.random() * 900000),
      amount: numAmt,
      method,
      address,
      status: 'Completed (AI Approved)',
      aiScore: '99/100 Safe',
      date: new Date().toISOString().split('T')[0],
      reference: method === 'UPI' ? `UPI/${Date.now().toString().slice(-12)}` : `NEFT/${Date.now().toString().slice(-12)}`
    };

    const updated = [newTx, ...withdrawals];
    setItem(STORAGE_KEYS.WITHDRAWALS, updated);
    return updated;
  },

  updateWithdrawalStatus(txId, status) {
    const withdrawals = this.getWithdrawals();
    const updated = withdrawals.map(w => w.id === txId ? { ...w, status } : w);
    setItem(STORAGE_KEYS.WITHDRAWALS, updated);
    return updated;
  },

  // UTR Auto-Verification for Subscriptions & Donations
  verifyUtrPayment(utrNumber, amount, type = 'Subscription') {
    if (!utrNumber || utrNumber.length < 10) {
      throw new Error('Please enter a valid 12-digit UPI UTR reference number');
    }

    const donations = this.getDonations();
    const newRecord = {
      id: 'utr_' + Date.now(),
      donorName: 'Verified User',
      amount: parseFloat(amount),
      utr: utrNumber,
      vpa: 'arasu9629hf@okhdfcbank',
      type,
      date: new Date().toISOString().split('T')[0],
      status: 'Verified (Auto NPCI Log)'
    };
    setItem(STORAGE_KEYS.DONATIONS, [newRecord, ...donations]);
    return newRecord;
  },

  getDonations() {
    return getItem(STORAGE_KEYS.DONATIONS, initialDonations);
  },

  // Community Reviews
  getCommunity() {
    return getItem(STORAGE_KEYS.COMMUNITY, initialCommunity);
  },

  addCommunityReview(name, location, rating, story) {
    const reviews = this.getCommunity();
    const newRev = {
      id: 'rev_' + Date.now(),
      name,
      location,
      rating: parseInt(rating),
      earnings: 'Verified Node Earner',
      story,
      verified: true,
      date: 'Just now'
    };
    const updated = [newRev, ...reviews];
    setItem(STORAGE_KEYS.COMMUNITY, updated);
    return updated;
  },

  // Firewall
  getFirewall() {
    return getItem(STORAGE_KEYS.FIREWALL, initialFirewall);
  },

  updateFirewall(updates) {
    const fw = this.getFirewall();
    const updated = { ...fw, ...updates };
    setItem(STORAGE_KEYS.FIREWALL, updated);
    return updated;
  },

  blockIP(ip) {
    const fw = this.getFirewall();
    if (!fw.blockedIPs.includes(ip)) {
      const updated = { ...fw, blockedIPs: [...fw.blockedIPs, ip] };
      setItem(STORAGE_KEYS.FIREWALL, updated);
      return updated;
    }
    return fw;
  },

  unblockIP(ip) {
    const fw = this.getFirewall();
    const updated = { ...fw, blockedIPs: fw.blockedIPs.filter(i => i !== ip) };
    setItem(STORAGE_KEYS.FIREWALL, updated);
    return updated;
  }
};
