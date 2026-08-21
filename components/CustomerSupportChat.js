'use client';
import { useState } from 'react';
import { MessageSquare, X, Send, Bot, User, ShieldCheck } from 'lucide-react';

export default function CustomerSupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am VictorAI, your 24/7 Customer Support Assistant. How can I help you earn rewards, withdraw funds, or redeem gift vouchers today?'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const quickQuestions = [
    'How do I earn 70% revenue share?',
    'How to request 24/7 instant UPI payout?',
    'How to redeem Amazon/Flipkart Gift Cards?',
    'What is the 30% platform split?'
  ];

  const handleSend = (userText) => {
    const text = userText || inputMsg;
    if (!text.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text }];
    setMessages(newMessages);
    if (!userText) setInputMsg('');

    // Generate automated AI bot reply
    setTimeout(() => {
      let botReply = '';
      const lower = text.toLowerCase();

      if (lower.includes('earn') || lower.includes('bandwidth') || lower.includes('share')) {
        botReply = 'To earn bandwidth rewards, go to Earning Station (/dashboard) and click "Start Sharing". You earn 70% of gross data yields credited directly into your cash balance and VictorCoins!';
      } else if (lower.includes('payout') || lower.includes('withdraw') || lower.includes('upi') || lower.includes('24/7')) {
        botReply = 'You can request payouts 24/7 under Cashier (/withdraw). Once your balance reaches ₹250, enter your UPI ID or Bank details. Payouts are processed instantly with downloadable PDF receipts!';
      } else if (lower.includes('voucher') || lower.includes('amazon') || lower.includes('flipkart') || lower.includes('redeem')) {
        botReply = 'Visit Redeem Hub (/vouchers). You can convert your VictorCoins or cash balance into 16-digit claim codes for Amazon Pay, Flipkart Vouchers, or Google Play Gift Cards!';
      } else if (lower.includes('30%') || lower.includes('split') || lower.includes('commission')) {
        botReply = 'VictorADS uses a transparent 70/30 model: 70% of gross ad & data yields go directly to you (the earner), while 30% is automatically routed to maintain global DDoS firewalls and relay servers.';
      } else if (lower.includes('admin') || lower.includes('pin')) {
        botReply = 'Platform administrators can unlock the Admin Console (/admin) using Security PIN 20032004 to manage payouts, block malicious IPs, and configure sponsor ads.';
      } else {
        botReply = 'Thank you for reaching out! You can explore our Earning Station (/dashboard), Redeem Hub (/vouchers), or User Guide (/how-to-use) for step-by-step instructions.';
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    }, 600);
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000 }}>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00f2fe 0%, #7f00ff 100%)',
            border: 'none',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 25px rgba(0, 242, 254, 0.4)',
            transition: 'transform 0.2s ease'
          }}
          aria-label="Open 24/7 AI Customer Support Chat"
        >
          <MessageSquare size={26} />
        </button>
      )}

      {isOpen && (
        <div style={{
          width: '360px',
          maxWidth: '90vw',
          height: '500px',
          background: '#0a0f1d',
          border: '1px solid var(--glass-border-glow)',
          borderRadius: '16px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'fadeIn 0.25s ease-out'
        }}>
          {/* Chat Header */}
          <div style={{
            background: 'rgba(16, 22, 42, 0.95)',
            borderBottom: '1px solid var(--glass-border)',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(0, 255, 135, 0.15)',
                border: '1px solid var(--neon-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--neon-green)'
              }}>
                <Bot size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.9rem' }}>VictorAI Support</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--neon-green)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ff87' }} />
                  24/7 Auto-Reply Active
                </div>
              </div>
            </div>

            <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <X size={18} />
            </button>
          </div>

          {/* Messages Body */}
          <div style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            fontSize: '0.85rem'
          }}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%'
                }}
              >
                <div style={{
                  background: m.sender === 'user' ? 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)' : 'rgba(255,255,255,0.06)',
                  color: m.sender === 'user' ? '#070913' : 'var(--text-main)',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  lineHeight: '1.4',
                  border: m.sender === 'bot' ? '1px solid var(--glass-border)' : 'none'
                }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Questions Chips */}
          <div style={{ padding: '8px 12px', display: 'flex', gap: '6px', overflowX: 'auto', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  background: 'rgba(0, 242, 254, 0.08)',
                  border: '1px solid rgba(0, 242, 254, 0.2)',
                  color: 'var(--neon-cyan)',
                  fontSize: '0.72rem',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            style={{
              padding: '12px',
              borderTop: '1px solid var(--glass-border)',
              display: 'flex',
              gap: '8px'
            }}
          >
            <input
              type="text"
              placeholder="Ask a question..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="form-input"
              style={{ fontSize: '0.85rem', padding: '8px 12px' }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '8px 14px' }}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
