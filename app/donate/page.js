'use client';
import UpiQrCode from '@/components/UpiQrCode';
import { Heart } from 'lucide-react';

export default function DonatePage() {
  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px auto' }}>
        <div className="badge badge-pink" style={{ marginBottom: '8px' }}>
          <Heart size={14} /> Community Patron Program
        </div>
        <h1 style={{ fontSize: '2.2rem', color: '#ffffff' }}>Support VictorADS Development</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
          VictorADS is dedicated to keeping digital tools, bandwidth sharing, and instant rewards open to everyone. Contributions directly maintain infrastructure uptime.
        </p>
      </div>

      <UpiQrCode />
    </div>
  );
}
