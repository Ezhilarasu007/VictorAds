'use client';
import { useState } from 'react';
import { Play, CheckCircle2, ShieldCheck, Coins, Wifi, Zap, Gift, Info } from 'lucide-react';

export default function TutorialVideos() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [completed, setCompleted] = useState(false);

  const tutorials = [
    {
      id: 'tut_1',
      title: 'How to Monetize Bandwidth (70% Revenue Share)',
      duration: '0:15',
      category: 'Data Sharing',
      icon: Wifi,
      color: 'var(--neon-cyan)',
      desc: 'Learn how to toggle your bandwidth node in the dashboard. 70% of gross earnings are credited directly to your cash balance, while 30% funds platform maintenance.'
    },
    {
      id: 'tut_2',
      title: 'How to Watch Rewarded Video Ads for Coins',
      duration: '0:15',
      category: 'Video Ads',
      icon: Zap,
      color: 'var(--neon-green)',
      desc: 'Watch 15-second sponsor videos. Each completed view pays ₹5.00 gross rewards (70% = ₹3.50 + 35 VictorCoins credited instantly).'
    },
    {
      id: 'tut_3',
      title: 'How to Redeem Amazon & Flipkart Gift Cards',
      duration: '0:15',
      category: 'Vouchers',
      icon: Gift,
      color: 'var(--neon-pink)',
      desc: 'Convert VictorCoins or cash balance into 16-digit claim codes for Amazon Pay, Flipkart Vouchers, Google Play cards, or instant UPI bank payouts.'
    },
    {
      id: 'tut_4',
      title: 'P2P Data Marketplace & 1 TB Scale Selling',
      duration: '0:15',
      category: 'Marketplace',
      icon: Coins,
      color: '#fbbf24',
      desc: 'Sell bulk bandwidth packages up to 1 TB for ₹25,000! Trade unthrottled gigabytes directly on the peer-to-peer data exchange.'
    }
  ];

  const handleStartVideo = (tut) => {
    setActiveVideo(tut);
    setTimeLeft(15);
    setCompleted(false);

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="glass-card" style={{ padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          background: 'rgba(0, 242, 254, 0.12)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--neon-cyan)'
        }}>
          <Play size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.4rem', color: '#ffffff' }}>Interactive Video Tutorial Hub</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Tap any tutorial video below to watch 15-second guided simulations on earning, converting coins, and redeeming vouchers.
          </p>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid-2" style={{ marginBottom: '24px' }}>
        {tutorials.map((tut) => {
          const Icon = tut.icon;
          return (
            <div key={tut.id} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span className="badge badge-cyan" style={{ fontSize: '0.68rem' }}>{tut.category}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Length: {tut.duration}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Icon size={20} color={tut.color} />
                  <h4 style={{ fontSize: '1.05rem', color: '#ffffff' }}>{tut.title}</h4>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '16px' }}>
                  {tut.desc}
                </p>
              </div>

              <button
                onClick={() => handleStartVideo(tut)}
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
              >
                <Play size={15} /> Tap to Play Tutorial Simulation
              </button>
            </div>
          );
        })}
      </div>

      {/* Active Video Simulation Modal */}
      {activeVideo && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '550px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span className="badge badge-green">Video Simulation Active</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{activeVideo.category}</span>
            </div>

            <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '8px' }}>{activeVideo.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
              {activeVideo.desc}
            </p>

            {/* Video Canvas Simulation Screen */}
            <div style={{
              background: '#04060f',
              border: '1px solid var(--glass-border-glow)',
              borderRadius: '12px',
              height: '240px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '20px'
            }}>
              {completed ? (
                <div style={{ textAlign: 'center', animation: 'fadeIn 0.3s ease' }}>
                  <CheckCircle2 size={48} color="var(--neon-green)" style={{ margin: '0 auto 12px auto' }} />
                  <h4 style={{ fontSize: '1.2rem', color: '#ffffff' }}>Tutorial Completed!</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>You are now ready to start earning and redeeming rewards.</p>
                </div>
              ) : (
                <>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(0, 242, 254, 0.15)',
                    border: '1px solid var(--neon-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--neon-cyan)',
                    marginBottom: '14px',
                    animation: 'pulseGlow 2s infinite'
                  }}>
                    <Play size={28} />
                  </div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '2rem', color: '#ffffff' }}>
                    00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                  </div>
                  <div style={{ color: 'var(--neon-cyan)', fontSize: '0.8rem', marginTop: '4px' }}>
                    Simulating Step-by-Step Feature Walkthrough...
                  </div>
                </>
              )}

              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '6px',
                background: 'rgba(255,255,255,0.1)'
              }}>
                <div style={{
                  height: '100%',
                  width: `${((15 - timeLeft) / 15) * 100}%`,
                  background: 'linear-gradient(90deg, #00f2fe 0%, #00ff87 100%)',
                  transition: 'width 1s linear'
                }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setActiveVideo(null)} className="btn-green">
                {completed ? 'Close Tutorial' : 'Skip & Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
