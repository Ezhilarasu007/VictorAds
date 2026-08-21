import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

export const metadata = { title: 'Contact Us | VictorADS Platform' };

export default function ContactPage() {
  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '850px' }}>
      <div style={{ marginBottom: '32px' }}>
        <div className="badge badge-green" style={{ marginBottom: '8px' }}>24/7 Support Desk</div>
        <h1 style={{ fontSize: '2.4rem', color: '#ffffff' }}>Contact VictorADS</h1>
      </div>

      <div className="grid-2" style={{ marginBottom: '32px' }}>
        <div className="glass-card" style={{ padding: '28px' }}>
          <Mail size={24} color="var(--neon-cyan)" style={{ marginBottom: '12px' }} />
          <h3 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '6px' }}>Official Support Email</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>support@victor-ads.vercel.app</p>
        </div>

        <div className="glass-card" style={{ padding: '28px' }}>
          <ShieldCheck size={24} color="var(--neon-green)" style={{ marginBottom: '12px' }} />
          <h3 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '6px' }}>Compliance & Abuse Desk</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>compliance@victor-ads.vercel.app</p>
        </div>
      </div>
    </div>
  );
}
