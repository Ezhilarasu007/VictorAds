'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ARTICLES } from '@/lib/articlesData';
import { BookOpen, Search, ArrowRight, Tag } from 'lucide-react';

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Finance', 'Tech', 'Security', 'SEO', 'Marketing'];

  const filteredArticles = ARTICLES.filter(art => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div className="badge badge-cyan" style={{ marginBottom: '8px' }}>
          <BookOpen size={14} /> Knowledge & Compliance Portal
        </div>
        <h1 style={{ fontSize: '2.2rem', color: '#ffffff' }}>Educational Library</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
          Explore 25 original, pre-rendered guides covering bandwidth routing, AdSense compliance, UPI security, and web performance.
        </p>
      </div>

      {/* Controls Bar: Search & Category Chips */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
        {/* Search Bar */}
        <div style={{ position: 'relative', maxWidth: '600px' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search articles by title, keyword, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '44px' }}
          />
        </div>

        {/* Category Filter Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 16px',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontWeight: 600,
                border: selectedCategory === cat ? '1px solid var(--neon-cyan)' : '1px solid var(--glass-border)',
                background: selectedCategory === cat ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                color: selectedCategory === cat ? 'var(--neon-cyan)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid-3">
        {filteredArticles.map(art => (
          <div key={art.slug} className="glass-card glass-card-interactive" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>{art.category}</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{art.readTime}</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '10px', lineHeight: '1.4' }}>
                {art.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '20px' }}>
                {art.summary}
              </p>
            </div>

            <Link href={`/articles/${art.slug}`} style={{ color: 'var(--neon-cyan)', fontWeight: 600, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Read Article <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
