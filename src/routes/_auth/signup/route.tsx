import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import AuthForm from '../-components/AuthForm';
import { FieldErrors } from 'react-hook-form';
import { useSignUpMutation } from '../-components/authQueryConfig';

export const Route = createFileRoute('/_auth/signup')({
  component: SignUp,
});

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3).optional(),
});

type SignUpForm = z.infer<typeof schema>;

const renderForm: { name: keyof FieldErrors; isPassword?: boolean; placeHolder: string }[] = [
  { name: 'email', placeHolder: 'Email' },
  { name: 'password', isPassword: true, placeHolder: 'Password' },
  { name: 'username', placeHolder: 'Username (Optional)' },
];

function SignUp() {
  return (
    <AuthForm
      schema={schema}
      useAuthMutation={useSignUpMutation<SignUpForm>()}
      socialButtons
      socialButtonsLabel="Or SignUp With"
      submitBtnLabel="Sign Up"
      footerLink={'/login'}
      footerLinkLabel="Have an account already Login!"
      renderForm={renderForm}
    />
  );
}
