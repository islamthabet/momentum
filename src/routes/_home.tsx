// import SideMenu from '@/components/layout/SideMenu';
import SideMenu from '@/components/layout/SideMenu';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_home')({
  // beforeLoad: () => {
  //   const token = localStorage.getItem('token');
  //   if (false) {
  //     throw redirect({
  //       to: '/login',
  //     });
  //   }
  // },
  component: Home,
});

function Home() {
  // return keycloak?.authenticated ? <div>Secret content</div> : <div>Please log in to see the secret content.</div>;
  return (
    <div className="flex h-screen">
      <SideMenu />
      <div className="flex h-screen flex-grow overflow-hidden px-5">
        <Outlet />
      </div>
    </div>
  );
}
