import { Button, Card, CardContent, CardHeader, CardTitle, UIKitProvider } from '@melv1c/ui-kit';
import { CardHealth } from '@repo/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { useAppVersion, useOpenExternal, usePing, usePlatform, useShowMessageBox } from './hooks';
import { useAPIHealth } from './hooks/use-api-health';
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

  const { isPending, isError, refetch } = useAPIHealth();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-6 p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Electron Desktop App</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">App Version: {appVersion}</p>
          <p className="mb-2">
            Platform: {platform?.platform} ({platform?.arch}) - Node.js v{platform?.nodeVersion}
          </p>
          <p className="mb-4">Ping Response: {isPinging ? 'Loading...' : pingResponse}</p>
        </CardContent>
      </Card>
      <CardHealth
        className="w-full max-w-md"
        isPending={isPending}
        isError={isError}
        refetch={refetch}
      />
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Counter: {count}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button onClick={() => setCount(count + 1)}>Increment</Button>
            <Button onClick={() => setCount(count - 1)}>Decrement</Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleOpenDocs}>Open Electron Docs</Button>
            <Button onClick={handleShowMessage}>Show Message Box</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UIKitProvider>
        <AppContent />
      </UIKitProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
