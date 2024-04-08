import { InputFormController, SocialButtons } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Resolver, useForm } from 'react-hook-form';
import { TfiEmail, TfiKey } from 'react-icons/tfi';
import { z } from 'zod';

export const Route = createFileRoute('/_auth/login')({
  component: Login,
});

interface LoginForm {
  email: string;
  password: string;
}

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3).optional(),
});

const resolver: Resolver<LoginForm> = zodResolver(schema);

function Login() {
  const { mutateAsync } = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (data: LoginForm) => {
      console.log(data);
    },
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<LoginForm>({ resolver });
  const onSubmit = async (data: LoginForm) => {
    await mutateAsync(data);
  };
  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <InputFormController name="email" placeholder="Email" register={register} errors={errors} icon={<TfiEmail />} />
        <InputFormController
          name="password"
          type="password"
          placeholder="Password"
          register={register}
          errors={errors}
          icon={<TfiKey />}
        />
        <button className="btn btn-outline  w-full">Login</button>
      </form>
      <div className="my-8 space-y-8">
        <div className="relative text-center">
          <span className="relative z-10 bg-white px-2">or Log in with</span>
          <hr className="absolute left-0 top-1/2 z-0 w-full" />
        </div>
        <SocialButtons />
      </div>
      <div className="text-center text-sm">
        <Link to="/signup" className="text-primary">
          Sign Up For Free
        </Link>
      </div>
    </div>
  );
}
