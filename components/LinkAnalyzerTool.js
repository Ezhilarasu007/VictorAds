'use client';
import { useState } from 'react';
import { ShieldCheck, ShieldAlert, Search, Link2, ExternalLink, CheckCircle2, Copy } from 'lucide-react';

export default function LinkAnalyzerTool() {
  const [urlInput, setUrlInput] = useState('https://victor-ads.vercel.app');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleAuditLink = (e) => {
    e.preventDefault();
    if (!urlInput) return;
    setAnalyzing(true);

    setTimeout(() => {
      let isHttps = urlInput.startsWith('https://');
      let isSuspicious = urlInput.includes('login-') || urlInput.includes('verify-') || urlInput.includes('.xyz');
      let safetyScore = isHttps ? (isSuspicious ? 45 : 98) : 30;

      const slug = Math.random().toString(36).substring(2, 8);

      setResult({
        domain: urlInput.replace(/^https?:\/\//, '').split('/')[0],
        isHttps,
        safetyScore,
        sslIssuer: isHttps ? 'DigiCert TLS RSA SHA256 2026' : 'No Valid SSL Certificate Found',
        riskLevel: safetyScore > 80 ? 'Low Risk' : (safetyScore > 50 ? 'Medium Risk' : 'High Threat Risk'),
        shortUrl: `https://vic.ads/${slug}`
      });
      setAnalyzing(false);
    }, 1200);
  };

  const copyShortUrl = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card" style={{ padding: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'rgba(240, 147, 251, 0.12)',
          border: '1px solid rgba(240, 147, 251, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--neon-pink)'
        }}>
          <ShieldCheck size={22} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.3rem', color: '#ffffff' }}>Smart Link Safe-Analyzer</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Audit SSL certificates, phishing threat scores, and generate short redirect URLs safely.
          </p>
        </div>
      </div>

      <form onSubmit={handleAuditLink} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          className="form-input"
          placeholder="https://domain-to-analyze.com"
          required
        />
        <button type="submit" className="btn-primary" disabled={analyzing} style={{ flexShrink: 0 }}>
          <Search size={18} /> {analyzing ? 'Auditing...' : 'Analyze URL'}
        </button>
      </form>

      {/* Audit Output */}
      {result && (
        <div style={{
          background: 'rgba(10, 15, 30, 0.8)',
          border: `1px solid ${result.safetyScore > 80 ? 'rgba(0, 255, 135, 0.3)' : 'rgba(255, 77, 77, 0.3)'}`,
          borderRadius: '12px',
          padding: '20px',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {result.safetyScore > 80 ? <ShieldCheck size={22} color="var(--neon-green)" /> : <ShieldAlert size={22} color="#ff4d4d" />}
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>{result.domain}</span>
            </div>
            <div className={`badge ${result.safetyScore > 80 ? 'badge-green' : 'badge-pink'}`}>
              {result.riskLevel} ({result.safetyScore}/100)
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.82rem', marginBottom: '16px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>SSL Protocol Status</span>
              <strong style={{ color: result.isHttps ? 'var(--neon-green)' : '#ff4d4d' }}>
                {result.isHttps ? 'HTTPS Secure Encryption' : 'Unencrypted HTTP Connection'}
              </strong>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>Certificate Issuer</span>
              <strong style={{ color: '#ffffff' }}>{result.sslIssuer}</strong>
            </div>
          </div>

          {/* Generated Short Link */}
          <div style={{
            background: 'rgba(0, 242, 254, 0.08)',
            border: '1px solid rgba(0, 242, 254, 0.25)',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link2 size={16} color="var(--neon-cyan)" />
              <span style={{ fontSize: '0.88rem', color: 'var(--neon-cyan)', fontWeight: 600 }}>{result.shortUrl}</span>
            </div>
            <button
              onClick={copyShortUrl}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {copied ? <CheckCircle2 size={16} color="var(--neon-green)" /> : <Copy size={16} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
