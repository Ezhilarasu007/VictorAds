'use client';
import { useState, useEffect } from 'react';
import { mockDB } from '@/lib/mockDB';
import jsPDF from 'jspdf';
import { 
  Wallet, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  AlertCircle, 
  CreditCard, 
  ArrowRight, 
  Lock,
  Building2,
  Clock
} from 'lucide-react';

export default function WithdrawPage() {
  const [user, setUser] = useState(null);
  const [withdrawals, setWithdrawals] = useState([]);
  const [payoutMethod, setPayoutMethod] = useState('UPI'); // 'UPI' or 'BANK'
  const [amount, setAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [holderName, setHolderName] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [latestTx, setLatestTx] = useState(null);

  const refreshData = () => {
    const u = mockDB.getUser();
    setUser(u);
    setWithdrawals(mockDB.getWithdrawals());
    if (u.upiId) setUpiId(u.upiId);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleWithdraw = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLatestTx(null);

    const address = payoutMethod === 'UPI' ? upiId : `A/C: ${accountNo} (${ifsc})`;
    if (payoutMethod === 'UPI' && !upiId.includes('@')) {
      setErrorMsg('Please enter a valid UPI address (e.g. yourname@upi)');
      return;
    }

    try {
      const updatedList = mockDB.requestWithdrawal(amount, payoutMethod, address);
      const newTx = updatedList[0];
      setLatestTx(newTx);
      setSuccessMsg(`Instant payout request of ₹${amount} initiated successfully! AI Inspection Score: 99/100 Safe.`);
      setAmount('');
      refreshData();
    } catch (err) {
      setErrorMsg(err.message || 'Payout request failed.');
    }
  };

  const generatePDFReceipt = (tx) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(3, 7, 18);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(16, 185, 129);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('VictorADS Cashier Payout Receipt', 14, 25);

    // Subheader
    doc.setTextColor(156, 163, 175);
    doc.setFontSize(10);
    doc.text('Official NPCI & AdSense Verified Payment Audit Log', 14, 34);

    // Body Metadata
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(12);
    doc.text(`Transaction Reference: ${tx.reference}`, 14, 55);
    doc.text(`Payout ID: ${tx.id}`, 14, 65);
    doc.text(`Date & Time: ${tx.date} (24/7 Instant Service)`, 14, 75);
    doc.text(`Payout Method: ${tx.method}`, 14, 85);
    doc.text(`Recipient Address: ${tx.address}`, 14, 95);
    
    doc.setFontSize(16);
    doc.setTextColor(16, 185, 129);
    doc.text(`Amount Credited: Rs. ${tx.amount.toFixed(2)}`, 14, 115);

    doc.setFontSize(11);
    doc.setTextColor(107, 114, 128);
    doc.text(`AI Fraud Risk Score: ${tx.aiScore}`, 14, 130);
    doc.text(`Status: ${tx.status}`, 14, 140);
    doc.text('App Package: com.example.victorads', 14, 150);

    // Footer Stamp
    doc.setDrawColor(16, 185, 129);
    doc.rect(14, 165, 180, 25);
    doc.setFontSize(10);
    doc.setTextColor(16, 185, 129);
    doc.text('DIGITALLY SIGNED & VERIFIED BY VICTORADS CASHIER ENGINE', 20, 180);

    doc.save(`VictorADS_Payout_Receipt_${tx.id}.pdf`);
  };

  if (!user) return <div style={{ padding: '60px', color: '#ffffff' }}>Loading 24/7 Cashier...</div>;

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div className="badge badge-green" style={{ marginBottom: '8px' }}>
          <Clock size={14} /> 24/7 Instant Payout Service
        </div>
        <h1 style={{ fontSize: '2.2rem', color: '#ffffff' }}>24/7 Cashier & Payout Ledger</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
          Request instant withdrawals directly to your UPI ID or Bank Account with AI security verification.
        </p>
      </div>

      {/* Wallet Balance Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div className="glass-card" style={{ padding: '24px', border: '1px solid var(--emerald-primary)' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Available Cash Balance</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--emerald-primary)', fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
            ₹{user.balance.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '4px' }}>
            Minimum payout threshold: ₹250.00
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Security Inspection</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald-primary)', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={22} /> 99/100 Safe
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '4px' }}>
            AI Fraud Protection Active
          </div>
        </div>
      </div>

      {/* Main Withdrawal Form */}
      <div className="grid-2" style={{ marginBottom: '40px' }}>
        <div className="glass-card" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '20px' }}>Request Payout</h3>

          {errorMsg && (
            <div style={{ background: 'rgba(255, 77, 77, 0.12)', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '12px', borderRadius: '10px', fontSize: '0.85rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={16} /> {errorMsg}
            </div>
          )}

          {successMsg && (
            <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid var(--emerald-primary)', color: 'var(--emerald-primary)', padding: '12px', borderRadius: '10px', fontSize: '0.85rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} /> {successMsg}
            </div>
          )}

          {/* Payout Method Selector */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <button
              onClick={() => setPayoutMethod('UPI')}
              className={payoutMethod === 'UPI' ? 'btn-green' : 'btn-secondary'}
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <CreditCard size={16} /> Instant UPI Transfer
            </button>
            <button
              onClick={() => setPayoutMethod('BANK')}
              className={payoutMethod === 'BANK' ? 'btn-green' : 'btn-secondary'}
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <Building2 size={16} /> Bank NEFT Transfer
            </button>
          </div>

          <form onSubmit={handleWithdraw} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Payout Amount (₹)
              </label>
              <input
                type="number"
                min="250"
                step="1"
                placeholder="Enter amount (min ₹250)..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="form-input"
                required
              />
            </div>

            {payoutMethod === 'UPI' ? (
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  UPI Address (VPA)
                </label>
                <input
                  type="text"
                  placeholder="e.g. yourname@okhdfcbank"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            ) : (
              <>
                <div>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full legal name"
                    value={holderName}
                    onChange={(e) => setHolderName(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    Bank Account Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter account number"
                    value={accountNo}
                    onChange={(e) => setAccountNo(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. HDFC0001234"
                    value={ifsc}
                    onChange={(e) => setIfsc(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
              </>
            )}

            <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '8px', padding: '14px' }}>
              Confirm Instant Payout <ArrowRight size={18} />
            </button>
          </form>
        </div>

        {/* Latest Receipt Card */}
        {latestTx && (
          <div className="glass-card" style={{ padding: '32px', border: '1px solid var(--emerald-primary)' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <CheckCircle2 size={48} color="var(--emerald-primary)" style={{ margin: '0 auto 10px auto' }} />
              <h3 style={{ fontSize: '1.4rem', color: '#ffffff' }}>Payout Dispatched!</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Reference: {latestTx.reference}</p>
            </div>

            <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Amount Credited:</span>
                <strong style={{ color: 'var(--emerald-primary)' }}>₹{latestTx.amount.toFixed(2)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Recipient:</span>
                <span style={{ color: '#ffffff' }}>{latestTx.address}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>AI Inspection:</span>
                <span style={{ color: 'var(--emerald-primary)' }}>{latestTx.aiScore}</span>
              </div>
            </div>

            <button onClick={() => generatePDFReceipt(latestTx)} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Download size={16} /> Download Official PDF Receipt
            </button>
          </div>
        )}
      </div>

      {/* Withdrawals History */}
      {withdrawals.length > 0 && (
        <div className="glass-card" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '20px' }}>Payout History Ledger</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {withdrawals.map(w => (
              <div key={w.id} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--glass-border)',
                padding: '16px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <span style={{ fontWeight: 800, color: 'var(--emerald-primary)', fontSize: '1.05rem' }}>₹{w.amount.toFixed(2)}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '12px' }}>({w.method} - {w.address})</span>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                    {w.date} | Ref: {w.reference}
                  </div>
                </div>

                <button onClick={() => generatePDFReceipt(w)} className="btn-secondary" style={{ fontSize: '0.8rem' }}>
                  <Download size={14} /> PDF Receipt
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
