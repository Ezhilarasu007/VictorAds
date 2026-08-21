'use client';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { mockDB } from '@/lib/mockDB';
import { Play, CheckCircle2, AlertTriangle, ShieldCheck, X } from 'lucide-react';

export default function AdWatchModal({ ad, onClose, onRewardClaimed }) {
  const [timeLeft, setTimeLeft] = useState(15);
  const [isCompleted, setIsCompleted] = useState(false);
  const [reported, setReported] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isCompleted) {
      setIsCompleted(true);
      // Fire celebration confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      // Record reward in DB
      mockDB.recordAdView(ad.id);
      if (onRewardClaimed) onRewardClaimed(2.50);
    }
  }, [timeLeft, isCompleted, ad.id, onRewardClaimed]);

  const handleReport = () => {
    mockDB.reportAd(ad.id);
    setReported(true);
  };

  const progressPercent = ((15 - timeLeft) / 15) * 100;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '550px' }}>
        <button
          onClick={onClose}
          disabled={!isCompleted && timeLeft > 0}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: (!isCompleted && timeLeft > 0) ? 'not-allowed' : 'pointer',
            opacity: (!isCompleted && timeLeft > 0) ? 0.4 : 1
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <div className="badge badge-cyan">
            <ShieldCheck size={14} /> Rewarded Ad Sponsor
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{ad.sponsor}</span>
        </div>

        <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '8px' }}>{ad.title}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px' }}>
          Watch full 15-second sponsor showcase to credit ₹2.50 directly to your VictorADS wallet balance.
        </p>

        {/* Video Player Frame Simulation */}
        <div style={{
          background: '#04060f',
          border: '1px solid var(--glass-border-glow)',
          borderRadius: '12px',
          height: '240px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '20px'
        }}>
          {isCompleted ? (
            <div style={{ textAlign: 'center', animation: 'fadeIn 0.3s ease' }}>
              <CheckCircle2 size={48} color="var(--neon-green)" style={{ margin: '0 auto 12px auto' }} />
              <h4 style={{ fontSize: '1.3rem', color: '#ffffff' }}>Reward Earned: +₹2.50</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Added to your wallet balance instantly.</p>
            </div>
          ) : (
            <>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(0, 242, 254, 0.15)',
                border: '1px solid var(--neon-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--neon-cyan)',
                marginBottom: '14px',
                animation: 'pulseGlow 2s infinite'
              }}>
                <Play size={28} />
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '2rem', color: '#ffffff' }}>
                00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </div>
              <div style={{ color: 'var(--neon-cyan)', fontSize: '0.8rem', marginTop: '4px' }}>
                Simulating Video Stream...
              </div>
            </>
          )}

          {/* Progress Bar */}
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
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, #00f2fe 0%, #00ff87 100%)',
              transition: 'width 1s linear'
            }} />
          </div>
        </div>

        {/* Footer Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {reported ? (
            <span style={{ fontSize: '0.8rem', color: 'var(--neon-pink)' }}>Ad Reported to Admin</span>
          ) : (
            <button
              onClick={handleReport}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-dim)',
                cursor: 'pointer',
                fontSize: '0.78rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <AlertTriangle size={14} /> Report Ad Campaign
            </button>
          )}

          {isCompleted ? (
            <button onClick={onClose} className="btn-green">
              Claim & Close
            </button>
          ) : (
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Must wait {timeLeft}s to claim
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
