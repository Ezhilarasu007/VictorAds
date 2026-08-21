export const metadata = { title: 'Terms & Conditions | VictorADS' };

export default function TermsPage() {
  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '850px' }}>
      <h1 style={{ fontSize: '2.4rem', color: '#ffffff', marginBottom: '24px' }}>Terms & Conditions</h1>
      <div className="glass-card" style={{ padding: '36px', lineHeight: '1.8', color: 'var(--text-main)' }}>
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing VictorADS, you agree to abide by all platform rules, minimum withdrawal thresholds (₹500), and marketplace trade commissions (10%).</p>

        <h2 style={{ marginTop: '20px' }}>2. Prohibited Conduct</h2>
        <p>Automated bot scripts, invalid ad click generation, and attempt to breach administrative PIN security portals will result in instant account ban and IP blacklisting.</p>
      </div>
    </div>
  );
}
