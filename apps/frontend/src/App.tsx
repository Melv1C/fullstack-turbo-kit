import { Button } from "@repo/ui";
import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFromBackend = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setMessage(data.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Welcome to Frontend</h1>
      </header>
      <main>
        <Button onClick={fetchFromBackend} disabled={loading}>
          {loading ? "Loading..." : "Get API Message"}
        </Button>
        {message && (
          <p style={{ color: "#4CAF50", marginTop: "1rem" }}>✓ {message}</p>
        )}
        {error && (
          <p style={{ color: "#f44336", marginTop: "1rem" }}>
            ✗ Error: {error}
          </p>
        )}
      </main>
    </div>
  );
}

export default App;
