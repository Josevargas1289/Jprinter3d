import AppShell from './components/AppShell';
import { useCalculator } from './hooks/useCalculator';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const calculator = useCalculator();
  const theme = useTheme();

  return <AppShell calculator={calculator} theme={theme} />;
}
