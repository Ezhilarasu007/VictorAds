'use client';
import Link from 'next/link';
import ThreeDCanvas from '@/components/ThreeDCanvas';
import EarningsCalculator from '@/components/EarningsCalculator';
import { ARTICLES } from '@/lib/articlesData';
import { 
  Zap, 
  Wifi, 
  Wallet, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Globe, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Star 
} from 'lucide-react';

export default function HomePage() {
  const featuredArticles = ARTICLES.slice(0, 3);

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
                <Zap size={14} /> Next-Gen Digital Rewards & Data Monetization
              </div>
              
              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
                fontWeight: 900,
                lineHeight: '1.1',
                marginBottom: '20px',
                color: '#ffffff'
              }}>
                Monetize Idle Bandwidth & Watch Rewarded Ads on <span className="gradient-text-cyan">VictorADS</span>
              </h1>

              <p style={{
                fontSize: '1.1rem',
                color: 'var(--text-muted)',
                lineHeight: '1.6',
                marginBottom: '32px'
              }}>
                Turn unused home internet bandwidth into daily income. Watch 15-second sponsored ad campaigns, trade data packets on a P2P marketplace, and receive instant payouts directly to your UPI ID or Bank Account.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <Link href="/dashboard" className="btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                  Open Earning Station <ArrowRight size={18} />
                </Link>
                <Link href="/marketplace" className="btn-secondary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                  Explore Data Marketplace
                </Link>
              </div>

              {/* Guarantees */}
              <div style={{ display: 'flex', gap: '20px', marginTop: '32px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} color="var(--neon-green)" /> Min Payout ₹500
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} color="var(--neon-cyan)" /> 100% AdSense Compliant
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

      {/* Platform Statistics Counters */}
      <section style={{ padding: '50px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px'
          }}>
            {[
              { label: 'Total Payouts Distributed', val: '₹4.85 Million+', color: 'var(--neon-green)', icon: Wallet },
              { label: 'Bandwidth Data Shared', val: '1.25 Petabytes', color: 'var(--neon-cyan)', icon: Wifi },
              { label: 'Verified Global Earners', val: '142,000+ Users', color: 'var(--neon-pink)', icon: Users },
              { label: 'AdSense Uptime Metric', val: '99.98% Compliant', color: '#fbbf24', icon: Award }
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px auto',
                    color: stat.color
                  }}>
                    <Icon size={20} />
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: stat.color, fontFamily: 'var(--font-heading)' }}>
                    {stat.val}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Earnings Calculator Section */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <EarningsCalculator />
        </div>
      </section>

      {/* How It Works Cards */}
      <section style={{ padding: '60px 0', background: 'rgba(5, 8, 18, 0.5)', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 50px auto' }}>
            <div className="badge badge-pink" style={{ marginBottom: '10px' }}>Simplicity First</div>
            <h2 style={{ fontSize: '2.2rem', color: '#ffffff' }}>How VictorADS Monetization Works</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '8px' }}>
              Three effortless steps to begin collecting micro-rewards on desktop or smartphone.
            </p>
          </div>

          <div className="grid-3">
            <div className="glass-card" style={{ padding: '32px' }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 900,
                color: 'var(--neon-cyan)',
                fontFamily: 'var(--font-heading)',
                marginBottom: '16px'
              }}>01</div>
              <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '10px' }}>Enable Data Node</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Toggle the bandwidth simulator to route encrypted TLS 1.3 enterprise research packets. Earn ₹0.10 for every single megabyte shared.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '32px' }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 900,
                color: 'var(--neon-green)',
                fontFamily: 'var(--font-heading)',
                marginBottom: '16px'
              }}>02</div>
              <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '10px' }}>Watch Rewarded Ads</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Interact with 15-second verified sponsor showcase videos. Earn a fixed reward of ₹2.50 per ad directly into your wallet balance.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '32px' }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 900,
                color: 'var(--neon-pink)',
                fontFamily: 'var(--font-heading)',
                marginBottom: '16px'
              }}>03</div>
              <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '10px' }}>Instant Cashier Payouts</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Reach the minimum ₹500 threshold and request direct transfers to your Virtual Payment Address (UPI) or bank account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Educational Articles */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
            <div>
              <div className="badge badge-cyan" style={{ marginBottom: '8px' }}>Knowledge Base</div>
              <h2 style={{ fontSize: '2rem', color: '#ffffff' }}>Latest Educational Guides</h2>
            </div>
            <Link href="/articles" className="btn-secondary" style={{ fontSize: '0.88rem' }}>
              View All 25 Articles <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-3">
            {featuredArticles.map((art) => (
              <div key={art.slug} className="glass-card glass-card-interactive" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>{art.category}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{art.readTime}</span>
                  </div>
                  <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '10px', lineHeight: '1.4' }}>
                    {art.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '20px' }}>
                    {art.summary}
                  </p>
                </div>

                <Link href={`/articles/${art.slug}`} style={{ color: 'var(--neon-cyan)', fontWeight: 600, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Read Article <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
