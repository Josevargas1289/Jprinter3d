import { forwardRef } from 'react';
import { formatCurrency } from '../utils/format';

const modeLabels = {
  speed: 'Rápido',
  standard: 'Estándar',
  detail: 'Detalle fino',
  premium: 'Máxima calidad',
};

const QuotePreview = forwardRef(function QuotePreview({ calculator }, ref) {
  const { form, results } = calculator;

  const documentTitle = form.documentType === 'invoice' ? 'Factura' : 'Cotización';
  const deliveryLabel = Number(form.deliveryDays) > 0 ? `${form.deliveryDays} día(s)` : 'A convenir';
  const validityLabel = Number(form.validityDays) > 0 ? `${form.validityDays} día(s)` : 'Sin definir';
  const totalLabel = form.documentType === 'invoice' ? 'Total factura' : 'Total cotizado';

  return (
    <section className="tool-panel p-4 sm:p-5">
      <div className="mb-4">
        <p className="eyebrow">Documento para cliente</p>
        <h2 className="mt-1 text-xl font-black text-[var(--text)] sm:text-2xl">Vista previa</h2>
      </div>

      <div ref={ref} className="quote-sheet">
        <div className="grid gap-5 border-b border-[var(--quote-border)] pb-5 sm:grid-cols-[1fr_auto] sm:items-start">
          <div className="flex items-start gap-4">
            <img src={`${import.meta.env.BASE_URL}logo-jprinter3d.png`} alt="Logo JPrinter3D" className="quote-logo h-16 w-16 rounded-lg border border-[var(--quote-border)] object-contain p-2" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--quote-muted)]">{form.businessName || 'JPrinter3D'}</p>
              <h3 className="mt-1 text-2xl font-black text-[var(--quote-text)]">{documentTitle}</h3>
              <p className="mt-1 text-sm text-[var(--quote-muted)]">{form.businessSubtitle || 'Impresión 3D personalizada'}</p>
              {form.contactInfo ? <p className="mt-2 text-sm font-semibold text-[var(--quote-text)]">{form.contactInfo}</p> : null}
            </div>
          </div>

          <div className="text-left text-sm sm:text-right">
            <p className="text-[var(--quote-muted)]">Documento</p>
            <p className="font-black text-[var(--quote-text)]">{results.quoteNumber}</p>
            <p className="mt-2 text-[var(--quote-muted)]">Fecha</p>
            <p className="font-black text-[var(--quote-text)]">{results.quoteDateLabel}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <InfoBlock label="Cliente" value={form.clientName || 'Cliente por confirmar'} />
          <InfoBlock label="Producto" value={form.quoteName || 'Pieza personalizada'} />
          <InfoBlock label="Material" value={form.materialType} />
          <InfoBlock label="Calidad" value={modeLabels[form.printMode] || 'Estándar'} />
          <InfoBlock label="Cantidad" value={`${results.quantity} unidad${results.quantity > 1 ? 'es' : ''}`} />
          <InfoBlock label="Consumo estimado" value={`${form.usedGrams || 0} g por unidad`} />
        </div>

        <div className="mt-5 rounded-lg border border-[var(--quote-accent-border)] bg-[var(--quote-accent)] p-5">
          <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="text-sm font-bold text-[var(--quote-muted)]">{results.selectedPriceLabel}</p>
              <p className="quote-unit-price mt-2 text-4xl font-black text-[var(--quote-text)]">{formatCurrency(results.selectedUnitPrice)}</p>
              <p className="mt-1 text-sm text-[var(--quote-muted)]">Valor por unidad, expresado en COP</p>
            </div>
            <div className="quote-total rounded-lg border border-[var(--quote-border)] bg-[var(--quote-panel)] p-4 text-right">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--quote-muted)]">{totalLabel}</p>
              <p className="quote-total-price mt-1 text-2xl font-black text-[var(--quote-text)]">{formatCurrency(results.totalQuote)}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <InfoPanel title="Condiciones">
            <InfoLine label="Entrega estimada" value={deliveryLabel} />
            <InfoLine label="Forma de entrega" value={form.deliveryMethod || 'A convenir'} />
            <InfoLine label="Vigencia" value={validityLabel} />
            <InfoLine label="Pago" value={form.paymentTerms || 'Por definir con el cliente'} />
          </InfoPanel>

          <InfoPanel title="Observaciones">
            <p className="text-sm leading-6 text-[var(--quote-text)]">
              {form.notes?.trim() || 'Esta cotización contempla material, energía, uso de máquina, mano de obra, control de calidad y extras registrados.'}
            </p>
          </InfoPanel>
        </div>

        <div className="mt-5 flex flex-col gap-2 border-t border-[var(--quote-border)] pt-4 text-xs text-[var(--quote-muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>{form.businessName || 'JPrinter3D'} - Valores expresados en COP</span>
          <span>Gracias por cotizar con nosotros</span>
        </div>
      </div>
    </section>
  );
});

function InfoBlock({ label, value }) {
  return (
    <div className="rounded-lg border border-[var(--quote-border)] bg-[var(--quote-panel)] px-4 py-3">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--quote-muted)]">{label}</p>
      <p className="mt-1 text-sm font-black text-[var(--quote-text)]">{value}</p>
    </div>
  );
}

function InfoPanel({ title, children }) {
  return (
    <div className="rounded-lg border border-[var(--quote-border)] bg-[var(--quote-panel)] p-4">
      <p className="text-sm font-black text-[var(--quote-text)]">{title}</p>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}

function InfoLine({ label, value }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--quote-muted)]">{label}</p>
      <p className="mt-1 text-sm font-semibold text-[var(--quote-text)]">{value}</p>
    </div>
  );
}

export default QuotePreview;
