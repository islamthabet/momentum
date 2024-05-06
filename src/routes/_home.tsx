// import SideMenu from '@/components/layout/SideMenu';
import SideMenu from '@/components/layout/SideMenu';
import axiosInstance from '@/config/axiosInstance';
import { login } from '@/config/state/features/authSlice';
import { store } from '@/config/state/store';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { User } from './_home/goal/-components/interface/Goal.interface';
import { handleUnValidToken } from '@/utils/tokenHandler';

export const Route = createFileRoute('/_home')({
  beforeLoad: async (opt) => {
    const token = localStorage.getItem('token');
    const tokenExpire = localStorage.getItem('expireIn');
    const isExpire = Date.now() > +tokenExpire!;
    // if (!token || isExpire) {
    //   handleUnValidToken();
    // }
    try {
      const profile = await axiosInstance.get<User>('profile');
      const location = opt.location.pathname.split('/')[1];
      profile.data.role.permissions.some((permission) => {
        console.log('we ', permission.subject.toLowerCase(), location.toLocaleLowerCase());
        if (permission.subject.toLowerCase() === location.toLocaleLowerCase() || permission.subject === 'all') {
          return true;
        }
      });
      store.dispatch(
        login({
          isLogin: true,
          user: profile.data,
        })
      );
      return true;
    } catch (err) {
      // handleUnValidToken();
    }
  },
  component: Home,
});

function Home() {
  return (
    <div className="flex h-screen">
      <SideMenu />
      <div className="flex h-screen flex-grow overflow-hidden px-5">
        <Outlet />
      </div>
    </div>
  );
}
