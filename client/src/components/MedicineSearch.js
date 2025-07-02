import { useState } from 'react';

const MedicineSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Search for a medicine..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ flex: 1, padding: '10px', fontSize: '16px' }}
      />
      <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
        Search
      </button>
    </form>
  );
};

export default MedicineSearch;
