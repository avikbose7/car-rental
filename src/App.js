import { AuthProvider } from './components/services/AuthContext';
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

export default App;
