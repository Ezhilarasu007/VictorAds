export const metadata = { title: 'Cookie Policy | VictorADS' };

export default function CookiesPage() {
  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '850px' }}>
      <h1 style={{ fontSize: '2.4rem', color: '#ffffff', marginBottom: '24px' }}>Cookie Policy</h1>
      <div className="glass-card" style={{ padding: '36px', lineHeight: '1.8', color: 'var(--text-main)' }}>
        <h2>Cookies and Local State Storage</h2>
        <p>VictorADS uses essential session tokens and browser LocalStorage to remember your wallet balance, settings, and UI options.</p>
      </div>
    </div>
  );
}
