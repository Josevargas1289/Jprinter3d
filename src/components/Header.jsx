import ThemeToggle from './ThemeToggle';

export default function Header({ theme }) {
  return (
    <header className="mb-5 rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2">
            <img src={`${import.meta.env.BASE_URL}logo-jprinter3d.png`} alt="Logo JPrinter3D" className="h-full w-full object-contain" />
          </div>
          <div>
            <p className="eyebrow">JPrinter3D</p>
            <h1 className="mt-1 text-2xl font-black text-[var(--text)] sm:text-3xl">Cotizador profesional de impresión 3D</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">
              Precios competitivos en COP con costos reales, margen visible, referencia de mercado y documento listo para enviar.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
          <span className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-bold text-[var(--muted)]">
            Guardado local automático
          </span>
          <ThemeToggle theme={theme} />
        </div>
      </div>
    </header>
  );
}
