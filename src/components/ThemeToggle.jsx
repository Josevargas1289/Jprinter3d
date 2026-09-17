export default function ThemeToggle({ theme }) {
  return (
    <button
      type="button"
      onClick={theme.toggleTheme}
      className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--soft)] px-4 py-3 font-semibold text-[var(--text)] transition hover:translate-y-[-1px]"
    >
      <span>{theme.isDark ? '🌙' : '☀️'}</span>
      <span>{theme.isDark ? 'Modo oscuro' : 'Modo claro'}</span>
    </button>
  );
}
