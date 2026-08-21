'use client';
import { useState, useEffect } from 'react';
import { mockDB } from '@/lib/mockDB';
import { Wifi, Radio, Zap, ShieldCheck, Activity, AlertCircle } from 'lucide-react';

export default function BandwidthSimulator({ onBalanceUpdated }) {
  const [active, setActive] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [sessionMB, setSessionMB] = useState(0);
  const [sessionEarned, setSessionEarned] = useState(0);
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const refreshUser = () => {
    setUser(mockDB.getUser());
  };

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    let interval;
    if (active) {
      interval = setInterval(() => {
        // Random throughput speed (60 - 130 Mbps)
        const speed = Math.floor(60 + Math.random() * 70);
        setCurrentSpeed(speed);

        // MB added per tick (~ 1.5 MB to 3.5 MB)
        const mbAdded = Math.round((speed * 0.025) * 100) / 100;
        // Profitable Rate: ₹0.025 per MB (₹25.60 per GB Shared gross -> 70% earner share)
        const rewardAdded = Math.round((mbAdded * 0.025) * 100) / 100;

        try {
          mockDB.addEarnings(rewardAdded, mbAdded, 0);
          setSessionMB(prev => prev + mbAdded);
          setSessionEarned(prev => prev + rewardAdded);
          refreshUser();
          if (onBalanceUpdated) onBalanceUpdated();
        } catch (err) {
          setActive(false);
          setErrorMsg(err.message || 'Daily 100 GB cap reached!');
        }
      }, 2000);
    } else {
      setCurrentSpeed(0);
    }

    return () => clearInterval(interval);
  }, [active, onBalanceUpdated]);

  const todayGB = user ? (user.todaySharedMB / 1024).toFixed(2) : '0.00';
  const percentUsed = user ? Math.min(100, (user.todaySharedMB / user.dailyCapMB) * 100) : 0;

  return (
    <div className="glass-card" style={{ padding: '28px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: active ? 'rgba(0, 255, 135, 0.15)' : 'rgba(255, 255, 255, 0.05)',
            border: active ? '1px solid var(--neon-green)' : '1px solid var(--glass-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: active ? 'var(--neon-green)' : 'var(--text-muted)'
          }}>
            <Wifi size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#ffffff' }}>Bandwidth Monetization Engine</h3>
              <span className="badge badge-cyan" style={{ fontSize: '0.68rem' }}>Daily Cap: 100 GB</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2px' }}>
              High-Yield Dynamic Node Route (70% Earner Revenue Share)
            </p>
          </div>
        </div>

        {/* Toggle */}
        <button
          onClick={() => { setErrorMsg(''); setActive(!active); }}
          className={active ? 'btn-green' : 'btn-secondary'}
          style={{ padding: '12px 24px', fontSize: '0.95rem' }}
        >
          <Radio size={18} />
          {active ? 'Node Active (Sharing)' : 'Tap to Start Sharing Data'}
        </button>
      </div>

      {errorMsg && (
        <div style={{
          background: 'rgba(255, 77, 77, 0.12)',
          border: '1px solid rgba(255, 77, 77, 0.3)',
          padding: '12px',
          borderRadius: '8px',
          color: '#ff4d4d',
          fontSize: '0.85rem',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <AlertCircle size={16} /> {errorMsg}
        </div>
      )}

      {/* Progress towards 100 GB daily cap */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
          <span>Today's Shared Data: <strong>{todayGB} GB</strong></span>
          <span>Daily Limit: <strong>100 GB</strong></span>
        </div>
        <div style={{ height: '8px', width: '100%', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${percentUsed}%`, background: 'linear-gradient(90deg, #00f2fe 0%, #00ff87 100%)', transition: 'width 0.5s ease' }} />
        </div>
      </div>

      {/* Speed & Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        <div style={{
          background: 'rgba(10, 15, 30, 0.7)',
          border: '1px solid var(--glass-border)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Activity size={14} /> Throughput Speed
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: active ? 'var(--neon-cyan)' : 'var(--text-muted)', fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
            {currentSpeed} <span style={{ fontSize: '0.9rem', fontWeight: 400 }}>Mbps</span>
          </div>
        </div>

        <div style={{
          background: 'rgba(10, 15, 30, 0.7)',
          border: '1px solid var(--glass-border)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Radio size={14} /> Session Data MB
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: active ? 'var(--neon-green)' : 'var(--text-muted)', fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
            {sessionMB.toFixed(2)} <span style={{ fontSize: '0.9rem', fontWeight: 400 }}>MB</span>
          </div>
        </div>

        <div style={{
          background: 'rgba(10, 15, 30, 0.7)',
          border: '1px solid var(--glass-border)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Zap size={14} /> Session Earnings
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neon-pink)', fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
            +₹{sessionEarned.toFixed(2)}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '16px', fontSize: '0.78rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <ShieldCheck size={14} color="var(--neon-green)" />
        Encrypted P2P Proxy Channel. 100% Isolated from local device files.
      </div>
    </div>
  );
}
