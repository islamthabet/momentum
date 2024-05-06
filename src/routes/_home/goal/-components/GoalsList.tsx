import { priorityMapping } from '@/enum/priority.enum';
import { Link } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, Fragment, useState } from 'react';
import { SlEye, SlTrash } from 'react-icons/sl';
import DeleteGoalModal from './DeleteGoalModal';
import { useUpdateGoalMutation } from './api/goalQueryOptions';
import { Goal } from './interface/Goal.interface';
import { BiTask } from 'react-icons/bi';
import { IoChevronDownSharp, IoChevronForwardSharp } from 'react-icons/io5';
import axiosInstance from '@/config/axiosInstance';
import { useQueryClient } from '@tanstack/react-query';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Tooltip } from 'react-tooltip';

interface Props {
  goals: Goal[];
}

const GoalsList: FC<Props> = ({ goals }) => {
  const [expanded, setExpanded] = useState(0);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; goal: Goal | null }>({ open: false, goal: null });
  const { mutateAsync } = useUpdateGoalMutation();
  const queryClient = useQueryClient();
  return (
    <div className="mt-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300">
      {goals?.map((goal) => (
        <Fragment key={goal.id}>
          <motion.div
            initial={{
              opacity: 0,
              x: '-100%',
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="relative mt-1 flex items-center justify-between gap-3 rounded p-4 transition-colors duration-300 hover:bg-zinc-900 hover:bg-opacity-[0.03]"
          >
            <div className="z-10 flex items-start justify-start gap-3">
              {goal.taskCount > 0 && (
                <div className="flex h-6 w-6 cursor-pointer items-center justify-center self-center rounded-md hover:bg-slate-300">
                  <label className="swap swap-rotate">
                    <input
                      type="checkbox"
                      checked={+goal.id === expanded}
                      onChange={() => {
                        if (+goal.id === expanded) setExpanded(0);
                        else setExpanded(+goal.id);
                      }}
                    />
                    <IoChevronDownSharp className="swap-on" />
                    <IoChevronForwardSharp className="swap-off" />
                  </label>
                </div>
              )}
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
                className="cursor-pointer text-rose-500"
                // data-tip={`Delete Goal ${goal.title}`}
                data-tooltip-content={`Delete Goal ${goal.title}`}
                data-tooltip-id={goal.id + '-' + goal.title}
                data-tooltip-float={true}
                data-tooltip-class-name="rounded-md bg-rose-200 text-rose-700"
                onClick={() => setDeleteModal({ open: true, goal })}
              >
                <Tooltip
                  id={goal.id + '-' + goal.title}
                  className="rounded-md bg-rose-200 text-rose-700"
                  classNameArrow="bg-rose-200"
                  // offset={16}
                />
                <SlTrash />
              </div>
            </div>
            <AnimatePresence>
              {goal.status === 'DONE' && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '100%', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="absolute right-0 top-0 z-0 h-full w-full rounded bg-opacity-35 bg-gradient-to-r from-gray-200 to-gray-300 backdrop-blur-sm"
                ></motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <AnimatePresence>
            {expanded === +goal.id && (
              <motion.div
                className="space-y-1 overflow-hidden rounded-b-lg bg-blue-200 bg-opacity-40 shadow-lg"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ ease: 'linear' }}
              >
                {goal.tasks.map((task) => (
                  <motion.div
                    key={task.id}
                    className="flex items-center justify-between gap-2 p-4 pl-14 text-sm text-zinc-600 hover:bg-zinc-200"
                    onContextMenu={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className={`${task.status === 'DONE' && 'checkbox-accent'} checkbox checkbox-xs`}
                        checked={task.status === 'DONE'}
                        onClick={async () => {
                          await axiosInstance.patch('tasks/' + task.id, {
                            status: task.status === 'DONE' ? 'TODO' : 'DONE',
                          });
                          queryClient.invalidateQueries({ queryKey: ['tasks'] });
                          queryClient.invalidateQueries({ queryKey: ['goals'] });
                        }}
                      />
                      <span className={`${task.status === 'DONE' ? 'text-zinc-400 line-through' : ''}`}>
                        {task.title}
                      </span>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <span className="rounded-badge bg-orange-100 px-3 text-xs lowercase text-orange-900">
                        {task.status}
                      </span>
                      <div className="cursor-pointer hover:text-primary">
                        <BsThreeDotsVertical />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </Fragment>
      ))}
      <AnimatePresence>
        {deleteModal.open && deleteModal.goal && <DeleteGoalModal setOpen={setDeleteModal} goal={deleteModal.goal} />}
      </AnimatePresence>
    </div>
  );
};

export default GoalsList;
