import { motion } from 'framer-motion';
import { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { GoalForm } from './interface/GoalForm.interface';

interface Props {
  register: UseFormRegister<GoalForm>;
  isInputFocused: boolean;
  name: string;
}

const AddGoalInput: FC<Props> = ({ register, isInputFocused, name }) => {
  return (
    <div className="relative flex-grow">
      <input
        autoComplete="off"
        {...register('title')}
        type="text"
        className="relative z-10 w-full rounded bg-transparent px-4 py-2 text-sm shadow-sm focus-visible:outline-none"
      />
      <div
        className={`absolute left-0 top-0 z-0 h-full w-full rounded border  ${isInputFocused ? 'bg-transparent' : 'border-transparent bg-zinc-900 bg-opacity-[.03]'}`}
      ></div>
      <motion.div
        initial={{ x: 100, y: '-50%' }}
        animate={name ? 'open' : 'closed'}
        variants={{ open: { x: 100, y: '-50%', opacity: 0 }, closed: { x: 0, y: '-50%', opacity: 1 } }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400"
      >
        + Add a goal...
      </motion.div>
    </div>
  );
};

export default AddGoalInput;
