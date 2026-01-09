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
      <h3>Welcome Home!</h3>
      <Logo />

      <div className="mt-4">
        <h4>API Health Check:</h4>
        {isPending && <p>Loading...</p>}
        {isError && <p className="text-red-500">Error fetching API health.</p>}
        {data && <p className="text-green-500">API is healthy!</p>}
      </div>

      <Button onClick={() => alert('Button from UI Kit clicked!')}>Click Me</Button>
    </div>
  );
}
