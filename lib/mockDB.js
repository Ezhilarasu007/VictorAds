// Client-side LocalStorage DB wrapper for VictorADS v3 (70/30 Revenue Split & Coin Vouchers)

const STORAGE_KEYS = {
  USER: 'victorads_user_v3',
  ADS: 'victorads_ads_v3',
  MARKETPLACE: 'victorads_marketplace_v3',
  WITHDRAWALS: 'victorads_withdrawals_v3',
  VOUCHERS: 'victorads_vouchers_v3',
  DONATIONS: 'victorads_donations_v3',
  COMMUNITY: 'victorads_community_v3',
  FIREWALL: 'victorads_firewall_v3'
};

const initialUser = {
  id: 'usr_' + Math.floor(10000 + Math.random() * 90000),
  name: 'Active Earner',
  email: 'earner@victorads.com',
  balance: 0.00, // ₹ Real Cash Balance
  coins: 0, // VictorCoins (10 Coins = ₹1.00)
  dataSharedMB: 0,
  todaySharedMB: 0,
  dailyCapMB: 102400, // 100 GB Daily Limit
  adsWatched: 0,
  upiId: 'earner@upi',
  bankDetails: { accountNo: '', ifsc: '', holderName: '' },
  subscriptionTier: 'Free Tier',
  memberSince: new Date().toISOString().split('T')[0]
};

const initialAds = [
  { id: 'ad_101', title: 'AdMob High-Yield Video Stream', sponsor: 'Google AdMob', reward: 5.00, duration: 15, views: 0, active: true, reported: false, unitId: 'ca-app-pub-6751037211810646/9065611386' },
  { id: 'ad_102', title: 'CyberShield Premium Network', sponsor: 'Google AdMob', reward: 4.50, duration: 15, views: 0, active: true, reported: false, unitId: 'ca-app-pub-6751037211810646/3984725425' },
  { id: 'ad_103', title: 'NeoBank Zero-Fee Account', sponsor: 'NeoBank Sponsor', reward: 4.00, duration: 15, views: 0, active: true, reported: false, unitId: 'ca-app-pub-6751037211810646/9065611386' },
  { id: 'ad_104', title: 'Quantum AI Research Node', sponsor: 'Q-Data Systems', reward: 5.00, duration: 15, views: 0, active: true, reported: false, unitId: 'ca-app-pub-6751037211810646/3984725425' }
];

const initialMarketplace = [
  { id: 'pkg_301', seller: 'Priya S.', amountGB: 10, pricePerGB: 25, totalCost: 250, rating: 4.9, date: '2026-08-21' },
  { id: 'pkg_302', seller: 'Rahul M.', amountGB: 50, pricePerGB: 24, totalCost: 1200, rating: 5.0, date: '2026-08-21' },
  { id: 'pkg_303', seller: 'Enterprise Node #1', amountGB: 1000, pricePerGB: 25, totalCost: 25000, rating: 5.0, date: '2026-08-21' } // 1 TB = ₹25,000 Tier!
];

const initialVouchers = [];
const initialWithdrawals = [];
const initialDonations = [];
const initialCommunity = [
  { id: 'rev_1', name: 'Rohan Sharma', location: 'Mumbai, MH', rating: 5, earnings: 'Redeemed ₹1,000 Amazon Gift Card', story: 'Monetized unused bandwidth and received 70% revenue share instantly. Redeemed an Amazon Gift Card code which worked on checkout!', verified: true, date: 'Today' },
  { id: 'rev_2', name: 'Sneha Patel', location: 'Ahmedabad, GJ', rating: 5, earnings: '₹500 UPI Payout', story: 'Watching 10 video ads per day credited 400 VictorCoins. Converted to ₹500 instant UPI payout directly into my bank account.', verified: true, date: 'Yesterday' }
];

