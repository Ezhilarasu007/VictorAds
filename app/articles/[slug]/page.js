import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ARTICLES } from '@/lib/articlesData';
import { ArrowLeft, Clock, Calendar, User, BookOpen, Share2 } from 'lucide-react';

export async function generateStaticParams() {
  return ARTICLES.map((art) => ({
    slug: art.slug,
  }));
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = ARTICLES.filter((a) => a.slug !== slug && a.category === article.category).slice(0, 2);

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '850px' }}>
      <Link href="/articles" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--neon-cyan)', fontSize: '0.9rem', marginBottom: '24px' }}>
        <ArrowLeft size={16} /> Back to Library
      </Link>

      {/* Article Header */}
      <div style={{ marginBottom: '32px' }}>
        <span className="badge badge-green" style={{ marginBottom: '12px' }}>{article.category}</span>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#ffffff', lineHeight: '1.25', marginBottom: '16px' }}>
          {article.title}
        </h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={14} /> {article.author}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} /> {article.date}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> {article.readTime}</span>
        </div>
      </div>

      {/* Main Body Card */}
      <div className="glass-card" style={{ padding: '36px', marginBottom: '40px', lineHeight: '1.8', color: 'var(--text-main)', fontSize: '1rem' }}>
        <div 
          dangerouslySetInnerHTML={{ __html: article.content }} 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        />
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div>
          <h3 style={{ color: '#ffffff', fontSize: '1.3rem', marginBottom: '20px' }}>Related Educational Guides</h3>
          <div className="grid-2">
            {relatedArticles.map((rel) => (
              <div key={rel.slug} className="glass-card" style={{ padding: '20px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--neon-cyan)', marginBottom: '6px' }}>{rel.category}</div>
                <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '10px' }}>{rel.title}</h4>
                <Link href={`/articles/${rel.slug}`} style={{ color: 'var(--neon-green)', fontSize: '0.85rem', fontWeight: 600 }}>
                  Read Guide →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
