import { useState } from 'react';
import { exportQuoteImage, exportQuotePdf } from '../utils/exportQuote';

export default function ExportButtons({ form, results, quoteRef }) {
  const [busy, setBusy] = useState('');

  const handleExport = async (type) => {
    if (!quoteRef?.current) return;

    try {
      setBusy(type);
      if (type === 'image') {
        await exportQuoteImage({ quoteNode: quoteRef.current, form, results });
      } else {
        await exportQuotePdf({ quoteNode: quoteRef.current, form, results });
      }
    } finally {
      setBusy('');
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => handleExport('image')}
        className="btn-primary disabled:opacity-60"
        disabled={Boolean(busy)}
      >
        {busy === 'image' ? 'Generando imagen...' : 'Exportar imagen'}
      </button>
      <button
        type="button"
        onClick={() => handleExport('pdf')}
        className="btn-secondary disabled:opacity-60"
        disabled={Boolean(busy)}
      >
        {busy === 'pdf' ? 'Generando PDF...' : 'Exportar PDF'}
      </button>
    </div>
  );
}