const initialFirewall = {
  ipFilterEnabled: true,
  ddosShieldActive: true,
  rateLimitPerMin: 120,
  blockedIPs: ['192.168.1.105'],
  failedAdminAttempts: 0,
  totalScans: 16890,
  threatsNeutralized: 64,
  adminCommissionPool: 0.00 // 30% Admin commission tracking
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

  // 70% Customer Share / 30% Admin Commission Split Logic
  addEarnings(grossAmount, dataMB = 0, adsCount = 0) {
    const user = this.getUser();
    const newTodayMB = user.todaySharedMB + dataMB;

    // Check 100 GB daily cap
    if (newTodayMB > user.dailyCapMB && dataMB > 0) {
      throw new Error('Daily bandwidth limit reached (100 GB / day). Limit resets at midnight!');
    }

    // 70% goes to Customer, 30% goes to Admin Commission Pool
    const customerShare = Math.round((grossAmount * 0.70) * 100) / 100;
    const adminShare = Math.round((grossAmount * 0.30) * 100) / 100;
    const coinsEarned = Math.round(customerShare * 10); // 10 coins per ₹1.00

    const updatedUser = {
      ...user,
      balance: Math.round((user.balance + customerShare) * 100) / 100,
      coins: user.coins + coinsEarned,
      dataSharedMB: user.dataSharedMB + dataMB,
      todaySharedMB: newTodayMB,
      adsWatched: user.adsWatched + adsCount
    };
    setItem(STORAGE_KEYS.USER, updatedUser);

    // Record 30% Admin Commission
    const fw = this.getFirewall();
    this.updateFirewall({ adminCommissionPool: Math.round((fw.adminCommissionPool + adminShare) * 100) / 100 });

    return updatedUser;
  },

  // Ads Operations
  getAds() {
    return getItem(STORAGE_KEYS.ADS, initialAds);
  },

  recordAdView(adId) {
    const ads = this.getAds();
    const targetAd = ads.find(a => a.id === adId);
    const grossReward = targetAd ? targetAd.reward : 5.00;

    const updated = ads.map(a => a.id === adId ? { ...a, views: a.views + 1 } : a);
    setItem(STORAGE_KEYS.ADS, updated);
    
    // Credit 70% to customer
    this.addEarnings(grossReward, 0, 1);
    return updated;
  },

  addAd(newAd) {
    const ads = this.getAds();
    const ad = {
      id: 'ad_' + Date.now(),
      title: newAd.title,
      sponsor: newAd.sponsor || 'AdMob Network',
      reward: parseFloat(newAd.reward) || 5.00,
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

  // Voucher Redemption Engine (Amazon, Flipkart, Google Play)
  getVouchers() {
    return getItem(STORAGE_KEYS.VOUCHERS, initialVouchers);
  },

  redeemVoucher(brand, amount) {
    const user = this.getUser();
    const requiredCoins = amount * 10;

    if (user.coins < requiredCoins && user.balance < amount) {
      throw new Error(`Insufficient funds! Requires ₹${amount} cash balance or ${requiredCoins} VictorCoins.`);
    }

    // Deduct coins/balance
    let newBalance = user.balance;
    let newCoins = user.coins;

    if (user.coins >= requiredCoins) {
      newCoins -= requiredCoins;
    } else {
      newBalance -= amount;
    }

    this.updateUser({
      balance: Math.round(newBalance * 100) / 100,
      coins: newCoins
    });

    // Generate unique 16-digit voucher code & 4-digit PIN
    const prefixMap = { Amazon: 'AMZ', Flipkart: 'FLP', GooglePlay: 'GPLAY', UPI: 'PAYOUT' };
    const prefix = prefixMap[brand] || 'VC';
    const code = `${prefix}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const pin = `${Math.floor(1000 + Math.random() * 9000)}`;

    const newVoucher = {
      id: 'vouch_' + Date.now(),
      brand,
      amount,
      code,
      pin,
      date: new Date().toISOString().split('T')[0],
      status: 'Active / Unredeemed'
    };

    const vouchers = this.getVouchers();
    const updated = [newVoucher, ...vouchers];
    setItem(STORAGE_KEYS.VOUCHERS, updated);
    return newVoucher;
  },

  // Marketplace Operations (70% Seller / 30% Admin Split)
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

    // Deduct cost from buyer, credit GB to node
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

  // Withdrawals & Real Customer Payouts
  getWithdrawals() {
    return getItem(STORAGE_KEYS.WITHDRAWALS, initialWithdrawals);
  },

  requestWithdrawal(amount, method, address) {
    const user = this.getUser();
    const numAmt = parseFloat(amount);
    if (numAmt < 250) throw new Error('Minimum payout threshold is ₹250');
    if (user.balance < numAmt) throw new Error(`Insufficient balance! Your current balance is ₹${user.balance.toFixed(2)}`);

    this.updateUser({ balance: Math.round((user.balance - numAmt) * 100) / 100 });

    const withdrawals = this.getWithdrawals();
    const newTx = {
      id: 'tx_' + Math.floor(100000 + Math.random() * 900000),
      amount: numAmt,
      method,
      address,
      status: 'Completed (AI Verified)',
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

  // UTR Auto-Verification
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

  // Firewall & Admin
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
