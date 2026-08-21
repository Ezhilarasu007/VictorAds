'use client';
import { useState, useEffect } from 'react';
import { mockDB } from '@/lib/mockDB';
import { Users, Star, ShieldCheck, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function CommunityPage() {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState('5');
  const [story, setStory] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const refreshReviews = () => {
    setReviews(mockDB.getCommunity());
  };

  useEffect(() => {
    refreshReviews();
  }, []);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!name || !story) return;

    mockDB.addCommunityReview(name, location || 'India', rating, story);
    setSubmitted(true);
    setName('');
    setLocation('');
    setStory('');
    refreshReviews();
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px auto' }}>
        <div className="badge badge-green" style={{ marginBottom: '8px' }}>
          <Users size={14} /> Verified Earner Testimonials
        </div>
        <h1 style={{ fontSize: '2.2rem', color: '#ffffff' }}>Community Experiences Wall</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
          Real feedback, earnings stories, and bandwidth optimization tips shared by verified VictorADS members.
        </p>
      </div>

      {/* Grid of Reviews */}
      <div className="grid-3" style={{ marginBottom: '50px' }}>
        {reviews.map((rev) => (
          <div key={rev.id} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ color: '#fbbf24', fontSize: '1rem' }}>
                  {'★'.repeat(rev.rating)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  <MapPin size={12} /> {rev.location}
                </div>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.6', marginBottom: '20px', fontStyle: 'italic' }}>
                "{rev.story}"
              </p>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.9rem' }}>{rev.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--neon-green)', fontWeight: 600 }}>{rev.earnings}</div>
              </div>
              {rev.verified && (
                <div className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                  <ShieldCheck size={12} /> Verified
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Submission Form */}
      <div className="glass-card" style={{ maxWidth: '650px', margin: '0 auto', padding: '32px' }}>
        <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '8px' }}>Share Your VictorADS Experience</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px' }}>
          Post your earnings story or bandwidth node tips to encourage new community members.
        </p>

        {submitted && (
          <div style={{
            background: 'rgba(0, 255, 135, 0.1)',
            border: '1px solid rgba(0, 255, 135, 0.3)',
            padding: '14px',
            borderRadius: '10px',
            color: 'var(--neon-green)',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle2 size={18} /> Thank you! Your story has been posted to the wall.
          </div>
        )}

        <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <input
              type="text"
              placeholder="Your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
            <input
              type="text"
              placeholder="Location (e.g. Bengaluru, KA)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-input"
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#ffffff', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>
              Rating
            </label>
            <select value={rating} onChange={(e) => setRating(e.target.value)} className="form-select">
              <option value="5">★★★★★ (5 Stars)</option>
              <option value="4">★★★★☆ (4 Stars)</option>
              <option value="3">★★★☆☆ (3 Stars)</option>
            </select>
          </div>

          <textarea
            placeholder="Write your experience, bandwidth speeds, or payout feedback..."
            value={story}
            onChange={(e) => setStory(e.target.value)}
            className="form-textarea"
            rows={4}
            required
          />

          <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
            <Send size={16} /> Publish Feedback to Wall
          </button>
        </form>
      </div>
    </div>
  );
}
