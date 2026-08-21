'use client';
import { useState } from 'react';
import { Calculator, TrendingUp, Zap, Wifi } from 'lucide-react';

export default function EarningsCalculator() {
  const [dailyAds, setDailyAds] = useState(15);
  const [dailyDataGB, setDailyDataGB] = useState(10);

  // Rate calculations:
  // ₹2.50 per ad
  // ₹0.10 per MB = ₹102.40 per GB (1024 MB * 0.10)
  const adRatePerUnit = 2.50;
  const dataRatePerGB = 102.40;

  const dailyAdsIncome = dailyAds * adRatePerUnit;
  const dailyDataIncome = dailyDataGB * dataRatePerGB;
  
  const totalDaily = dailyAdsIncome + dailyDataIncome;
  const totalMonthly = totalDaily * 30;
  const totalYearly = totalDaily * 365;

  return (
    <div className="glass-card" style={{ padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
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
          <h3 style={{ fontSize: '1.4rem', color: '#ffffff' }}>Interactive Earnings Calculator</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Adjust your daily activity to estimate potential revenue in Indian Rupees (₹).
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
        {/* Sliders Column */}
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
                {dailyAds} Ads/day
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
              <span>25 Ads (₹62.50)</span>
              <span>50 Ads (₹125.00)</span>
            </div>
          </div>

          {/* Slider 2: Bandwidth */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', fontWeight: 600 }}>
                <Wifi size={18} color="var(--neon-green)" />
                Daily Shared Bandwidth
              </label>
              <span style={{
                color: 'var(--neon-green)',
                fontWeight: 700,
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem'
              }}>
                {dailyDataGB} GB/day
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={dailyDataGB}
              onChange={(e) => setDailyDataGB(parseInt(e.target.value))}
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
              <span>25 GB (₹2,560)</span>
              <span>50 GB (₹5,120)</span>
            </div>
          </div>
        </div>

        {/* Projected Returns Card */}
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
            <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '2px' }}>Daily Yield</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
              ₹{totalDaily.toFixed(2)}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Monthly Estimated</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--neon-cyan)', fontFamily: 'var(--font-heading)' }}>
                ₹{totalMonthly.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Yearly Estimated</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--neon-green)', fontFamily: 'var(--font-heading)' }}>
                ₹{totalYearly.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center' }}>
            *Calculated at standard rate of ₹2.50/ad and ₹0.10/MB shared bandwidth.
          </div>
        </div>
      </div>
    </div>
  );
}
