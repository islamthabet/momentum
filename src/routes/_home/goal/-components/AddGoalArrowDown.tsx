import { motion } from 'framer-motion';
import React, { FC } from 'react';
import { GoChevronDown } from 'react-icons/go';

interface Props {
  isInputFocused: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
}

const AddGoalArrowDown: FC<Props> = ({ isInputFocused, setIsModalOpen, isModalOpen }) => {
  return (
    <motion.div
      variants={{ open: { opacity: 0, y: -10 }, closed: { opacity: 1, y: 0 } }}
      animate={isInputFocused ? 'closed' : 'open'}
      onMouseDown={(e) => {
        e.preventDefault();
        setIsModalOpen(!isModalOpen);
      }}
      className="cursor-pointer rounded p-1 hover:bg-gray-200 "
    >
      <GoChevronDown className="pointer-events-none" />
    </motion.div>
  );
};

export default AddGoalArrowDown;
