'use client';

import { useState, useEffect } from 'react';
import { ADMOB_UNITS } from '@/lib/admobConfig';
import { mockDB } from '@/lib/mockDB';
import {
  Tv,
  X,
  Play,
  CheckCircle2,
  ExternalLink,
  Maximize2,
  Minimize2,
  Volume2,
  Sparkles,
  Info,
  ShieldCheck,
  Zap,
  Layout
} from 'lucide-react';

/**
 * 1. App Open Ad Component
 * Unit ID: ca-app-pub-3940256099942544/9257395921
 */
export function AdMobAppOpenModal({ onClose, onReward }) {
  const [timeLeft, setTimeLeft] = useState(ADMOB_UNITS.APP_OPEN.duration || 5);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setCompleted(true);
    }
  }, [timeLeft]);

  const handleClaim = () => {
    try {
      mockDB.addEarnings(ADMOB_UNITS.APP_OPEN.rewardCash, 0, 1);
      if (onReward) onReward();
      onClose();
    } catch (e) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 9999 }}>
      <div className="modal-content" style={{ maxWidth: '480px', border: '2px solid var(--emerald-primary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span className="badge badge-green">
            <Sparkles size={12} /> Google AdMob Demo: App Open Ad
          </span>
          {completed && (
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          )}
        </div>

        <div style={{ background: '#0b0f19', padding: '20px', borderRadius: '12px', textAlign: 'center', marginBottom: '16px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px' }}>
            Unit ID: <code>{ADMOB_UNITS.APP_OPEN.id}</code>
          </div>
          <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '8px' }}>Welcome back to VictorADS!</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '16px' }}>
            Sponsored by Google AdMob Launch Network
          </p>

          <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '10px', border: '1px dashed var(--emerald-primary)' }}>
            {completed ? (
              <div style={{ color: 'var(--emerald-primary)', fontWeight: 700 }}>
                <CheckCircle2 size={36} style={{ margin: '0 auto 8px auto' }} />
                App Open Ad View Verified! (+₹{ADMOB_UNITS.APP_OPEN.rewardCash.toFixed(2)})
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                  00:0{timeLeft}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                  Loading Application Environment...
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          {completed ? (
            <button onClick={handleClaim} className="btn-primary" style={{ padding: '10px 20px', width: '100%', justifyContent: 'center' }}>
              Continue to App & Claim ₹{ADMOB_UNITS.APP_OPEN.rewardCash.toFixed(2)}
            </button>
          ) : (
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textAlign: 'center', width: '100%' }}>
              Skip available in {timeLeft}s
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * 2, 3, 4. Banner Ad Components (Anchored, Inline, Fixed Size)
 * Anchored & Inline ID: ca-app-pub-3940256099942544/9214589741
 * Fixed Size ID: ca-app-pub-3940256099942544/6300978111
 */
export function AdMobBanner({ type = 'ANCHORED_ADAPTIVE_BANNER', onReward }) {
  const config = ADMOB_UNITS[type] || ADMOB_UNITS.ANCHORED_ADAPTIVE_BANNER;
  const [claimed, setClaimed] = useState(false);

  const handleInteract = () => {
    if (claimed) return;
    mockDB.addEarnings(config.rewardCash, 0, 1);
    setClaimed(true);
    if (onReward) onReward();
  };

  if (type === 'ANCHORED_ADAPTIVE_BANNER') {
    return (
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 990,
        background: 'rgba(10, 15, 26, 0.95)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid var(--emerald-primary)',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.5)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>AdMob Anchored Banner</span>
          <span style={{ fontSize: '0.8rem', color: '#ffffff', fontWeight: 600 }}>
            🚀 Monetize your daily internet connection on VictorADS
          </span>
          <code style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'none' }}>{config.id}</code>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={handleInteract}
            disabled={claimed}
            className="btn-green"
            style={{ padding: '6px 14px', fontSize: '0.78rem' }}
          >
            {claimed ? 'Claimed +₹0.50' : 'Tap Banner (+₹0.50 Cash)'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid var(--glass-border-glow)',
      borderRadius: '12px',
      padding: '16px',
      margin: '16px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <span className="badge badge-cyan" style={{ fontSize: '0.68rem' }}>{config.format}</span>
        <code style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{config.id}</code>
      </div>
      <div style={{
        width: config.width === '100%' ? '100%' : config.width,
        maxWidth: '100%',
        height: config.height,
        background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 186, 212, 0.1) 100%)',
        border: '1px dashed var(--cyan-accent)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px'
      }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#ffffff' }}>
            Google AdMob Banner Demonstration Unit
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            High performance responsive banner format
          </div>
        </div>
        <button
          onClick={handleInteract}
          disabled={claimed}
          className="btn-primary"
          style={{ padding: '6px 12px', fontSize: '0.75rem' }}
        >
          {claimed ? 'Reward Credited' : `View Ad (+₹${config.rewardCash.toFixed(2)})`}
        </button>
      </div>
    </div>
  );
}

