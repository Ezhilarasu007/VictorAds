export const metadata = { title: 'Privacy Policy | VictorADS' };

export default function PrivacyPage() {
  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '850px' }}>
      <h1 style={{ fontSize: '2.4rem', color: '#ffffff', marginBottom: '24px' }}>Privacy Policy</h1>
      <div className="glass-card" style={{ padding: '36px', lineHeight: '1.8', color: 'var(--text-main)' }}>
        <h2>1. Information Collection and Storage</h2>
        <p>VictorADS values user confidentiality. We do not harvest personal files, contact lists, or browsing histories. Client authentication and local preferences are stored inside native browser LocalStorage.</p>

        <h2 style={{ marginTop: '20px' }}>2. Bandwidth Traffic Security</h2>
        <p>Shared bandwidth packets are routed exclusively via encrypted TLS 1.3 tunnels. Node traffic is strictly separated from local network hardware.</p>

        <h2 style={{ marginTop: '20px' }}>3. Third-Party Analytics and AdSense</h2>
        <p>We employ Google AdSense and standard webmaster telemetry tools to audit site traffic and ensure invalid traffic prevention.</p>
      </div>
    </div>
  );
}
