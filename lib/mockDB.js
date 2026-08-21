// Client-side LocalStorage DB wrapper for VictorADS

const STORAGE_KEYS = {
  USER: 'victorads_user_v1',
  ADS: 'victorads_ads_v1',
  MARKETPLACE: 'victorads_marketplace_v1',
  WITHDRAWALS: 'victorads_withdrawals_v1',
  DONATIONS: 'victorads_donations_v1',
  COMMUNITY: 'victorads_community_v1',
  ADMIN_LOGS: 'victorads_admin_logs_v1',
  FIREWALL: 'victorads_firewall_v1'
};

const initialUser = {
  id: 'usr_89201',
  name: 'Alex Vance',
  email: 'alex.vance@example.com',
  balance: 642.50, // ₹
  dataSharedMB: 3420, // 3.42 GB
  adsWatched: 84,
  upiId: 'alexvance@upi',
  bankDetails: {
    accountNo: 'xxxx-xxxx-4921',
    ifsc: 'HDFC0001234',
    holderName: 'Alex Vance'
  },
  subscriptionTier: 'Free Tier',
  memberSince: '2026-01-15'
};

const initialAds = [
  { id: 'ad_1', title: 'TechCloud High-Speed CDN', sponsor: 'AdMob Unit (ca-app-pub-6751037211810646/9065611386)', reward: 2.50, duration: 15, views: 1420, active: true, reported: false, unitId: 'ca-app-pub-6751037211810646/9065611386' },
  { id: 'ad_2', title: 'CyberShield VPN Security', sponsor: 'AdMob Unit (ca-app-pub-6751037211810646/3984725425)', reward: 2.50, duration: 15, views: 2310, active: true, reported: false, unitId: 'ca-app-pub-6751037211810646/3984725425' },
  { id: 'ad_3', title: 'NeoBank Zero-Fee Account', sponsor: 'NeoBank Sponsor', reward: 2.50, duration: 15, views: 950, active: true, reported: false, unitId: 'ca-app-pub-6751037211810646/9065611386' },
  { id: 'ad_4', title: 'Quantum AI Analytics', sponsor: 'Q-Data Systems', reward: 2.50, duration: 15, views: 3100, active: true, reported: false, unitId: 'ca-app-pub-6751037211810646/3984725425' }
];

const initialMarketplace = [
  { id: 'pkg_101', seller: 'Priya S.', amountMB: 1000, pricePerMB: 0.15, totalCost: 150, rating: 4.9, date: '2026-08-20' },
  { id: 'pkg_102', seller: 'Rahul M.', amountMB: 5000, pricePerMB: 0.14, totalCost: 700, rating: 5.0, date: '2026-08-21' },
  { id: 'pkg_103', seller: 'Karan K.', amountMB: 2500, pricePerMB: 0.15, totalCost: 375, rating: 4.8, date: '2026-08-21' },
  { id: 'pkg_104', seller: 'Vikram B.', amountMB: 10000, pricePerMB: 0.12, totalCost: 1200, rating: 4.95, date: '2026-08-19' }
];

const initialWithdrawals = [
  { id: 'tx_981', amount: 550, method: 'UPI', address: 'alexvance@upi', status: 'Completed', date: '2026-08-10', reference: 'UPI/619283749102' },
  { id: 'tx_982', amount: 720, method: 'Bank Transfer', address: 'HDFC0001234', status: 'Completed', date: '2026-08-18', reference: 'NEFT/881920391823' }
];

const initialDonations = [
  { id: 'don_01', donorName: 'Community Supporter', amount: 500, utr: '619284739210', vpa: 'arasu9629hf@okhdfcbank', date: '2026-08-15', status: 'Verified' },
  { id: 'don_02', donorName: 'Dev Patron', amount: 1000, utr: '729103847291', vpa: 'arasu9629hf@okhdfcbank', date: '2026-08-19', status: 'Verified' }
];

const initialCommunity = [
  { id: 'rev_1', name: 'Rohan Sharma', location: 'Mumbai, MH', rating: 5, earnings: '₹12,400 earned', story: 'VictorADS helped me monetize my unused fiber connection smoothly. Payouts via UPI are instantaneous once reaching ₹500!', verified: true, date: '2 days ago' },
  { id: 'rev_2', name: 'Sneha Patel', location: 'Ahmedabad, GJ', rating: 5, earnings: '₹8,950 earned', story: 'The data marketplace is fantastic. I buy extra bandwidth packets at wholesale rates for my development testing servers.', verified: true, date: '5 days ago' },
  { id: 'rev_3', name: 'David Miller', location: 'Bengaluru, KA', rating: 5, earnings: '₹15,100 earned', story: 'Watching 15-second ads while sipping coffee earns ₹2.50 per view consistently. Clean dark UI and transparent analytics.', verified: true, date: '1 week ago' }
];

