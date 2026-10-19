'use client';

import { useState, useEffect } from 'react';
import { mockDB } from '@/lib/mockDB';
import {
  User,
  Mail,
  Phone,
  CreditCard,
  Building2,
  Save,
  CheckCircle2,
  Activity,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';

export default function UserProfileSection({ onProfileUpdated }) {
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState([]);
  const [saved, setSaved] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [upiId, setUpiId] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [holderName, setHolderName] = useState('');

  const refreshData = () => {
    const u = mockDB.getUser();
    setUser(u);
    setLogs(mockDB.getLogs());

    if (u) {
      setName(u.name || '');
      setEmail(u.email || '');
      setPhone(u.phone || '');
      setUpiId(u.upiId || '');
      setAccountNo(u.bankDetails?.accountNo || '');
      setIfsc(u.bankDetails?.ifsc || '');
      setHolderName(u.bankDetails?.holderName || '');
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    mockDB.updateUser({
      name,
      email,
      phone,
      upiId,
      bankDetails: {
        accountNo,
        ifsc,
        holderName
      }
    });

    mockDB.addLog('Profile', 'Updated payout credentials & profile information');
    setSaved(true);
    refreshData();
    if (onProfileUpdated) onProfileUpdated();
    setTimeout(() => setSaved(false), 3000);
  };

  if (!user) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Profile & Payout Settings Card */}
      <div className="glass-card" style={{ padding: '28px', border: '1px solid var(--emerald-primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <div className="badge badge-green" style={{ marginBottom: '6px' }}>
              <ShieldCheck size={14} /> Profile & Direct Payout Settings
            </div>
            <h2 style={{ fontSize: '1.5rem', color: '#ffffff' }}>Earner Profile Management</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              Save your default UPI ID and bank account details for instant 24/7 automated cashouts.
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Member Tier:</span>
            <div style={{ color: 'var(--emerald-primary)', fontWeight: 800, fontSize: '1rem' }}>
              {user.subscriptionTier}
            </div>
          </div>
        </div>

        {saved && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid var(--emerald-primary)',
            color: 'var(--emerald-primary)',
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.88rem',
            fontWeight: 600
          }}>
            <CheckCircle2 size={18} /> Earner profile details saved successfully to local node!
          </div>
        )}

        <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="grid-3" style={{ gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                placeholder="e.g. Rahul Sharma"
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="earner@example.com"
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
                Mobile Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-input"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '20px' }}>
            <h4 style={{ fontSize: '1rem', color: '#ffffff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CreditCard size={16} color="var(--cyan-accent)" /> Automated Payout Destinations
            </h4>

            <div className="grid-3" style={{ gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
                  Default UPI VPA ID
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="form-input"
                  placeholder="name@upi / GPay VPA"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
                  Bank Account Number
                </label>
                <input
                  type="text"
                  value={accountNo}
                  onChange={(e) => setAccountNo(e.target.value)}
                  className="form-input"
                  placeholder="e.g. 918273645012"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
                  Bank IFSC Code
                </label>
                <input
                  type="text"
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value)}
                  className="form-input"
                  placeholder="e.g. HDFC0001234"
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button type="submit" className="btn-primary" style={{ padding: '12px 28px' }}>
              <Save size={16} /> Save Profile Credentials
            </button>
          </div>
        </form>
      </div>

      {/* Activity & Yield Audit Logs */}
      <div className="glass-card" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <div className="badge badge-cyan" style={{ marginBottom: '6px' }}>
              <Activity size={14} /> Live Node Yield Audit Trail
            </div>
            <h3 style={{ fontSize: '1.3rem', color: '#ffffff' }}>Real Activity & Earnings Log</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Immutable real-time audit log of ad view yields, bandwidth transactions, and withdrawals.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
          {logs.map(log => (
            <div key={log.id} style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--glass-border)',
              padding: '12px 16px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.82rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>{log.type}</span>
                <span style={{ color: '#ffffff' }}>{log.message}</span>
              </div>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} /> {log.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
