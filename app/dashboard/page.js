'use client';
import { useState, useEffect } from 'react';
import { mockDB } from '@/lib/mockDB';
import BandwidthSimulator from '@/components/BandwidthSimulator';
import AdWatchModal from '@/components/AdWatchModal';
import { 
  Zap, 
  Wifi, 
  Wallet, 
  Play, 
  Coins, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [ads, setAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);

  const refreshUserData = () => {
    setUser(mockDB.getUser());
    setAds(mockDB.getAds().filter(a => a.active));
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
          <ShieldCheck size={14} /> Node Active & Verified
        </div>
        <h1 style={{ fontSize: '2.2rem', color: '#ffffff' }}>Earning Station Dashboard</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
          Monitor your wallet balance, activate your bandwidth node, and watch 15-second rewarded video ads.
        </p>
      </div>

      {/* Stats Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        {/* Wallet Balance Card */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Wallet Balance</span>
            <Coins size={20} color="var(--neon-green)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--neon-green)', fontFamily: 'var(--font-heading)' }}>
            ₹{user.balance.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '6px' }}>
            Min. Cashier Payout: ₹500.00
          </div>
        </div>

        {/* Data Shared Card */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Bandwidth Shared</span>
            <Wifi size={20} color="var(--neon-cyan)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--neon-cyan)', fontFamily: 'var(--font-heading)' }}>
            {(user.dataSharedMB / 1024).toFixed(2)} <span style={{ fontSize: '1rem', fontWeight: 400 }}>GB</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '6px' }}>
            Earned ₹{(user.dataSharedMB * 0.10).toFixed(2)} from bandwidth
          </div>
        </div>

        {/* Ads Watched Card */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Rewarded Ads Watched</span>
            <Zap size={20} color="var(--neon-pink)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--neon-pink)', fontFamily: 'var(--font-heading)' }}>
            {user.adsWatched} <span style={{ fontSize: '1rem', fontWeight: 400 }}>Ads</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '6px' }}>
            Earned ₹{(user.adsWatched * 2.50).toFixed(2)} from videos
          </div>
        </div>
      </div>

      {/* Bandwidth Sharing Node Simulator */}
      <div style={{ marginBottom: '40px' }}>
        <BandwidthSimulator onBalanceUpdated={refreshUserData} />
      </div>

      {/* Watch Rewarded Video Ads Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', color: '#ffffff' }}>Watch Rewarded Video Ads</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              Each 15-second ad view pays ₹2.50 instantly upon completion.
            </p>
          </div>
        </div>

        <div className="grid-2">
          {ads.map((ad) => (
            <div key={ad.id} className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--neon-cyan)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Sponsor: {ad.sponsor}
                </div>
                <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginTop: '4px', marginBottom: '6px' }}>
                  {ad.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <span>Duration: {ad.duration}s</span>
                  <span style={{ color: 'var(--neon-green)', fontWeight: 700 }}>Reward: +₹{ad.reward.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedAd(ad)}
                className="btn-primary"
                style={{ padding: '10px 18px', fontSize: '0.85rem' }}
              >
                <Play size={16} /> Watch Ad
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Ad Player Modal */}
      {selectedAd && (
        <AdWatchModal
          ad={selectedAd}
          onClose={() => setSelectedAd(null)}
          onRewardClaimed={() => {
            refreshUserData();
          }}
        />
      )}
    </div>
  );
}
