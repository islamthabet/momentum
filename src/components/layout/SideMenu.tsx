import { Link } from '@tanstack/react-router';
import { MdTaskAlt, MdCalendarMonth, MdCenterFocusWeak } from 'react-icons/md';
import { RiMapPinTimeLine } from 'react-icons/ri';
import { GiNotebook, GiPapers } from 'react-icons/gi';
import { IoMdNotifications } from 'react-icons/io';
import { GiStairsGoal } from 'react-icons/gi';

import { useMemo } from 'react';

const SideMenu = () => {
  const links = useMemo(() => {
    return [
      {
        to: '/goal',
        dataTip: 'Goals',
        icon: <GiStairsGoal />,
      },
      {
        to: '/task',
        dataTip: 'Tasks',
        icon: <MdTaskAlt />,
      },
      {
        to: '/calender',
        dataTip: 'Calender',
        icon: <MdCalendarMonth />,
      },
      {
        to: '/focus',
        dataTip: 'Focus',
        icon: <MdCenterFocusWeak />,
      },
      {
        to: '/habit',
        dataTip: 'Habits',
        icon: <RiMapPinTimeLine />,
      },
      {
        to: '/diary',
        dataTip: 'Dairies',
        icon: <GiNotebook />,
      },
      {
        to: '/morningPaper',
        dataTip: 'Morning Paper',
        icon: <GiPapers />,
      },
    ] as const;
  }, []);
  return (
    <div className="border-grey-5 l-low:z-[4] z-[5] flex h-full w-[50px] flex-none flex-col items-center border-r border-solid bg-stone-50 pb-[28px]">
      <Link to="/profile">
        <img className="my-4 h-8 w-8 rounded-lg object-cover shadow-lg" src="https://placebeard.it/32/32" alt="image" />
      </Link>

      <div className="mt-4 flex w-full flex-grow flex-col items-center gap-6 ">
        {links.map(({ to, icon, dataTip }) => (
          <div key={to} className="tooltip tooltip-right  flex w-full items-center justify-center" data-tip={dataTip}>
            <Link
              to={to}
              className=" flex items-center gap-2 [&_svg]:text-[1.75rem] [&_svg]:text-zinc-900 [&_svg]:opacity-40 [&_svg]:hover:opacity-60"
              activeProps={{ className: '[&_svg]:!text-primary [&_svg]:!opacity-100  pointer-events-none' }}
            >
              {icon}
            </Link>
          </div>
        ))}
      </div>
      <div data-tip="Notifications" className="tooltip tooltip-right  mb-8 flex w-full items-center justify-center">
        <IoMdNotifications className="cursor-pointer  text-[1.75rem] text-zinc-900  opacity-40 hover:opacity-60" />
      </div>
    </div>
  );
};

export default SideMenu;
