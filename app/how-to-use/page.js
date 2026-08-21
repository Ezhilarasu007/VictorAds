'use client';
import Link from 'next/link';
import { HelpCircle, Wifi, Play, Wallet, Wrench, ShoppingBag, Heart, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HowToUsePage() {
  const steps = [
    {
      num: '01',
      title: 'Monetize Bandwidth in Dashboard',
      icon: Wifi,
      color: 'var(--neon-cyan)',
      desc: 'Go to Earning Station (/dashboard). Click "Start Sharing" to activate your bandwidth node. Your browser safely routes encrypted research data and credits ₹0.10 per MB shared directly to your balance.'
    },
    {
      num: '02',
      title: 'Watch Rewarded Ads for Instant Cash',
      icon: Play,
      color: 'var(--neon-green)',
      desc: 'Under Earning Station (/dashboard), select any available sponsor ad campaign. Watch the 15-second countdown player completely. Once completed, ₹2.50 is instantly added to your wallet.'
    },
    {
      num: '03',
      title: 'Request Instant Cashier Payouts',
      icon: Wallet,
      color: 'var(--neon-pink)',
      desc: 'Navigate to Cashier (/withdraw). Once your wallet reaches ₹500, choose your preferred payout channel: UPI VPA (e.g. yourname@upi) or Direct Bank NEFT. Enter your details and submit. No PIN is ever requested from you to receive money.'
    },
    {
      num: '04',
      title: 'Use Privacy-First Browser Tools',
      icon: Wrench,
      color: '#fbbf24',
      desc: 'Visit Utility Tools (/tools). Compile multiple JPG/PNG images into a single A4 PDF, generate PNG QR codes for any website or UPI URI, or audit suspicious links with Smart Link Safe-Analyzer.'
    },
    {
      num: '05',
      title: 'Trade Data on P2P Marketplace',
      icon: ShoppingBag,
      color: 'var(--neon-cyan)',
      desc: 'Head over to Data Marketplace (/marketplace). List your excess unthrottled gigabytes for sale at wholesale rates or purchase data packages using your wallet balance. A 10% platform survival fee keeps node servers operational.'
    },
    {
      num: '06',
      title: 'Support Platform Uptime & Community',
      icon: Heart,
      color: 'var(--neon-green)',
      desc: 'Visit Platform Support (/donate). Scan the visual UPI QR code using GPay, PhonePe, Paytm, or BHIM for VPA arasu9629hf@okhdfcbank. Submit your 12-digit UTR reference number for instant verification.'
    },
    {
      num: '07',
      title: 'Access Admin Console (Platform Owners)',
      icon: Lock,
      color: 'var(--neon-pink)',
      desc: 'Go to Admin (/admin). Enter Security PIN 20032004 to unlock administrative control. Approve/reject payouts, add or remove ad campaigns, block abusive IPs, and customize wallet settings.'
    }
  ];

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '900px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div className="badge badge-cyan" style={{ marginBottom: '8px' }}>
          <HelpCircle size={14} /> User Onboarding Guide
        </div>
        <h1 style={{ fontSize: '2.4rem', color: '#ffffff' }}>How to Use VictorADS Platform</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', marginTop: '6px' }}>
          Complete step-by-step user guide for earning rewards, using tools, requesting payouts, and managing your account.
        </p>
      </div>

      {/* Step Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.num} className="glass-card" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${s.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: s.color,
                flexShrink: 0
              }}>
                <Icon size={24} />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: s.color, textTransform: 'uppercase' }}>
                    STEP {s.num}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>{s.title}</h3>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  {s.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action CTA */}
      <div className="glass-card" style={{ padding: '32px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', color: '#ffffff', marginBottom: '8px' }}>Ready to Start Earning?</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
          Open your earning station now and turn idle internet bandwidth into real income.
        </p>
        <Link href="/dashboard" className="btn-primary" style={{ padding: '12px 28px' }}>
          Open Earning Station <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
