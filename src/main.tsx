/* eslint-disable @typescript-eslint/no-explicit-any */
import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { store } from './config/state/store';
import { Provider } from 'react-redux';
import './index.css';
import './i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { routeTree } from './routeTree.gen';
import 'react-datepicker/dist/react-datepicker.css';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
    mutations: {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  },
});

// Create a new router instance
const router = createRouter({ routeTree, context: { store: store.getState(), queryClient } });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById('app')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <StrictMode>
      <Suspense fallback="...Loading">
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <RouterProvider router={router} />
            {/* <ReactQueryDevtools initialIsOpen={false} position="top" buttonPosition="top-right"  /> */}
          </Provider>
        </QueryClientProvider>
      </Suspense>
    </StrictMode>
  );
}
