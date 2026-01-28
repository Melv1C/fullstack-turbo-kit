import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import { useAppVersion, useOpenExternal, usePing, usePlatform, useShowMessageBox } from './hooks';
import './index.css';

// Create a client outside the component to avoid recreation on re-renders
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      retry: 1,
    },
  },
});

function AppContent() {
  const [count, setCount] = useState(0);

  // Queries for data
  const { data: pingResponse, isLoading: isPinging } = usePing();
  const { data: appVersion } = useAppVersion();
  const { data: platform } = usePlatform();

  // Mutations for actions
  const openExternal = useOpenExternal();
  const showMessage = useShowMessageBox();

  const handleOpenDocs = () => {
    openExternal.mutate('https://www.electronjs.org/docs');
  };

  const handleShowMessage = () => {
    showMessage.mutate({
      type: 'info',
      title: 'Hello!',
      message: `Current count is ${count}`,
      buttons: ['Nice!', 'Cancel'],
    });
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold">Desktop App</h1>

      {/* Platform Info */}
      <div className="my-4 text-sm text-gray-600">
        <p>Version: {appVersion ?? 'Loading...'}</p>
        <p>
          Platform: {platform?.platform ?? '...'} ({platform?.arch ?? '...'})
        </p>
        <p>Ping: {isPinging ? 'Pinging...' : pingResponse}</p>
      </div>

      {/* Counter */}
      <div className="text-5xl my-8">{count}</div>
      <div className="flex gap-4 justify-center mb-6">
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 text-base bg-red-500 text-white rounded hover:bg-red-600"
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

      {/* Bridge Demo */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={handleOpenDocs}
          className="px-4 py-2 text-base bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Open Electron Docs
        </button>
        <button
          onClick={handleShowMessage}
          className="px-4 py-2 text-base bg-green-500 text-white rounded hover:bg-green-600"
        >
          Show Native Dialog
        </button>
      </div>
    </div>
  );
}

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
};
