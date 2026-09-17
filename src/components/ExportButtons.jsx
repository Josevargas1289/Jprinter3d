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
        className="rounded-2xl bg-cyan-500 px-4 py-3 font-bold text-slate-950 transition hover:translate-y-[-1px] disabled:opacity-60"
        disabled={Boolean(busy)}
      >
        {busy === 'image' ? 'Generando imagen...' : 'Exportar imagen'}
      </button>
      <button
        type="button"
        onClick={() => handleExport('pdf')}
        className="rounded-2xl border border-[var(--border)] bg-[var(--soft)] px-4 py-3 font-bold text-[var(--text)] transition hover:translate-y-[-1px] disabled:opacity-60"
        disabled={Boolean(busy)}
      >
        {busy === 'pdf' ? 'Generando PDF...' : 'Exportar PDF'}
      </button>
    </div>
  );
}
