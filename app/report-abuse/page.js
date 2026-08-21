'use client';
import { useState } from 'react';
import { ShieldAlert, Send, CheckCircle2 } from 'lucide-react';

export default function ReportAbusePage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '850px' }}>
      <h1 style={{ fontSize: '2.4rem', color: '#ffffff', marginBottom: '24px' }}>Report Network Abuse</h1>
      <div className="glass-card" style={{ padding: '36px' }}>
        {submitted ? (
          <div style={{ color: 'var(--neon-green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={20} /> Abuse ticket submitted to security firewall desk.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '1.3rem', color: '#ffffff' }}>Submit Violation Ticket</h2>
            <input type="text" placeholder="Your Email Address" className="form-input" required />
            <input type="text" placeholder="Suspicious IP / URL / Ad Campaign ID" className="form-input" required />
            <textarea placeholder="Describe the suspected abuse, bot activity, or malware link..." className="form-textarea" rows={5} required />
            <button type="submit" className="btn-danger" style={{ justifyContent: 'center' }}>
              <ShieldAlert size={18} /> Submit Incident Report
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
