import { Button } from '@repo/ui';
import { APP_NAME, APP_VERSION } from '@repo/utils';

export function App() {
  return (
    <div className="app">
      <header>
        <h1>
          Welcome to {APP_NAME} <small>v{APP_VERSION}</small>
        </h1>
      </header>
      <main>
        <p>This is the frontend application of your Turborepo setup.</p>

        <Button
          onClick={() => alert(`Hello from your ${APP_NAME} app!`)}
        >
          Click Me
        </Button>
      </main>
    </div>
  );
}
