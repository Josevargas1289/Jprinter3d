export default function ThemeToggle({ theme }) {
  return (
    <button type="button" onClick={theme.toggleTheme} className="btn-secondary">
      {theme.isDark ? 'Modo oscuro' : 'Modo claro'}
    </button>
  );
}
