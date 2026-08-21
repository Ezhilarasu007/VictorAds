'use client';
import { useState, useEffect } from 'react';
import { mockDB } from '@/lib/mockDB';
import BandwidthSimulator from '@/components/BandwidthSimulator';
import AdWatchModal from '@/components/AdWatchModal';
import Link from 'next/link';
import { 
  Tv, 
  Wallet, 
  Coins, 
  Zap, 
  Wifi, 
  Gift, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Play,
  Layers
} from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [ads, setAds] = useState([]);
  const [activeAd, setActiveAd] = useState(null);

  const refreshUserData = () => {
    setUser(mockDB.getUser());
    setAds(mockDB.getAds());
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  if (!user) return <div style={{ padding: '60px', color: '#ffffff' }}>Loading Earning Station...</div>;

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      {/* Header Banner */}
      <div style={{ marginBottom: '32px' }}>
        <div className="badge badge-green" style={{ marginBottom: '8px' }}>
          <Zap size={14} /> MyV3 & MoneyGain Earning Console
        </div>
        <h1 style={{ fontSize: '2.2rem', color: '#ffffff' }}>User Earning Station</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
          Watch rewarded sponsor ads and share bandwidth. Earn 70% revenue share deposited instantly into your wallet!
        </p>
      </div>

      {/* Wallet Balance Summary Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {/* Card 1: Cash Balance */}
        <div className="glass-card" style={{ padding: '24px', border: '1px solid var(--emerald-primary)' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyBetween: 'space-between' }}>
            <span>Wallet Cash Balance</span>
            <Wallet size={16} color="var(--emerald-primary)" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--emerald-primary)', fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
            ₹{user.balance.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '4px' }}>
            Available for 24/7 Instant Payout
          </div>
        </div>

        {/* Card 2: VictorCoins */}
        <div className="glass-card" style={{ padding: '24px', border: '1px solid var(--gold-accent)' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyBetween: 'space-between' }}>
            <span>VictorCoins Inventory</span>
            <Coins size={16} color="var(--gold-accent)" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--gold-accent)', fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
            {user.coins} <span style={{ fontSize: '1rem', fontWeight: 400 }}>Coins</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '4px' }}>
            Value: ₹{(user.coins / 10).toFixed(2)} (Redeem Vouchers)
          </div>
        </div>

        {/* Card 3: Total Ads Watched */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyBetween: 'space-between' }}>
            <span>Ads Watched</span>
            <Tv size={16} color="var(--cyan-accent)" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
            {user.adsWatched} <span style={{ fontSize: '1rem', fontWeight: 400 }}>Videos</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '4px' }}>
            Earned ₹{(user.adsWatched * 3.5).toFixed(2)}
          </div>
        </div>
      </div>

      {/* Real Network Bandwidth Engine Component */}
      <div style={{ marginBottom: '40px' }}>
        <BandwidthSimulator onBalanceUpdated={refreshUserData} />
      </div>

      {/* MyV3 / MoneyGain Rewarded Sponsor Video Ads Grid */}
      <div className="glass-card" style={{ padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <div className="badge badge-gold" style={{ marginBottom: '6px' }}>MyV3 Video Stream</div>
            <h2 style={{ fontSize: '1.5rem', color: '#ffffff' }}>Watch Rewarded Sponsor Ads</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              Watch 15-second sponsor video ads. Earn ₹3.50 Cash + 35 VictorCoins per view (70% Share)!
            </p>
          </div>

          <Link href="/vouchers" className="btn-green" style={{ fontSize: '0.88rem' }}>
            <Gift size={16} /> Redeem Vouchers
          </Link>
        </div>

        <div className="grid-2">
          {ads.filter(a => a.active).map(ad => (
            <div key={ad.id} className="glass-card glass-card-interactive" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span className="badge badge-green" style={{ fontSize: '0.68rem' }}>₹{ad.reward.toFixed(2)} Gross</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Length: 15s</span>
                </div>
                <h3 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '6px' }}>{ad.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Sponsor: {ad.sponsor} | Unit: {ad.unitId}
                </p>
              </div>

              <button onClick={() => setActiveAd(ad)} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem' }}>
                <Play size={16} /> Watch Ad & Earn ₹3.50 + 35 Coins
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Ad Watch Modal */}
      {activeAd && (
        <AdWatchModal
          ad={activeAd}
          onClose={() => setActiveAd(null)}
          onRewardClaimed={refreshUserData}
        />
      )}
    </div>
  );
}
