/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, InputProps } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';

interface InputFormControllerProps extends InputProps {
  name: string;
  error: {
    isError: boolean;
    message: string;
  };
  control: Control<any>;
  isPassword?: boolean;
}

export const InputFormController: FC<InputFormControllerProps> = ({ isPassword, error, control, name, ...rest }) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => {
          if (isPassword) return <Input.Password {...rest} {...field} status={error && 'error'} />;
          return <Input size="large" {...rest} {...field} status={error && 'error'} />;
        }}
      />
      <AnimatePresence>
        {error.isError && (
          <motion.small
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs text-error"
          >
            {error.message}
          </motion.small>
        )}
      </AnimatePresence>
    </>
  );
};
