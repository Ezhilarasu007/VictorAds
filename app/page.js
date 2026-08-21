'use client';
import Link from 'next/link';
import ThreeDCanvas from '@/components/ThreeDCanvas';
import EarningsCalculator from '@/components/EarningsCalculator';
import TutorialVideos from '@/components/TutorialVideos';
import { ARTICLES } from '@/lib/articlesData';
import { 
  Zap, 
  Wifi, 
  Wallet, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Gift, 
  Users, 
  CheckCircle2, 
  Layers
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
                Earn up to 100 GB/day (or sell bulk 1 TB packages for ₹25,000!). Collect 70% revenue share directly into cash balance or VictorCoins, and redeem Amazon, Flipkart, or Google Play vouchers instantly.
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
                  <ShieldCheck size={16} color="var(--neon-green)" /> 70% Earner Revenue Payout
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} color="var(--neon-cyan)" /> Daily Limit 100 GB
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

      {/* Featured Educational Articles */}
      <section style={{ padding: '80px 0', background: 'rgba(5, 8, 18, 0.5)' }}>
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
