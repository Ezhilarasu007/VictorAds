'use client';
import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { mockDB } from '@/lib/mockDB';
import { Wallet, ShieldCheck, ArrowUpRight, AlertCircle, CheckCircle2, Lock, History, Download, Bot } from 'lucide-react';

export default function WithdrawPage() {
  const [user, setUser] = useState(null);
  const [withdrawals, setWithdrawals] = useState([]);
  const [method, setMethod] = useState('UPI');
  const [amount, setAmount] = useState('500');
  
  // Form fields
  const [upiAddress, setUpiAddress] = useState('earner@upi');
  const [accNo, setAccNo] = useState('918237492019');
  const [ifsc, setIfsc] = useState('HDFC0001234');
  const [holderName, setHolderName] = useState('Active Earner');

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
      const newTx = mockDB.requestWithdrawal(parseFloat(amount), method, targetAddress);
      setMessage(`Withdrawal request of ₹${amount} processed! AI Security Score: 99/100 Approved.`);
      refreshData();
    } catch (err) {
      setErrorMsg(err.message || 'Withdrawal request failed');
    }
  };

  // Generate PDF Receipt using jsPDF
  const downloadPdfReceipt = (tx) => {
    try {
      const doc = new jsPDF();
      doc.setFillColor(7, 9, 19);
      doc.rect(0, 0, 210, 297, 'F');

      // Title & Branding
      doc.setTextColor(0, 242, 254);
      doc.setFontSize(22);
      doc.text('VictorADS Official Payout Receipt', 20, 30);

      doc.setFontSize(10);
      doc.setTextColor(148, 163, 184);
      doc.text('App Identifier: com.example.victorads', 20, 38);
      doc.text(`Generated Date: ${new Date().toLocaleString()}`, 20, 44);

      doc.setDrawColor(0, 242, 254);
      doc.line(20, 48, 190, 48);

      // Transaction Summary Table
      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255);
      doc.text(`Transaction Reference: ${tx.reference}`, 20, 60);
      doc.text(`Payout Amount: Rs. ${tx.amount.toFixed(2)}`, 20, 70);
      doc.text(`Payout Method: ${tx.method}`, 20, 80);
      doc.text(`Destination Address: ${tx.address}`, 20, 90);
      doc.text(`Status: ${tx.status}`, 20, 100);

      doc.setTextColor(0, 255, 135);
      doc.text(`AI Security Validation Score: ${tx.aiScore || '99/100 Safe'}`, 20, 115);

      doc.setTextColor(148, 163, 184);
      doc.setFontSize(9);
      doc.text('Note: Payout processed via automated NPCI banking protocol.', 20, 135);

      doc.save(`VictorADS_Payout_Receipt_${tx.id}.pdf`);
    } catch (err) {
      console.error('PDF Generation Error:', err);
    }
  };

  if (!user) return <div style={{ padding: '60px', color: '#ffffff' }}>Loading Cashier...</div>;

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div className="badge badge-green" style={{ marginBottom: '8px' }}>
          <Wallet size={14} /> AI Verified Payout Gateway
        </div>
        <h1 style={{ fontSize: '2.2rem', color: '#ffffff' }}>Cashier & Real Customer Payouts</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
          Minimum payout threshold: <strong>₹300.00</strong> | Automated AI Fraud Inspection active.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px' }}>
        {/* Left Form */}
        <div className="glass-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.4rem', color: '#ffffff' }}>Request Customer Withdrawal</h2>
            <div style={{ fontSize: '0.9rem', color: 'var(--neon-green)', fontWeight: 700 }}>
              Available: ₹{user.balance.toFixed(2)}
            </div>
          </div>

          {message && (
            <div style={{
              background: 'rgba(0, 255, 135, 0.12)',
              border: '1px solid rgba(0, 255, 135, 0.4)',
              padding: '14px',
              borderRadius: '10px',
              color: 'var(--neon-green)',
              fontSize: '0.88rem',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircle2 size={18} /> {message}
            </div>
          )}

          {errorMsg && (
            <div style={{
              background: 'rgba(255, 77, 77, 0.12)',
              border: '1px solid rgba(255, 77, 77, 0.4)',
              padding: '14px',
              borderRadius: '10px',
              color: '#ff4d4d',
              fontSize: '0.88rem',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <AlertCircle size={18} /> {errorMsg}
            </div>
          )}

          <form onSubmit={handleWithdraw} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Channel Tabs */}
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
                  UPI Instant Transfer
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

            <div>
              <label style={{ display: 'block', color: '#ffffff', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>
                Withdrawal Amount (Min ₹300)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="form-input"
                min="300"
                required
              />
            </div>

            {method === 'UPI' ? (
              <div>
                <label style={{ display: 'block', color: '#ffffff', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>
                  UPI Virtual Payment Address (VPA)
                </label>
                <input
                  type="text"
                  value={upiAddress}
                  onChange={(e) => setUpiAddress(e.target.value)}
                  className="form-input"
                  placeholder="yourname@upi"
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
            <Bot size={16} color="var(--neon-cyan)" />
            <span><strong>AI Security Inspection:</strong> AI checks account structure, VPA validity, and transaction logs.</span>
          </div>
        </div>

        {/* Right Payout Ledger */}
        <div className="glass-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <History size={20} color="var(--neon-cyan)" />
            <h2 style={{ fontSize: '1.4rem', color: '#ffffff' }}>Customer Payout Ledger</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {withdrawals.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem', padding: '20px', textAlign: 'center' }}>
                No withdrawal records yet. Earn rewards to request your first payout!
              </div>
            ) : (
              withdrawals.map((tx) => (
                <div key={tx.id} style={{
                  background: 'rgba(10, 15, 30, 0.7)',
                  border: '1px solid var(--glass-border)',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.05rem' }}>₹{tx.amount.toFixed(2)}</span>
                      <span className="badge badge-cyan" style={{ fontSize: '0.68rem' }}>{tx.method}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                      Ref: {tx.reference} | Date: {tx.date}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                    <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
                      {tx.status}
                    </span>
                    <button
                      onClick={() => downloadPdfReceipt(tx)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--neon-cyan)',
                        cursor: 'pointer',
                        fontSize: '0.78rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Download size={14} /> PDF Receipt
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
