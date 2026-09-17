import ThemeToggle from './ThemeToggle';

export default function Header({ theme }) {
  return (
    <header className="mb-6 rounded-[28px] border border-[var(--border)] bg-[var(--panel)] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <img
            src={`${import.meta.env.BASE_URL}logo-jprinter3d.png`}
            alt="Logo JPrinter3D"
            className="h-16 w-16 rounded-2xl border border-[var(--border)] bg-black/20 object-contain p-2 sm:h-20 sm:w-20"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">JPrinter3D</p>
            <h1 className="mt-1 text-2xl font-black sm:text-3xl">Calculadora de cotizaciones 3D</h1>
            <p className="mt-2 max-w-2xl text-sm text-[var(--muted)] sm:text-base">
              Calcula costos, define el precio exacto que verá el cliente y genera una cotización profesional en imagen o PDF.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <ThemeToggle theme={theme} />
        </div>
      </div>
    </header>
  );
}
