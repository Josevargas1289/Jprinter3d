import BreakdownRow from './BreakdownRow';
import ExportButtons from './ExportButtons';
import PriceCard from './PriceCard';
import { formatCurrency } from '../utils/format';

export default function ResultsPanel({ calculator, quoteRef }) {
  const { form, results } = calculator;

  return (
    <section className="rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.18)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-black sm:text-2xl">Resultados</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">Último guardado automático: {results.lastSavedLabel}</p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--soft)] px-3 py-2 text-xs text-[var(--muted)]">
          {results.energyKwh.toFixed(3)} kWh
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <PriceCard title="Precio mínimo" value={results.minimumPrice} profit={results.minimumProfit} badge="Base" tone="minimum" />
        <PriceCard title="Precio recomendado" value={results.recommendedPrice} profit={results.recommendedProfit} badge="Publicar" tone="recommended" />
        <PriceCard title="Precio premium" value={results.premiumPrice} profit={results.premiumProfit} badge="Plus" tone="premium" />
      </div>

      <div className="mt-5 rounded-[26px] border border-[var(--border)] bg-[var(--soft)] px-4">
        <BreakdownRow label="Costo por gramo" value={formatCurrency(results.costPerGram)} />
        <BreakdownRow label="Costo de material" value={formatCurrency(results.materialCost)} />
        <BreakdownRow label="Costo de energía" value={formatCurrency(results.energyCost)} />
        <BreakdownRow label="Uso de máquina" value={formatCurrency(results.machineCost)} />
        <BreakdownRow label="Extras" value={formatCurrency(Number(form.extras) || 0)} />
        <BreakdownRow label="Costo total base" value={formatCurrency(results.baseCost)} strong />
        <BreakdownRow label="Ganancia mínima por gramo" value={formatCurrency(results.targetProfitPerGram)} />
        <BreakdownRow label="Ganancia mínima de esta pieza" value={formatCurrency(results.pieceMinProfit)} strong />
      </div>

      <div className="mt-5 rounded-[26px] border border-dashed border-[var(--border)] bg-[var(--soft)] p-4 text-sm leading-6 text-[var(--muted)]">
        La cotización mostrará <strong className="text-[var(--text)]">solo {results.selectedPriceLabel.toLowerCase()}</strong>, con cantidad, entrega, condiciones y observaciones.
      </div>

      <div className="mt-5">
        <ExportButtons form={form} results={results} quoteRef={quoteRef} />
      </div>
    </section>
  );
}
