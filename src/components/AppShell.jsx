import { useRef } from 'react';
import Header from './Header';
import CalculatorForm from './CalculatorForm';
import ResultsPanel from './ResultsPanel';
import QuotePreview from './QuotePreview';
import { formatCurrency } from '../utils/format';

export default function AppShell({ calculator, theme }) {
  const quoteRef = useRef(null);

  return (
    <div className="app-shell">
      <div className="page-wrap">
        <Header theme={theme} />
        <main>
          <div className="page-intro">
            <div>
              <p className="eyebrow">Herramienta de cotización</p>
              <h1>Calcula un precio justo<br /><em>para cada impresión.</em></h1>
            </div>
            <p>De los datos de tu laminador a una cotización lista para compartir. Precios en pesos colombianos.</p>
          </div>
          <div className="workspace-grid">
            <CalculatorForm calculator={calculator} />
            <ResultsPanel calculator={calculator} quoteRef={quoteRef} />
          </div>
          <div className="preview-section">
            <div className="section-heading">
              <p className="eyebrow">Para compartir</p>
              <h2>Tu cotización</h2>
            </div>
            <QuotePreview ref={quoteRef} calculator={calculator} />
          </div>
        </main>
        <footer className="site-footer"><span>JPrinter3D</span><span>Hecho para imprimir buenas ideas.</span></footer>
      </div>
      <a className="mobile-price-bar" href="#resultado" aria-label={`Ver precio sugerido: ${formatCurrency(calculator.results.selectedUnitPrice)}`}>
        <span><small>Precio por unidad</small><strong>{formatCurrency(calculator.results.selectedUnitPrice)}</strong></span>
        <span className="mobile-price-arrow" aria-hidden="true">↓</span>
      </a>
    </div>
  );
}