const initialFirewall = {
  ipFilterEnabled: true,
  ddosShieldActive: true,
  rateLimitPerMin: 120,
  blockedIPs: ['192.168.1.105', '45.132.1.88'],
  failedAdminAttempts: 0,
  isLockedOut: false,
  lockoutExpiry: null,
  totalScans: 14209,
  threatsNeutralized: 43
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
    const updated = {
      ...user,
      balance: Math.round((user.balance + amount) * 100) / 100,
      dataSharedMB: user.dataSharedMB + dataMB,
      adsWatched: user.adsWatched + adsCount
    };
    setItem(STORAGE_KEYS.USER, updated);
    return updated;
  },

  // Ads Operations
  getAds() {
    return getItem(STORAGE_KEYS.ADS, initialAds);
  },

  addAd(newAd) {
    const ads = this.getAds();
    const ad = {
      id: 'ad_' + Date.now(),
      title: newAd.title,
      sponsor: newAd.sponsor,
      reward: parseFloat(newAd.reward) || 2.50,
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

  reportAd(adId) {
    const ads = this.getAds();
    const updated = ads.map(a => a.id === adId ? { ...a, reported: true } : a);
    setItem(STORAGE_KEYS.ADS, updated);
    return updated;
  },

  removeAd(adId) {
    const ads = this.getAds();
    const updated = ads.filter(a => a.id !== adId);
    setItem(STORAGE_KEYS.ADS, updated);
    return updated;
  },

  recordAdView(adId) {
    const ads = this.getAds();
    const updated = ads.map(a => a.id === adId ? { ...a, views: a.views + 1 } : a);
    this.addEarnings(2.50, 0, 1);
    return updated;
  },

  // Marketplace Operations
  getMarketplace() {
    return getItem(STORAGE_KEYS.MARKETPLACE, initialMarketplace);
  },

  addMarketplaceListing(amountMB, pricePerMB) {
    const items = this.getMarketplace();
    const user = this.getUser();
    const totalCost = Math.round(amountMB * pricePerMB * 100) / 100;
    const newItem = {
      id: 'pkg_' + Date.now(),
      seller: user.name,
      amountMB: parseInt(amountMB),
      pricePerMB: parseFloat(pricePerMB),
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
      throw new Error('Insufficient balance in wallet');
    }

    // Deduct total cost from buyer, add data MB
    this.updateUser({
      balance: Math.round((user.balance - target.totalCost) * 100) / 100,
      dataSharedMB: user.dataSharedMB + target.amountMB
    });

    // Remove bought listing
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

  // Withdrawals / Cashier
  getWithdrawals() {
    return getItem(STORAGE_KEYS.WITHDRAWALS, initialWithdrawals);
  },

  requestWithdrawal(amount, method, address) {
    const user = this.getUser();
    if (amount < 500) throw new Error('Minimum withdrawal limit is ₹500');
    if (user.balance < amount) throw new Error('Insufficient balance');

    // Deduct balance
    this.updateUser({ balance: Math.round((user.balance - amount) * 100) / 100 });

    const withdrawals = this.getWithdrawals();
    const newTx = {
      id: 'tx_' + Math.floor(100 + Math.random() * 900),
      amount: parseFloat(amount),
      method,
      address,
      status: 'Pending Verification',
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

  // Donations
  getDonations() {
    return getItem(STORAGE_KEYS.DONATIONS, initialDonations);
  },

  submitDonation(donorName, amount, utr) {
    if (!utr || utr.length < 10) throw new Error('Valid 12-digit UTR reference required');
    const donations = this.getDonations();
    const newDon = {
      id: 'don_' + Date.now(),
      donorName: donorName || 'Anonymous Supporter',
      amount: parseFloat(amount),
      utr,
      vpa: 'arasu9629hf@okhdfcbank',
      date: new Date().toISOString().split('T')[0],
      status: 'Pending Verification'
    };
    const updated = [newDon, ...donations];
    setItem(STORAGE_KEYS.DONATIONS, updated);
    return updated;
  },

  verifyDonation(donId) {
    const donations = this.getDonations();
    const updated = donations.map(d => d.id === donId ? { ...d, status: 'Verified' } : d);
    setItem(STORAGE_KEYS.DONATIONS, updated);
    return updated;
  },

  // Community
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
      earnings: 'Verified Member',
      story,
      verified: true,
      date: 'Just now'
    };
    const updated = [newRev, ...reviews];
    setItem(STORAGE_KEYS.COMMUNITY, updated);
    return updated;
  },

  // Firewall & Admin Security
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
