import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import logo from '../assets/logo.png';

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
        <img src={logo} alt="logo" width={140} height={140} />
        <div className="rounded-lg border border-solid border-gray-400 border-opacity-30 p-10 shadow-xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
