import { motion, Variants } from 'framer-motion';
import { FC, useRef, useState } from 'react';
import AddGoalArrowDown from './AddGoalArrowDown';
import AddGoalInput from './AddGoalInput';
import AddGoalModal from './AddGoalModal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useClickAway } from 'react-use';
import { createFormSchema } from './schema/createform.schema';
import { GoalForm } from './interface/GoalForm.interface';
import { Category } from './interface/Goal.interface';
import { useCreateGoalMutation } from './api/goalQueryOptions';
import { GoPlus } from 'react-icons/go';
import { useQueryClient } from '@tanstack/react-query';

const variant: Variants = {
  open: { opacity: 1 },
  closed: { opacity: 1 },
};

interface Props {
  categories: Category[];
}

const AddGoalForm: FC<Props> = ({ categories }) => {
  const modal = useRef<HTMLDivElement>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const { handleSubmit, control, register, setValue, reset, formState } = useForm<GoalForm>({
    resolver: zodResolver(createFormSchema),
  });

  const name = useWatch({ control, name: 'title', defaultValue: '' });

  const priority = useWatch({ control, name: 'priority', defaultValue: 3 });

  const [isModalOpen, setIsModalOpen] = useState(false);
  useClickAway(modal, () => {
    setIsModalOpen(false);
  });
  const queryClient = useQueryClient();
  const { mutateAsync } = useCreateGoalMutation();
  const onSubmit = async (data: GoalForm) => {
    try {
      const categories = data.categories.map((cat: any) => cat.id);
      await mutateAsync({ ...data, categories });
      queryClient.invalidateQueries();
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  const btn = useRef<HTMLButtonElement>(null);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-4 flex flex-grow items-center justify-center gap-4" ref={modal}>
        <div
          className="relative w-full"
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => {
            setTimeout(() => setIsInputFocused(false), 100);
          }}
        >
          <AddGoalInput register={register} isInputFocused={isInputFocused} name={name} />
          <motion.div
            animate={isInputFocused ? 'open' : 'closed'}
            variants={variant}
            className="absolute left-[95%] top-1/2 z-20 -translate-y-1/2 group-focus-visible:block"
          >
            <AddGoalArrowDown
              isInputFocused={isInputFocused}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
            <AddGoalModal
              categories={categories}
              control={control}
              isModalOpen={isModalOpen}
              priority={priority}
              setValue={setValue}
            />
          </motion.div>
        </div>
        <button
          ref={btn}
          aria-label="add goal"
          disabled={!formState.isValid}
          type="submit"
          className="btn btn-circle btn-ghost z-10"
        >
          <GoPlus />
        </button>
      </div>
    </form>
  );
};

export default AddGoalForm;
