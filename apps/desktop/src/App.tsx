import { useEffect, useState } from 'react';

import './index.css';

export const App = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(window.bridge.ping()); // Example usage of the exposed API
  }, [count]);
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold">Counter Demo2</h1>
      <div className="text-5xl my-8">{count}</div>
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 text-base bg-red-500 text-white rounded hover:bg-blue-600"
        >
          Decrement
        </button>
        <button
          onClick={() => setCount(0)}
          className="px-4 py-2 text-base bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 text-base bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Increment
        </button>
      </div>
    </div>
  );
};