/**
 * 5. Interstitial Ad Component
 * Unit ID: ca-app-pub-3940256099942544/1033173712
 */
export function AdMobInterstitialModal({ onClose, onReward }) {
  const config = ADMOB_UNITS.INTERSTITIAL;
  const [timeLeft, setTimeLeft] = useState(config.duration);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setCompleted(true);
    }
  }, [timeLeft]);

  const handleClaim = () => {
    try {
      mockDB.addEarnings(config.rewardCash, 0, 1);
      if (onReward) onReward();
      onClose();
    } catch (e) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 10000 }}>
      <div className="modal-content" style={{ maxWidth: '520px', border: '2px solid var(--gold-accent)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span className="badge badge-gold">
            <Maximize2 size={12} /> Google AdMob Interstitial Ad
          </span>
          {completed && (
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          )}
        </div>

        <div style={{ background: '#080d1a', padding: '24px', borderRadius: '16px', textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px' }}>
            Unit ID: <code>{config.id}</code>
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#ffffff', marginBottom: '8px' }}>Transitioning Workflow...</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px' }}>
            Interstitial format covers screen during key app state navigation.
          </p>

          <div style={{ height: '160px', background: 'rgba(245, 158, 11, 0.08)', borderRadius: '12px', border: '1px dashed var(--gold-accent)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {completed ? (
              <div>
                <CheckCircle2 size={48} color="var(--gold-accent)" style={{ margin: '0 auto 8px auto' }} />
                <div style={{ color: '#ffffff', fontWeight: 700 }}>Interstitial Completed</div>
                <div style={{ color: 'var(--gold-accent)', fontSize: '0.85rem' }}>Earned ₹{config.rewardCash.toFixed(2)} Cash + 25 Coins</div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--gold-accent)', fontFamily: 'var(--font-heading)' }}>
                  00:0{timeLeft}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '6px' }}>
                  Please hold while transition ad completes
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          {completed ? (
            <button onClick={handleClaim} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Claim ₹{config.rewardCash.toFixed(2)} & Continue
            </button>
          ) : (
            <div style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-dim)' }}>
              Closing allowed in {timeLeft} seconds...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * 6, 7. Rewarded Interstitial Component
 * Unit ID: ca-app-pub-3940256099942544/5354046379
 */
export function AdMobRewardedInterstitialModal({ onClose, onReward }) {
  const config = ADMOB_UNITS.REWARDED_INTERSTITIAL;
  const [timeLeft, setTimeLeft] = useState(config.duration);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setCompleted(true);
    }
  }, [timeLeft]);

  const handleClaim = () => {
    try {
      mockDB.addEarnings(config.rewardCash, 0, 1);
      if (onReward) onReward();
      onClose();
    } catch (e) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 10000 }}>
      <div className="modal-content" style={{ maxWidth: '520px', border: '2px solid var(--cyan-accent)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span className="badge badge-cyan">
            <Zap size={12} /> Google AdMob Rewarded Interstitial
          </span>
          {completed && (
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          )}
        </div>

        <div style={{ background: '#080d1a', padding: '24px', borderRadius: '16px', textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px' }}>
            Unit ID: <code>{config.id}</code>
          </div>
          <h2 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '6px' }}>Automatic Yield Reward</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>
            Earn ₹3.00 + 30 Coins upon completion. No skip required.
          </p>

          <div style={{ height: '140px', background: 'rgba(6, 186, 212, 0.08)', borderRadius: '12px', border: '1px dashed var(--cyan-accent)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {completed ? (
              <div>
                <CheckCircle2 size={42} color="var(--cyan-accent)" style={{ margin: '0 auto 8px auto' }} />
                <div style={{ color: '#ffffff', fontWeight: 700 }}>Rewarded Interstitial Finished</div>
                <div style={{ color: 'var(--cyan-accent)', fontSize: '0.85rem' }}>₹3.00 Cash + 30 Coins Credited!</div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--cyan-accent)', fontFamily: 'var(--font-heading)' }}>
                  00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>
                  Streaming sponsored message...
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          {completed ? (
            <button onClick={handleClaim} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Claim Reward & Close
            </button>
          ) : (
            <div style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-dim)' }}>
              Wait {timeLeft}s to collect reward...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * 8. Native Ad Component
 * Unit ID: ca-app-pub-3940256099942544/2247696110
 */
export function AdMobNativeCard({ onReward }) {
  const config = ADMOB_UNITS.NATIVE;
  const [claimed, setClaimed] = useState(false);

  const handleClaim = () => {
    if (claimed) return;
    mockDB.addEarnings(config.rewardCash, 0, 1);
    setClaimed(true);
    if (onReward) onReward();
  };

  return (
    <div className="glass-card" style={{ padding: '20px', border: '1px solid var(--emerald-primary)', background: 'rgba(16, 185, 129, 0.03)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span className="badge badge-green" style={{ fontSize: '0.68rem' }}>AdMob Native Ad</span>
        <code style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{config.id}</code>
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '12px',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid var(--emerald-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--emerald-primary)',
          flexShrink: 0
        }}>
          <Layout size={28} />
        </div>

        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '4px' }}>
            Sponsor Recommendation: CyberShield Security
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
            Protect your web traffic with AI firewall rules & VPN proxy. Native Ad Unit integration.
          </p>
        </div>

        <button
          onClick={handleClaim}
          disabled={claimed}
          className="btn-primary"
          style={{ padding: '8px 16px', fontSize: '0.8rem', flexShrink: 0 }}
        >
          {claimed ? 'Claimed +₹1.50' : 'Interact (+₹1.50)'}
        </button>
      </div>
    </div>
  );
}

/**
 * 9. Native Video Ad Component
 * Unit ID: ca-app-pub-3940256099942544/1044960115
 */
export function AdMobNativeVideoCard({ onReward }) {
  const config = ADMOB_UNITS.NATIVE_VIDEO;
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    let timer;
    if (playing && progress < 100) {
      timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setPlaying(false);
            return 100;
          }
          return prev + 10;
        });
      }, 800);
    }
    return () => clearInterval(timer);
  }, [playing, progress]);

  const handleStart = () => {
    setPlaying(true);
  };

  const handleClaim = () => {
    if (claimed) return;
    mockDB.addEarnings(config.rewardCash, 0, 1);
    setClaimed(true);
    if (onReward) onReward();
  };

  return (
    <div className="glass-card" style={{ padding: '24px', border: '1px solid var(--cyan-accent)', background: 'rgba(6, 186, 212, 0.03)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <span className="badge badge-cyan" style={{ fontSize: '0.68rem' }}>
          <Tv size={12} /> AdMob Native Video
        </span>
        <code style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{config.id}</code>
      </div>

      <div style={{
        height: '180px',
        background: '#050914',
        borderRadius: '12px',
        border: '1px solid var(--glass-border-glow)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '16px'
      }}>
        {progress >= 100 ? (
          <div style={{ textAlign: 'center' }}>
            <CheckCircle2 size={40} color="var(--cyan-accent)" style={{ margin: '0 auto 6px auto' }} />
            <div style={{ color: '#ffffff', fontWeight: 700 }}>Video Complete</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--cyan-accent)' }}>Ready to Claim ₹2.00 Cash + 20 Coins</div>
          </div>
        ) : playing ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--cyan-accent)', fontFamily: 'var(--font-heading)' }}>
              {progress}%
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>
              Playing Native Video Asset...
            </div>
          </div>
        ) : (
          <button
            onClick={handleStart}
            style={{
              background: 'rgba(6, 186, 212, 0.15)',
              border: '1px solid var(--cyan-accent)',
              color: 'var(--cyan-accent)',
              borderRadius: '50%',
              width: '56px',
              height: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Play size={28} />
          </button>
        )}

        {/* Progress Bar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '4px',
          background: 'rgba(255,255,255,0.1)'
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'var(--cyan-accent)',
            transition: 'width 0.8s ease'
          }} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '2px' }}>NeoBank Zero-Fee Account</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Rich media native autoplay video slot.</p>
        </div>

        {progress >= 100 ? (
          <button onClick={handleClaim} disabled={claimed} className="btn-primary" style={{ padding: '8px 16px' }}>
            {claimed ? 'Claimed +₹2.00' : 'Claim ₹2.00'}
          </button>
        ) : (
          <button onClick={handleStart} disabled={playing} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
            {playing ? 'Watching...' : 'Play Video'}
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * 10. Picture-in-Picture Floating Widget
 * Unit ID: ca-app-pub-3940256099942544/9657123429
 */
export function AdMobPiPWidget({ onReward }) {
  const config = ADMOB_UNITS.PICTURE_IN_PICTURE;
  const [minimized, setMinimized] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const handleClaim = () => {
    if (claimed) return;
    mockDB.addEarnings(config.rewardCash, 0, 1);
    setClaimed(true);
    if (onReward) onReward();
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '80px',
      right: '20px',
      zIndex: 990,
      width: minimized ? '180px' : '280px',
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(16px)',
      border: '1px solid var(--emerald-primary)',
      borderRadius: '16px',
      padding: '12px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span className="badge badge-green" style={{ fontSize: '0.62rem' }}>
          <Tv size={10} /> PiP Floating Ad
        </span>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setMinimized(!minimized)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            {minimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
          </button>
        </div>
      </div>

      {!minimized && (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            height: '90px',
            background: 'rgba(16, 185, 129, 0.08)',
            borderRadius: '10px',
            border: '1px dashed var(--emerald-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '10px'
          }}>
            <Play size={24} color="var(--emerald-primary)" />
          </div>

          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff', marginBottom: '2px' }}>
            Floating Sponsor Stream
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '10px' }}>
            ID: <code>{config.id}</code>
          </div>

          <button
            onClick={handleClaim}
            disabled={claimed}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '6px', fontSize: '0.78rem' }}
          >
            {claimed ? 'Claimed +₹1.25' : 'Tap PiP (+₹1.25)'}
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Complete AdMob Integration Showcase Hub
 * Demonstrates all 10 AdMob Formats & Unit IDs in one clean grid!
 */
export default function AdMobIntegrationHub({ onBalanceUpdated }) {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <div className="glass-card" style={{ padding: '28px', border: '1px solid var(--emerald-primary)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <div className="badge badge-green" style={{ marginBottom: '6px' }}>
            <ShieldCheck size={14} /> Official Google AdMob Integration Suite
          </div>
          <h2 style={{ fontSize: '1.6rem', color: '#ffffff' }}>Google AdMob Demo Ad Units (All 10 Formats)</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Live integrated AdMob ad unit IDs with instant revenue yield & VictorCoin credits.
          </p>
        </div>
      </div>

      {/* AdMob Formats Interactive Grid */}
      <div className="grid-2" style={{ gap: '16px' }}>
        {/* Format 1: App Open */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="badge badge-green">App Open</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--emerald-primary)', fontWeight: 700 }}>+₹1.00 Cash</span>
          </div>
          <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '4px' }}>App Open Ad Unit</h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            ID: <code>ca-app-pub-3940256099942544/9257395921</code>
          </p>
          <button onClick={() => setActiveModal('APP_OPEN')} className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}>
            Test App Open Ad
          </button>
        </div>

        {/* Format 2: Anchored Banner */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="badge badge-green">Anchored Adaptive Banner</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--emerald-primary)', fontWeight: 700 }}>+₹0.50 Cash</span>
          </div>
          <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '4px' }}>Anchored Banner Unit</h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            ID: <code>ca-app-pub-3940256099942544/9214589741</code>
          </p>
          <div style={{ fontSize: '0.78rem', color: 'var(--emerald-primary)', fontWeight: 600 }}>
            ✓ Active pinned at bottom screen
          </div>
        </div>

        {/* Format 3: Inline Adaptive Banner */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="badge badge-cyan">Inline Adaptive Banner</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--cyan-accent)', fontWeight: 700 }}>+₹0.75 Cash</span>
          </div>
          <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '4px' }}>Inline Feed Banner Unit</h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            ID: <code>ca-app-pub-3940256099942544/9214589741</code>
          </p>
          <AdMobBanner type="INLINE_ADAPTIVE_BANNER" onReward={onBalanceUpdated} />
        </div>

        {/* Format 4: Fixed Size Banner */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="badge badge-cyan">Fixed Size Banner</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--cyan-accent)', fontWeight: 700 }}>+₹0.50 Cash</span>
          </div>
          <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '4px' }}>Fixed Size Banner (320x50)</h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            ID: <code>ca-app-pub-3940256099942544/6300978111</code>
          </p>
          <AdMobBanner type="FIXED_SIZE_BANNER" onReward={onBalanceUpdated} />
        </div>

        {/* Format 5: Interstitial */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="badge badge-gold">Interstitial</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--gold-accent)', fontWeight: 700 }}>+₹2.50 Cash</span>
          </div>
          <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '4px' }}>Interstitial Ad Unit</h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            ID: <code>ca-app-pub-3940256099942544/1033173712</code>
          </p>
          <button onClick={() => setActiveModal('INTERSTITIAL')} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}>
            Trigger Interstitial
          </button>
        </div>

        {/* Format 6: Rewarded Ads */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="badge badge-gold">Rewarded Ads</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--gold-accent)', fontWeight: 700 }}>+₹3.50 Cash</span>
          </div>
          <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '4px' }}>Rewarded Video Stream Unit</h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            ID: <code>ca-app-pub-3940256099942544/5224354917</code>
          </p>
          <div style={{ fontSize: '0.78rem', color: 'var(--gold-accent)', fontWeight: 600 }}>
            ✓ Integrated in Earning Station & Video Player
          </div>
        </div>

        {/* Format 7: Rewarded Interstitial */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="badge badge-cyan">Rewarded Interstitial</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--cyan-accent)', fontWeight: 700 }}>+₹3.00 Cash</span>
          </div>
          <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '4px' }}>Rewarded Interstitial Unit</h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            ID: <code>ca-app-pub-3940256099942544/5354046379</code>
          </p>
          <button onClick={() => setActiveModal('REWARDED_INTERSTITIAL')} className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}>
            Trigger Rewarded Interstitial
          </button>
        </div>

        {/* Format 8: Native */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="badge badge-green">Native</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--emerald-primary)', fontWeight: 700 }}>+₹1.50 Cash</span>
          </div>
          <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '4px' }}>Native Express Card Unit</h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            ID: <code>ca-app-pub-3940256099942544/2247696110</code>
          </p>
          <AdMobNativeCard onReward={onBalanceUpdated} />
        </div>

        {/* Format 9: Native Video */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid var(--glass-border)', gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="badge badge-cyan">Native Video</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--cyan-accent)', fontWeight: 700 }}>+₹2.00 Cash</span>
          </div>
          <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '4px' }}>Native Video Media Unit</h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            ID: <code>ca-app-pub-3940256099942544/1044960115</code>
          </p>
          <AdMobNativeVideoCard onReward={onBalanceUpdated} />
        </div>
      </div>

      {/* Floating PiP Unit */}
      <AdMobPiPWidget onReward={onBalanceUpdated} />

      {/* Modals trigger */}
      {activeModal === 'APP_OPEN' && (
        <AdMobAppOpenModal
          onClose={() => setActiveModal(null)}
          onReward={onBalanceUpdated}
        />
      )}

      {activeModal === 'INTERSTITIAL' && (
        <AdMobInterstitialModal
          onClose={() => setActiveModal(null)}
          onReward={onBalanceUpdated}
        />
      )}

      {activeModal === 'REWARDED_INTERSTITIAL' && (
        <AdMobRewardedInterstitialModal
          onClose={() => setActiveModal(null)}
          onReward={onBalanceUpdated}
        />
      )}
    </div>
  );
}
