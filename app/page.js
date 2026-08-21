'use client';
import Link from 'next/link';
import EarningsCalculator from '@/components/EarningsCalculator';
import TutorialVideos from '@/components/TutorialVideos';
import { 
  Zap, 
  Wifi, 
  Wallet, 
  ArrowRight, 
  ShieldCheck, 
  Gift, 
  CheckCircle2,
  Tv,
  Coins,
  Sparkles
} from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      {/* Hero Banner Section */}
      <section style={{
        position: 'relative',
        paddingTop: '65px',
        paddingBottom: '85px',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '40px', alignItems: 'center' }}>
            {/* Left Copy */}
            <div>
              <div className="badge badge-green" style={{ marginBottom: '18px' }}>
                <Zap size={14} /> MyV3 / MoneyGain Earning Architecture
              </div>
              
              <h1 style={{
                fontSize: 'clamp(2.6rem, 5vw, 4rem)',
                fontWeight: 900,
                lineHeight: '1.1',
                marginBottom: '20px',
                color: '#ffffff'
              }}>
                Watch Rewarded Sponsor Ads & Share Data on <span className="gradient-text-emerald">VictorADS</span>
              </h1>

              <p style={{
                fontSize: '1.1rem',
                color: 'var(--text-muted)',
                lineHeight: '1.6',
                marginBottom: '32px'
              }}>
                Earn ₹5.00 per 15s video ad view + 35 VictorCoins. 70% revenue share is credited instantly to your wallet, while 30% is automatically deposited into the Admin Vault. Redeem Amazon, Flipkart, or Google Play vouchers instantly!
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <Link href="/dashboard" className="btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                  <Tv size={18} /> Start Watching Ads & Earning <ArrowRight size={18} />
                </Link>
                <Link href="/vouchers" className="btn-green" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                  <Gift size={18} /> Redeem Gift Cards
                </Link>
              </div>

              {/* Guarantees */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '36px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} color="var(--emerald-primary)" /> 70% User Earner Payout
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Coins size={16} color="var(--gold-accent)" /> 30% Auto Admin Vault
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} color="var(--cyan-accent)" /> 24/7 Instant Cashier
                </span>
              </div>
            </div>

            {/* Right Card Feature Showcase */}
            <div className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="badge badge-gold"><Sparkles size={14} /> Daily Earning Hub</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--emerald-primary)', fontWeight: 700 }}>100% Real-Time</span>
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '20px', borderRadius: '14px' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Rewarded Video Ad View</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--emerald-primary)', fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
                  ₹5.00 <span style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 400 }}>Gross / View</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  70% Earner = ₹3.50 + 35 Coins | 30% Admin = ₹1.50
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Minimum Payout</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>₹250.00</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Payout Speed</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--emerald-primary)', marginTop: '2px' }}>Instant 24/7</div>
                </div>
              </div>

              <Link href="/dashboard" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem' }}>
                Open MyV3 Watch & Earn Console
              </Link>
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
