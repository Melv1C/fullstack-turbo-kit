import { authClient } from '@/lib/auth-client';
import { LocaleProvider } from '@melv1c/ui-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const queryClient = new QueryClient();

export const Route = createRootRoute({
  beforeLoad: async ({ location }) => {
    const { data: session } = await authClient.getSession();
    const isPublicPage = location.pathname === '/login' || location.pathname === '/unauthorized';

    if (!session && !isPublicPage) {
      throw redirect({ to: '/login' });
    }

    if (session && location.pathname === '/login') {
      throw redirect({ to: '/' });
    }

    const isAdmin = session?.user?.role === 'admin';
    if (session && !isAdmin && !isPublicPage) {
      throw redirect({ to: '/unauthorized' });
    }
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider language="en">
        <Outlet />
      </LocaleProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools />
    </QueryClientProvider>
  );
}
