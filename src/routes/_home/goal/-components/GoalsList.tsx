import { priorityMapping } from '@/enum/priority.enum';
import { Link } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';
import { SlEye, SlTrash } from 'react-icons/sl';
import DeleteGoalModal from './DeleteGoalModal';
import { useUpdateGoalMutation } from './api/goalQueryOptions';
import { Goal } from './interface/Goal.interface';
import { BiTask } from 'react-icons/bi';

interface Props {
  goals: Goal[];
}

const GoalsList: FC<Props> = ({ goals }) => {
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; goal: Goal | null }>({ open: false, goal: null });
  const { mutateAsync } = useUpdateGoalMutation();
  return (
    <div className="mt-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300">
      {goals?.map((goal) => (
        <motion.div
          initial={{
            opacity: 0,
            x: '-100%',
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          key={goal.id}
          className="relative mt-1 flex items-center justify-between gap-3 rounded p-4 transition-colors duration-300 hover:bg-zinc-900 hover:bg-opacity-[0.03]"
        >
          <div className="z-10 flex items-start justify-start gap-3">
            {}
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  checked={goal.status === 'DONE'}
                  onChange={async (e) => {
                    await mutateAsync({ status: e.target.checked ? 'DONE' : 'TODO', id: goal.id });
                  }}
                  className="checkbox-primary checkbox checkbox-sm"
                />
              </label>
            </div>
            <Link to="/goal/$id" params={{ id: goal.id }} className="cursor-pointer">
              <div className="text-sm font-medium text-zinc-900">{goal.title}</div>
              <div className="text-xs text-zinc-900 opacity-40">{goal.description?.slice(0, 30)}</div>
            </Link>
          </div>
          <div className="z-10 flex items-center gap-3">
            <div className="flex gap-1 text-zinc-500">
              <div className="text-xs ">{goal.completedTask + '/' + goal.taskCount}</div>
              <BiTask />
            </div>
            <div className={priorityMapping[goal.priority].color}>{priorityMapping[goal.priority].label}</div>
            <div className="rounded-3xl bg-primary px-2 py-0.5 text-center text-xs lowercase text-primary-content">
              {goal.status}
            </div>
            <div className="rounded-3xl bg-rose-200 px-2 py-0.5 text-center text-xs lowercase text-primary-content">
              {goal.categories.map((category: any) => category.title as string).join(', ')}
            </div>
            <Link to="/goal/$id" params={{ id: goal.id }} className="cursor-pointer">
              <SlEye />
            </Link>
            <div
              className="tooltip tooltip-left cursor-pointer text-rose-500"
              data-tip={`Delete Goal ${goal.title}`}
              onClick={() => setDeleteModal({ open: true, goal })}
            >
              <SlTrash />
            </div>
          </div>
          <AnimatePresence>
            {goal.status === 'DONE' && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="absolute right-0 top-0 z-0 h-full w-full rounded bg-opacity-35 bg-gradient-to-r from-gray-200 to-gray-300"
              ></motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
      <AnimatePresence>
        {deleteModal.open && deleteModal.goal && <DeleteGoalModal setOpen={setDeleteModal} goal={deleteModal.goal} />}
      </AnimatePresence>
    </div>
  );
};

export default GoalsList;
