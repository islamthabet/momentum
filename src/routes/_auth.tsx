import {createFileRoute, Outlet, redirect} from '@tanstack/react-router';

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
    <div className='bg-primary'>
      welcome
      <Outlet />
    </div>
  );
}
