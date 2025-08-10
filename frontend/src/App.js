import './App.css';
import {useState} from "react";

function App() {
    const [number, setNumber] = useState('');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/multiply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ number: number }),
            });

            if (!response.ok) {
                throw new Error('Server error');
            }

            const data = await response.json();
            setResult(data.result);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

  return (
      <div className="App">
          <header className="App-header">
              <h1>Multiply by 2</h1>
              <form onSubmit={handleSubmit}>
                  <input
                      type="number"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      placeholder="Enter a number"
                      required
                  />
                  <button type="submit" disabled={isLoading}>
                      {isLoading ? 'Calculating...' : 'Multiply'}
                  </button>
              </form>

              {result && <div className="result">Result: {result}</div>}
              {error && <div className="error">Error: {error}</div>}
          </header>
      </div>
  );
}

export default App;
