import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import '../index.css';
import { QueryClient } from '@tanstack/react-query';
import { RootState } from '@/config/state/store';

export const Route = createRootRouteWithContext<{ queryClient: QueryClient; store: RootState }>()({
  component: () => (
    <>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
