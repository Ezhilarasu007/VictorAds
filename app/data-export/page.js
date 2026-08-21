'use client';
import { mockDB } from '@/lib/mockDB';
import { Download } from 'lucide-react';

export default function DataExportPage() {
  const handleExportData = () => {
    const data = {
      user: mockDB.getUser(),
      withdrawals: mockDB.getWithdrawals(),
      donations: mockDB.getDonations()
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VictorADS_UserData_Export_${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '850px' }}>
      <h1 style={{ fontSize: '2.4rem', color: '#ffffff', marginBottom: '24px' }}>Data Export & Privacy Self-Service</h1>
      <div className="glass-card" style={{ padding: '36px' }}>
        <h2 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '12px' }}>Download Your Platform Record</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
          Export a complete JSON copy of your wallet balance, transaction ledger, and node activity history directly to your device.
        </p>
        <button onClick={handleExportData} className="btn-primary">
          <Download size={18} /> Export JSON Personal Record
        </button>
      </div>
    </div>
  );
}
