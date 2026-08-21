'use client';
import Link from 'next/link';
import { ShieldCheck, Lock, Heart, Globe, Terminal } from 'lucide-react';

export default function Footer() {
  const legalLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms & Conditions' },
    { href: '/cookies', label: 'Cookie Policy' },
    { href: '/disclaimer', label: 'Disclaimer' },
    { href: '/copyright', label: 'Copyright Notice' },
    { href: '/security', label: 'Security Overview' },
    { href: '/refund-policy', label: 'Refund Policy' },
    { href: '/advertising-policy', label: 'Advertising Policy' },
    { href: '/licenses', label: 'Licenses & Compliance' },
    { href: '/data-export', label: 'Data Export' },
    { href: '/delete-account', label: 'Delete Account' },
    { href: '/report-abuse', label: 'Report Abuse' },
    { href: '/third-party-services', label: 'Third-Party Services' }
  ];

  return (
    <footer style={{
      background: 'rgba(5, 7, 15, 0.95)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      paddingTop: '60px',
      paddingBottom: '40px',
      marginTop: '80px',
      fontSize: '0.88rem',
      color: 'var(--text-muted)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Col 1: Brand */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              color: '#ffffff',
              fontSize: '1.4rem',
              marginBottom: '12px'
            }}>
              Victor<span className="gradient-text-cyan">ADS</span>
            </h3>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
              The next-generation digital rewards, bandwidth monetization, and browser utility platform. Built for global scalability, high AdSense compliance, and peer-to-peer data distribution.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--neon-green)', fontWeight: 600 }}>
              <ShieldCheck size={18} />
              <span>Google AdSense & NPCI Compliant</span>
            </div>
            <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              App Identifier: <code>com.example.victorads</code>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 style={{ color: '#ffffff', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>Platform Hubs</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link href="/dashboard" style={{ transition: 'color 0.2s' }}>Earning Station</Link></li>
              <li><Link href="/tools" style={{ transition: 'color 0.2s' }}>Utility Tools (PDF, QR, Analyzer)</Link></li>
              <li><Link href="/withdraw" style={{ transition: 'color 0.2s' }}>Cashier & Payout Ledger</Link></li>
              <li><Link href="/marketplace" style={{ transition: 'color 0.2s' }}>P2P Data Marketplace</Link></li>
              <li><Link href="/donate" style={{ transition: 'color 0.2s' }}>Platform Donations (UPI QR)</Link></li>
              <li><Link href="/subscriptions" style={{ transition: 'color 0.2s' }}>VIP Tier Memberships</Link></li>
              <li><Link href="/articles" style={{ transition: 'color 0.2s' }}>Educational Library (25 Guides)</Link></li>
            </ul>
          </div>

          {/* Col 3: Legal Suite */}
          <div>
            <h4 style={{ color: '#ffffff', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>Legal & Security</h4>
            <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} style={{ fontSize: '0.8rem', transition: 'color 0.2s' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Official VPA & Admin Security */}
          <div>
            <h4 style={{ color: '#ffffff', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>Support & Donations</h4>
            <p style={{ fontSize: '0.82rem', lineHeight: '1.5', marginBottom: '12px' }}>
              VictorADS relies on voluntary contributions to maintain global proxy relays and DDoS firewall infrastructure.
            </p>
            <div style={{
              background: 'rgba(0, 242, 254, 0.05)',
              border: '1px solid rgba(0, 242, 254, 0.2)',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '12px'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--neon-cyan)', marginBottom: '4px' }}>Official Support VPA</div>
              <code style={{ color: '#ffffff', fontSize: '0.85rem' }}>arasu9629hf@okhdfcbank</code>
            </div>
            <Link href="/admin" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem' }}>
              <Lock size={14} /> Admin Security Portal
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '0.8rem',
          color: 'var(--text-dim)'
        }}>
          <div>
            © {new Date().getFullYear()} VictorADS Inc. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>SSL 256-Bit Encrypted</span>
            <span>Zero Data Logging</span>
            <span>Vercel Serverless Production</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
