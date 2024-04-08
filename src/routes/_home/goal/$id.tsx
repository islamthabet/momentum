import { useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link, useBlocker } from '@tanstack/react-router';
import { useEffect, useMemo, useState } from 'react';
import { goalQueryOptions, useUpdateGoalMutation } from './-components/api/goalQueryOptions';
import { GiPencil } from 'react-icons/gi';
import { categoriesQueryOptions } from '@/utils/categories/categoriesQueryOptions';
import Select from 'react-select';
import { Category, Goal as IGoal } from './-components/interface/Goal.interface';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { TfiPlus } from 'react-icons/tfi';
import axiosInstance from '@/config/axiosInstance';
import { AxiosResponse } from 'axios';
import { RiArrowDropRightLine } from 'react-icons/ri';

export const Route = createFileRoute('/_home/goal/$id')({
  loader: async ({ params, context }) => {
    return context.queryClient.ensureQueryData(goalQueryOptions(params.id));
  },

  component: Goal,
});

function Goal() {
  const { data: tasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: async (): Promise<AxiosResponse<any>> => axiosInstance.get('tasks'),
  });
  const [startAddTask, setStartAddTask] = useState(false);
  const { id } = Route.useParams();
  const { data: goal } = useSuspenseQuery(goalQueryOptions(id));
  const { data: categories } = useQuery(categoriesQueryOptions);
  // const { data: categories } = useSuspenseQuery(categoriesQueryOptions);
  const [data, setData] = useState<Partial<IGoal>>({
    id: goal.id,
    title: goal.title ?? '',
    description: goal.description ?? '',
    categories: goal.categories ?? [],
    priority: goal.priority ?? 0,
  });
  const [selected, setSelected] = useState({ label: 'Mid', value: 3 });
  const blocker = useMemo(() => {
    return goal.title === data.title && goal.description === data.description;
  }, [data, goal]);

  const queryClient = useQueryClient();

  const { mutate } = useUpdateGoalMutation();
  useEffect(() => {
    setData({
      id: goal.id,
      title: goal.title ?? '',
      description: goal.description ?? '',
      categories: goal.categories ?? [],
    });
  }, [id]);

  const [task, setTask] = useState('');

  useBlocker(() => window.confirm('the changes will be discard are you sure?'), !blocker);

  return (
    <div className="p-4">
      <button
        aria-label="update"
        className="btn btn-square btn-neutral btn-sm w-full"
        disabled={goal.title === data.title && goal.description === data.description}
        onClick={() => {
          mutate({ title: data.title, description: data.description, id: goal.id });
          queryClient.invalidateQueries({ queryKey: ['goals'] });
          // setSubmit(true);
        }}
      >
        Edit <GiPencil />
      </button>
      <input
        className="input input-ghost mt-4 w-full font-medium text-primary-content"
        type="text"
        onChange={({ currentTarget }) => {
          setData({ ...data, title: currentTarget.value });
        }}
        value={data.title}
      />
      <textarea
        rows={5}
        className="textarea textarea-bordered mt-4 max-h-[50vh] w-full resize-none overflow-auto text-sm"
        value={data.description}
        onChange={(e) => {
          setData({ ...data, description: e.target.value });
          // e.target.style.height = e.target.scrollHeight + 'px';
        }}
      ></textarea>
      {/* <div className="flex gap-2"> */}
      <Select
        className="mt-4"
        isMulti={true}
        onChange={(e) => {
          setData((prev) => {
            return { ...prev, categories: e as Category[] };
          });
          if (e.length > 0) {
            mutate({ id: goal.id, categories: e.map((e: any) => e.id) });
          }
        }}
        options={categories}
        getOptionLabel={(opt) => opt.title}
        getOptionValue={(opt) => opt.id}
        value={data.categories}
      ></Select>
      <Select
        className="mt-1"
        onChange={(e) => {
          setSelected(e as any);
          setData({ ...data, priority: e?.value });
          mutate({ id: goal.id, priority: e?.value });
        }}
        options={[
          { label: 'None', value: 1 },
          { label: 'Low', value: 2 },
          { label: 'Mid', value: 3 },
          { label: 'High', value: 4 },
          { label: 'Urgent', value: 5 },
        ]}
        value={selected}
      ></Select>
      <hr className="my-4 w-full" />
      <div className="mt-4 space-y-3">
        {tasks?.data.map((task: any) => {
          return (
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              className="flex w-full items-center gap-2"
              key={task.id}
            >
              <input type="checkbox" className="checkbox-accent checkbox checkbox-xs" />
              <input
                value={task.title}
                onChange={(e) => console.log(e)}
                className="w-full flex-grow border-none text-sm text-zinc-800 outline-none focus-visible:outline-none"
              />
              <Link to="/task">
                <RiArrowDropRightLine className="" />
              </Link>
            </motion.div>
          );
        })}
      </div>
      <AnimatePresence>
        {startAddTask && (
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <input
              type="text"
              className="w-full border-none text-sm text-gray-500 outline-none focus-within:outline-none"
              placeholder="No title"
              autoFocus
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <TfiPlus
              className="cursor-pointer text-sm"
              onClick={async () => {
                await axiosInstance.post('tasks', { goalId: id, title: task });
                queryClient.invalidateQueries({ queryKey: ['tasks'] });
                setTask('');
                setStartAddTask(false);
              }}
            />
            {/* <Link to="/task">
              <SlArrowRight className="text-xs" />
            </Link> */}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => {
          setStartAddTask(true);
        }}
        className="mt-3 w-full cursor-pointer rounded-lg px-3 py-2 text-sm text-blue-700 transition-all duration-150 ease-in-out focus-within:outline-none hover:bg-blue-200 active:scale-95"
      >
        + Add task
      </button>
      {/* </div> */}
    </div>
  );
}
