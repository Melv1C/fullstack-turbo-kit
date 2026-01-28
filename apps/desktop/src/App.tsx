import { useState } from 'react';

export const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Counter Demo</h1>
      <div style={{ fontSize: '3rem', margin: '2rem 0' }}>{count}</div>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button
          onClick={() => setCount(count - 1)}
          style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}
        >
          Decrement
        </button>
        <button onClick={() => setCount(0)} style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
          Reset
        </button>
        <button
          onClick={() => setCount(count + 1)}
          style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}
        >
          Increment
        </button>
      </div>
    </div>
  );
};
