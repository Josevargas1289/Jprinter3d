import { forwardRef } from 'react';
import { formatCurrency } from '../utils/format';

const QuotePreview = forwardRef(function QuotePreview({ calculator }, ref) {
  const { form, results } = calculator;

  const documentTitle = form.documentType === 'invoice' ? 'Factura' : 'Cotización';
  const deliveryLabel = Number(form.deliveryDays) > 0 ? `${form.deliveryDays} día(s)` : 'A convenir';
  const validityLabel = Number(form.validityDays) > 0 ? `${form.validityDays} día(s)` : 'Sin definir';
  const totalLabel = form.documentType === 'invoice' ? 'Total factura' : 'Total cotizado';

  return (
    <section className="rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.18)] sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-black sm:text-2xl">Vista previa de cotización</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">Lista para compartir con el cliente en imagen o PDF.</p>
        </div>
      </div>

      <div
        ref={ref}
        className="overflow-hidden rounded-[30px] border border-[var(--border)] bg-[linear-gradient(180deg,var(--panel),var(--soft))] p-5 sm:p-6"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] pb-5">
          <div className="flex items-center gap-4">
            <img
              src={`${import.meta.env.BASE_URL}logo-jprinter3d.png`}
              alt="Logo JPrinter3D"
              className="h-16 w-16 rounded-2xl border border-[var(--border)] bg-black/20 object-contain p-2"
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--muted)]">{form.businessName || 'JPrinter3D'}</p>
              <h3 className="mt-1 text-xl font-black sm:text-2xl">{documentTitle}</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">{form.businessSubtitle || 'Impresión 3D personalizada'}</p>
              {form.contactInfo ? <p className="mt-2 text-sm text-[var(--text)]">{form.contactInfo}</p> : null}
            </div>
          </div>

          <div className="text-right text-sm">
            <p className="text-[var(--muted)]">No.</p>
            <p className="font-semibold text-[var(--text)]">{results.quoteNumber}</p>
            <p className="mt-2 text-[var(--muted)]">Fecha</p>
            <p className="font-semibold text-[var(--text)]">{results.quoteDateLabel}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <InfoBlock label="Cliente" value={form.clientName || 'Cliente por confirmar'} />
          <InfoBlock label="Producto" value={form.quoteName || 'Pieza personalizada'} />
          <InfoBlock label="Material" value={form.materialType} />
          <InfoBlock label="Cantidad" value={`${results.quantity} unidad${results.quantity > 1 ? 'es' : ''}`} />
          <InfoBlock label="Filamento estimado" value={`${form.usedGrams || 0} g por unidad`} />
          <InfoBlock label="Tiempo estimado" value={`${form.printHours || 0} h por unidad`} />
        </div>

        <div className="mt-5 rounded-[26px] border border-cyan-400/30 bg-cyan-500/10 p-5">
          <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="text-sm font-semibold text-[var(--muted)]">{results.selectedPriceLabel}</p>
              <p className="mt-2 text-3xl font-black sm:text-4xl">{formatCurrency(results.selectedUnitPrice)}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">Valor por unidad</p>
            </div>
            <div className="grid gap-3 sm:min-w-[220px]">
              <SummaryMini label="Cantidad" value={`${results.quantity}`} />
              <SummaryMini label={totalLabel} value={formatCurrency(results.totalQuote)} highlight />
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          <InfoPanel title="Condiciones">
            <InfoLine label="Entrega estimada" value={deliveryLabel} />
            <InfoLine label="Forma de entrega" value={form.deliveryMethod || 'A convenir'} />
            <InfoLine label="Vigencia" value={validityLabel} />
            <InfoLine label="Pago" value={form.paymentTerms || 'Por definir con el cliente'} />
          </InfoPanel>

          <InfoPanel title="Observaciones">
            <p className="text-sm leading-6 text-[var(--text)]">
              {form.notes?.trim() || 'Esta cotización incluye fabricación de la pieza y considera material, energía, uso de máquina y extras registrados.'}
            </p>
          </InfoPanel>
        </div>

        <div className="mt-5 flex flex-col gap-2 border-t border-[var(--border)] pt-4 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>{form.businessName || 'JPrinter3D'} · Valores expresados en COP</span>
          <span>Gracias por cotizar con nosotros</span>
        </div>
      </div>
    </section>
  );
});

function InfoBlock({ label, value }) {
  return (
    <div className="rounded-[18px] border border-[var(--border)] bg-[var(--soft)] px-4 py-3">
      <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">{label}</p>
      <p className="mt-1 text-sm font-semibold text-[var(--text)]">{value}</p>
    </div>
  );
}

function InfoPanel({ title, children }) {
  return (
    <div className="rounded-[24px] border border-[var(--border)] bg-[var(--soft)] p-4">
      <p className="text-sm font-semibold text-[var(--muted)]">{title}</p>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}

function InfoLine({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">{label}</p>
      <p className="mt-1 text-sm font-semibold text-[var(--text)]">{value}</p>
    </div>
  );
}

function SummaryMini({ label, value, highlight = false }) {
  return (
    <div className={`rounded-2xl border px-4 py-3 text-right ${highlight ? 'border-cyan-400/30 bg-cyan-500/15' : 'border-[var(--border)] bg-[var(--soft)]'}`}>
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">{label}</p>
      <p className="mt-1 text-xl font-black text-[var(--text)]">{value}</p>
    </div>
  );
}

export default QuotePreview;
