'use client';
import { useState } from 'react';
import { Trash2, AlertCircle } from 'lucide-react';

export default function DeleteAccountPage() {
  const [deleted, setDeleted] = useState(false);

  const handleDelete = () => {
    localStorage.clear();
    setDeleted(true);
  };

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '850px' }}>
      <h1 style={{ fontSize: '2.4rem', color: '#ffffff', marginBottom: '24px' }}>Delete Account & Erase Local State</h1>
      <div className="glass-card" style={{ padding: '36px' }}>
        {deleted ? (
          <div style={{ color: 'var(--neon-green)', fontWeight: 600 }}>
            Account data and local cache completely erased from this browser.
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '12px' }}>Permanent Local Data Wipe</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
              Warning: This action will permanently wipe your local storage wallet balance, transaction ledger, and node history from this device.
            </p>
            <button onClick={handleDelete} className="btn-danger">
              <Trash2 size={18} /> Wipe Local Account Data
            </button>
          </>
        )}
      </div>
    </div>
  );
}
