import Link from 'next/link';
import { ShieldCheck, Zap, Globe, Award } from 'lucide-react';

export const metadata = { title: 'About Us | VictorADS Platform' };

export default function AboutPage() {
  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '850px' }}>
      <div style={{ marginBottom: '32px' }}>
        <div className="badge badge-cyan" style={{ marginBottom: '8px' }}>Company Profile</div>
        <h1 style={{ fontSize: '2.4rem', color: '#ffffff' }}>About VictorADS</h1>
      </div>

      <div className="glass-card" style={{ padding: '36px', lineHeight: '1.8', color: 'var(--text-main)' }}>
        <h2>Empowering Global Internet Users through Decentralized Rewards</h2>
        <p>
          Founded in 2026, VictorADS was architected to bridge the gap between unused residential internet bandwidth and high-demand web intelligence enterprise research networks.
        </p>

        <h3 style={{ marginTop: '24px', color: '#ffffff' }}>Our Core Pillars</h3>
        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
          <li><strong>Absolute Data Privacy:</strong> Bandwidth routing operates exclusively on isolated proxy layers without ever accessing local files or personal information.</li>
          <li><strong>AdSense & Webmaster Compliance:</strong> Built from the ground up to follow strict Google search and advertising guidelines.</li>
          <li><strong>Instant Micro-Payouts:</strong> direct NPCI-verified UPI transfers and NEFT banking payouts starting at ₹500.</li>
        </ul>
      </div>
    </div>
  );
}
