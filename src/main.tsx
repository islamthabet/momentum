import {StrictMode, Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider, createRouter} from '@tanstack/react-router';
import {store} from './state/store';
import {Provider} from 'react-redux';
import './index.css';
import './i18n';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {routeTree} from './routeTree.gen';

// Create a new router instance
const router = createRouter({routeTree});

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
  const queryClient = new QueryClient();
  root.render(
    <StrictMode>
      <Suspense fallback='...Loading'>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </Provider>
        </QueryClientProvider>
      </Suspense>
    </StrictMode>
  );
}
