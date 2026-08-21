'use client';
import { useState } from 'react';
import ImageToPdfTool from '@/components/ImageToPdfTool';
import QrGeneratorTool from '@/components/QrGeneratorTool';
import LinkAnalyzerTool from '@/components/LinkAnalyzerTool';
import { Wrench, FileText, QrCode, ShieldCheck } from 'lucide-react';

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState('pdf');

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <div className="badge badge-cyan" style={{ marginBottom: '8px' }}>
          <Wrench size={14} /> Privacy-First Browser Tools
        </div>
        <h1 style={{ fontSize: '2.2rem', color: '#ffffff' }}>Digital Utilities Panel</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
          Fast, browser-native utility tools that execute 100% locally on your device without server uploads.
        </p>
      </div>

      {/* Tool Selector Tabs */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '32px',
        borderBottom: '1px solid var(--glass-border)',
        paddingBottom: '12px',
        overflowX: 'auto'
      }}>
        {[
          { id: 'pdf', label: 'Image to PDF Compiler', icon: FileText },
          { id: 'qr', label: 'URL to QR Code Generator', icon: QrCode },
          { id: 'analyzer', label: 'Smart Link Safe-Analyzer', icon: ShieldCheck }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                borderRadius: '10px',
                fontSize: '0.95rem',
                fontWeight: 600,
                border: isActive ? '1px solid var(--neon-cyan)' : '1px solid var(--glass-border)',
                background: isActive ? 'rgba(0, 242, 254, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                color: isActive ? 'var(--neon-cyan)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div style={{ maxWidth: '800px' }}>
        {activeTab === 'pdf' && <ImageToPdfTool />}
        {activeTab === 'qr' && <QrGeneratorTool />}
        {activeTab === 'analyzer' && <LinkAnalyzerTool />}
      </div>
    </div>
  );
}
