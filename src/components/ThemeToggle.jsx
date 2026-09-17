export default function ThemeToggle({ theme }) {
  return (
    <button type="button" onClick={theme.toggleTheme} className="theme-button" aria-label={theme.isDark ? 'Activar modo claro' : 'Activar modo oscuro'} title={theme.isDark ? 'Modo claro' : 'Modo oscuro'}>
      {theme.isDark ? '☀' : '☾'}
    </button>
  );
}
