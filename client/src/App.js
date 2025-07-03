import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';


function App() {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [prompt, setPrompt] = useState('');

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };


  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }
    setLoading(true);
    setError(null);
    setSummary('');
    try {
      const formData = new FormData();
      if (pdfFile){
        formData.append('file', pdfFile);
      }
      
      formData.append('message', prompt);

      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to fetch results');
      const data = await response.json();
      setSummary(data.response || 'No information found.');
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1 className="title" >Medicine Agent</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Upload Prescription</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Enter your prompt here..."
            value={prompt}
            onChange={handlePromptChange}
            rows={5}
            className="textarea-input"
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {summary && (
        <div className="result-container">
          <h2 className="result-title">Result</h2>
          {summary && (
        <div className="result-container">
          <h2 className="result-title">Result</h2>
          <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
      )}
        </div>
      )}
    </div>
  );
}

export default App;