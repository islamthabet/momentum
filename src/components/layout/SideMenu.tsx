import { Link, useNavigate } from '@tanstack/react-router';
import { MdTaskAlt, MdCalendarMonth, MdCenterFocusWeak } from 'react-icons/md';
import { RiMapPinTimeLine } from 'react-icons/ri';
import { GiNotebook, GiPapers } from 'react-icons/gi';
import { IoMdNotifications, IoMdPower } from 'react-icons/io';
import { GiStairsGoal } from 'react-icons/gi';
import { Tooltip } from 'react-tooltip';

import { Fragment, useMemo } from 'react';
import axiosInstance from '@/config/axiosInstance';
import { useDispatch } from 'react-redux';
import { logout } from '@/config/state/features/authSlice';
import { HiOutlineIdentification } from 'react-icons/hi';
import { FiUser } from 'react-icons/fi';
import { useAbilities } from '@/hooks/useAbilities';
import { routesEnum } from '@/enum/routes.enum';

const SideMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const links = useMemo(() => {
    return [
      {
        to: '/' + routesEnum.roles,
        dataTip: 'Role',
        icon: <HiOutlineIdentification />,
        subject: routesEnum.roles,
      },
      {
        to: '/' + routesEnum.users,
        dataTip: 'User',
        icon: <FiUser />,
        subject: routesEnum.users,
      },
      {
        to: '/goal',
        dataTip: 'Goals',
        icon: <GiStairsGoal />,
        subject: 'goal',
      },
      {
        to: '/task',
        dataTip: 'Tasks',
        icon: <MdTaskAlt />,
        subject: 'goal',
      },
      {
        to: '/calender',
        dataTip: 'Calender',
        icon: <MdCalendarMonth />,
        subject: 'goal',
      },
      {
        to: '/focus',
        dataTip: 'Focus',
        icon: <MdCenterFocusWeak />,
        subject: 'goal',
      },
      {
        to: '/habit',
        dataTip: 'Habits',
        icon: <RiMapPinTimeLine />,
        subject: 'habit',
      },
      {
        to: '/diary',
        dataTip: 'Dairies',
        icon: <GiNotebook />,
        subject: 'diary',
      },
      {
        to: '/morningPaper',
        dataTip: 'Morning Paper',
        icon: <GiPapers />,
        subject: 'diary',
      },
    ] as const;
  }, []);
  const { ability } = useAbilities();
  return (
    <div className="z-[99] flex h-full w-14 flex-none flex-col items-center border-r border-solid border-transparent border-r-gray-200 bg-stone-50 pb-7 shadow-xl">
      <Link to="/profile">
        <img className="my-4 h-8 w-8 rounded-lg object-cover shadow-lg" src="https://placebeard.it/32/32" alt="image" />
      </Link>

      <div className="mt-4 flex w-full flex-grow flex-col items-center gap-6 ">
        {links.map(({ to, icon, dataTip, subject }) => {
          return (
            <Fragment key={to}>
              {ability.can('manage', subject) && (
                <div
                  key={to}
                  className="flex w-full items-center justify-center"
                  data-tooltip-id={to}
                  data-tooltip-content={dataTip}
                  data-tooltip-place="right"
                >
                  <Tooltip id={to} noArrow />
                  <Link
                    to={to}
                    className=" flex items-center gap-2 [&_svg]:text-[1.75rem] [&_svg]:text-zinc-900 [&_svg]:opacity-40 [&_svg]:hover:opacity-60"
                    activeProps={{ className: '[&_svg]:!text-primary [&_svg]:!opacity-100  pointer-events-none' }}
                  >
                    {icon}
                  </Link>
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
      <Tooltip id="Notifications" noArrow />
      <div
        data-tooltip-id="Notifications"
        data-tooltip-content="Notifications"
        data-tooltip-place="right"
        className="mb-8 flex w-full items-center justify-center"
      >
        <IoMdNotifications className="cursor-pointer  text-[1.75rem] text-zinc-900  opacity-40 hover:opacity-60" />
      </div>

      <Tooltip id="Logout" noArrow />
      <div
        data-tooltip-id="Logout"
        data-tooltip-content="Logout"
        data-tooltip-place="right"
        className="mb-8 flex w-full items-center justify-center"
        onClick={async () => {
          await axiosInstance.get('/auth/logout');
          dispatch(logout());
          localStorage.removeItem('token');
          localStorage.removeItem('expireIn');
          navigate({ to: '/' });
        }}
      >
        <IoMdPower className="cursor-pointer  text-[1.75rem] text-zinc-900  opacity-40 hover:opacity-60" />
      </div>
    </div>
  );
};

export default SideMenu;
