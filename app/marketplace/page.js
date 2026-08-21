'use client';
import { useState, useEffect } from 'react';
import { mockDB } from '@/lib/mockDB';
import { ShoppingBag, Plus, ShieldCheck, ArrowRight, Coins, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function MarketplacePage() {
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Listing Form State
  const [amountMB, setAmountMB] = useState('1000');
  const [pricePerMB, setPricePerMB] = useState('0.15');

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
      mockDB.addMarketplaceListing(amountMB, pricePerMB);
      setMessage('Bandwidth listing published to marketplace!');
      setShowCreateModal(false);
      refreshData();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to create listing');
    }
  };

  const handleBuyPackage = (pkgId) => {
    setMessage('');
    setErrorMsg('');

    try {
      mockDB.buyMarketplacePackage(pkgId);
      setMessage('Package purchased successfully! Data MB credited to your node.');
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
          <h1 style={{ fontSize: '2.2rem', color: '#ffffff' }}>Data Marketplace</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
            Buy and sell unthrottled bandwidth data packets directly with other network earners.
          </p>
        </div>

        <button onClick={() => setShowCreateModal(true)} className="btn-primary">
          <Plus size={18} /> Sell Bandwidth Package
        </button>
      </div>

      {message && (
        <div style={{
          background: 'rgba(0, 255, 135, 0.1)',
          border: '1px solid rgba(0, 255, 135, 0.3)',
          padding: '12px 18px',
          borderRadius: '10px',
          color: 'var(--neon-green)',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={16} /> {message}
        </div>
      )}

      {errorMsg && (
        <div style={{
          background: 'rgba(255, 77, 77, 0.1)',
          border: '1px solid rgba(255, 77, 77, 0.3)',
          padding: '12px 18px',
          borderRadius: '10px',
          color: '#ff4d4d',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <AlertCircle size={16} /> {errorMsg}
        </div>
      )}

      {/* Marketplace Platform Survival Fee Notice */}
      <div className="glass-card" style={{ padding: '16px 24px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <ShieldCheck size={24} color="var(--neon-green)" />
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <strong style={{ color: '#ffffff' }}>10% Platform Survival Commission:</strong> Automatically deducted on bandwidth trades to support global relay servers and DDoS firewall maintenance.
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid-3">
        {listings.map((pkg) => (
          <div key={pkg.id} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-green">Seller: {pkg.seller}</span>
                <span style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: 600 }}>★ {pkg.rating}</span>
              </div>

              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neon-cyan)', fontFamily: 'var(--font-heading)', marginBottom: '4px' }}>
                {pkg.amountMB.toLocaleString()} <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-main)' }}>MB Data</span>
              </h3>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Wholesale Rate: ₹{pkg.pricePerMB}/MB
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.03)',
                padding: '10px 14px',
                borderRadius: '8px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Total Cost</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--neon-green)' }}>₹{pkg.totalCost.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => handleBuyPackage(pkg.id)}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Coins size={16} /> Buy with Wallet Balance
            </button>
          </div>
        ))}
      </div>

      {/* Create Listing Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '16px' }}>
              List Bandwidth Package for Sale
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px' }}>
              Offer unthrottled gigabytes to buyers at your custom rate per MB.
            </p>

            <form onSubmit={handleCreateListing} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', color: '#ffffff', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>
                  Bandwidth Volume (MB)
                </label>
                <input
                  type="number"
                  value={amountMB}
                  onChange={(e) => setAmountMB(e.target.value)}
                  className="form-input"
                  min="100"
                  step="100"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#ffffff', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>
                  Price per MB (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={pricePerMB}
                  onChange={(e) => setPricePerMB(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--neon-green)', fontWeight: 600 }}>
                Total Listing Payout: ₹{(parseFloat(amountMB || 0) * parseFloat(pricePerMB || 0)).toFixed(2)}
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <button type="submit" className="btn-green" style={{ flex: 1, justifyContent: 'center' }}>
                  Publish Listing
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
