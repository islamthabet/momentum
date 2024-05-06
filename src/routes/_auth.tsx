import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import logo from '../assets/logo.png';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    const token = localStorage.getItem('token');
    if (token) {
      throw redirect({
        to: '/goal',
      });
    }
  },
  component: Auth,
});

function Auth() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <motion.img
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          src={logo}
          alt="logo"
          width={140}
          height={140}
        />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="rounded-lg border border-solid border-gray-300 border-opacity-30 px-6 py-10 shadow-xl"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}
