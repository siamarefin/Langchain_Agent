
const MedicineResults = ({ results, loading, error }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!results || results.length === 0) return <div>No results found.</div>;

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Search Results</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {results.map((item, idx) => (
          <li key={idx} style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
            <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '18px' }}>{item.title}</a>
            <p style={{ margin: '5px 0' }}>{item.snippet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineResults;
