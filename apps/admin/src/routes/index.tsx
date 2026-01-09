import { useAPIHealth } from '@/hooks/use-api-health';
import { Button } from '@melv1c/ui-kit';
import { Logo } from '@repo/ui';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { data, isPending, isError } = useAPIHealth();

  return (
    <div className="p-2">
      <h3>Admin Dashboard</h3>
      <Logo />
      {isPending && <p className="mt-2">Loading API health...</p>}
      {isError && <p className="mt-2 text-red-500">Failed to fetch API health</p>}
      {data && <pre className="mt-2">{JSON.stringify(data, null, 2)}</pre>}
      <Button onClick={() => alert('Button from UI Kit clicked!')}>Click Me</Button>
    </div>
  );
}
