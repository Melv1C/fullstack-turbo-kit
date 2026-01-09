import { useAPIHealth } from '@/hooks/use-api-health';
import { Button } from '@repo/ui';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { data, isPending, isError } = useAPIHealth();

  return (
    <div className="p-2">
      <h3>Admin Dashboard</h3>
      <Button
        onClick={() => alert('Welcome to the Admin Dashboard!')}
        className="mt-2 bg-blue-500 text-white p-2 rounded cursor-pointer"
      >
        Click me
      </Button>
      {isPending && <p className="mt-2">Loading API health...</p>}
      {isError && <p className="mt-2 text-red-500">Failed to fetch API health</p>}
      {data && <pre className="mt-2">{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
