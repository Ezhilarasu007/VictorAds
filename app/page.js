'use client';
import Link from 'next/link';
import ThreeDCanvas from '@/components/ThreeDCanvas';
import EarningsCalculator from '@/components/EarningsCalculator';
import TutorialVideos from '@/components/TutorialVideos';
import { 
  Zap, 
  Wifi, 
  Wallet, 
  ArrowRight, 
  ShieldCheck, 
  Gift, 
  CheckCircle2
} from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      {/* Hero Banner Section */}
      <section style={{
        position: 'relative',
        paddingTop: '60px',
        paddingBottom: '80px',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '40px', alignItems: 'center' }}>
            {/* Left Copy */}
            <div>
              <div className="badge badge-cyan" style={{ marginBottom: '16px' }}>
                <Zap size={14} /> 70% Customer Share / 30% Platform Split
              </div>
              
              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
                fontWeight: 900,
                lineHeight: '1.1',
                marginBottom: '20px',
                color: '#ffffff'
              }}>
                Monetize Internet Bandwidth & Watch Ads on <span className="gradient-text-cyan">VictorADS</span>
              </h1>

              <p style={{
                fontSize: '1.1rem',
                color: 'var(--text-muted)',
                lineHeight: '1.6',
                marginBottom: '32px'
              }}>
                Monetize up to 100 GB/day at optimal enterprise node yield rates. Collect 70% revenue share directly into cash balance or VictorCoins, and redeem Amazon, Flipkart, or Google Play vouchers instantly.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <Link href="/dashboard" className="btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                  Open Earning Station <ArrowRight size={18} />
                </Link>
                <Link href="/vouchers" className="btn-green" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                  <Gift size={18} /> Redeem Gift Cards
                </Link>
              </div>

              {/* Guarantees */}
              <div style={{ display: 'flex', gap: '20px', marginTop: '32px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} color="var(--neon-green)" /> 70% Earner Revenue Share
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} color="var(--neon-cyan)" /> Daily Cap 100 GB
                </span>
              </div>
            </div>

            {/* Right Interactive 3D Canvas */}
            <div className="glass-card" style={{ height: '420px', padding: '0', overflow: 'hidden', position: 'relative' }}>
              <ThreeDCanvas />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Video Tutorials Section */}
      <section style={{ padding: '60px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="container">
          <TutorialVideos />
        </div>
      </section>

      {/* Earnings Calculator Section */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <EarningsCalculator />
        </div>
      </section>
    </div>
  );
}
