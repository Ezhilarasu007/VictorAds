'use client';
import { useState, useEffect } from 'react';
import { mockDB } from '@/lib/mockDB';
import AdminDashboard from '@/components/AdminDashboard';
import { Lock, ShieldAlert, KeyRound, AlertCircle, ShieldCheck } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [lockoutTimer, setLockoutTimer] = useState(0);

  // Verification PIN
  const targetPin = '20032004';

  useEffect(() => {
    // Check session
    const session = sessionStorage.getItem('victorads_admin_session');
    if (session === 'valid_20032004') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    let interval;
    if (lockoutTimer > 0) {
      interval = setInterval(() => {
        setLockoutTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [lockoutTimer]);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (lockoutTimer > 0) {
      setErrorMsg(`Terminal locked. Try again in ${lockoutTimer}s.`);
      return;
    }

    if (pinInput === targetPin) {
      sessionStorage.setItem('victorads_admin_session', 'valid_20032004');
      setIsAuthenticated(true);
      setPinInput('');
      // Reset firewall fail count
      mockDB.updateFirewall({ failedAdminAttempts: 0 });
    } else {
      const fw = mockDB.getFirewall();
      const newAttempts = fw.failedAdminAttempts + 1;
      mockDB.updateFirewall({ failedAdminAttempts: newAttempts });

      if (newAttempts >= 5) {
        setLockoutTimer(60); // 60s security lock
        setErrorMsg('SECURITY LOCKOUT: 5 Incorrect PIN attempts detected. Portal locked for 60 seconds.');
      } else {
        setErrorMsg(`Access Denied: Invalid Security PIN (${5 - newAttempts} attempts remaining)`);
      }
      setPinInput('');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('victorads_admin_session');
    setIsAuthenticated(false);
  };

  if (isAuthenticated) {
    return (
      <div className="container" style={{ paddingTop: '40px' }}>
        <AdminDashboard onLogout={handleLogout} />
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '80px', paddingBottom: '80px', maxWidth: '480px' }}>
      <div className="glass-card" style={{ padding: '36px', textAlign: 'center' }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'rgba(255, 77, 77, 0.15)',
          border: '1px solid #ff4d4d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ff4d4d',
          margin: '0 auto 16px auto'
        }}>
          <Lock size={28} />
        </div>

        <h1 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '6px' }}>
          Admin Authentication
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
          Restricted access portal for VictorADS platform administrators.
        </p>

        {errorMsg && (
          <div style={{
            background: 'rgba(255, 77, 77, 0.1)',
            border: '1px solid rgba(255, 77, 77, 0.3)',
            padding: '12px',
            borderRadius: '8px',
            color: '#ff4d4d',
            fontSize: '0.82rem',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textAlign: 'left'
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} /> {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <KeyRound size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="password"
              placeholder="Enter 8-Digit Security PIN"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '44px', textAlign: 'center', letterSpacing: '0.3em', fontSize: '1.1rem' }}
              disabled={lockoutTimer > 0}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-danger"
            disabled={lockoutTimer > 0}
            style={{ width: '100%', justifyContent: 'center', height: '46px', fontSize: '0.95rem' }}
          >
            {lockoutTimer > 0 ? `Locked (${lockoutTimer}s)` : 'Unlock Admin Terminal'}
          </button>
        </form>

        <div style={{ marginTop: '24px', fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <ShieldCheck size={14} color="var(--neon-green)" />
          TLS 1.3 Anti-Bruteforce Rate Limiter Active
        </div>
      </div>
    </div>
  );
}
