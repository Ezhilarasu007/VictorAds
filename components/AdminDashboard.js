'use client';
import { useState, useEffect } from 'react';
import { mockDB } from '@/lib/mockDB';
import { 
  ShieldAlert, 
  Lock, 
  Unlock, 
  BarChart3, 
  Wallet, 
  Megaphone, 
  ShoppingBag, 
  Shield, 
  Users, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  AlertTriangle,
  RefreshCw,
  Sliders
} from 'lucide-react';

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('analytics');

  // DB States
  const [user, setUser] = useState(null);
  const [withdrawals, setWithdrawals] = useState([]);
  const [ads, setAds] = useState([]);
  const [marketplace, setMarketplace] = useState([]);
  const [donations, setDonations] = useState([]);
  const [firewall, setFirewall] = useState(null);

  // Form inputs
  const [newAdTitle, setNewAdTitle] = useState('');
  const [newAdSponsor, setNewAdSponsor] = useState('');
  const [newAdReward, setNewAdReward] = useState('2.50');
  const [blockIpInput, setBlockIpInput] = useState('');
  const [customBalanceInput, setCustomBalanceInput] = useState('');

  const refreshData = () => {
    setUser(mockDB.getUser());
    setWithdrawals(mockDB.getWithdrawals());
    setAds(mockDB.getAds());
    setMarketplace(mockDB.getMarketplace());
    setDonations(mockDB.getDonations());
    setFirewall(mockDB.getFirewall());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Handlers
  const handleApproveWithdrawal = (txId) => {
    mockDB.updateWithdrawalStatus(txId, 'Completed');
    refreshData();
  };

  const handleRejectWithdrawal = (txId) => {
    mockDB.updateWithdrawalStatus(txId, 'Rejected');
    refreshData();
  };

  const handleCreateAd = (e) => {
    e.preventDefault();
    if (!newAdTitle || !newAdSponsor) return;
    mockDB.addAd({ title: newAdTitle, sponsor: newAdSponsor, reward: newAdReward });
    setNewAdTitle('');
    setNewAdSponsor('');
    refreshData();
  };

  const handleToggleAd = (adId) => {
    mockDB.toggleAdStatus(adId);
    refreshData();
  };

  const handleRemoveAd = (adId) => {
    mockDB.removeAd(adId);
    refreshData();
  };

  const handleRemoveListing = (pkgId) => {
    mockDB.removeMarketplaceListing(pkgId);
    refreshData();
  };

  const handleVerifyDonation = (donId) => {
    mockDB.verifyDonation(donId);
    refreshData();
  };

  const handleBlockIp = (e) => {
    e.preventDefault();
    if (!blockIpInput) return;
    mockDB.blockIP(blockIpInput);
    setBlockIpInput('');
    refreshData();
  };

  const handleUnblockIp = (ip) => {
    mockDB.unblockIP(ip);
    refreshData();
  };

  const handleSetCustomBalance = (e) => {
    e.preventDefault();
    const val = parseFloat(customBalanceInput);
    if (!isNaN(val)) {
      mockDB.updateUser({ balance: val });
      setCustomBalanceInput('');
      refreshData();
    }
  };

  if (!user || !firewall) return <div style={{ color: '#ffffff', padding: '40px' }}>Loading Admin Console...</div>;

  const totalWithdrawalAmount = withdrawals.reduce((acc, w) => acc + (w.status === 'Completed' ? w.amount : 0), 0);
  const totalDonationAmount = donations.reduce((acc, d) => acc + d.amount, 0);

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Admin Top Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '32px',
        background: 'rgba(10, 15, 30, 0.8)',
        border: '1px solid var(--glass-border-glow)',
        borderRadius: '16px',
        padding: '20px 28px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'rgba(255, 77, 77, 0.15)',
            border: '1px solid #ff4d4d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ff4d4d'
          }}>
            <ShieldAlert size={26} />
          </div>
          <div>
            <div className="badge badge-pink" style={{ marginBottom: '4px' }}>ROOT ACCESS LEVEL 0</div>
            <h2 style={{ fontSize: '1.5rem', color: '#ffffff' }}>VictorADS Administrative Console</h2>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <button onClick={refreshData} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.82rem' }}>
            <RefreshCw size={14} /> Refresh Logs
          </button>
          <button onClick={onLogout} className="btn-danger" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
            <Lock size={14} /> End Admin Session
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '32px',
        borderBottom: '1px solid var(--glass-border)',
        paddingBottom: '12px'
      }}>
        {[
          { id: 'analytics', label: 'Platform Analysis', icon: BarChart3 },
          { id: 'withdrawals', label: 'Withdrawal Cashier', icon: Wallet, count: withdrawals.filter(w => w.status.includes('Pending')).length },
          { id: 'ads', label: 'Ads & Sponsor Control', icon: Megaphone, count: ads.filter(a => a.reported).length },
          { id: 'marketplace', label: 'Marketplace Trades', icon: ShoppingBag },
          { id: 'firewall', label: 'Firewall & Security', icon: Shield },
          { id: 'users', label: 'User Customization', icon: Sliders }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '10px',
                fontSize: '0.88rem',
                fontWeight: 600,
                border: isActive ? '1px solid var(--neon-cyan)' : '1px solid var(--glass-border)',
                background: isActive ? 'rgba(0, 242, 254, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                color: isActive ? 'var(--neon-cyan)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Icon size={16} />
              {tab.label}
              {tab.count > 0 && (
                <span style={{
                  background: '#ff4d4d',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  padding: '2px 8px',
                  fontSize: '0.7rem',
                  fontWeight: 800
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Platform Analytics */}
      {activeTab === 'analytics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <div className="glass-card" style={{ padding: '20px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active User Wallet</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--neon-green)', fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
                ₹{user.balance.toFixed(2)}
              </div>
            </div>
            <div className="glass-card" style={{ padding: '20px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Bandwidth Shared</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--neon-cyan)', fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
                {(user.dataSharedMB / 1024).toFixed(2)} GB
              </div>
            </div>
            <div className="glass-card" style={{ padding: '20px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Completed Payouts Paid</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
                ₹{totalWithdrawalAmount.toFixed(2)}
              </div>
            </div>
            <div className="glass-card" style={{ padding: '20px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Verified Donations Pool</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--neon-pink)', fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
                ₹{totalDonationAmount.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Withdrawal Cashier */}
      {activeTab === 'withdrawals' && (
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '16px' }}>Payout Verification Queue</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>Tx ID</th>
                  <th style={{ padding: '12px' }}>Method</th>
                  <th style={{ padding: '12px' }}>Amount</th>
                  <th style={{ padding: '12px' }}>Destination</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map(w => (
                  <tr key={w.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px', color: 'var(--neon-cyan)' }}>{w.id}</td>
                    <td style={{ padding: '12px', color: '#ffffff' }}>{w.method}</td>
                    <td style={{ padding: '12px', fontWeight: 700, color: 'var(--neon-green)' }}>₹{w.amount}</td>
                    <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{w.address}</td>
                    <td style={{ padding: '12px' }}>
                      <span className={`badge ${w.status === 'Completed' ? 'badge-green' : (w.status === 'Rejected' ? 'badge-pink' : 'badge-gold')}`}>
                        {w.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      {w.status.includes('Pending') && (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => handleApproveWithdrawal(w.id)} className="btn-green" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>
                            <CheckCircle2 size={14} /> Approve
                          </button>
                          <button onClick={() => handleRejectWithdrawal(w.id)} className="btn-danger" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>
                            <XCircle size={14} /> Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Ads & Sponsor Control */}
      {activeTab === 'ads' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Create Ad */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Plus size={18} color="var(--neon-cyan)" /> Create Sponsor Ad Campaign
            </h3>
            <form onSubmit={handleCreateAd} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              <input
                type="text"
                placeholder="Ad Title (e.g. NeoCloud Host)"
                value={newAdTitle}
                onChange={(e) => setNewAdTitle(e.target.value)}
                className="form-input"
                required
              />
              <input
                type="text"
                placeholder="Sponsor Name"
                value={newAdSponsor}
                onChange={(e) => setNewAdSponsor(e.target.value)}
                className="form-input"
                required
              />
              <input
                type="number"
                step="0.1"
                placeholder="Reward Amount (₹)"
                value={newAdReward}
                onChange={(e) => setNewAdReward(e.target.value)}
                className="form-input"
                required
              />
              <button type="submit" className="btn-primary" style={{ height: '100%', justifyContent: 'center' }}>
                Deploy Ad Campaign
              </button>
            </form>
          </div>

          {/* Manage Ads List */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '16px' }}>Active & Reported Ads Registry</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {ads.map(a => (
                <div key={a.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(255,255,255,0.03)',
                  border: a.reported ? '1px solid #ff4d4d' : '1px solid var(--glass-border)',
                  padding: '14px 18px',
                  borderRadius: '10px'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontWeight: 700, color: '#ffffff' }}>{a.title}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>By {a.sponsor}</span>
                      {a.reported && (
                        <span className="badge badge-pink" style={{ fontSize: '0.65rem' }}>
                          <AlertTriangle size={12} /> REPORTED BY USER
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                      Reward: ₹{a.reward} | Total Views: {a.views}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      onClick={() => handleToggleAd(a.id)}
                      className={a.active ? 'btn-secondary' : 'btn-green'}
                      style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                    >
                      {a.active ? 'Disable' : 'Enable'}
                    </button>
                    <button
                      onClick={() => handleRemoveAd(a.id)}
                      className="btn-danger"
                      style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Data Marketplace Trades */}
      {activeTab === 'marketplace' && (
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '16px' }}>Manage P2P Marketplace Listings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {marketplace.map(m => (
              <div key={m.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(255,255,255,0.03)',
                padding: '14px',
                borderRadius: '10px',
                border: '1px solid var(--glass-border)'
              }}>
                <div>
                  <span style={{ color: 'var(--neon-cyan)', fontWeight: 700 }}>{m.seller}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: '10px' }}>
                    {m.amountMB} MB @ ₹{m.pricePerMB}/MB (Total: ₹{m.totalCost})
                  </span>
                </div>
                <button onClick={() => handleRemoveListing(m.id)} className="btn-danger" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>
                  <Trash2 size={14} /> Delete Listing
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Firewall & Security */}
      {activeTab === 'firewall' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '16px' }}>Firewall & DDoS Shield Control</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>DDoS Shield Status</span>
                <div style={{ color: 'var(--neon-green)', fontWeight: 700, fontSize: '1.1rem', marginTop: '2px' }}>
                  ACTIVE (120 req/min)
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Threat Scans Completed</span>
                <div style={{ color: 'var(--neon-cyan)', fontWeight: 700, fontSize: '1.1rem', marginTop: '2px' }}>
                  {firewall.totalScans} Requests
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Threats Neutralized</span>
                <div style={{ color: 'var(--neon-pink)', fontWeight: 700, fontSize: '1.1rem', marginTop: '2px' }}>
                  {firewall.threatsNeutralized} Attacks
                </div>
              </div>
            </div>

            {/* Block IP Form */}
            <form onSubmit={handleBlockIp} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Enter IP Address to Block (e.g. 192.168.1.50)"
                value={blockIpInput}
                onChange={(e) => setBlockIpInput(e.target.value)}
                className="form-input"
                required
              />
              <button type="submit" className="btn-danger" style={{ flexShrink: 0 }}>
                Block IP Address
              </button>
            </form>

            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', marginBottom: '10px' }}>Blocked IP Blacklist</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {firewall.blockedIPs.map(ip => (
                <div key={ip} style={{
                  background: 'rgba(255, 77, 77, 0.12)',
                  border: '1px solid rgba(255, 77, 77, 0.3)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.82rem',
                  color: '#ff4d4d'
                }}>
                  <code>{ip}</code>
                  <button onClick={() => handleUnblockIp(ip)} style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer' }}>
                    <XCircle size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: User Balance Customization */}
      {activeTab === 'users' && (
        <div className="glass-card" style={{ padding: '24px', maxWidth: '600px' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '16px' }}>Override User Wallet Balance</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>
            Set active user wallet balance for testing payouts or administrative adjustments.
          </p>
          <form onSubmit={handleSetCustomBalance} style={{ display: 'flex', gap: '10px' }}>
            <input
              type="number"
              step="0.01"
              placeholder="Enter new wallet balance (₹)"
              value={customBalanceInput}
              onChange={(e) => setCustomBalanceInput(e.target.value)}
              className="form-input"
              required
            />
            <button type="submit" className="btn-green" style={{ flexShrink: 0 }}>
              Update Wallet
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
