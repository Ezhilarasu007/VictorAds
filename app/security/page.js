export const metadata = { title: 'Security Overview | VictorADS' };

export default function SecurityPage() {
  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '850px' }}>
      <h1 style={{ fontSize: '2.4rem', color: '#ffffff', marginBottom: '24px' }}>Security & Firewall System</h1>
      <div className="glass-card" style={{ padding: '36px', lineHeight: '1.8', color: 'var(--text-main)' }}>
        <h2>Zero Trust Architecture</h2>
        <p>VictorADS utilizes TLS 1.3 encryption, DDoS mitigation shields, and strict anti-bruteforce lockout systems for administrative portals.</p>
      </div>
    </div>
  );
}
