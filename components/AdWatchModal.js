'use client';
import { useState, useEffect } from 'react';
import { mockDB } from '@/lib/mockDB';
import { Play, CheckCircle2, AlertTriangle, ShieldCheck, X, Tv } from 'lucide-react';

export default function AdWatchModal({ ad, onClose, onRewardClaimed }) {
  const [timeLeft, setTimeLeft] = useState(15);
  const [completed, setCompleted] = useState(false);
  const [reported, setReported] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCompleted(true);
    }
  }, [timeLeft]);

  const handleClaim = () => {
    try {
      mockDB.recordAdView(ad.id);
      if (onRewardClaimed) onRewardClaimed();
      onClose();
    } catch (err) {
      alert(err.message || 'Failed to credit ad rewards.');
    }
  };

  const handleReport = () => {
    setReported(true);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '540px' }}>
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div className="badge badge-green">
            <Tv size={14} /> MyV3 / AdMob Rewarded Ad Stream
          </div>
          <button
            onClick={onClose}
            disabled={!completed}
            style={{
              background: 'transparent',
              border: 'none',
              color: completed ? 'var(--text-main)' : 'var(--text-dim)',
              cursor: completed ? 'pointer' : 'not-allowed'
            }}
          >
            <X size={20} />
          </button>
        </div>

        <h2 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '4px' }}>{ad.title}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
          Sponsor: {ad.sponsor} | Unit ID: <code>{ad.unitId}</code>
        </p>

        {/* Video Canvas Simulation Container */}
        <div style={{
          background: '#030712',
          border: '1px solid var(--glass-border-glow)',
          borderRadius: '16px',
          height: '240px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '20px'
        }}>
          {completed ? (
            <div style={{ textAlign: 'center', animation: 'fadeIn 0.3s ease' }}>
              <CheckCircle2 size={54} color="var(--emerald-primary)" style={{ margin: '0 auto 12px auto' }} />
              <h3 style={{ fontSize: '1.4rem', color: '#ffffff' }}>Ad Completed!</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
                Reward: ₹3.50 Cash + 35 VictorCoins (70% Earner Share)
              </p>
              <p style={{ color: 'var(--gold-accent)', fontSize: '0.78rem', marginTop: '2px' }}>
                ₹1.50 (30%) routed to Admin Survival Vault
              </p>
            </div>
          ) : (
            <>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid var(--emerald-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--emerald-primary)',
                marginBottom: '14px',
                animation: 'pulse 1.5s infinite'
              }}>
                <Play size={32} />
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '2.4rem', color: '#ffffff' }}>
                00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </div>
              <div style={{ color: 'var(--emerald-primary)', fontSize: '0.82rem', marginTop: '4px' }}>
                Watching Sponsor Video... Do not close window.
              </div>
            </>
          )}

          {/* Progress Bar at bottom */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '6px',
            background: 'rgba(255,255,255,0.1)'
          }}>
            <div style={{
              height: '100%',
              width: `${((15 - timeLeft) / 15) * 100}%`,
              background: 'linear-gradient(90deg, #10b981 0%, #06b6d4 100%)',
              transition: 'width 1s linear'
            }} />
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={handleReport}
            disabled={reported}
            style={{
              background: 'transparent',
              border: 'none',
              color: reported ? 'var(--text-dim)' : '#ff4d4d',
              fontSize: '0.78rem',
              cursor: reported ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <AlertTriangle size={14} />
            {reported ? 'Ad Reported to AdSense Policy Team' : 'Report Fraudulent Ad'}
          </button>

          {completed ? (
            <button onClick={handleClaim} className="btn-primary" style={{ padding: '10px 24px' }}>
              Claim ₹3.50 + 35 Coins
            </button>
          ) : (
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              Wait {timeLeft}s to Claim
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
