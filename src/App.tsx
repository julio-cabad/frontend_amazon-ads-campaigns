import { AppProviders } from './app/providers/AppProviders';
import { Dashboard } from './app/Dashboard';
import './App.css';

function App() {
  return (
    <AppProviders>
      <Dashboard />
    </AppProviders>
  );
}

export default App;
