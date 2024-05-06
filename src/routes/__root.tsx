import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import '../index.css';
import { QueryClient } from '@tanstack/react-query';
import { RootState } from '@/config/state/store';
import { useSelector } from 'react-redux';
import { selectLoader } from '@/config/state/features/loaderSlice';
import Loader from '@/components/Loader';
import { AnimatePresence, motion } from 'framer-motion';
import { socket } from '@/config/socket';
import { useEffect, useState } from 'react';

export const Route = createRootRouteWithContext<{ queryClient: QueryClient; store: RootState }>()({
  component: Root,
});

function Root() {
  const loading = useSelector(selectLoader);
  const [isConnected, setIsConnected] = useState(socket.connected);
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log('connected', socket.connected);
    }

    function onDisconnect() {
      console.log('disconnected', socket.connected);
      setIsConnected(false);
    }

    console.log(socket);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);
  return (
    <>
      <Outlet />
      {/* <div className="fixed left-0 top-0 z-[9999] flex h-screen w-screen items-center justify-center bg-white">
        <div className="flex h-3/4 w-3/4 border border-red-200">
          <CanvasWrapper />
        </div>
      </div> */}
      <div>{isConnected}</div>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed left-0 top-0 z-[999] flex h-screen w-screen items-center justify-center bg-black bg-opacity-15"
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>
      {/* <TanStackRouterDevtools /> */}
    </>
  );
}
