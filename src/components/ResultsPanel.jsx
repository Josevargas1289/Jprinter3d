import BreakdownRow from './BreakdownRow';
import ExportButtons from './ExportButtons';
import PriceCard from './PriceCard';
import { MARKET_ASSUMPTIONS, MARKET_UPDATED_AT } from '../constants/materials';
import { formatCurrency } from '../utils/format';

export default function ResultsPanel({ calculator, quoteRef }) {
  const { form, results } = calculator;
  const marginLabel = `${Math.round(results.effectiveMargin * 100)}%`;
  const competitivenessLabel = results.competitivenessGap > 0.08 ? 'Por encima del mercado' : results.competitivenessGap < -0.08 ? 'Muy competitivo' : 'En rango competitivo';

  return (
    <section className="tool-panel p-4 sm:p-5 lg:sticky lg:top-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Precio sugerido</p>
          <h2 className="mt-1 text-3xl font-black text-[var(--text)] sm:text-4xl">{formatCurrency(results.selectedUnitPrice)}</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">{results.selectedPriceLabel} por unidad</p>
        </div>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-right">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Total</p>
          <p className="mt-1 text-lg font-black text-[var(--text)]">{formatCurrency(results.totalQuote)}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Metric label="Margen" value={marginLabel} />
        <Metric label="Ganancia/u" value={formatCurrency(results.selectedProfit)} />
        <Metric label="COP/g" value={formatCurrency(results.pricePerGram)} />
      </div>

      <div className="mt-4 grid gap-3">
        <PriceCard title="Mínimo rentable" value={results.minimumPrice} profit={results.minimumProfit} badge="Piso" tone="minimum" />
        <PriceCard title="Recomendado" value={results.recommendedPrice} profit={results.recommendedProfit} badge="Mercado" tone="recommended" />
        <PriceCard title="Premium" value={results.premiumPrice} profit={results.premiumProfit} badge="Valor" tone="premium" />
      </div>

      <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4">
        <BreakdownRow label="Referencia de mercado" value={formatCurrency(results.marketBenchmark)} strong />
        <BreakdownRow label="Estado competitivo" value={competitivenessLabel} />
        <BreakdownRow label="Material + desperdicio" value={formatCurrency(results.materialCost)} />
        <BreakdownRow label="Energía" value={formatCurrency(results.energyCost)} />
        <BreakdownRow label="Máquina" value={formatCurrency(results.machineCost)} />
        <BreakdownRow label="Mano de obra" value={formatCurrency(results.laborCost)} />
        <BreakdownRow label="Reserva fallas" value={formatCurrency(results.riskReserve)} />
        <BreakdownRow label="Extras" value={formatCurrency(Number(form.extras) || 0)} />
        <BreakdownRow label="Costo real por unidad" value={formatCurrency(results.baseCost)} strong />
      </div>

      <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--highlight)] p-4 text-sm leading-6 text-[var(--muted)]">
        Mercado actualizado: {MARKET_UPDATED_AT}. Base editable: kWh {formatCurrency(MARKET_ASSUMPTIONS.kwhPrice)}, mano de obra {formatCurrency(MARKET_ASSUMPTIONS.laborRate)}/h y pedido mínimo {formatCurrency(MARKET_ASSUMPTIONS.minimumOrder)}.
      </div>

      <div className="mt-4">
        <ExportButtons form={form} results={results} quoteRef={quoteRef} />
      </div>
    </section>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{label}</p>
      <p className="mt-1 truncate text-sm font-black text-[var(--text)]">{value}</p>
    </div>
  );
}
