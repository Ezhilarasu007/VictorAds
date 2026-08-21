'use client';
import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download, Copy, CheckCircle2 } from 'lucide-react';

export default function QrGeneratorTool() {
  const [inputText, setInputText] = useState('https://victor-ads.vercel.app');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [colorTheme, setColorTheme] = useState('cyan');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!inputText) return;
    const colorMap = {
      cyan: { dark: '#00f2fe', light: '#070913' },
      green: { dark: '#00ff87', light: '#070913' },
      classic: { dark: '#000000', light: '#ffffff' }
    };

    QRCode.toDataURL(inputText, {
      width: 300,
      margin: 2,
      color: colorMap[colorTheme] || colorMap.cyan
    })
      .then(url => setQrDataUrl(url))
      .catch(err => console.error(err));
  }, [inputText, colorTheme]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `VictorADS_QR_${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="glass-card" style={{ padding: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'rgba(0, 255, 135, 0.12)',
          border: '1px solid rgba(0, 255, 135, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--neon-green)'
        }}>
          <QrCode size={22} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.3rem', color: '#ffffff' }}>URL & Text to QR Code</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Generate instant high-definition QR vector PNG images for website URLs or UPI links.
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', color: '#ffffff', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>
          Target URL or String
        </label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="form-input"
          placeholder="https://example.com or UPI URI"
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', color: '#ffffff', fontWeight: 600, fontSize: '0.85rem', marginBottom: '8px' }}>
          QR Aesthetic Palette
        </label>
        <div style={{ display: 'flex', gap: '10px' }}>
          {[
            { id: 'cyan', label: 'Neon Cyan' },
            { id: 'green', label: 'Emerald Green' },
            { id: 'classic', label: 'High-Contrast BW' }
          ].map((theme) => (
            <button
              key={theme.id}
              onClick={() => setColorTheme(theme.id)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: colorTheme === theme.id ? '1px solid var(--neon-cyan)' : '1px solid var(--glass-border)',
                background: colorTheme === theme.id ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                color: colorTheme === theme.id ? 'var(--neon-cyan)' : 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              {theme.label}
            </button>
          ))}
        </div>
      </div>

      {/* QR Output Showcase */}
      {qrDataUrl && (
        <div style={{
          background: 'rgba(4, 6, 14, 0.8)',
          border: '1px solid var(--glass-border)',
          borderRadius: '12px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '20px'
        }}>
          <img src={qrDataUrl} alt="Generated QR Code" style={{ width: '200px', height: '200px', borderRadius: '8px' }} />
          <button onClick={handleDownload} className="btn-green" style={{ width: '100%', justifyContent: 'center' }}>
            <Download size={18} /> Download High-Res PNG Image
          </button>
        </div>
      )}
    </div>
  );
}
