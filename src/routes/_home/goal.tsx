import PageTitle from '@/components/layout/PageTitle';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import GoalsList from './goal/-components/GoalsList';
import AddGoalForm from './goal/-components/AddGoalForm';
import { categoriesQueryOptions } from '@/utils/categories/categoriesQueryOptions';
import { useSuspenseQueries } from '@tanstack/react-query';
import { goalsQueryOptions } from './goal/-components/api/goalQueryOptions';
import { useWindowSize } from 'react-use';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from '@/components/Loader';

export const Route = createFileRoute('/_home/goal')({
  component: Goals,
  loader: async (opts) => {
    return Promise.all([
      opts.context.queryClient.ensureQueryData(categoriesQueryOptions),
      opts.context.queryClient.ensureQueryData(goalsQueryOptions),
    ]);
  },
  pendingComponent: () => <Loader />,
});

function Goals() {
  const { width } = useWindowSize();
  const [categories, goals] = useSuspenseQueries({ queries: [categoriesQueryOptions, goalsQueryOptions] });
  console.log((goals.data as any)?.data);

  return (
    <div className="grid h-full flex-grow grid-cols-12 gap-2 ">
      <div className="col-span-12 flex h-screen flex-col py-4 md:col-span-8">
        <PageTitle title="Goals" />
        <AddGoalForm categories={(categories.data as any).data} />
        <GoalsList goals={(goals.data as any).data} />
      </div>
      <AnimatePresence>
        {width > 950 && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            className="z-50 col-span-4 border-l border-gray-400 border-opacity-40 "
          >
            <Outlet />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
