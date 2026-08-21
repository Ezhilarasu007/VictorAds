'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mockDB } from '@/lib/mockDB';
import { 
  Zap, 
  LayoutDashboard, 
  Wrench, 
  Wallet, 
  ShoppingBag, 
  Heart, 
  Crown, 
  Gift,
  Users, 
  HelpCircle,
  Lock, 
  Menu, 
  X,
  Coins
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [balance, setBalance] = useState(0.00);
  const [coins, setCoins] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const updateUserData = () => {
      const u = mockDB.getUser();
      setBalance(u.balance);
      setCoins(u.coins);
    };

    updateUserData();
    const interval = setInterval(updateUserData, 2000);
    return () => clearInterval(interval);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home', icon: Zap },
    { href: '/dashboard', label: 'Earning Station', icon: LayoutDashboard },
    { href: '/vouchers', label: 'Redeem Hub', icon: Gift },
    { href: '/how-to-use', label: 'Guide', icon: HelpCircle },
    { href: '/tools', label: '100+ Tools', icon: Wrench },
    { href: '/withdraw', label: 'Cashier 24/7', icon: Wallet },
    { href: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
    { href: '/donate', label: 'Donate', icon: Heart },
    { href: '/subscriptions', label: 'VIP', icon: Crown },
    { href: '/community', label: 'Community', icon: Users },
    { href: '/admin', label: 'Admin', icon: Lock },
  ];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 900,
      background: 'rgba(3, 7, 18, 0.9)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px'
      }}>
        {/* Brand Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(16,185,129,0.4)'
          }}>
            <Zap size={24} color="#ffffff" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 900,
              fontSize: '1.45rem',
              letterSpacing: '-0.03em',
              color: '#ffffff'
            }}>
              Victor<span className="gradient-text-emerald">ADS</span>
            </span>
            <span style={{ fontSize: '0.62rem', color: 'var(--emerald-primary)', letterSpacing: '0.06em', fontWeight: 700 }}>
              MYV3/MONEYGAIN STATION
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-nav">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--emerald-primary)' : 'var(--text-muted)',
                  background: isActive ? 'rgba(16, 185, 129, 0.12)' : 'transparent',
                  border: isActive ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={14} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* User Balance Badges & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link href="/vouchers" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '9999px',
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            color: 'var(--gold-accent)',
            fontWeight: 700,
            fontSize: '0.82rem'
          }}>
            <Coins size={14} />
            <span>{coins} C</span>
          </Link>

          <Link href="/withdraw" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '9999px',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            color: 'var(--emerald-primary)',
            fontWeight: 800,
            fontSize: '0.88rem'
          }}>
            <span>₹{balance.toFixed(2)}</span>
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Mobile Menu"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              cursor: 'pointer',
              display: 'none',
              padding: '6px'
            }}
            className="mobile-toggle"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div style={{
          background: 'rgba(3, 7, 18, 0.98)',
          borderBottom: '1px solid var(--glass-border-glow)',
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '8px',
                  color: isActive ? 'var(--emerald-primary)' : 'var(--text-muted)',
                  background: isActive ? 'rgba(16, 185, 129, 0.12)' : 'transparent'
                }}
              >
                <Icon size={18} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}
