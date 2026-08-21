'use client';
import { useState, useEffect } from 'react';
import { mockDB } from '@/lib/mockDB';
import { Wallet, ShieldCheck, ArrowUpRight, AlertCircle, CheckCircle2, Lock, History } from 'lucide-react';

export default function WithdrawPage() {
  const [user, setUser] = useState(null);
  const [withdrawals, setWithdrawals] = useState([]);
  const [method, setMethod] = useState('UPI');
  const [amount, setAmount] = useState('550');
  
  // UPI Form
  const [upiAddress, setUpiAddress] = useState('alexvance@upi');

  // Bank Form
  const [accNo, setAccNo] = useState('918237492019');
  const [ifsc, setIfsc] = useState('HDFC0001234');
  const [holderName, setHolderName] = useState('Alex Vance');

  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const refreshData = () => {
    setUser(mockDB.getUser());
    setWithdrawals(mockDB.getWithdrawals());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleWithdraw = (e) => {
    e.preventDefault();
    setMessage('');
    setErrorMsg('');

    const targetAddress = method === 'UPI' ? upiAddress : `${accNo} (${ifsc})`;

    try {
      mockDB.requestWithdrawal(parseFloat(amount), method, targetAddress);
      setMessage(`Withdrawal request of ₹${amount} submitted successfully!`);
      refreshData();
    } catch (err) {
      setErrorMsg(err.message || 'Withdrawal request failed');
    }
  };

  if (!user) return <div style={{ padding: '60px', color: '#ffffff' }}>Loading Cashier...</div>;

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div className="badge badge-green" style={{ marginBottom: '8px' }}>
          <Wallet size={14} /> Instant Payout Gateway
        </div>
        <h1 style={{ fontSize: '2.2rem', color: '#ffffff' }}>Cashier & Payout Ledger</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
          Transfer your accumulated rewards directly to your Virtual Payment Address (UPI) or Bank Account.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px' }}>
        {/* Left Form: Request Payout */}
        <div className="glass-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.4rem', color: '#ffffff' }}>Request Withdrawal</h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--neon-green)', fontWeight: 700 }}>
              Available: ₹{user.balance.toFixed(2)}
            </div>
          </div>

          {message && (
            <div style={{
              background: 'rgba(0, 255, 135, 0.1)',
              border: '1px solid rgba(0, 255, 135, 0.3)',
              padding: '12px',
              borderRadius: '8px',
              color: 'var(--neon-green)',
              fontSize: '0.85rem',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircle2 size={16} /> {message}
            </div>
          )}

          {errorMsg && (
            <div style={{
              background: 'rgba(255, 77, 77, 0.1)',
              border: '1px solid rgba(255, 77, 77, 0.3)',
              padding: '12px',
              borderRadius: '8px',
              color: '#ff4d4d',
              fontSize: '0.85rem',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <AlertCircle size={16} /> {errorMsg}
            </div>
          )}

          <form onSubmit={handleWithdraw} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Method Tabs */}
            <div>
              <label style={{ display: 'block', color: '#ffffff', fontWeight: 600, fontSize: '0.85rem', marginBottom: '8px' }}>
                Select Payout Channel
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setMethod('UPI')}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: method === 'UPI' ? '1px solid var(--neon-cyan)' : '1px solid var(--glass-border)',
                    background: method === 'UPI' ? 'rgba(0, 242, 254, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    color: method === 'UPI' ? 'var(--neon-cyan)' : 'var(--text-muted)',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  UPI VPA Transfer
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('Bank Transfer')}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: method === 'Bank Transfer' ? '1px solid var(--neon-cyan)' : '1px solid var(--glass-border)',
                    background: method === 'Bank Transfer' ? 'rgba(0, 242, 254, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    color: method === 'Bank Transfer' ? 'var(--neon-cyan)' : 'var(--text-muted)',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Direct Bank NEFT
                </button>
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <label style={{ display: 'block', color: '#ffffff', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>
                Withdrawal Amount (Min ₹500)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="form-input"
                min="500"
                required
              />
            </div>

            {/* Dynamic Fields */}
            {method === 'UPI' ? (
              <div>
                <label style={{ display: 'block', color: '#ffffff', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>
                  Virtual Payment Address (UPI ID)
                </label>
                <input
                  type="text"
                  value={upiAddress}
                  onChange={(e) => setUpiAddress(e.target.value)}
                  className="form-input"
                  placeholder="username@upi"
                  required
                />
              </div>
            ) : (
              <>
                <div>
                  <label style={{ display: 'block', color: '#ffffff', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    value={holderName}
                    onChange={(e) => setHolderName(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#ffffff', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>
                    Bank Account Number
                  </label>
                  <input
                    type="text"
                    value={accNo}
                    onChange={(e) => setAccNo(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#ffffff', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    value={ifsc}
                    onChange={(e) => setIfsc(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
              </>
            )}

            <button type="submit" className="btn-green" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
              <ArrowUpRight size={18} /> Submit Withdrawal Request
            </button>
          </form>

          {/* Security Notice */}
          <div style={{
            marginTop: '20px',
            padding: '12px',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--glass-border)',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Lock size={16} color="var(--neon-green)" />
            <span><strong>Security Notice:</strong> VictorADS will NEVER ask for your UPI PIN or banking passwords to send payments.</span>
          </div>
        </div>

        {/* Right Ledger: History */}
        <div className="glass-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <History size={20} color="var(--neon-cyan)" />
            <h2 style={{ fontSize: '1.4rem', color: '#ffffff' }}>Live Transaction Ledger</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {withdrawals.map((tx) => (
              <div key={tx.id} style={{
                background: 'rgba(10, 15, 30, 0.7)',
                border: '1px solid var(--glass-border)',
                padding: '14px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 700, color: '#ffffff' }}>₹{tx.amount.toFixed(2)}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--neon-cyan)' }}>{tx.method}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                    Ref: {tx.reference} | Date: {tx.date}
                  </div>
                </div>

                <span className={`badge ${tx.status === 'Completed' ? 'badge-green' : (tx.status === 'Rejected' ? 'badge-pink' : 'badge-gold')}`}>
                  {tx.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
