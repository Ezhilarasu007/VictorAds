export const metadata = { title: 'Third-Party Services | VictorADS' };

export default function ThirdPartyServicesPage() {
  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '850px' }}>
      <h1 style={{ fontSize: '2.4rem', color: '#ffffff', marginBottom: '24px' }}>Third-Party Service Integration</h1>
      <div className="glass-card" style={{ padding: '36px', lineHeight: '1.8', color: 'var(--text-main)' }}>
        <h2>Integrated Ecosystem Partners</h2>
        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
          <li><strong>NPCI Unified Payments Interface (UPI):</strong> Powers scannable QR donations to <code>arasu9629hf@okhdfcbank</code> and cashier payouts.</li>
          <li><strong>Google AdSense Network:</strong> Provides vetted, compliant rewarded sponsor campaigns.</li>
          <li><strong>Vercel Serverless Platform:</strong> Global edge network deployment with SSL/TLS termination.</li>
        </ul>
      </div>
    </div>
  );
}
