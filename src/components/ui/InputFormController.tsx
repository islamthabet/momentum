/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, InputHTMLAttributes } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface InputFormControllerProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  errors: FieldErrors;
  register: UseFormRegister<any>;
  icon?: JSX.Element;
}

export const InputFormController: FC<InputFormControllerProps> = ({ errors, register, name, icon, ...rest }) => {
  return (
    <div>
      <label className={`input input-bordered flex items-center gap-2 ${errors[name] && 'input-error'}`}>
        {icon}
        <input {...register(name)} {...rest} />
      </label>
      {errors[name] && <small className="text-error">{errors[name]?.message as string}</small>}
    </div>
  );
};
