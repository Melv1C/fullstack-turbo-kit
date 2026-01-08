import { Button } from '@repo/ui';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Button
        onClick={() => alert('Hello from the Button component!')}
        className="mt-2 bg-blue-500 text-white p-2 rounded cursor-pointer"
      >
        Click me
      </Button>
    </div>
  );
}
