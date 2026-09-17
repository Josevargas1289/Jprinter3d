import BreakdownRow from './BreakdownRow';
import ExportButtons from './ExportButtons';
import PriceCard from './PriceCard';
import { MARKET_UPDATED_AT } from '../constants/materials';
import { formatCurrency } from '../utils/format';

export default function ResultsPanel({ calculator, quoteRef }) {
  const { form, results, updateField } = calculator;
  const hasInputs = Number(form.usedGrams) > 0 && Number(form.printHours) > 0;

  return (
    <section id="resultado" className="results-column" aria-labelledby="results-heading">
      <div className="column-heading"><span className="step-number">02</span><div><p className="eyebrow">En tiempo real</p><h2 id="results-heading">Tu precio sugerido</h2></div></div>
      <div className="price-feature">
        <div className="price-feature-top"><span>Precio por unidad</span><span className="currency-badge">COP</span></div>
        <p className="feature-amount">{formatCurrency(results.selectedUnitPrice)}</p>
        <div className="feature-bottom"><span>{results.selectedPriceLabel}</span><span>{results.quantity} {results.quantity === 1 ? 'pieza' : 'piezas'} · Total {formatCurrency(results.totalQuote)}</span></div>
      </div>
      {!hasInputs ? <p className="input-reminder">Añade el peso y el tiempo de tu laminador para afinar el precio.</p> : null}
      <div className="price-options">
        <div className="section-title"><h3>Elige cómo cotizar</h3><span>Por unidad</span></div>
        <div className="option-list">
          <PriceCard title="Competitivo" subtitle="Precio de entrada" value={results.minimumPrice} selected={form.priceType === 'minimum'} onClick={() => updateField('priceType', 'minimum')} />
          <PriceCard title="Recomendado" subtitle="Equilibrio ideal" value={results.recommendedPrice} selected={form.priceType === 'recommended'} onClick={() => updateField('priceType', 'recommended')} />
          <PriceCard title="Premium" subtitle="Mayor valor" value={results.premiumPrice} selected={form.priceType === 'premium'} onClick={() => updateField('priceType', 'premium')} />
        </div>
        <button type="button" className={`custom-choice ${form.priceType === 'custom' ? 'active' : ''}`} onClick={() => updateField('priceType', 'custom')}>Definir mi propio precio <span>↗</span></button>
        {form.priceType === 'custom' ? <label className="custom-price-field">Precio personalizado por unidad <input className="form-control" type="number" min="0" inputMode="numeric" value={form.customPrice} onChange={(event) => updateField('customPrice', event.target.value)} /></label> : null}
      </div>
      <div className="result-summary"><div><span>Costo de producción</span><strong>{formatCurrency(results.baseCost)}</strong></div><div><span>Ganancia por pieza</span><strong>{formatCurrency(results.selectedProfit)}</strong></div><div><span>Margen estimado</span><strong>{Math.round(results.effectiveMargin * 100)}%</strong></div></div>
      <details className="disclosure results-disclosure"><summary>Ver desglose y referencia <span>Detalles</span></summary>
        <div className="breakdown-list">
          <BreakdownRow label="Material + desperdicio" value={formatCurrency(results.materialCost)} />
          <BreakdownRow label="Energía" value={formatCurrency(results.energyCost)} />
          <BreakdownRow label="Máquina" value={formatCurrency(results.machineCost)} />
          <BreakdownRow label="Mano de obra" value={formatCurrency(results.laborCost)} />
          <BreakdownRow label="Reserva de fallas" value={formatCurrency(results.riskReserve)} />
          <BreakdownRow label="Extras" value={formatCurrency(Number(form.extras) || 0)} />
          <BreakdownRow label="Referencia de mercado" value={formatCurrency(results.marketBenchmark)} strong />
        </div>
        <p className="source-note">Referencia orientativa en Colombia · {MARKET_UPDATED_AT}. Ajusta tus costos reales para afinar la cotización.</p>
      </details>
      <div className="export-area"><ExportButtons form={form} results={results} quoteRef={quoteRef} /></div>
    </section>
  );
}
