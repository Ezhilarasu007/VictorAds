'use client';
import { useState } from 'react';
import { Calculator, TrendingUp, Zap, Wifi, Layers } from 'lucide-react';

export default function EarningsCalculator() {
  const [dailyAds, setDailyAds] = useState(20);
  const [dailyDataGB, setDailyDataGB] = useState(50);
  const [isTbScale, setIsTbScale] = useState(false);

  // Dynamic Profitable Rate Yields:
  // ₹4.00 average earner share per rewarded ad
  // ₹15.00 per GB High-Yield Enterprise Rate (70% earner share)
  const adRate = 4.00;
  const dataRatePerGB = 15.00;

  const activeGB = isTbScale ? 1000 : dailyDataGB;

  const dailyAdsIncome = dailyAds * adRate;
  const dailyDataIncome = activeGB * dataRatePerGB;
  
  const totalDaily = dailyAdsIncome + dailyDataIncome;
  const totalMonthly = totalDaily * 30;

  return (
    <div className="glass-card" style={{ padding: '32px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(0, 242, 254, 0.12)',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--neon-cyan)'
          }}>
            <Calculator size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', color: '#ffffff' }}>Profitable Node Yield Calculator</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              Estimate daily, monthly, and bulk terabyte marketplace earnings (70% Earner Share).
            </p>
          </div>
        </div>

        {/* Toggle TB Scale */}
        <button
          onClick={() => setIsTbScale(!isTbScale)}
          className={isTbScale ? 'btn-green' : 'btn-secondary'}
          style={{ padding: '8px 16px', fontSize: '0.85rem' }}
        >
          <Layers size={16} /> {isTbScale ? '1 TB Bulk Scale (Active)' : 'Switch to 1 TB Scale'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
        {/* Sliders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Slider 1: Video Ads */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', fontWeight: 600 }}>
                <Zap size={18} color="var(--neon-cyan)" />
                Daily Rewarded Ads Watched
              </label>
              <span style={{
                color: 'var(--neon-cyan)',
                fontWeight: 700,
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem'
              }}>
                {dailyAds} Ads/day (₹{(dailyAds * adRate).toFixed(2)})
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={dailyAds}
              onChange={(e) => setDailyAds(parseInt(e.target.value))}
              style={{
                width: '100%',
                accentColor: 'var(--neon-cyan)',
                cursor: 'pointer',
                height: '8px',
                borderRadius: '4px'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              <span>0 Ads (₹0)</span>
              <span>25 Ads (₹100)</span>
              <span>50 Ads (₹200)</span>
            </div>
          </div>

          {/* Slider 2: Bandwidth GB/TB */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', fontWeight: 600 }}>
                <Wifi size={18} color="var(--neon-green)" />
                Daily Shared Bandwidth ({isTbScale ? 'Terabyte Scale' : 'Gigabyte Scale'})
              </label>
              <span style={{
                color: 'var(--neon-green)',
                fontWeight: 700,
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem'
              }}>
                {isTbScale ? '1 TB (1000 GB)' : `${dailyDataGB} GB/day`}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={isTbScale ? 100 : dailyDataGB}
              onChange={(e) => { setIsTbScale(false); setDailyDataGB(parseInt(e.target.value)); }}
              style={{
                width: '100%',
                accentColor: 'var(--neon-green)',
                cursor: 'pointer',
                height: '8px',
                borderRadius: '4px'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              <span>0 GB (₹0)</span>
              <span>50 GB (₹750)</span>
              <span>100 GB (₹1,500)</span>
            </div>
          </div>
        </div>

        {/* Output Summary Card */}
        <div style={{
          background: 'rgba(10, 15, 30, 0.8)',
          border: '1px solid var(--glass-border-glow)',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--neon-pink)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>
            <TrendingUp size={16} /> Projected Income Summary
          </div>

          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '2px' }}>
              {isTbScale ? '1 TB Bulk Marketplace Yield' : 'Daily Yield'}
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--neon-green)', fontFamily: 'var(--font-heading)' }}>
              ₹{totalDaily.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '10px' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Monthly Estimated (30 Days)</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--neon-cyan)', fontFamily: 'var(--font-heading)', marginTop: '2px' }}>
              ₹{totalMonthly.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center' }}>
            *Calculated at high-yield profitable rate of ₹4.00/ad and ₹15.00/GB (70% Earner Share).
          </div>
        </div>
      </div>
    </div>
  );
}
