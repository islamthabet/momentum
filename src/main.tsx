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
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader';
import { toast, ToastContainer } from 'react-toastify';
import { finLoading, isLoading } from './config/state/features/loaderSlice';
import { ConfigProvider } from 'antd';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
    mutations: {
      onMutate() {
        store.dispatch(isLoading());
        toast(this.meta?.message as string, {
          toastId: 'mutate',
        });
      },
      onSettled: (res: any) => {
        store.dispatch(finLoading());
        toast.dismiss('mutate');
        if (res?.message) {
          toast(res?.message as string, {
            type: 'success',
          });
        }
      },
      onSuccess: () => {
        // queryClient.invalidateQueries();
      },
    },
  },
});

// Create a new router instance
export const router = createRouter({
  routeTree,
  context: { store: store.getState(), queryClient },
  defaultPendingComponent: () => <Loader />,
});

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
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#32BAAE',
              colorPrimaryHover: '#4BC7BF',
              colorPrimaryActive: '#278D8A',
              colorPrimaryBorder: '#287D7E',
              colorPrimaryBorderHover: '#1F676E',
              colorPrimaryTextHover: '#FFFFFF',
              colorPrimaryTextActive: '#FFFFFF',
              colorPrimaryText: '#FFFFFF',
              colorPrimaryBg: '#32BAAE',
              colorPrimaryBgHover: '#4BC7BF',
            },
          }}
        >
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <RouterProvider router={router} />
              <ToastContainer />
              {/* <ReactQueryDevtools initialIsOpen={false} position="top" buttonPosition="top-right"  /> */}
            </Provider>
          </QueryClientProvider>
        </ConfigProvider>
      </Suspense>
    </StrictMode>
  );
}
