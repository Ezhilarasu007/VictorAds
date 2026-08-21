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
  Users, 
  BookOpen, 
  HelpCircle,
  Lock, 
  Menu, 
  X,
  Coins
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [balance, setBalance] = useState(642.50);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const updateBalance = () => {
      const u = mockDB.getUser();
      setBalance(u.balance);
    };

    updateBalance();
    const interval = setInterval(updateBalance, 2000);
    return () => clearInterval(interval);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home', icon: Zap },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/how-to-use', label: 'How to Use', icon: HelpCircle },
    { href: '/tools', label: 'Tools', icon: Wrench },
    { href: '/withdraw', label: 'Cashier', icon: Wallet },
    { href: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
    { href: '/donate', label: 'Donate', icon: Heart },
    { href: '/subscriptions', label: 'VIP', icon: Crown },
    { href: '/community', label: 'Community', icon: Users },
    { href: '/articles', label: 'Articles', icon: BookOpen },
    { href: '/admin', label: 'Admin', icon: Lock },
  ];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 900,
      background: 'rgba(7, 9, 19, 0.85)',
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
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #00f2fe 0%, #7f00ff 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(0,242,254,0.4)'
          }}>
            <Zap size={22} color="#ffffff" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1.4rem',
              letterSpacing: '-0.03em',
              color: '#ffffff'
            }}>
              Victor<span className="gradient-text-cyan">ADS</span>
            </span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              REWARDS & DATA
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
                  gap: '6px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--neon-cyan)' : 'var(--text-muted)',
                  background: isActive ? 'rgba(0, 242, 254, 0.08)' : 'transparent',
                  border: isActive ? '1px solid rgba(0, 242, 254, 0.25)' : '1px solid transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={15} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* User Balance Badge & Mobile Menu Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/withdraw" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '9999px',
            background: 'rgba(0, 255, 135, 0.1)',
            border: '1px solid rgba(0, 255, 135, 0.3)',
            color: 'var(--neon-green)',
            fontWeight: 700,
            fontSize: '0.9rem',
            boxShadow: '0 0 15px rgba(0, 255, 135, 0.15)'
          }}>
            <Coins size={16} />
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
          background: 'rgba(10, 15, 30, 0.98)',
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
                  color: isActive ? 'var(--neon-cyan)' : 'var(--text-muted)',
                  background: isActive ? 'rgba(0, 242, 254, 0.1)' : 'transparent'
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
