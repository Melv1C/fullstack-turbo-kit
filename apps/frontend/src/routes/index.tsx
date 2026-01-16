import { useAPIHealth } from '@/hooks/use-api-health';
import { env } from '@/lib/env';
import { Button } from '@melv1c/ui-kit';
import { Logo, RedButton } from '@repo/ui';
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

      <RedButton />

      <div>
        <h4 className="mt-4">Environment Variables:</h4>
        <ul>
          <li>VITE_NODE_ENV: {env.VITE_NODE_ENV}</li>
          <li>VITE_PORT: {env.VITE_PORT}</li>
          <li>VITE_BACKEND_URL: {env.VITE_BACKEND_URL}</li>
          <li>VITE_FRONTEND_URL: {env.VITE_FRONTEND_URL}</li>
          <li>VITE_ADMIN_URL: {env.VITE_ADMIN_URL}</li>
        </ul>
      </div>
    </div>
  );
}
