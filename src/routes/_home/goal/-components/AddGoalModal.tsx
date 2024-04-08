import { AnimatePresence, motion } from 'framer-motion';
import Select from 'react-select';
import { FC } from 'react';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';

import grayFlag from '@/assets/gray-flag.svg';
import redFlag from '@/assets/red-flag.svg';
import yellowFlag from '@/assets/yellow-flag.svg';
import orangeFlag from '@/assets/orange-flag.svg';
import greenFlag from '@/assets/green-flag.svg';

const flags = [
  { src: grayFlag, alt: 'gray flag', tip: 'None', value: 1 },
  { src: greenFlag, alt: 'green flag', tip: 'Low', value: 2 },
  { src: yellowFlag, alt: 'yellow flag', tip: 'Mid', value: 3 },
  { src: orangeFlag, alt: 'orange flag', tip: 'High', value: 4 },
  { src: redFlag, alt: 'red flag', tip: 'Urgent', value: 5 },
];

interface Props {
  isModalOpen: boolean;
  setValue: UseFormSetValue<any>;
  priority: number;
  categories: any[];
  control: Control<any, any>;
}

const AddGoalModal: FC<Props> = ({ isModalOpen, setValue, priority, categories, control }) => {
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0, x: '-90%' }}
          animate={{ opacity: 1, scale: 1, x: '-90%' }}
          exit={{ opacity: 0, scale: 0, x: '-90%' }}
          // transition={{from: }}
          className="absolute top-full mt-2 origin-top -translate-x-[90%] rounded border bg-white p-4 shadow-2xl"
        >
          <div>
            <div className="text-xs text-gray-400">Priority</div>
            <div className="mt-4 flex justify-between">
              {flags.map((flag, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: priority === index + 1 ? '#e5e7eb' : 'transparent',
                  }}
                  className={`tooltip tooltip-top w-8 cursor-pointer bg-opacity-30 p-1.5 hover:bg-gray-200`}
                  data-tip={flag.tip}
                  data-value={flag.value}
                  onClick={() => setValue('priority', index + 1)}
                >
                  <img src={flag.src} alt={flag.alt} />
                </div>
              ))}
            </div>
          </div>

          <hr className="mt-2" />
          <div className="mt-2">
            <div className="text-xs text-gray-400">Categories</div>

            <Controller
              name="categories"
              control={control}
              render={({ field }) => (
                <Select
                  isMulti
                  {...field}
                  className="mt-4 min-w-52"
                  options={categories}
                  getOptionValue={(option: any) => option?.id}
                  getOptionLabel={(option: any) => option?.title}
                />
              )}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddGoalModal;
