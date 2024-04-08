import { motion } from 'framer-motion';
import { FC, useCallback } from 'react';
import { useDeleteGoalMutation } from './api/goalQueryOptions';
import { useNavigate, useParams } from '@tanstack/react-router';
import { Goal } from './interface/Goal.interface';

interface Props {
  goal: Goal;
  setOpen: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      goal: null | Goal;
    }>
  >;
}

const DeleteGoalModal: FC<Props> = ({ goal, setOpen }) => {
  const { mutateAsync } = useDeleteGoalMutation(goal.id);
  const { id }: any = useParams({ strict: false });
  const navigate = useNavigate();
  const closeModal = useCallback(() => setOpen({ open: false, goal: null }), []);

  return (
    <motion.div
      onKeyDown={(e) => {
        e.key === 'Escape' && closeModal();
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center overflow-hidden bg-black bg-opacity-50"
    >
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="rounded-md bg-white p-8 shadow-xl"
      >
        <h1>Are you sure you want to delete {goal.title}?</h1>
        <div className="flex gap-3">
          <button
            className="btn btn-outline btn-error btn-wide"
            onClick={async () => {
              await mutateAsync();
              if (id == goal.id) navigate({ to: '/goal' });
              closeModal();
            }}
          >
            Delete Goal
          </button>
          <button onClick={closeModal} className="btn  btn-accent btn-wide">
            Cancel Goal
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeleteGoalModal;
