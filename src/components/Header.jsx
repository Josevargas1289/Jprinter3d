import ThemeToggle from './ThemeToggle';

export default function Header({ theme }) {
  return (
    <header className="site-header">
      <div className="brand-lockup">
        <span className="brand-mark" aria-hidden="true">j<span>.</span></span>
        <div>
          <strong>JPrinter3D</strong>
          <span>Estudio de impresión 3D</span>
        </div>
      </div>
      <div className="header-actions">
        <span className="save-status"><span className="status-dot" /> Guardado automático</span>
        <ThemeToggle theme={theme} />
      </div>
    </header>
  );
}
