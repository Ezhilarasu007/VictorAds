'use client';
import { useState, useEffect } from 'react';
import { mockDB } from '@/lib/mockDB';
import { Wifi, Radio, Zap, ShieldCheck, Activity } from 'lucide-react';

export default function BandwidthSimulator({ onBalanceUpdated }) {
  const [active, setActive] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [sessionMB, setSessionMB] = useState(0);
  const [sessionEarned, setSessionEarned] = useState(0);

  useEffect(() => {
    let interval;
    if (active) {
      interval = setInterval(() => {
        // Random speed between 45 and 110 Mbps
        const speed = Math.floor(45 + Math.random() * 65);
        setCurrentSpeed(speed);

        // Calculate MB shared in 2s tick (~ 0.5 MB - 1.2 MB)
        const mbAdded = Math.round((speed * 0.015) * 100) / 100;
        const rewardAdded = Math.round((mbAdded * 0.10) * 100) / 100;

        setSessionMB(prev => prev + mbAdded);
        setSessionEarned(prev => prev + rewardAdded);

        // Update DB
        mockDB.addEarnings(rewardAdded, mbAdded, 0);
        if (onBalanceUpdated) onBalanceUpdated();
      }, 2000);
    } else {
      setCurrentSpeed(0);
    }

    return () => clearInterval(interval);
  }, [active, onBalanceUpdated]);

  return (
    <div className="glass-card" style={{ padding: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: active ? 'rgba(0, 255, 135, 0.15)' : 'rgba(255, 255, 255, 0.05)',
            border: active ? '1px solid var(--neon-green)' : '1px solid var(--glass-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: active ? 'var(--neon-green)' : 'var(--text-muted)'
          }}>
            <Wifi size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>Bandwidth Sharing Node</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Rate: ₹0.10 per MB Shared</p>
          </div>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={() => setActive(!active)}
          className={active ? 'btn-green' : 'btn-secondary'}
          style={{ padding: '10px 20px', fontSize: '0.9rem' }}
        >
          <Radio size={16} />
          {active ? 'Sharing Active' : 'Start Sharing'}
        </button>
      </div>

      {/* Speed Gauge & Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        {/* Speed Card */}
        <div style={{
          background: 'rgba(10, 15, 30, 0.7)',
          border: '1px solid var(--glass-border)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Activity size={14} /> Active Throughput
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: active ? 'var(--neon-cyan)' : 'var(--text-muted)', fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
            {currentSpeed} <span style={{ fontSize: '0.9rem', fontWeight: 400 }}>Mbps</span>
          </div>
        </div>

        {/* MB Shared Card */}
        <div style={{
          background: 'rgba(10, 15, 30, 0.7)',
          border: '1px solid var(--glass-border)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Radio size={14} /> Session Data Shared
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: active ? 'var(--neon-green)' : 'var(--text-muted)', fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
            {sessionMB.toFixed(2)} <span style={{ fontSize: '0.9rem', fontWeight: 400 }}>MB</span>
          </div>
        </div>

        {/* Session Earnings Card */}
        <div style={{
          background: 'rgba(10, 15, 30, 0.7)',
          border: '1px solid var(--glass-border)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Zap size={14} /> Session Reward
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neon-pink)', fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
            +₹{sessionEarned.toFixed(2)}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '16px', fontSize: '0.78rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <ShieldCheck size={14} color="var(--neon-green)" />
        Encrypted TLS 1.3 Proxy Channel. Isolated from personal device storage.
      </div>
    </div>
  );
}
