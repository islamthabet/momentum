import { createFileRoute, Link } from '@tanstack/react-router';
import { Resolver, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { SocialButtons } from '../../../components/auth/SocialButtons';
import { InputFormController } from '@/components';
import { TfiEmail, TfiUser, TfiKey } from 'react-icons/tfi';

export const Route = createFileRoute('/_auth/signup')({
  component: SignUp,
});

interface SignUpForm {
  email: string;
  password: string;
  username?: string;
}

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3).optional(),
});

const resolver: Resolver<SignUpForm> = zodResolver(schema);

function SignUp() {
  const { mutateAsync } = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (data: SignUpForm) => {
      console.log(data);
    },
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<SignUpForm>({ resolver });
  const onSubmit = async (data: SignUpForm) => {
    await mutateAsync(data);
  };
  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <InputFormController
          name="username"
          placeholder="Username (optional)"
          register={register}
          errors={errors}
          icon={<TfiUser />}
        />
        <InputFormController name="email" placeholder="Email" register={register} errors={errors} icon={<TfiEmail />} />
        <InputFormController
          name="password"
          type="password"
          placeholder="Password"
          register={register}
          errors={errors}
          icon={<TfiKey />}
        />

        <button className="btn btn-outline  w-full">Sign Up</button>
      </form>
      <div className="my-8 space-y-8">
        <div className="relative text-center">
          <span className="relative z-10 bg-white px-2">or sign up with</span>
          <hr className="absolute left-0 top-1/2 z-0 w-full" />
        </div>
        <SocialButtons />
      </div>
      <div className="text-center text-sm">
        Have an account already{' '}
        <Link to="/login" className="text-primary">
          Login!
        </Link>
      </div>
    </div>
  );
}
