import { createFileRoute } from '@tanstack/react-router';
import { FieldErrors } from 'react-hook-form';
import { z } from 'zod';
import AuthForm from '../-components/AuthForm';
import { useLoginMutation } from '../-components/authQueryConfig';

export const Route = createFileRoute('/_auth/login')({
  component: Login,
});

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginForm = z.infer<typeof schema>;

const renderForm: { name: keyof FieldErrors; isPassword?: boolean; placeHolder: string }[] = [
  { name: 'email', placeHolder: 'Email' },
  { name: 'password', isPassword: true, placeHolder: 'Password' },
];

function Login() {
  return (
    <AuthForm
      schema={schema}
      useAuthMutation={useLoginMutation<LoginForm>()}
      socialButtons
      socialButtonsLabel="Or Login With"
      submitBtnLabel="Login"
      footerLink={'/signup'}
      footerLinkLabel="sign up for free"
      renderForm={renderForm}
      returnLink={'/forgotPassword'}
      returnLinkLabel="forgot password"
    />
  );
}
