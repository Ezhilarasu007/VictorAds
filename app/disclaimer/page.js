export const metadata = { title: 'Disclaimer | VictorADS' };

export default function DisclaimerPage() {
  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '850px' }}>
      <h1 style={{ fontSize: '2.4rem', color: '#ffffff', marginBottom: '24px' }}>Platform Disclaimer</h1>
      <div className="glass-card" style={{ padding: '36px', lineHeight: '1.8', color: 'var(--text-main)' }}>
        <h2>Financial & Earnings Disclaimer</h2>
        <p>Earnings displayed on VictorADS depend on network uptime, local ISP speeds, and sponsor ad availability. Projected income estimates in calculators do not constitute financial guarantees.</p>
      </div>
    </div>
  );
}
