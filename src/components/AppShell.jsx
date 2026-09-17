import { useRef } from 'react';
import Header from './Header';
import CalculatorForm from './CalculatorForm';
import ResultsPanel from './ResultsPanel';
import QuotePreview from './QuotePreview';

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
              <h1>Tu próxima impresión,<br /><em>bien cotizada.</em></h1>
            </div>
            <p>Una cotización clara a partir del material, el peso y el tiempo de impresión.</p>
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
    </div>
  );
}
