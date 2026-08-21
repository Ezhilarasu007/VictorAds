'use client';
import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { FileUp, FileText, ArrowUp, ArrowDown, Trash2, Download, CheckCircle2 } from 'lucide-react';

export default function ImageToPdfTool() {
  const [images, setImages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages(prev => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            name: file.name,
            dataUrl: event.target.result
          }
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const moveImage = (index, direction) => {
    const newImages = [...images];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newImages.length) return;
    const temp = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = temp;
    setImages(newImages);
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const generatePdf = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < images.length; i++) {
        if (i > 0) pdf.addPage();
        const img = new Image();
        img.src = images[i].dataUrl;
        await new Promise(resolve => { img.onload = resolve; });

        let imgWidth = pdfWidth;
        let imgHeight = (img.height * pdfWidth) / img.width;

        if (imgHeight > pdfHeight) {
          imgHeight = pdfHeight;
          imgWidth = (img.width * pdfHeight) / img.height;
        }

        const x = (pdfWidth - imgWidth) / 2;
        const y = (pdfHeight - imgHeight) / 2;

        pdf.addImage(images[i].dataUrl, 'JPEG', x, y, imgWidth, imgHeight);
      }

      pdf.save(`VictorADS_Compiled_${Date.now()}.pdf`);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('PDF Generation Error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="glass-card" style={{ padding: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'rgba(0, 242, 254, 0.12)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--neon-cyan)'
        }}>
          <FileText size={22} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.3rem', color: '#ffffff' }}>Image to PDF Compiler</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Convert multiple JPG/PNG images into a single A4 PDF document locally inside your browser.
          </p>
        </div>
      </div>

      {/* Upload Dropzone */}
      <div style={{
        border: '2px dashed var(--glass-border-glow)',
        borderRadius: '12px',
        padding: '30px',
        textAlign: 'center',
        background: 'rgba(10, 15, 30, 0.5)',
        cursor: 'pointer',
        marginBottom: '20px',
        position: 'relative'
      }}>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0,
            cursor: 'pointer',
            width: '100%',
            height: '100%'
          }}
        />
        <FileUp size={36} color="var(--neon-cyan)" style={{ margin: '0 auto 8px auto' }} />
        <div style={{ fontWeight: 600, color: '#ffffff', fontSize: '0.95rem' }}>
          Click or Drag Images Here to Upload
        </div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          Supports JPG, PNG, WEBP (100% Client-Side Processing)
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.9rem', marginBottom: '12px' }}>
            Selected Images ({images.length}) - Reorder Thumbnails
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {images.map((img, idx) => (
              <div
                key={img.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--glass-border)',
                  padding: '8px 14px',
                  borderRadius: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={img.dataUrl} alt={img.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{idx + 1}. {img.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    onClick={() => moveImage(idx, -1)}
                    disabled={idx === 0}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: idx === 0 ? 'default' : 'pointer' }}
                  >
                    <ArrowUp size={16} />
                  </button>
                  <button
                    onClick={() => moveImage(idx, 1)}
                    disabled={idx === images.length - 1}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: idx === images.length - 1 ? 'default' : 'pointer' }}
                  >
                    <ArrowDown size={16} />
                  </button>
                  <button
                    onClick={() => removeImage(img.id)}
                    style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', marginLeft: '6px' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={generatePdf}
        disabled={images.length === 0 || isGenerating}
        className="btn-primary"
        style={{ width: '100%', justifyContent: 'center', opacity: images.length === 0 ? 0.5 : 1 }}
      >
        {downloadSuccess ? (
          <>
            <CheckCircle2 size={18} color="var(--neon-green)" /> Download Complete!
          </>
        ) : (
          <>
            <Download size={18} /> {isGenerating ? 'Compiling PDF...' : `Compile & Download PDF (${images.length} Pages)`}
          </>
        )}
      </button>
    </div>
  );
}
