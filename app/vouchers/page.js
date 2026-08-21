'use client';
import { useState, useEffect } from 'react';
import { mockDB } from '@/lib/mockDB';
import { Gift, Coins, CheckCircle2, Copy, AlertCircle, ShoppingCart, ArrowRight } from 'lucide-react';

export default function VouchersPage() {
  const [user, setUser] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('Amazon');
  const [selectedAmount, setSelectedAmount] = useState(250);
  const [redeemedCode, setRedeemedCode] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedCode, setCopiedCode] = useState(null);

  const refreshData = () => {
    setUser(mockDB.getUser());
    setVouchers(mockDB.getVouchers());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleRedeem = (brand, amt) => {
    setErrorMsg('');
    setRedeemedCode(null);

    try {
      const vouch = mockDB.redeemVoucher(brand, amt);
      setRedeemedCode(vouch);
      refreshData();
    } catch (err) {
      setErrorMsg(err.message || 'Redemption failed');
    }
  };

  const copyClaimCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (!user) return <div style={{ padding: '60px', color: '#ffffff' }}>Loading Voucher Hub...</div>;

  const catalog = [
    {
      brand: 'Amazon',
      name: 'Amazon Pay Gift Card',
      amounts: [250, 500, 1000],
      color: '#ff9900',
      desc: 'Use instantly on Amazon.in for shopping, bill payments, and recharge.'
    },
    {
      brand: 'Flipkart',
      name: 'Flipkart Digital Gift Voucher',
      amounts: [250, 500, 1000],
      color: '#2874f0',
      desc: 'Redeem on Flipkart app for electronics, fashion, and everyday essentials.'
    },
    {
      brand: 'GooglePlay',
      name: 'Google Play Recharge Code',
      amounts: [100, 250, 500],
      color: '#00f2fe',
      desc: 'Redeem on Google Play Store for games, apps, and subscriptions.'
    },
    {
      brand: 'UPI',
      name: 'Direct UPI Cash Payout',
      amounts: [250, 500, 1000],
      color: 'var(--neon-green)',
      desc: 'Instant direct transfer to your Virtual Payment Address (UPI).'
    }
  ];

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div className="badge badge-gold" style={{ marginBottom: '8px' }}>
          <Gift size={14} /> Instant Rewards Redemption Hub
        </div>
        <h1 style={{ fontSize: '2.2rem', color: '#ffffff' }}>Redeem Gift Cards & Vouchers</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
          Convert your VictorCoins (10 Coins = ₹1.00) or cash balance into 16-digit claim codes.
        </p>
      </div>

      {/* User Balance & Coins Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Wallet Cash Balance</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--neon-green)', fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
            ₹{user.balance.toFixed(2)}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>VictorCoins Inventory</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--neon-cyan)', fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
            {user.coins} <span style={{ fontSize: '0.9rem', fontWeight: 400 }}>Coins</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>
            Value: ₹{(user.coins / 10).toFixed(2)}
          </div>
        </div>
      </div>

      {errorMsg && (
        <div style={{
          background: 'rgba(255, 77, 77, 0.12)',
          border: '1px solid rgba(255, 77, 77, 0.4)',
          padding: '14px',
          borderRadius: '10px',
          color: '#ff4d4d',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <AlertCircle size={18} /> {errorMsg}
        </div>
      )}

      {/* Generated Voucher Modal Output */}
      {redeemedCode && (
        <div className="glass-card" style={{ padding: '28px', border: '1px solid var(--neon-green)', marginBottom: '32px', textAlign: 'center' }}>
          <CheckCircle2 size={40} color="var(--neon-green)" style={{ margin: '0 auto 10px auto' }} />
          <h3 style={{ fontSize: '1.4rem', color: '#ffffff' }}>{redeemedCode.brand} Gift Card Issued!</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Amount: ₹{redeemedCode.amount} | Date: {redeemedCode.date}
          </p>

          <div style={{
            background: 'rgba(0, 255, 135, 0.1)',
            border: '1px dashed var(--neon-green)',
            borderRadius: '12px',
            padding: '16px',
            maxWidth: '450px',
            margin: '16px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>16-Digit Claim Code</div>
              <code style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>{redeemedCode.code}</code>
              <div style={{ fontSize: '0.75rem', color: 'var(--neon-green)', marginTop: '2px' }}>PIN: {redeemedCode.pin}</div>
            </div>

            <button
              onClick={() => copyClaimCode(redeemedCode.code)}
              className="btn-green"
              style={{ padding: '8px 14px', fontSize: '0.8rem' }}
            >
              {copiedCode === redeemedCode.code ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
        </div>
      )}

      {/* Catalog Grid */}
      <div className="grid-2" style={{ marginBottom: '40px' }}>
        {catalog.map((cat) => (
          <div key={cat.brand} className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <Gift size={24} color={cat.color} />
                <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>{cat.name}</h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '20px' }}>
                {cat.desc}
              </p>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                  Select Denomination
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {cat.amounts.map(amt => (
                    <button
                      key={amt}
                      onClick={() => handleRedeem(cat.brand, amt)}
                      className="btn-secondary"
                      style={{ flex: 1, justifyContent: 'center', fontSize: '0.88rem' }}
                    >
                      Redeem ₹{amt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active Vouchers History */}
      {vouchers.length > 0 && (
        <div className="glass-card" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '16px' }}>Your Redeemed Claim Codes History</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {vouchers.map(v => (
              <div key={v.id} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--glass-border)',
                padding: '14px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontWeight: 700, color: 'var(--neon-cyan)' }}>{v.brand} - ₹{v.amount}</span>
                  <div style={{ fontSize: '0.82rem', color: '#ffffff', fontFamily: 'monospace', marginTop: '2px' }}>
                    Code: {v.code} (PIN: {v.pin})
                  </div>
                </div>

                <button
                  onClick={() => copyClaimCode(v.code)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--neon-green)', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Copy size={14} /> {copiedCode === v.code ? 'Copied' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
