import { useRef } from 'react';
import Header from './Header';
import CalculatorForm from './CalculatorForm';
import ResultsPanel from './ResultsPanel';
import QuotePreview from './QuotePreview';

export default function AppShell({ calculator, theme }) {
  const quoteRef = useRef(null);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <Header theme={theme} />

        <main className="grid flex-1 gap-6 pb-safe lg:grid-cols-[1.05fr_0.95fr]">
          <section className="space-y-6">
            <CalculatorForm calculator={calculator} />
          </section>

          <section className="space-y-6">
            <ResultsPanel calculator={calculator} quoteRef={quoteRef} />
            <QuotePreview ref={quoteRef} calculator={calculator} />
          </section>
        </main>
      </div>
    </div>
  );
}
