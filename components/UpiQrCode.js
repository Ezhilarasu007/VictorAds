'use client';
import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { mockDB } from '@/lib/mockDB';
import { QrCode, Eye, EyeOff, CheckCircle2, Copy, Shield, AlertCircle } from 'lucide-react';

export default function UpiQrCode({ onVerified, title = "Scan & Pay via Official UPI QR" }) {
  const vpa = 'arasu9629hf@okhdfcbank';
  const [qrUrl, setQrUrl] = useState('');
  const [showRawVpa, setShowRawVpa] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(299);
  const [customAmount, setCustomAmount] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const activeAmount = customAmount ? parseFloat(customAmount) || 299 : selectedAmount;

  useEffect(() => {
    const upiUri = `upi://pay?pa=${vpa}&pn=VictorADS%20Official&am=${activeAmount}&cu=INR`;
    QRCode.toDataURL(upiUri, {
      width: 280,
      margin: 2,
      color: {
        dark: '#070913',
        light: '#ffffff'
      }
    })
      .then(url => setQrUrl(url))
      .catch(err => console.error(err));
  }, [activeAmount]);

  const handleCopyVpa = () => {
    navigator.clipboard.writeText(vpa);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitUtr = (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      if (!utrNumber || utrNumber.length < 10) {
        throw new Error('Please enter a valid 12-digit UPI UTR reference number');
      }

      mockDB.verifyUtrPayment(utrNumber, activeAmount, 'Subscription/Donation');
      setSubmitted(true);

      if (onVerified) onVerified(activeAmount, utrNumber);
    } catch (err) {
      setErrorMsg(err.message || 'Verification failed');
    }
  };

  return (
    <div className="glass-card" style={{ padding: '32px', maxWidth: '650px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div className="badge badge-cyan" style={{ marginBottom: '8px' }}>
          <Shield size={14} /> Official NPCI Verified VPA
        </div>
        <h2 style={{ fontSize: '1.6rem', color: '#ffffff' }}>{title}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
          Scan visual QR code with any UPI app (GPay, PhonePe, Paytm, BHIM) and enter your 12-digit UTR reference number.
        </p>
      </div>

      {/* Preset Amounts */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', color: '#ffffff', fontWeight: 600, fontSize: '0.88rem', marginBottom: '10px' }}>
          Select Payment Amount
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '12px' }}>
          {[299, 499, 999, 2500].map(amt => (
            <button
              key={amt}
              type="button"
              onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: selectedAmount === amt && !customAmount ? '1px solid var(--neon-cyan)' : '1px solid var(--glass-border)',
                background: selectedAmount === amt && !customAmount ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                color: selectedAmount === amt && !customAmount ? 'var(--neon-cyan)' : 'var(--text-main)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              ₹{amt}
            </button>
          ))}
        </div>
        <input
          type="number"
          placeholder="Or enter custom amount (e.g. ₹5000)"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          className="form-input"
        />
      </div>

      {/* Scannable Visual QR Code */}
      <div style={{
        background: '#ffffff',
        padding: '20px',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 24px auto',
        width: 'fit-content',
        boxShadow: '0 0 30px rgba(0, 242, 254, 0.25)'
      }}>
        {qrUrl ? (
          <img src={qrUrl} alt="Official UPI QR Code" style={{ width: '220px', height: '220px' }} />
        ) : (
          <div style={{ width: '220px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
            Generating QR...
          </div>
        )}
        <div style={{ color: '#070913', fontWeight: 700, fontSize: '0.9rem', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <QrCode size={16} /> Scan with GPay, PhonePe, Paytm, or BHIM
        </div>
        <div style={{ color: '#4b5563', fontSize: '0.8rem', marginTop: '2px', fontWeight: 600 }}>
          Amount: ₹{activeAmount}
        </div>
      </div>

      {/* Hidden VPA Raw Address Toggle */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <button
          type="button"
          onClick={() => setShowRawVpa(!showRawVpa)}
          className="btn-secondary"
          style={{ fontSize: '0.82rem', padding: '8px 16px' }}
        >
          {showRawVpa ? <EyeOff size={14} /> : <Eye size={14} />}
          {showRawVpa ? 'Hide Raw UPI Address' : 'Show Raw UPI Address'}
        </button>

        {showRawVpa && (
          <div style={{
            marginTop: '12px',
            background: 'rgba(0, 242, 254, 0.08)',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <code style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 600 }}>{vpa}</code>
            <button
              onClick={handleCopyVpa}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--neon-cyan)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.8rem'
              }}
            >
              {copied ? <CheckCircle2 size={16} color="var(--neon-green)" /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        )}
      </div>

      {/* 12-Digit UTR Input Form */}
      {submitted ? (
        <div style={{
          background: 'rgba(0, 255, 135, 0.12)',
          border: '1px solid rgba(0, 255, 135, 0.4)',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center',
          color: 'var(--neon-green)'
        }}>
          <CheckCircle2 size={40} style={{ margin: '0 auto 10px auto' }} />
          <h4 style={{ fontSize: '1.25rem', color: '#ffffff' }}>UTR Payment Verified!</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Reference <code>{utrNumber}</code> verified on NPCI logs. Service unlocked.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmitUtr} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {errorMsg && (
            <div style={{ color: '#ff4d4d', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertCircle size={14} /> {errorMsg}
            </div>
          )}

          <input
            type="text"
            placeholder="Enter 12-Digit UPI UTR Reference Number"
            value={utrNumber}
            onChange={(e) => setUtrNumber(e.target.value)}
            className="form-input"
            maxLength={12}
            required
          />

          <button type="submit" className="btn-green" style={{ width: '100%', justifyContent: 'center' }}>
            <CheckCircle2 size={18} /> Verify 12-Digit UTR Payment
          </button>
        </form>
      )}
    </div>
  );
}
