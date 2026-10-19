import { useState, useEffect } from 'react';
import { mockDB } from '@/lib/mockDB';
import { ADMOB_UNITS } from '@/lib/admobConfig';
import {
  ShieldCheck, 
  Wallet, 
  TrendingUp, 
  Tv, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  PlusCircle, 
  Trash2, 
  Lock,
  Coins,
  Copy
} from 'lucide-react';

export default function AdminDashboard() {
  const [pin, setPin] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const [firewall, setFirewall] = useState(null);
  const [user, setUser] = useState(null);
  const [ads, setAds] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [donations, setDonations] = useState([]);

  // New Ad Form State
  const [adTitle, setAdTitle] = useState('');
  const [adSponsor, setAdSponsor] = useState('');
  const [adReward, setAdReward] = useState('5.00');

  const refreshAdminData = () => {
    setFirewall(mockDB.getFirewall());
    setUser(mockDB.getUser());
    setAds(mockDB.getAds());
    setWithdrawals(mockDB.getWithdrawals());
    setDonations(mockDB.getDonations());
  };

  useEffect(() => {
    if (authenticated) {
      refreshAdminData();
    }
  }, [authenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (attempts >= 5) {
      setErrorMsg('Too many failed PIN attempts. Locked out for security.');
      return;
    }

    if (pin === '20032004') {
      setAuthenticated(true);
      setAttempts(0);
    } else {
      const nextAtt = attempts + 1;
      setAttempts(nextAtt);
      setErrorMsg(`Invalid Admin PIN! Attempt ${nextAtt}/5`);
      if (nextAtt >= 5) {
        mockDB.updateFirewall({ failedAdminAttempts: 5 });
      }
    }
  };

  const handleAddAd = (e) => {
    e.preventDefault();
    if (!adTitle.trim()) return;
    mockDB.addAd({ title: adTitle, sponsor: adSponsor, reward: adReward });
    setAdTitle('');
    setAdSponsor('');
    refreshAdminData();
  };

  const handleToggleAd = (adId) => {
    mockDB.toggleAdStatus(adId);
    refreshAdminData();
  };

  const handleRemoveAd = (adId) => {
    mockDB.removeAd(adId);
    refreshAdminData();
  };

  const handleApprovePayout = (txId) => {
    mockDB.updateWithdrawalStatus(txId, 'Approved (Admin Verified)');
    refreshAdminData();
  };

  const handleWithdrawAdminCommission = () => {
    if (!firewall || firewall.adminCommissionPool <= 0) return;
    alert(`Successfully transferred ₹${firewall.adminCommissionPool.toFixed(2)} 30% Admin Commission to Admin Bank VPA!`);
    mockDB.updateFirewall({ adminCommissionPool: 0.00 });
    refreshAdminData();
  };

  if (!authenticated) {
    return (
      <div className="glass-card" style={{ maxWidth: '450px', margin: '40px auto', padding: '32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '16px',
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid var(--gold-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--gold-accent)',
            margin: '0 auto 12px auto'
          }}>
            <Lock size={28} />
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#ffffff' }}>Admin Security Gate</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
            Enter official Security PIN to manage 30% Admin Vault & Payouts
          </p>
        </div>

        {errorMsg && (
          <div style={{ background: 'rgba(255,77,77,0.12)', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '10px', borderRadius: '8px', fontSize: '0.82rem', marginBottom: '16px' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            type="password"
            placeholder="Enter 8-Digit Security PIN..."
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="form-input"
            maxLength={10}
            required
          />

          <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
            Unlock Admin Console
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 30% Admin Vault Header Summary */}
      <div className="glass-card" style={{ padding: '28px', border: '1px solid var(--emerald-primary)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '20px' }}>
          <div>
            <div className="badge badge-gold" style={{ marginBottom: '6px' }}>
              <Coins size={14} /> 30% Platform Survival Pool
            </div>
            <h2 style={{ fontSize: '1.8rem', color: '#ffffff' }}>Admin Earnings Vault</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              Auto-accumulated 30% platform commissions from user ad views and data node yields.
            </p>
          </div>

          <button onClick={handleWithdrawAdminCommission} className="btn-primary" style={{ padding: '12px 24px' }}>
            <Wallet size={18} /> Withdraw 30% Admin Vault (₹{firewall?.adminCommissionPool.toFixed(2)})
          </button>
        </div>

        <div className="grid-3">
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '16px', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Admin Commission Pool</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--emerald-primary)', fontFamily: 'var(--font-heading)', marginTop: '2px' }}>
              ₹{firewall?.adminCommissionPool.toFixed(2)}
            </div>
          </div>

          <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '16px', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Sponsor Ads</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold-accent)', fontFamily: 'var(--font-heading)', marginTop: '2px' }}>
              {ads.length} Ad Units
            </div>
          </div>

          <div style={{ background: 'rgba(6, 186, 212, 0.1)', padding: '16px', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Neutralized Threats</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--cyan-accent)', fontFamily: 'var(--font-heading)', marginTop: '2px' }}>
              {firewall?.threatsNeutralized} Attacks
            </div>
          </div>
        </div>
      </div>

      {/* Sponsor Ads Manager */}
      <div className="glass-card" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '16px' }}>Manage Sponsor Video Ads</h3>
        
        {/* Create New Ad Form */}
        <form onSubmit={handleAddAd} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          <input
            type="text"
            placeholder="Ad Title (e.g. Premium Sponsor)"
            value={adTitle}
            onChange={(e) => setAdTitle(e.target.value)}
            className="form-input"
            required
          />
          <input
            type="text"
            placeholder="Sponsor Name"
            value={adSponsor}
            onChange={(e) => setAdSponsor(e.target.value)}
            className="form-input"
          />
          <input
            type="number"
            step="0.5"
            placeholder="Reward (e.g. 5.00)"
            value={adReward}
            onChange={(e) => setAdReward(e.target.value)}
            className="form-input"
            required
          />
          <button type="submit" className="btn-primary">
            <PlusCircle size={16} /> Add Ad Unit
          </button>
        </form>

        {/* Existing Ads List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {ads.map(ad => (
            <div key={ad.id} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--glass-border)',
              padding: '14px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontWeight: 700, color: '#ffffff' }}>{ad.title}</span>
                <span className="badge badge-green" style={{ marginLeft: '10px', fontSize: '0.7rem' }}>₹{ad.reward} Gross</span>
                {ad.format && <span className="badge badge-cyan" style={{ marginLeft: '6px', fontSize: '0.68rem' }}>{ad.format}</span>}
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Views: {ad.views} | Unit: <code>{ad.unitId}</code>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => handleToggleAd(ad.id)} className="btn-secondary" style={{ fontSize: '0.78rem' }}>
                  {ad.active ? 'Disable' : 'Enable'}
                </button>
                <button onClick={() => handleRemoveAd(ad.id)} style={{ background: 'rgba(255,77,77,0.12)', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official AdMob Demo Unit IDs Reference Matrix */}
      <div className="glass-card" style={{ padding: '28px', border: '1px solid var(--cyan-accent)' }}>
        <div className="badge badge-cyan" style={{ marginBottom: '6px' }}>
          <Tv size={14} /> Official Google AdMob Integration Matrix
        </div>
        <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '4px' }}>AdMob Demo Ad Unit IDs Registry</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
          All 10 active Google AdMob demo ad unit IDs configured for production testing and format validation.
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '10px' }}>Ad Format</th>
                <th style={{ padding: '10px' }}>Demo Ad Unit ID</th>
                <th style={{ padding: '10px' }}>Est. Yield</th>
                <th style={{ padding: '10px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(ADMOB_UNITS).map((unit) => (
                <tr key={unit.id + unit.key} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '10px', color: '#ffffff', fontWeight: 600 }}>{unit.format}</td>
                  <td style={{ padding: '10px', fontFamily: 'monospace', color: 'var(--cyan-accent)' }}>{unit.id}</td>
                  <td style={{ padding: '10px', color: 'var(--emerald-primary)', fontWeight: 700 }}>₹{unit.rewardCash.toFixed(2)}</td>
                  <td style={{ padding: '10px' }}>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(unit.id);
                        alert(`Copied AdMob ID (${unit.format}): ${unit.id}`);
                      }}
                      className="btn-secondary"
                      style={{ fontSize: '0.72rem', padding: '4px 10px' }}
                    >
                      <Copy size={12} /> Copy ID
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
