'use client';
import { useState, useEffect } from 'react';
import { mockDB } from '@/lib/mockDB';
import { ShoppingBag, Plus, ShieldCheck, ArrowRight, Coins, AlertCircle, CheckCircle2, Layers } from 'lucide-react';

export default function MarketplacePage() {
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form State
  const [amountGB, setAmountGB] = useState('50');
  const [pricePerGB, setPricePerGB] = useState('25');

  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const refreshData = () => {
    setUser(mockDB.getUser());
    setListings(mockDB.getMarketplace());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleCreateListing = (e) => {
    e.preventDefault();
    setMessage('');
    setErrorMsg('');

    try {
      mockDB.addMarketplaceListing(amountGB, pricePerGB);
      setMessage('Data package published to P2P Marketplace!');
      setShowCreateModal(false);
      refreshData();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to publish listing');
    }
  };

  const handleBuyPackage = (pkgId) => {
    setMessage('');
    setErrorMsg('');

    try {
      mockDB.buyMarketplacePackage(pkgId);
      setMessage('Data package purchased! GB credited to your node balance.');
      refreshData();
    } catch (err) {
      setErrorMsg(err.message || 'Purchase failed');
    }
  };

  if (!user) return <div style={{ padding: '60px', color: '#ffffff' }}>Loading Data Marketplace...</div>;

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '32px' }}>
        <div>
          <div className="badge badge-cyan" style={{ marginBottom: '8px' }}>
            <ShoppingBag size={14} /> P2P Bandwidth Exchange
          </div>
          <h1 style={{ fontSize: '2.2rem', color: '#ffffff' }}>Data Marketplace (GB & TB Scale)</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
            Trade unthrottled gigabytes and terabytes directly with other node earners.
          </p>
        </div>

        <button onClick={() => setShowCreateModal(true)} className="btn-primary">
          <Plus size={18} /> List Data Package for Sale
        </button>
      </div>

      {message && (
        <div style={{
          background: 'rgba(0, 255, 135, 0.12)',
          border: '1px solid rgba(0, 255, 135, 0.4)',
          padding: '14px',
          borderRadius: '10px',
          color: 'var(--neon-green)',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={18} /> {message}
        </div>
      )}

      {errorMsg && (
        <div style={{
          background: 'rgba(255, 77, 77, 0.12)',
          border: '1px solid rgba(255, 77, 77, 0.4)',
          padding: '14px',
          borderRadius: '10px',
          color: '#ff4d4d',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <AlertCircle size={18} /> {errorMsg}
        </div>
      )}

      {/* 10% Survival Fee Card */}
      <div className="glass-card" style={{ padding: '16px 24px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <ShieldCheck size={24} color="var(--neon-green)" />
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <strong style={{ color: '#ffffff' }}>10% Platform Survival Fee:</strong> Automatically deducted on trades to fund DDoS firewall and high-speed relay servers.
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid-3">
        {listings.map((pkg) => {
          const isTb = pkg.amountGB >= 1000;
          const displayVolume = isTb ? `${(pkg.amountGB / 1000).toFixed(1)} TB` : `${pkg.amountGB} GB`;

          return (
            <div key={pkg.id} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="badge badge-green">Seller: {pkg.seller}</span>
                  <span style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: 600 }}>★ {pkg.rating}</span>
                </div>

                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: isTb ? 'var(--neon-pink)' : 'var(--neon-cyan)', fontFamily: 'var(--font-heading)', marginBottom: '4px' }}>
                  {displayVolume} Data
                </h3>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Rate: ₹{pkg.pricePerGB}/GB
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Total Cost</span>
                  <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--neon-green)' }}>
                    ₹{pkg.totalCost.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleBuyPackage(pkg.id)}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Coins size={16} /> Buy Package
              </button>
            </div>
          );
        })}
      </div>

      {/* Create Listing Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '16px' }}>
              List Bandwidth Package (GB / TB Scale)
            </h3>

            <form onSubmit={handleCreateListing} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', color: '#ffffff', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>
                  Data Volume (GB) - Enter 1000 for 1 TB
                </label>
                <input
                  type="number"
                  value={amountGB}
                  onChange={(e) => setAmountGB(e.target.value)}
                  className="form-input"
                  min="1"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#ffffff', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>
                  Price per GB (₹)
                </label>
                <input
                  type="number"
                  step="1"
                  value={pricePerGB}
                  onChange={(e) => setPricePerGB(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--neon-green)', fontWeight: 700 }}>
                Total Listing Payout: ₹{(parseFloat(amountGB || 0) * parseFloat(pricePerGB || 0)).toLocaleString('en-IN')}
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <button type="submit" className="btn-green" style={{ flex: 1, justifyContent: 'center' }}>
                  Publish Package
                </button>
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
