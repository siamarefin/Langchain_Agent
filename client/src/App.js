import { useState } from 'react';
import './App.css';
import MedicineResults from './components/MedicineResults';
import MedicineSearch from './components/MedicineSearch';

function App() {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setSummary('');
    try {
      // Use absolute backend URL as requested
      const response = await fetch('http://localhost:5000/api/medicine-search?q=' + encodeURIComponent(query));
      if (!response.ok) throw new Error('Failed to fetch results');
      const data = await response.json();
      setSummary(data.summary || 'No information found.');
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" style={{ maxWidth: 700, margin: '0 auto', padding: 30 }}>
      <h1>MedicineAgent</h1>
      <MedicineSearch onSearch={handleSearch} />
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && !error && summary && (
        <div style={{ marginTop: '20px', whiteSpace: 'pre-line' }}>
          <h2>Result</h2>
          <div>{summary}</div>
        </div>
      )}
    </div>
  );
}

export default App;
