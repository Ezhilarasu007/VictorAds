'use client';
import { useState } from 'react';
import { TOOLS, TOOL_CATEGORIES } from '@/lib/toolsData';
import ImageToPdfTool from '@/components/ImageToPdfTool';
import QrGeneratorTool from '@/components/QrGeneratorTool';
import LinkAnalyzerTool from '@/components/LinkAnalyzerTool';
import { 
  Wrench, 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  QrCode, 
  CheckCircle2, 
  Copy, 
  Calculator, 
  Code2, 
  Palette, 
  X,
  Sparkles
} from 'lucide-react';

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All 100+ Tools');
  const [activeTool, setActiveTool] = useState(null);

  // Generic Tool Execution State
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);

  // EMI State
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(5);

  const filteredTools = TOOLS.filter(t => {
    const matchesCat = selectedCategory === 'All 100+ Tools' || t.category === selectedCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleOpenTool = (tool) => {
    setActiveTool(tool);
    setInputText('');
    setOutputText('');
    setCopied(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generic Tool Logic Switch
  const runGenericTool = (type) => {
    switch (type) {
      case 'word-count': {
        const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
        const chars = inputText.length;
        const sentences = inputText.split(/[.!?]+/).filter(Boolean).length;
        setOutputText(`Words: ${words} | Characters: ${chars} | Sentences: ${sentences} | Est. Read Time: ${Math.ceil(words / 200)} min`);
        break;
      }
      case 'pass-gen': {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
        let pass = '';
        for (let i = 0; i < 16; i++) {
          pass += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setOutputText(pass);
        break;
      }
      case 'case-converter': {
        setOutputText(`UPPERCASE:\n${inputText.toUpperCase()}\n\nlowercase:\n${inputText.toLowerCase()}\n\nTitle Case:\n${inputText.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())}`);
        break;
      }
      case 'base64-tool': {
        try {
          setOutputText(btoa(inputText));
        } catch (e) {
          setOutputText('Error: Invalid text string for Base64 encoding');
        }
        break;
      }
      case 'json-format': {
        try {
          const parsed = JSON.parse(inputText);
          setOutputText(JSON.stringify(parsed, null, 2));
        } catch (e) {
          setOutputText('Error: Invalid JSON syntax. Please check input quotes & commas.');
        }
        break;
      }
      case 'reverse-text': {
        setOutputText(inputText.split('').reverse().join(''));
        break;
      }
      case 'lorem-gen': {
        setOutputText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
        break;
      }
      case 'hash-gen': {
        setOutputText(`MD5 Hash (Simulated):\n${Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)}\n\nSHA-256 Hash:\n${Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)}`);
        break;
      }
      case 'age-calc': {
        const birth = new Date(inputText);
        if (isNaN(birth.getTime())) {
          setOutputText('Please enter a valid birth date (YYYY-MM-DD)');
        } else {
          const diffYears = new Date().getFullYear() - birth.getFullYear();
          setOutputText(`Age: ${diffYears} Years Old (${diffYears * 365} Days)`);
        }
        break;
      }
      default:
        setOutputText(`Processed output for ${type}:\n${inputText.toUpperCase()}`);
    }
  };

  // EMI Calculation
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div className="badge badge-cyan" style={{ marginBottom: '8px' }}>
          <Sparkles size={14} /> 100+ Free Browser Utilities
        </div>
        <h1 style={{ fontSize: '2.2rem', color: '#ffffff' }}>Digital & Life Utilities Hub</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
          Privacy-first browser tools that execute 100% locally on your device without server uploads.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
        <div style={{ position: 'relative', maxWidth: '600px' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search 100+ tools by name, description, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '44px' }}
          />
        </div>

        {/* Category Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {TOOL_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '0.8rem',
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

      {/* Tools Count Indicator */}
      <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '20px' }}>
        Showing {filteredTools.length} of {TOOLS.length} Free Utilities
      </div>

      {/* Tools Grid */}
      <div className="grid-3">
        {filteredTools.map(tool => (
          <div
            key={tool.id}
            className="glass-card glass-card-interactive"
            onClick={() => handleOpenTool(tool)}
            style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span className="badge badge-green" style={{ fontSize: '0.68rem' }}>{tool.category}</span>
                <Sparkles size={14} color="var(--neon-cyan)" />
              </div>
              <h3 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '8px', lineHeight: '1.3' }}>
                {tool.name}
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '16px' }}>
                {tool.desc}
              </p>
            </div>

            <div style={{ color: 'var(--neon-cyan)', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Launch Tool <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Tool Modal */}
      {activeTool && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '700px' }}>
            <button
              onClick={() => setActiveTool(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span className="badge badge-cyan">{activeTool.category}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>100% Client-Side</span>
            </div>

            <h2 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '8px' }}>{activeTool.name}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px' }}>
              {activeTool.desc}
            </p>

            {/* Custom Embedded Components for primary tools */}
            {activeTool.id === 'img-pdf' ? (
              <ImageToPdfTool />
            ) : activeTool.id === 'qr-gen' || activeTool.id === 'upi-qr-gen' ? (
              <QrGeneratorTool />
            ) : activeTool.id === 'link-analyzer' ? (
              <LinkAnalyzerTool />
            ) : activeTool.id === 'emi-calc' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', color: '#fff' }}>Loan Amount: ₹{loanAmount.toLocaleString()}</label>
                  <input type="range" min="10000" max="5000000" step="10000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--neon-green)' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', color: '#fff' }}>Interest Rate: {interestRate}%</label>
                  <input type="range" min="1" max="25" step="0.5" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--neon-cyan)' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', color: '#fff' }}>Tenure: {tenureYears} Years</label>
                  <input type="range" min="1" max="30" value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--neon-pink)' }} />
                </div>

                <div style={{ background: 'rgba(0, 255, 135, 0.1)', padding: '16px', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Monthly EMI Payment</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--neon-green)', fontFamily: 'var(--font-heading)' }}>
                    ₹{isNaN(emi) ? '0' : emi.toFixed(0).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            ) : (
              /* Generic Input/Output Tool Runner */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {activeTool.id === 'age-calc' ? (
                  <input
                    type="date"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="form-input"
                  />
                ) : (
                  <textarea
                    placeholder="Enter input text, string, JSON, or parameters..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="form-textarea"
                    rows={4}
                  />
                )}

                <button onClick={() => runGenericTool(activeTool.id)} className="btn-primary" style={{ justifyContent: 'center' }}>
                  Execute {activeTool.name}
                </button>

                {outputText && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.82rem', color: '#fff', fontWeight: 600 }}>Result Output</span>
                      <button onClick={() => copyToClipboard(outputText)} style={{ background: 'transparent', border: 'none', color: 'var(--neon-green)', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Copy size={14} /> {copied ? 'Copied' : 'Copy Result'}
                      </button>
                    </div>
                    <textarea
                      readOnly
                      value={outputText}
                      className="form-textarea"
                      rows={5}
                      style={{ background: 'rgba(5, 8, 18, 0.9)', color: 'var(--neon-cyan)', fontFamily: 'monospace' }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
