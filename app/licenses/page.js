export const metadata = { title: 'Licenses & Compliance | VictorADS' };

export default function LicensesPage() {
  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '850px' }}>
      <h1 style={{ fontSize: '2.4rem', color: '#ffffff', marginBottom: '24px' }}>Licenses & Open Source</h1>
      <div className="glass-card" style={{ padding: '36px', lineHeight: '1.8', color: 'var(--text-main)' }}>
        <h2>Open Source Software Compliance</h2>
        <p>VictorADS relies on trusted MIT and Apache-licensed libraries including Next.js, React, jsPDF, QRcode, and Lucide React Icons.</p>
      </div>
    </div>
  );
}
