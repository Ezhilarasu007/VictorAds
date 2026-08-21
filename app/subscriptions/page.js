'use client';
import { useState, useEffect } from 'react';
import { mockDB } from '@/lib/mockDB';
import { Crown, Check, Zap, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SubscriptionsPage() {
  const [user, setUser] = useState(null);
  const [upgradedTier, setUpgradedTier] = useState('');

  useEffect(() => {
    setUser(mockDB.getUser());
  }, []);

  const handleUpgrade = (tierName) => {
    mockDB.updateUser({ subscriptionTier: tierName });
    setUpgradedTier(tierName);
    setUser(mockDB.getUser());
    setTimeout(() => setUpgradedTier(''), 4000);
  };

  if (!user) return <div style={{ padding: '60px', color: '#ffffff' }}>Loading VIP Tiers...</div>;

  const tiers = [
    {
      name: 'VIP Ad-Free Member',
      price: '₹299',
      period: '/month',
      color: 'var(--neon-cyan)',
      features: [
        'Automatic +20% Bonus on Bandwidth Yields',
        'Zero Banner Advertisements',
        'Priority Cashier Withdrawal Queue',
        '24/7 Dedicated Support'
      ]
    },
    {
      name: 'Data Trader Pro',
      price: '₹499',
      period: '/month',
      popular: true,
      color: 'var(--neon-green)',
      features: [
        '0% Marketplace Trading Commission',
        'Unlimited Wholesale Listings',
        'Advanced Link Analyzer Security Audits',
        'Custom QR Code SVG Vector Exports',
        'Priority Cashier Transfers'
      ]
    },
    {
      name: 'Enterprise Supporter',
      price: '₹999',
      period: '/month',
      color: 'var(--neon-pink)',
      features: [
        'Dedicated Enterprise Proxy Node Route',
        '100% P2P Trade Priority Matching',
        'Exclusive VIP Gold Badge on Community Wall',
        'Direct Access to Platform Founders'
      ]
    }
  ];

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px auto' }}>
        <div className="badge badge-gold" style={{ marginBottom: '8px' }}>
          <Crown size={14} /> VIP Membership Tier Access
        </div>
        <h1 style={{ fontSize: '2.2rem', color: '#ffffff' }}>Upgrade Your VictorADS Experience</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
          Current Active Tier: <strong style={{ color: 'var(--neon-cyan)' }}>{user.subscriptionTier}</strong>
        </p>
      </div>

      {upgradedTier && (
        <div style={{
          background: 'rgba(0, 255, 135, 0.12)',
          border: '1px solid rgba(0, 255, 135, 0.4)',
          padding: '16px',
          borderRadius: '12px',
          color: 'var(--neon-green)',
          textAlign: 'center',
          marginBottom: '32px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={20} /> Successfully upgraded to {upgradedTier}!
        </div>
      )}

      <div className="grid-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className="glass-card"
            style={{
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              borderColor: t.popular ? 'var(--neon-green)' : 'var(--glass-border)',
              boxShadow: t.popular ? 'var(--shadow-green)' : 'none'
            }}
          >
            {t.popular && (
              <div style={{
                position: 'absolute',
                top: '-12px',
                right: '24px',
                background: 'linear-gradient(135deg, #00ff87 0%, #00b894 100%)',
                color: '#070913',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '4px 12px',
                borderRadius: '9999px',
                textTransform: 'uppercase'
              }}>
                MOST POPULAR
              </div>
            )}

            <div>
              <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '8px' }}>{t.name}</h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: t.color, fontFamily: 'var(--font-heading)' }}>
                  {t.price}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t.period}</span>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {t.features.map((f, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                    <Check size={16} color={t.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleUpgrade(t.name)}
              disabled={user.subscriptionTier === t.name}
              className={t.popular ? 'btn-green' : 'btn-primary'}
              style={{ width: '100%', justifyContent: 'center', opacity: user.subscriptionTier === t.name ? 0.5 : 1 }}
            >
              {user.subscriptionTier === t.name ? 'Active Subscription' : `Upgrade to ${t.name}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
